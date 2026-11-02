import { useCallback, useMemo, useReducer } from 'react';
import { InventoryContext } from './inventoryContext';
import { ARTICULOS_INICIALES } from '../data/constants';

const ACTIONS = {
  ADD_ARTICLE: 'ADD_ARTICLE',
};

// Reducer puro: dado el estado actual y una acción, devuelve el nuevo estado
function inventoryReducer(articulos, action) {
  switch (action.type) {
    case ACTIONS.ADD_ARTICLE: {
      const siguienteId = articulos.reduce((max, a) => Math.max(max, a.id), 0) + 1;
      return [...articulos, { ...action.payload, id: siguienteId }];
    }
    default:
      return articulos;
  }
}

export function InventoryProvider({ children }) {
  const [articulos, dispatch] = useReducer(inventoryReducer, ARTICULOS_INICIALES);

  const agregarArticulo = useCallback(
    (nuevoArticulo) => dispatch({ type: ACTIONS.ADD_ARTICLE, payload: nuevoArticulo }),
    []
  );

  const value = useMemo(() => ({ articulos, agregarArticulo }), [articulos, agregarArticulo]);

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
}
