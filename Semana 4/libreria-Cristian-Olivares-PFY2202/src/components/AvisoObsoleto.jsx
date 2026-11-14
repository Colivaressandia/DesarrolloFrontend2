// Se muestra cuando la petición falló pero hay datos guardados de una consulta anterior
export default function AvisoObsoleto({ onReintentar }) {
  return (
    <div role="status" className="alert alert-warning mb-4 flex flex-wrap items-center justify-between gap-3">
      <p>
        No pudimos actualizar la información. Estás viendo los últimos datos guardados, que podrían estar
        desactualizados.
      </p>
      <button type="button" onClick={onReintentar} className="btn-secondary">
        Reintentar
      </button>
    </div>
  );
}
