# Supermercado: Gestión de Inventario (Actividad Sumativa, Semana 3)

**Asignatura:** Desarrollo Frontend II (PFY2202)
**Estudiante:** Cristian Olivares

Sitio web de gestión de inventario de un supermercado hecho con **React 19, React Router 7, Context API + useReducer y Tailwind CSS 4**.

🌐 **Sitio publicado (GitHub Pages):** https://colivaressandia.github.io/DesarrolloFrontend2/

## Funcionalidades

| Pantalla | Ruta | Qué hace |
|---|---|---|
| Inventario | `/` | Indicadores calculados (productos, unidades, stock crítico, valor total, unidades en carrito) y búsqueda por nombre, marca o tipo. |
| Lista de artículos | `/articulos` | Tabla con todos los artículos y **filtro por categoría**. El filtro solo cambia lo que se muestra; el inventario original no se modifica. |
| Detalle de artículo | `/articulos/:id` | Información completa del artículo y botón **Agregar al carrito**. Cada unidad agregada **resta del stock disponible**. |
| Carrito | `/carrito` | Lista lo agregado, permite **aumentar o disminuir cantidades** (el inventario se actualiza en cada cambio), quitar artículos (devuelve el stock) y finalizar la compra. |
| Agregar artículo | `/articulos/nuevo` | Formulario con validación (expresiones regulares, rangos y enteros). El artículo queda disponible en todas las pantallas. |
| Quiénes somos / Contáctanos | `/quienes-somos`, `/contacto` | Páginas informativas. El formulario de contacto es solo demostrativo: no envía ni almacena el mensaje. |
| 404 | cualquier otra | Página para direcciones desconocidas. |

### Reglas del carrito e inventario

- El estado global guarda el **stock disponible** de cada artículo y, aparte, las unidades que hay en el carrito.
- Agregar al carrito: `stock − 1` y `cantidad + 1`. Si el stock llega a 0 no se puede agregar más.
- Disminuir cantidad: `stock + 1` y `cantidad − 1` (mínimo 1; para eliminar se usa **Quitar**).
- Quitar del carrito: todas las unidades vuelven al inventario.
- Finalizar compra: el carrito se vacía y el stock descontado se mantiene.

### Validación de datos

Antes de llegar al estado global, cada artículo pasa por `validarArticulo` (`src/utils/validadores.js`):

- Nombre, marca y tipo se comprueban con expresiones regulares (el tipo además debe pertenecer a la lista).
- Precio y stock deben ser **enteros finitos solo con dígitos** y estar dentro de un rango (precio 1 a 10.000.000, stock 0 a 100.000). Se rechazan valores como `12.5`, `1e3`, `-4` o `NaN`.
- No se permiten artículos duplicados (mismo nombre y marca).
- El reducer vuelve a validar, así que ninguna acción puede dejar datos inválidos en el inventario.

## Estructura del proyecto

```
src/
├── routes/AppRoutes.jsx      Todas las rutas (anidadas, con parámetro :id y lazy loading)
├── layouts/MainLayout.jsx    Estructura común: menú superior, <Outlet /> y menú inferior
├── pages/                    Home, ListaProductos, DetalleProducto, Carrito, AgregarProducto,
│                             Contacto, QuienesSomos, NotFound
├── components/               ProductTable, Metric, PageHeader, StockBadge, TopMenu, BottomNav
│   └── form/                 CampoTexto, CampoSelect (campos reutilizables y accesibles)
├── context/                  inventoryContext, inventoryReducer (lógica pura), InventoryProvider
├── hooks/                    useInventory, useFiltroArticulos, useMetricasInventario,
│                             useFormulario, usePageTitle
├── utils/                    validadores, inventario (selectores), formato (moneda CLP)
├── data/constants.js         Datos iniciales, categorías y límites
└── index.css                 Tema de Tailwind (@theme) y clases reutilizables (@apply)
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

## Publicar en GitHub Pages

Este proyecto vive en la carpeta `Semana 3` del repositorio `DesarrolloFrontend2`. Se publica con el paquete `gh-pages`, que sube la carpeta `dist/` a la rama `gh-pages`.

1. Desde la carpeta del proyecto ejecuta `npm install` y luego `npm run deploy`.
2. En GitHub: **Settings → Pages → Source: Deploy from a branch → rama `gh-pages` / carpeta `/ (root)`**.
3. El sitio queda en `https://colivaressandia.github.io/DesarrolloFrontend2/`.

La ruta base del sitio (`/DesarrolloFrontend2/`) se define en `vite.config.js`, en la constante `NOMBRE_REPO`.

Al compilar, `index.html` se copia como `404.html` para que los enlaces directos (por ejemplo `/articulos/3`) funcionen al recargar la página en GitHub Pages.

## Notas

- Los datos viven en memoria: al recargar la página se vuelve al inventario inicial.
- Estilos: Tailwind CSS con colores de marca definidos en `@theme` y clases compartidas (`btn-primary`, `input-field`, `badge`, `table-base`, etc.) en `src/index.css`.
- Accesibilidad: etiquetas asociadas con `htmlFor`/`id`, errores con `role="alert"`, confirmaciones con `role="status"`, tablas con `caption` y `scope`, `lang="es"` y título de pestaña por página.
