import { Link } from 'react-router';
import StockBadge from './StockBadge';
import { formatoCLP } from '../utils/formato';

// Cada columna sabe cómo mostrarse; la tabla solo decide cuáles usar mediante `columnas`
const COLUMNAS = {
  id: {
    titulo: 'ID',
    render: (a) => <span className="font-mono text-gray-500">#{a.id}</span>,
  },
  nombre: {
    titulo: 'Producto',
    render: (a) => (
      <Link to={`/articulos/${a.id}`} className="link-action">
        {a.nombre}
      </Link>
    ),
  },
  marca: { titulo: 'Marca', render: (a) => a.marca },
  tipo: { titulo: 'Tipo', render: (a) => <span className="badge badge-info">{a.tipo}</span> },
  precio: { titulo: 'Precio', render: (a) => formatoCLP(a.precio) },
  stock: {
    titulo: 'Stock',
    render: (a) => (
      <>
        <strong>{a.stock}</strong> unids.
      </>
    ),
  },
  estado: { titulo: 'Estado', render: (a) => <StockBadge articulo={a} /> },
  detalle: {
    titulo: 'Detalle',
    render: (a) => (
      <Link to={`/articulos/${a.id}`} className="btn-secondary">
        Ver detalle
      </Link>
    ),
  },
};

const COLUMNAS_POR_DEFECTO = ['id', 'nombre', 'marca', 'tipo', 'precio', 'stock', 'estado'];

export default function ProductTable({
  articulos,
  columnas = COLUMNAS_POR_DEFECTO,
  caption,
  mensajeVacio = 'No hay artículos para mostrar.',
}) {
  return (
    <div className="table-wrapper">
      <table className="table-base min-w-[640px]">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            {columnas.map((c) => (
              <th key={c} scope="col">{COLUMNAS[c].titulo}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {articulos.length > 0 ? (
            articulos.map((a) => (
              <tr key={a.id}>
                {columnas.map((c) => (
                  <td key={c}>{COLUMNAS[c].render(a)}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columnas.length} className="py-8 text-center text-slate-400">
                {mensajeVacio}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
