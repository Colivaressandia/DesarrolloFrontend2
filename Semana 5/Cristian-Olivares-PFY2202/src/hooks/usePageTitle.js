import { useEffect } from 'react';

export function usePageTitle(titulo) {
  useEffect(() => {
    document.title = `${titulo} | Rutas del Mundo`;
  }, [titulo]);
}
