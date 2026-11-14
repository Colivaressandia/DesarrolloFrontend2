# Librería: categorías de libros con API REST mock (Actividad Formativa, Semana 4)

**Asignatura:** Desarrollo Frontend II (PFY2202)
**Estudiante:** Cristian Olivares

Tienda de libros hecha con **React 19, React Router 7 y Tailwind CSS 4** que consume una **API REST simulada con MSW (Mock Service Worker)**. El usuario explora las categorías de libros y entra a cada una para ver sus títulos.

## Funcionalidades

| Pantalla | Ruta | Qué hace |
|---|---|---|
| Categorías | `/` | Lista las categorías de libros pidiéndolas a la API (`GET /api/categories`). |
| Libros de una categoría | `/categorias/:slug` | Lista los libros de la categoría (`GET /api/books?genre=<slug>`) y permite buscar por título o autor. |
| Simulador del servidor | `/simulador` | Cambia el comportamiento del mock (lento, error 500, error 404, sin conexión, sin respuesta) para ver cómo reacciona la interfaz. |
| 404 | cualquier otra | Página para direcciones desconocidas. |

## API REST mock (MSW)

El "servidor" vive en `src/mocks/` y responde igual que lo haría un backend real:

| Método | Endpoint | Respuesta |
|---|---|---|
| GET | `/api/categories` | `200` con la lista de categorías (id, slug, nombre, descripción, cantidad de libros). |
| GET | `/api/books?genre=ficcion` | `200` con los libros de la categoría; `404` si la categoría no existe. |

- Cada respuesta tiene un retraso de 0,8 s para que se vean los indicadores de carga.
- La categoría **Drama** devuelve una lista vacía a propósito, para probar el estado "sin libros".
- El mock se activa siempre al iniciar la aplicación. Para apuntar a un servidor real, define `VITE_USE_MOCKS=false`.

## Carga, errores y optimización

**Indicador de carga.** Cada petición muestra un spinner con su mensaje y tarjetas "fantasma" mientras llega la respuesta, y desaparece al terminar (con éxito o con error).

**Manejo de errores.** `src/utils/errores.js` traduce cada falla a un mensaje específico, con una sugerencia de qué hacer:

| Situación | Mensaje | Alternativas para el usuario |
|---|---|---|
| Sin conexión | "No pudimos conectar con el servidor" | Reintentar, volver a las categorías |
| Servidor sin respuesta (más de 8 s) | "El servidor tardó demasiado en responder" | Reintentar, volver a las categorías |
| Error 5xx | "El servidor tuvo un problema" | Reintentar, volver a las categorías |
| Error 404 | "No encontramos lo que buscabas" | Volver a las categorías |
| Respuesta que no es JSON | "Recibimos una respuesta inesperada" | Reintentar |

Si una consulta falla pero ya se habían cargado esos datos antes, la pantalla **mantiene los últimos datos guardados** y avisa que podrían estar desactualizados, en vez de dejar al usuario sin nada.

**Optimización de consultas** (`src/services/apiClient.js`):
- **Caché en memoria** de 60 s: volver a una pantalla ya visitada no repite la petición.
- **Peticiones compartidas**: si dos componentes piden lo mismo a la vez, viaja una sola.
- **Búsqueda en memoria**: el buscador filtra lo ya cargado y no genera peticiones.
- **Respuestas atrasadas descartadas**: si el usuario cambia de pantalla, una respuesta que llega tarde no pisa la vista actual.
- **Tiempo máximo de espera** de 8 s por petición.

## Cómo probar los errores

1. Entra a **Simulador** en el menú y elige un modo (por ejemplo, *Error 500 del servidor*).
2. Usa los botones de abajo para volver a las categorías o a un libro y observa el mensaje.
3. Con un modo de error, usa **Reintentar** después de volver al modo normal para ver la recuperación.
4. Prueba también `/categorias/no-existe` (404) y la categoría **Drama** (sin libros).

## Estructura del proyecto

```
src/
├── mocks/        data.js, handlers.js, browser.js (servidor mock) y config.js (modos del simulador)
├── services/     apiClient.js (fetch con caché, timeout y errores) y libreriaApi.js (direcciones)
├── hooks/        useApi (carga, error y reintento) y usePageTitle
├── utils/        errores.js (mensajes para el usuario) y formato.js (moneda CLP)
├── components/   CategoryCard, BookCard, Cargando, MensajeError, AvisoObsoleto, PageHeader, TopMenu
├── pages/        Home, Categoria, Simulador, NotFound
├── layouts/      MainLayout
└── routes/       AppRoutes.jsx (todas las rutas)
public/mockServiceWorker.js   Service worker de MSW (generado con `npx msw init public/`)
```

## Ejecutar en local

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev       # servidor de desarrollo
npm run build     # build de producción (carpeta dist/)
npm run preview   # sirve el build para probarlo
npm run lint      # revisión con ESLint
```

## Notas

- Los datos son ficticios y viven en `src/mocks/data.js`.
- Accesibilidad: indicadores de carga con `role="status"`, errores con `role="alert"`, campos con etiqueta, `lang="es"` y título de pestaña por página.
