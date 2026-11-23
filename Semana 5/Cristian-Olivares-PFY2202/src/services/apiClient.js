// Cliente HTTP con tres optimizaciones:
//  1) caché en memoria con vigencia (TTL): volver a una pantalla no repite la petición
//  2) peticiones "en vuelo" compartidas: si dos componentes piden lo mismo a la vez, viaja una sola
//  3) tiempo máximo de espera (timeout) para no dejar al usuario esperando para siempre

const TTL_MS = 60_000;
const TIMEOUT_MS = 8_000;

export class ApiError extends Error {
  constructor(mensaje, { tipo, status = null, cause } = {}) {
    super(mensaje, { cause });
    this.name = 'ApiError';
    this.tipo = tipo; // 'red' | 'timeout' | 'http' | 'respuesta'
    this.status = status;
  }
}

const cache = new Map(); // url -> { data, guardadoEn }
const enVuelo = new Map(); // url -> Promise

export function leerCacheFresca(url) {
  const entrada = cache.get(url);
  return entrada && Date.now() - entrada.guardadoEn < TTL_MS ? entrada.data : undefined;
}

// Dato guardado aunque haya vencido: sirve como respaldo si la petición falla
export const leerCacheObsoleta = (url) => cache.get(url)?.data;

// Marca todo como vencido (sin borrarlo) para forzar una nueva consulta conservando el respaldo
export function invalidarCache() {
  cache.forEach((entrada) => {
    entrada.guardadoEn = 0;
  });
}

async function pedir(url) {
  const controlador = new AbortController();
  const temporizador = setTimeout(() => controlador.abort(), TIMEOUT_MS);

  try {
    const respuesta = await fetch(url, {
      signal: controlador.signal,
      headers: { Accept: 'application/json' },
    });

    if (!respuesta.ok) {
      let mensaje = respuesta.statusText;
      try {
        mensaje = (await respuesta.json()).message ?? mensaje;
      } catch {
        /* la respuesta de error no traía JSON */
      }
      throw new ApiError(mensaje, { tipo: 'http', status: respuesta.status });
    }

    try {
      return await respuesta.json();
    } catch (cause) {
      throw new ApiError('La respuesta del servidor no es JSON válido', { tipo: 'respuesta', cause });
    }
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error.name === 'AbortError') {
      throw new ApiError('El servidor tardó demasiado en responder', { tipo: 'timeout', cause: error });
    }
    throw new ApiError('No fue posible conectar con el servidor', { tipo: 'red', cause: error });
  } finally {
    clearTimeout(temporizador);
  }
}

/** GET que devuelve JSON. Con `forzar: true` ignora la caché (por ejemplo, al reintentar). */
export function getJson(url, { forzar = false } = {}) {
  if (!forzar) {
    const fresco = leerCacheFresca(url);
    if (fresco !== undefined) return Promise.resolve(fresco);
    if (enVuelo.has(url)) return enVuelo.get(url);
  }

  const promesa = pedir(url)
    .then((data) => {
      cache.set(url, { data, guardadoEn: Date.now() });
      return data;
    })
    .finally(() => enVuelo.delete(url));

  enVuelo.set(url, promesa);
  return promesa;
}
