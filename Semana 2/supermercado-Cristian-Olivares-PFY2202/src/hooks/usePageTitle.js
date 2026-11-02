import { useEffect } from 'react';

// Cambia el título de la pestaña según la página actual
export function usePageTitle(titulo) {
  useEffect(() => {
    document.title = `${titulo} | Inventario Supermercado`;
  }, [titulo]);
}
