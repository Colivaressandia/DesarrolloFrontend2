# Rutas del Mundo

Aplicación React para una agencia de viajes desarrollada para la actividad sumativa de Desarrollo Frontend II (PFY2202).

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
- React Router para `/`, `/destinos/:slug`, `/simulador` y rutas desconocidas.
- Diseño responsivo y estados de carga, éxito, vacío y error.
- Reintentos y respaldo temporal de datos anteriores.
- Simulador para normal, lento, 500, 404, red y timeout.

## APIs simuladas

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

Requiere Node.js 20 o superior.

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run build
npm.cmd run lint
npm.cmd run preview
```

## Publicación en GitHub Pages

La aplicación está disponible en [Rutas del Mundo](https://colivaressandia.github.io/DesarrolloFrontend2/semana-5/Cristian-Olivares-PFY2202/).

El workflow de GitHub Actions compila esta carpeta y actualiza únicamente su contenido en `gh-pages`, conservando las demás publicaciones. Se ejecuta al subir cambios de Semana 5 a `main`. En GitHub Pages, la navegación usa rutas con `#` para permitir recargas y enlaces directos en el hosting estático.

## Probar el simulador

1. Entrar a **Simulador**.
2. Elegir respuesta lenta, error 500, 404, sin conexión o timeout.
3. Abrir un destino y observar el comportamiento REST y GraphQL.
4. Volver al modo normal y usar **Reintentar**.

El modo se conserva en `sessionStorage` y se aplica a ambas APIs.

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
