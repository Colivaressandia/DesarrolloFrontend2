// GitHub Pages no conoce las rutas de React Router: si alguien entra directo a
// /articulos/3 devuelve 404.html. Copiando index.html como 404.html, la app carga
// igual y React Router resuelve la ruta.
import { copyFileSync } from 'node:fs';

copyFileSync('dist/index.html', 'dist/404.html');
console.log('✓ dist/404.html creado (fallback SPA para GitHub Pages)');
