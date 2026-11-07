import { UMBRAL_STOCK_CRITICO } from '../data/constants';

// Selectores: funciones puras que derivan datos del estado sin modificarlo.

export function estadoStock(articulo) {
  if (articulo.stock < 1) return 'agotado';
  if (articulo.stock < UMBRAL_STOCK_CRITICO) return 'critico';
  return 'ok';
}

// Devuelve una lista NUEVA; el inventario original no se toca.
export function filtrarArticulos(articulos, { categoria = '', busqueda = '' } = {}) {
  const q = busqueda.trim().toLowerCase();
  return articulos.filter((a) => {
    const coincideCategoria = !categoria || a.tipo === categoria;
    const coincideTexto =
      !q || a.nombre.toLowerCase().includes(q) || a.marca.toLowerCase().includes(q) || a.tipo.toLowerCase().includes(q);
    return coincideCategoria && coincideTexto;
  });
}

export const totalUnidadesCarrito = (carrito) => carrito.reduce((acc, item) => acc + item.cantidad, 0);

// Une cada línea del carrito con los datos actuales del artículo (precio, stock disponible)
export function obtenerLineasCarrito(articulos, carrito) {
  return carrito
    .map((item) => {
      const articulo = articulos.find((a) => a.id === item.id);
      return articulo ? { ...articulo, cantidad: item.cantidad, subtotal: articulo.precio * item.cantidad } : null;
    })
    .filter(Boolean);
}

export const calcularTotalCarrito = (lineas) => lineas.reduce((acc, l) => acc + l.subtotal, 0);

export function calcularMetricas(articulos, carrito) {
  return {
    totalProductos: articulos.length,
    unidadesStock: articulos.reduce((acc, a) => acc + a.stock, 0),
    stockCritico: articulos.filter((a) => estadoStock(a) !== 'ok').length,
    valorInventario: articulos.reduce((acc, a) => acc + a.precio * a.stock, 0),
    unidadesCarrito: totalUnidadesCarrito(carrito),
  };
}
