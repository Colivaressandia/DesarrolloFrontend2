import { delay, graphql, http, HttpResponse } from 'msw';
import { DESTINOS, OPCIONES_VIAJE } from './data';
import { obtenerModo } from './config';

async function simularCondicion() {
  switch (obtenerModo()) {
    case 'lenta':
      await delay(3000);
      return null;
    case 'error500':
      await delay(600);
      return { status: 500 };
    case 'error404':
      await delay(600);
      return { status: 404 };
    case 'red':
      await delay(400);
      return { red: true };
    case 'timeout':
      await delay(12000);
      return null;
    default:
      await delay(800);
      return null;
  }
}

const viajes = graphql.link('/graphql');

export const handlers = [
  http.get('/api/destinos', async () => {
    const fallo = await simularCondicion();
    if (fallo?.red) return HttpResponse.error();
    if (fallo?.status) return HttpResponse.json({ message: 'No fue posible cargar los destinos' }, { status: fallo.status });
    return HttpResponse.json(DESTINOS);
  }),

  http.get('/api/destinos/:slug', async ({ params }) => {
    const fallo = await simularCondicion();
    if (fallo?.red) return HttpResponse.error();
    if (fallo?.status) return HttpResponse.json({ message: 'No fue posible cargar el destino' }, { status: fallo.status });
    const destino = DESTINOS.find((item) => item.slug === params.slug);
    if (!destino) return HttpResponse.json({ message: 'Destino no encontrado' }, { status: 404 });
    return HttpResponse.json(destino);
  }),

  viajes.query('OpcionesViaje', async ({ variables }) => {
    const fallo = await simularCondicion();
    if (fallo?.red) return HttpResponse.error();
    if (fallo?.status) {
      return HttpResponse.json(
        { errors: [{ message: `El servidor GraphQL respondió con error ${fallo.status}` }] },
        { status: fallo.status },
      );
    }
    const destinoSlug = variables.destinoSlug;
    const opciones = OPCIONES_VIAJE[destinoSlug];
    if (!opciones) {
      return HttpResponse.json({
        errors: [{ message: `No existen opciones para el destino "${destinoSlug}"` }],
      });
    }
    return HttpResponse.json({
      data: {
        destino: {
          slug: destinoSlug,
          vuelos: opciones.vuelos,
          hoteles: opciones.hoteles,
        },
      },
    });
  }),
];
