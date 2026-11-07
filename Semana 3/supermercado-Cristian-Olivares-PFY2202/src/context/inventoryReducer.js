import { ARTICULOS_INICIALES } from '../data/constants';
import { validarArticulo } from '../utils/validadores';

export const ACTIONS = {
  ADD_ARTICLE: 'ADD_ARTICLE',
  ADD_TO_CART: 'ADD_TO_CART',
  DECREASE_ITEM: 'DECREASE_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  CHECKOUT: 'CHECKOUT',
};

// articulos: inventario con el stock DISPONIBLE (lo que aún no está en un carrito)
// carrito:   [{ id, cantidad }]
export const estadoInicial = { articulos: ARTICULOS_INICIALES, carrito: [] };

const actualizarStock = (articulos, id, delta) =>
  articulos.map((a) => (a.id === id ? { ...a, stock: a.stock + delta } : a));

function agregarAlCarrito(state, id) {
  const articulo = state.articulos.find((a) => a.id === id);
  if (!articulo || articulo.stock < 1) return state; // sin stock: no se puede agregar

  const yaEnCarrito = state.carrito.some((item) => item.id === id);
  return {
    articulos: actualizarStock(state.articulos, id, -1),
    carrito: yaEnCarrito
      ? state.carrito.map((item) => (item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item))
      : [...state.carrito, { id, cantidad: 1 }],
  };
}

function disminuirCantidad(state, id) {
  const item = state.carrito.find((i) => i.id === id);
  if (!item || item.cantidad <= 1) return state; // para eliminar la línea se usa REMOVE_ITEM

  return {
    articulos: actualizarStock(state.articulos, id, +1),
    carrito: state.carrito.map((i) => (i.id === id ? { ...i, cantidad: i.cantidad - 1 } : i)),
  };
}

function quitarDelCarrito(state, id) {
  const item = state.carrito.find((i) => i.id === id);
  if (!item) return state;

  return {
    articulos: actualizarStock(state.articulos, id, +item.cantidad), // devuelve todo al inventario
    carrito: state.carrito.filter((i) => i.id !== id),
  };
}

// Reducer puro: dado el estado actual y una acción, devuelve el nuevo estado.
export function inventoryReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_ARTICLE: {
      // Última barrera: aunque el formulario ya validó, se vuelve a validar antes de tocar el inventario
      const { valido, datos } = validarArticulo(action.payload, state.articulos);
      if (!valido) return state;
      const siguienteId = state.articulos.reduce((max, a) => Math.max(max, a.id), 0) + 1;
      return { ...state, articulos: [...state.articulos, { ...datos, id: siguienteId }] };
    }
    case ACTIONS.ADD_TO_CART:
      return agregarAlCarrito(state, action.payload);
    case ACTIONS.DECREASE_ITEM:
      return disminuirCantidad(state, action.payload);
    case ACTIONS.REMOVE_ITEM:
      return quitarDelCarrito(state, action.payload);
    case ACTIONS.CHECKOUT:
      // La compra se concreta: el carrito se vacía y el stock descontado se mantiene
      return { ...state, carrito: [] };
    default:
      return state;
  }
}
