// Comportamiento del servidor mock. Se cambia desde la página /simulador para poder
// ver cómo reacciona la interfaz ante lentitud y distintos tipos de fallo.
const CLAVE = 'libreria-mock-modo';

export const MODOS = {
  normal: { etiqueta: 'Funcionamiento normal', detalle: 'Responde bien, con un retraso de 0,8 s.' },
  lenta: { etiqueta: 'Respuesta lenta', detalle: 'Responde bien, pero tarda 3 s (útil para ver los indicadores de carga).' },
  error500: { etiqueta: 'Error 500 del servidor', detalle: 'Responde con un error interno del servidor.' },
  error404: { etiqueta: 'Error 404 (no encontrado)', detalle: 'Responde que el recurso no existe.' },
  red: { etiqueta: 'Sin conexión', detalle: 'La petición falla como si se hubiera caído la red.' },
  timeout: { etiqueta: 'Servidor que no responde', detalle: 'Tarda tanto que la aplicación corta la espera (8 s).' },
};

function leerModoGuardado() {
  try {
    const guardado = sessionStorage.getItem(CLAVE);
    return guardado && guardado in MODOS ? guardado : 'normal';
  } catch {
    return 'normal';
  }
}

let modoActual = leerModoGuardado();

export const obtenerModo = () => modoActual;

export function fijarModo(modo) {
  if (!(modo in MODOS)) return;
  modoActual = modo;
  try {
    sessionStorage.setItem(CLAVE, modo);
  } catch {
    /* sin almacenamiento disponible: el modo vale solo hasta recargar */
  }
}
