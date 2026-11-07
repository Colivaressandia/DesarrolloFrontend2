import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { useInventory } from '../hooks/useInventory';
import { usePageTitle } from '../hooks/usePageTitle';
import { formatoCLP } from '../utils/formato';
import StockBadge from '../components/StockBadge';

export default function DetalleProducto() {
  const { id } = useParams(); // parámetro dinámico de la ruta /articulos/:id
  const { articulos, carrito, agregarAlCarrito } = useInventory();
  const [mensaje, setMensaje] = useState('');

  const idNumerico = /^\d+$/.test(id) ? Number(id) : NaN;
  const articulo = articulos.find((a) => a.id === idNumerico);
  const enCarrito = carrito.find((item) => item.id === idNumerico)?.cantidad ?? 0;

  usePageTitle(articulo ? articulo.nombre : 'Artículo no encontrado');

  if (!articulo) {
    return (
      <div className="card mx-auto max-w-md text-center">
        <h1 className="text-2xl font-bold text-slate-900">Artículo no encontrado</h1>
        <p className="mt-2 text-slate-500">No existe un artículo con el identificador «{id}».</p>
        <Link to="/articulos" className="btn-primary mt-6">Volver a la lista</Link>
      </div>
    );
  }

  const sinStock = articulo.stock < 1;

  const handleAgregar = () => {
    agregarAlCarrito(articulo.id);
    setMensaje(`Agregaste «${articulo.nombre}» al carrito. Tienes ${enCarrito + 1} en total.`);
  };

  return (
    <div>
      <Link to="/articulos" className="link-action text-sm">← Volver a la lista</Link>

      <div className="card mt-4 grid gap-6 md:grid-cols-[1fr_20rem]">
        <section aria-labelledby="titulo-detalle">
          <span className="badge badge-info">{articulo.tipo}</span>
          <h1 id="titulo-detalle" className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
            {articulo.nombre}
          </h1>
          <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
            <dt className="font-semibold text-slate-500">Código</dt>
            <dd className="font-mono">#{articulo.id}</dd>
            <dt className="font-semibold text-slate-500">Marca</dt>
            <dd>{articulo.marca}</dd>
            <dt className="font-semibold text-slate-500">Categoría</dt>
            <dd>{articulo.tipo}</dd>
            <dt className="font-semibold text-slate-500">Estado</dt>
            <dd><StockBadge articulo={articulo} /></dd>
          </dl>
        </section>

        <aside className="rounded-lg bg-slate-50 p-5" aria-label="Compra">
          <p className="text-3xl font-extrabold text-slate-900">{formatoCLP(articulo.precio)}</p>
          <p className="mt-1 text-sm text-slate-600">
            Disponibles: <strong>{articulo.stock}</strong> unids.
          </p>
          {enCarrito > 0 && (
            <p className="mt-1 text-sm text-slate-600">
              En tu carrito: <strong>{enCarrito}</strong> unids.
            </p>
          )}

          <button type="button" onClick={handleAgregar} disabled={sinStock} className="btn-primary mt-5 w-full">
            {sinStock ? 'Sin stock disponible' : 'Agregar al carrito'}
          </button>

          {mensaje && (
            <p role="status" className="alert alert-success mt-4">{mensaje}</p>
          )}
          {enCarrito > 0 && (
            <Link to="/carrito" className="link-action mt-4 inline-block text-sm">Ir al carrito →</Link>
          )}
        </aside>
      </div>
    </div>
  );
}
