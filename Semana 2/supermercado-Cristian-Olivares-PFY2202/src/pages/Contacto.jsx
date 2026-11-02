import { useState } from 'react';
import { usePageTitle } from '../hooks/usePageTitle';

const inputClass =
  'w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500';
const labelClass = 'mb-1 block text-sm font-semibold text-gray-700';

export default function Contacto() {
  usePageTitle('Contáctanos');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Formulario demostrativo: no se envía ni se guarda nada
    e.target.reset();
    setEnviado(true);
  };

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Contáctanos</h1>
      <p className="mt-1 text-sm text-slate-500">¿Tienes consultas o sugerencias sobre el inventario?</p>

      <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        <strong>Formulario demostrativo:</strong> el mensaje no se envía ni se almacena en ningún lugar.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow">
        <div>
          <label htmlFor="contacto-nombre" className={labelClass}>Nombre completo</label>
          <input id="contacto-nombre" type="text" required autoComplete="name" className={inputClass} placeholder="Ej: Cristian Olivares" />
        </div>
        <div>
          <label htmlFor="contacto-correo" className={labelClass}>Correo electrónico</label>
          <input id="contacto-correo" type="email" required autoComplete="email" className={inputClass} placeholder="correo@ejemplo.com" />
        </div>
        <div>
          <label htmlFor="contacto-mensaje" className={labelClass}>Mensaje o consulta</label>
          <textarea id="contacto-mensaje" rows={4} required className={inputClass} placeholder="Escribe aquí tu consulta..." />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Enviar mensaje
        </button>

        {enviado && (
          <p role="status" className="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
            Simulación completada: en una versión real, tu mensaje habría sido enviado.
          </p>
        )}
      </form>
    </div>
  );
}
