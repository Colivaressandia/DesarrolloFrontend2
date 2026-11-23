// Traduce un error técnico a un mensaje claro para el usuario, con una sugerencia de qué hacer.
// `que` es lo que se intentaba cargar, por ejemplo "las categorías" o "los libros".
export function describirError(error, que = 'la información') {
  switch (error?.tipo) {
    case 'graphql':
      return {
        titulo: 'El servicio GraphQL tuvo un problema',
        detalle: `No pudimos cargar ${que}.`,
        sugerencia: 'Revisa la consola del simulador o vuelve a intentarlo.',
        reintentable: true,
      };
    case 'red':
      return {
        titulo: 'No pudimos conectar con el servidor',
        detalle: `Hubo un problema de conexión al cargar ${que}.`,
        sugerencia: 'Revisa tu conexión a internet y vuelve a intentarlo.',
        reintentable: true,
      };
    case 'timeout':
      return {
        titulo: 'El servidor tardó demasiado en responder',
        detalle: `La carga de ${que} superó el tiempo de espera.`,
        sugerencia: 'Puede ser un problema pasajero. Intenta de nuevo en unos segundos.',
        reintentable: true,
      };
    case 'respuesta':
      return {
        titulo: 'Recibimos una respuesta inesperada',
        detalle: `El servidor respondió, pero no pudimos interpretar ${que}.`,
        sugerencia: 'Intenta nuevamente. Si el problema continúa, avisa al equipo de soporte.',
        reintentable: true,
      };
    case 'http':
      if (error.status === 404) {
        return {
          titulo: 'No encontramos lo que buscabas',
          detalle: `El servidor indica que ${que} no existe (error 404).`,
          sugerencia: 'Vuelve a las categorías y elige otra opción.',
          reintentable: false,
        };
      }
      if (error.status >= 500) {
        return {
          titulo: 'El servidor tuvo un problema',
          detalle: `No pudimos cargar ${que} por un error del servidor (error ${error.status}).`,
          sugerencia: 'No es un problema tuyo. Vuelve a intentarlo en unos momentos.',
          reintentable: true,
        };
      }
      return {
        titulo: 'No pudimos completar la solicitud',
        detalle: `El servidor rechazó la carga de ${que} (error ${error.status}).`,
        sugerencia: 'Vuelve al inicio e intenta con otra opción.',
        reintentable: false,
      };
    default:
      return {
        titulo: 'Ocurrió un error inesperado',
        detalle: `No pudimos cargar ${que}.`,
        sugerencia: 'Vuelve a intentarlo.',
        reintentable: true,
      };
  }
}
