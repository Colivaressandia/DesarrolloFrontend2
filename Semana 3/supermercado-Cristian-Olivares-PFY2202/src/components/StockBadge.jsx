import { estadoStock } from '../utils/inventario';

const ESTADOS = {
  ok: { clase: 'badge-ok', texto: '● En Stock' },
  critico: { clase: 'badge-danger', texto: '▲ Crítico' },
  agotado: { clase: 'badge-warning', texto: '✕ Agotado' },
};

export default function StockBadge({ articulo }) {
  const { clase, texto } = ESTADOS[estadoStock(articulo)];
  return <span className={`badge ${clase}`}>{texto}</span>;
}
