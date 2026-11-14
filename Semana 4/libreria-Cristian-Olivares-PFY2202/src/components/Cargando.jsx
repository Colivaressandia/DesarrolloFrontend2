// Indicador de carga: spinner con mensaje y, opcionalmente, tarjetas "fantasma" que
// anticipan la forma del contenido mientras llega la respuesta.
export default function Cargando({ mensaje = 'Cargando…', tarjetas = 0 }) {
  return (
    <div role="status" aria-live="polite" aria-busy="true">
      <div className="flex items-center justify-center gap-3 py-6 text-slate-600">
        <span
          className="h-7 w-7 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600"
          aria-hidden="true"
        />
        <p className="font-medium">{mensaje}</p>
      </div>

      {tarjetas > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
          {Array.from({ length: tarjetas }, (_, i) => (
            <div key={i} className="card animate-pulse space-y-3">
              <div className="h-5 w-2/3 rounded bg-slate-200" />
              <div className="h-4 w-full rounded bg-slate-100" />
              <div className="h-4 w-1/2 rounded bg-slate-100" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
