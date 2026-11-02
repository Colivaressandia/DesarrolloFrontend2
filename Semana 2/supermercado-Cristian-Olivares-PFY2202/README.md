# Actividad Formativa 2: Gestión de Estado y Tailwind CSS

**Asignatura:** Desarrollo Frontend II (PFY2202)  
**Estudiante:** Cristian Olivares  

---

## 📋 Descripción de la Actualización (Semana 2)
Esta versión expande el proyecto de la Semana 1 incorporando **Gestión de Estado Global** y **Estilos con Framework CSS**. Se ha implementado un sistema para registrar y listar nuevos artículos del inventario sin perder la información al cambiar de rutas, gracias a las herramientas avanzadas de React.

---

## 🚀 Nuevas Funcionalidades Implementadas
1. **Estado Global con Context API (`InventoryContext`):**
   - Almacenamiento global de artículos con campos específicos (Nombre, Marca, Tipo).
   - Función proveedora para inyectar datos y métodos a cualquier componente de la aplicación.
2. **Nuevas Vistas y Enrutamiento:**
   - **Menú Superior:** Navegación auxiliar creada con Tailwind CSS.
   - **Lista de Artículos (`/lista`):** Tabla dinámica que consume el estado global para renderizar el inventario en tiempo real.
   - **Agregar Artículo (`/agregar`):** Formulario interactivo que despacha nuevos productos hacia el estado global.
3. **Framework CSS:**
   - Integración completa de **Tailwind CSS v4** (mediante `@tailwindcss/vite`).
   - Diseño responsivo, moderno y utilitario en los nuevos componentes (formularios, botones, tablas y menús).

---

## 💻 Instrucciones para Ejecutar en Local

1. Entrar a la carpeta del proyecto:
   ```bash
   cd "Semana 2/supermercado-Cristian-Olivares-PFY2202"