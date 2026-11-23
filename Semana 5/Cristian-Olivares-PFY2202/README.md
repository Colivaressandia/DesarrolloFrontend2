# Rutas del Mundo

Aplicación React para una agencia de viajes desarrollada para la actividad sumativa de Desarrollo Frontend II (PFY2202).

## Enlaces

- **Repositorio:** [DesarrolloFrontend2](https://github.com/Colivaressandia/DesarrolloFrontend2)
- **Aplicación publicada:** [Rutas del Mundo en GitHub Pages](https://colivaressandia.github.io/DesarrolloFrontend2/semana-5/Cristian-Olivares-PFY2202/)

## Tecnologías

- React 19 y React Router 7
- Tailwind CSS 4
- REST mock mediante Mock Service Worker (MSW)
- GraphQL mock mediante MSW y Apollo Client
- Caché, peticiones compartidas y estados reutilizables

## Funcionalidades

- Catálogo de destinos obtenido desde `GET /api/destinos`.
- Búsqueda por nombre de destino o país sin nuevas peticiones.
- Ficha de destino con país y actividades populares.
- Vuelos y hoteles asociados obtenidos con una consulta GraphQL.
- Navegación con React Router entre destinos, fichas, simulador y rutas desconocidas.
- Diseño responsivo y estados de carga, éxito, vacío y error.
- Reintentos y respaldo temporal de datos anteriores.
- Simulador para normal, lento, 500, 404, red y timeout.

## Cómo funciona

Mock Service Worker (MSW) intercepta las solicitudes desde el navegador y responde con datos locales; no se necesita levantar un servidor backend aparte. La página de inicio obtiene el catálogo por REST. Al abrir un destino, la app carga sus datos por REST y consulta sus vuelos y hoteles por GraphQL con Apollo Client.

El cliente REST mantiene una caché en memoria durante 60 segundos, comparte solicitudes simultáneas y cancela las que superan 8 segundos. Si una nueva solicitud falla, puede mostrar los datos anteriores y permite reintentar. El simulador cambia las respuestas de ambas APIs y conserva el modo durante la sesión.

## Rutas

| Vista | Desarrollo local | GitHub Pages |
|---|---|---|
| Destinos | `/` | `#/` |
| Ficha de destino | `/destinos/:slug` | `#/destinos/:slug` |
| Simulador | `/simulador` | `#/simulador` |

En Pages se usa navegación con `#` para que las rutas funcionen al recargar dentro del hosting estático.

## APIs simuladas

Las rutas REST se muestran aquí como rutas locales. La app aplica automáticamente el prefijo de GitHub Pages cuando corresponde.

### REST

| Método | Recurso | Resultado |
|---|---|---|
| GET | `/api/destinos` | Lista de destinos |
| GET | `/api/destinos/:slug` | Información de un destino |

### GraphQL

Endpoint: `/graphql`

```graphql
query OpcionesViaje($destinoSlug: String!) {
  destino(destinoSlug: $destinoSlug) {
    slug
    vuelos { id aerolinea origen destino precio salida llegada disponible }
    hoteles { id nombre estrellas precioPorNoche entrada salida disponible }
  }
}
```

## Ejecutar

Requiere Node.js 20.19 o superior, o 22.12 o superior.

```powershell
npm.cmd ci
npm.cmd run dev
npm.cmd run build
npm.cmd run lint
npm.cmd run preview
```

## Publicación en GitHub Pages

El workflow [deploy-week5.yml](../../.github/workflows/deploy-week5.yml) compila la aplicación y actualiza únicamente su carpeta en la rama `gh-pages`, conservando las demás publicaciones. Se ejecuta al subir cambios de Semana 5 a `main`.

## Probar el simulador

1. Entrar a **Simulador**.
2. Elegir respuesta lenta, error 500, 404, sin conexión o timeout.
3. Abrir un destino y observar el comportamiento REST y GraphQL.
4. Volver al modo normal y usar **Reintentar**.

El modo se conserva en `sessionStorage` y se aplica a ambas APIs. También conviene probar las vistas en distintos tamaños de pantalla y navegadores.

## Estructura

```text
src/
├── mocks/       Datos, handlers REST/GraphQL y simulador
├── services/    Cliente REST, caché y Apollo Client
├── hooks/       Estado reutilizable y título de página
├── components/  Tarjetas, carga, errores y navegación
├── pages/       Inicio, destino, simulador y 404
├── layouts/     Diseño principal
└── routes/      Configuración de React Router
```
