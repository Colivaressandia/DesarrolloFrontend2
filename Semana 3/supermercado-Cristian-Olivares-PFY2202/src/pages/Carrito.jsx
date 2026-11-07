import { useState } from 'react';
import { Link } from 'react-router';
import { useInventory } from '../hooks/useInventory';
import { usePageTitle } from '../hooks/usePageTitle';
import { formatoCLP } from '../utils/formato';
import { calcularTotalCarrito, obtenerLineasCarrito, totalUnidadesCarrito } from '../utils/inventario';
import PageHeader from '../components/PageHeader';

export default function Carrito() {
  usePageTitle('Carrito de compras');
  const { articulos, carrito, agregarAlCarrito, disminuirCantidad, quitarDelCarrito, finalizarCompra } = useInventory();
  const [compra, setCompra] = useState(null); // resumen de la última compra finalizada

  const lineas = obtenerLineasCarrito(articulos, carrito);
  const unidades = totalUnidadesCarrito(carrito);
  const total = calcularTotalCarrito(lineas);

  const handleFinalizar = () => {
    setCompra({ unidades, total });
    finalizarCompra();
  };

  if (lineas.length === 0) {
    return (
      <div>
        <PageHeader titulo="Carrito de Compras" />
        {compra && (
          <p role="status" className="alert alert-success mb-4">
            ¡Compra finalizada! {compra.unidades} unidades por un total de {formatoCLP(compra.total)}.
          </p>
        )}
        <div className="card text-center">
          <p className="text-4xl" aria-hidden="true">🧺</p>
          <p className="mt-2 text-slate-600">Tu carrito está vacío.</p>
          <Link to="/articulos" className="btn-primary mt-4">Ver artículos</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        titulo="Carrito de Compras"
        subtitulo="Al cambiar las cantidades, el inventario disponible se actualiza automáticamente."
      />

      <div className="table-wrapper">
        <table className="table-base min-w-[640px]">
          <caption className="sr-only">Artículos agregados al carrito</caption>
          <thead>
            <tr>
              <th scope="col">Producto</th>
              <th scope="col">Precio</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Subtotal</th>
              <th scope="col"><span className="sr-only">Acciones</span></th>
            </tr>
          </thead>
          <tbody>
            {lineas.map((l) => (
              <tr key={l.id}>
                <td>
                  <Link to={`/articulos/${l.id}`} className="link-action">{l.nombre}</Link>
                  <p className="text-xs text-slate-500">{l.marca}</p>
                </td>
                <td>{formatoCLP(l.precio)}</td>
                <td>
                  <div className="inline-flex items-center gap-2">
                    <button
                      type="button"
                      className="btn-qty"
                      onClick={() => disminuirCantidad(l.id)}
                      disabled={l.cantidad <= 1}
                      aria-label={`Disminuir cantidad de ${l.nombre}`}
                    >
                      −
                    </button>
                    <span className="min-w-8 text-center font-bold" aria-live="polite">{l.cantidad}</span>
                    <button
                      type="button"
                      className="btn-qty"
                      onClick={() => agregarAlCarrito(l.id)}
                      disabled={l.stock < 1}
                      aria-label={`Aumentar cantidad de ${l.nombre}`}
                    >
                      +
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{l.stock} disponibles</p>
                </td>
                <td className="font-semibold">{formatoCLP(l.subtotal)}</td>
                <td className="text-right">
                  <button type="button" className="btn-danger" onClick={() => quitarDelCarrito(l.id)} aria-label={`Quitar ${l.nombre} del carrito`}>
                    Quitar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section aria-label="Resumen de la compra" className="card mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">{unidades} unidades en {lineas.length} artículos</p>
          <p className="text-2xl font-extrabold text-slate-900">Total: {formatoCLP(total)}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/articulos" className="btn-secondary">Seguir comprando</Link>
          <button type="button" className="btn-primary" onClick={handleFinalizar}>Finalizar compra</button>
        </div>
      </section>
    </div>
  );
}
