import { describirError } from '../utils/errores';

// Muestra un error de petición con mensaje claro, sugerencia y acciones alternativas.
// `children` recibe las acciones alternativas propias de cada pantalla (por ejemplo, volver al inicio).
export default function MensajeError({ error, que, onReintentar, children }) {
  const { titulo, detalle, sugerencia, reintentable } = describirError(error, que);

  return (
    <div role="alert" className="alert-error rounded-xl border p-6">
      <p className="text-3xl" aria-hidden="true">⚠️</p>
      <h2 className="mt-2 text-xl font-bold">{titulo}</h2>
      <p className="mt-1 text-sm font-normal">{detalle}</p>
      <p className="mt-1 text-sm font-normal">{sugerencia}</p>

      <div className="mt-4 flex flex-wrap gap-3">
        {reintentable && onReintentar && (
          <button type="button" onClick={onReintentar} className="btn-primary">
            Reintentar
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
