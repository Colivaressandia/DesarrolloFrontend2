import { useCallback, useMemo, useReducer } from 'react';
import { InventoryContext } from './inventoryContext';
import { ACTIONS, estadoInicial, inventoryReducer } from './inventoryReducer';

export function InventoryProvider({ children }) {
  const [state, dispatch] = useReducer(inventoryReducer, estadoInicial);

  const agregarArticulo = useCallback((datos) => dispatch({ type: ACTIONS.ADD_ARTICLE, payload: datos }), []);
  const agregarAlCarrito = useCallback((id) => dispatch({ type: ACTIONS.ADD_TO_CART, payload: id }), []);
  const disminuirCantidad = useCallback((id) => dispatch({ type: ACTIONS.DECREASE_ITEM, payload: id }), []);
  const quitarDelCarrito = useCallback((id) => dispatch({ type: ACTIONS.REMOVE_ITEM, payload: id }), []);
  const finalizarCompra = useCallback(() => dispatch({ type: ACTIONS.CHECKOUT }), []);

  const value = useMemo(
    () => ({
      articulos: state.articulos,
      carrito: state.carrito,
      agregarArticulo,
      agregarAlCarrito,
      disminuirCantidad,
      quitarDelCarrito,
      finalizarCompra,
    }),
    [state, agregarArticulo, agregarAlCarrito, disminuirCantidad, quitarDelCarrito, finalizarCompra]
  );

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
}
