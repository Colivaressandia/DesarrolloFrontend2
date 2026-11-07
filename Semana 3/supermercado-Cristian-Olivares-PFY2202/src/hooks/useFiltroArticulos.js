import { useMemo, useState } from 'react';
import { filtrarArticulos } from '../utils/inventario';

// Maneja el estado de los filtros y devuelve la lista filtrada.
// `articulos` (el inventario original) nunca se modifica: `resultados` es una copia derivada.
export function useFiltroArticulos(articulos) {
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('');

  const resultados = useMemo(
    () => filtrarArticulos(articulos, { categoria, busqueda }),
    [articulos, categoria, busqueda]
  );

  const hayFiltros = categoria !== '' || busqueda.trim() !== '';
  const limpiarFiltros = () => {
    setBusqueda('');
    setCategoria('');
  };

  return { busqueda, setBusqueda, categoria, setCategoria, resultados, hayFiltros, limpiarFiltros };
}
