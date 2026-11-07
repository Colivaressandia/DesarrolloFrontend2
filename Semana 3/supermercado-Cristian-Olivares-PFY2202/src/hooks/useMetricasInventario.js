import { useMemo } from 'react';
import { useInventory } from './useInventory';
import { calcularMetricas } from '../utils/inventario';

export function useMetricasInventario() {
  const { articulos, carrito } = useInventory();
  return useMemo(() => calcularMetricas(articulos, carrito), [articulos, carrito]);
}
