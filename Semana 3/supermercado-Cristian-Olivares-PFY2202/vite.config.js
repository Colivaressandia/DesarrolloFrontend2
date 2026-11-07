import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages publica el sitio en https://<usuario>.github.io/<nombre-del-repo>/
// Si cambias el nombre del repositorio, cambia también este valor.
const NOMBRE_REPO = 'DesarrolloFrontend2';

export default defineConfig(({ command, isPreview }) => ({
  plugins: [react(), tailwindcss()],
  base: command === 'build' || isPreview ? `/${NOMBRE_REPO}/` : '/',
}));
