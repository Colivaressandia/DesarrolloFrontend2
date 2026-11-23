import { useEffect, useState } from 'react';
import { getJson, leerCacheFresca, leerCacheObsoleta } from '../services/apiClient';

const crearClave = (url, intento) => `${url}#${intento}`;

/**
 * Consulta una URL y entrega { data, cargando, error, obsoleto, reintentar }.
 *  - cargando: true mientras la petición está en curso
 *  - error: el ApiError de la última petición fallida (o null)
 *  - obsoleto: true si la petición falló pero se muestra el último dato guardado como respaldo
 *  - reintentar: vuelve a pedir ignorando la caché
 */
export function useApi(url) {
  const [intento, setIntento] = useState(0);
  const [resultado, setResultado] = useState({ clave: null, data: null, error: null });

  useEffect(() => {
    // Si el dato está fresco en caché no hay nada que pedir (se usa directamente al renderizar)
    if (intento === 0 && leerCacheFresca(url) !== undefined) return undefined;

    const clave = crearClave(url, intento);
    let vigente = true; // evita aplicar una respuesta que llegó tarde, cuando ya se cambió de pantalla

    getJson(url, { forzar: intento > 0 })
      .then((data) => vigente && setResultado({ clave, data, error: null }))
      .catch((error) => vigente && setResultado({ clave, data: null, error }));

    return () => {
      vigente = false;
    };
  }, [url, intento]);

  const reintentar = () => setIntento((n) => n + 1);

  const fresco = intento === 0 ? leerCacheFresca(url) : undefined;
  if (fresco !== undefined) {
    return { data: fresco, cargando: false, error: null, obsoleto: false, reintentar };
  }

  if (resultado.clave !== crearClave(url, intento)) {
    return { data: null, cargando: true, error: null, obsoleto: false, reintentar };
  }

  if (resultado.error) {
    const respaldo = leerCacheObsoleta(url);
    return {
      data: respaldo ?? null,
      cargando: false,
      error: resultado.error,
      obsoleto: respaldo !== undefined,
      reintentar,
    };
  }

  return { data: resultado.data, cargando: false, error: null, obsoleto: false, reintentar };
}
