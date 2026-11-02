# Actividad Formativa 2: Gestión de Estado y Tailwind CSS

**Asignatura:** Desarrollo Frontend II (PFY2202)
**Estudiante:** Cristian Olivares

Sitio web de gestión de inventario de un supermercado hecho con React. Continúa la actividad de la Semana 1 agregando estado global, nuevas páginas y un framework CSS.

## Funcionalidades

- **Estado global** con Context API + `useReducer` (`src/context/`). Cada artículo tiene `nombre`, `marca`, `tipo`, `precio` y `stock`. Todas las páginas leen la misma lista mediante el hook `useInventory`.
- **Agregar artículo (`/agregar`):** formulario controlado con validación; el nuevo artículo aparece de inmediato en la lista y en el panel de inventario.
- **Lista de artículos (`/lista`):** tabla con todos los artículos del inventario.
- **Inventario (`/`):** indicadores calculados (productos, unidades, stock crítico, valor total) y búsqueda por nombre, marca o tipo.
- **Quiénes somos (`/quienes-somos`)** y **Contáctanos (`/contacto`)**. El formulario de contacto es solo demostrativo: no envía ni guarda el mensaje.
- **Navegación** con React Router: menú superior (lista y agregar), menú inferior fijo (inventario, quiénes somos, contacto) y página 404 para rutas desconocidas.
- **Tailwind CSS v4** en todo el sitio, con diseño responsivo.
- **Accesibilidad:** etiquetas asociadas con `htmlFor`/`id`, buscador con etiqueta accesible, mensajes con `role="status"`/`role="alert"`, `lang="es"` y título de pestaña por página.

## Ejecutar en local

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción
npm run lint     # revisión con ESLint
```

## Estructura

```
src/
├── components/   TopMenu, BottomNav
├── context/      inventoryContext.js, InventoryProvider.jsx (useReducer)
├── data/         constants.js (datos iniciales, tipos de producto)
├── hooks/        useInventory.js, usePageTitle.js
└── pages/        Home, ListaProductos, AgregarProducto, QuienesSomos, Contacto, NotFound
```

## Nota

Los artículos viven en memoria: al recargar la página se vuelve a la lista inicial.
