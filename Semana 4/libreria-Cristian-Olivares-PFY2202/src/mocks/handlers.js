import { delay, http, HttpResponse } from 'msw';
import { CATEGORIAS, LIBROS_POR_CATEGORIA } from './data';
import { obtenerModo } from './config';

// Aplica el modo elegido en /simulador. Devuelve una respuesta de fallo, o null si todo va bien.
async function simularCondicion() {
  switch (obtenerModo()) {
    case 'lenta':
      await delay(3000);
      return null;
    case 'error500':
      await delay(600);
      return HttpResponse.json({ message: 'Error interno del servidor (simulado)' }, { status: 500 });
    case 'error404':
      await delay(600);
      return HttpResponse.json({ message: 'Recurso no encontrado (simulado)' }, { status: 404 });
    case 'red':
      await delay(400);
      return HttpResponse.error();
    case 'timeout':
      await delay(12000);
      return null;
    default:
      await delay(800);
      return null;
  }
}

export const handlers = [
  // GET /api/categories -> lista de categorías
  http.get('/api/categories', async () => {
    const fallo = await simularCondicion();
    if (fallo) return fallo;
    return HttpResponse.json(CATEGORIAS);
  }),

  // GET /api/books?genre=<slug> -> libros de una categoría
  http.get('/api/books', async ({ request }) => {
    const fallo = await simularCondicion();
    if (fallo) return fallo;

    const genre = new URL(request.url).searchParams.get('genre');
    const libros = LIBROS_POR_CATEGORIA[genre];
    if (!libros) {
      return HttpResponse.json({ message: `La categoría "${genre}" no existe` }, { status: 404 });
    }
    return HttpResponse.json(libros);
  }),
];
