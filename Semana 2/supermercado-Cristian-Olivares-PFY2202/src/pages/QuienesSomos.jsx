import { usePageTitle } from '../hooks/usePageTitle';

export default function QuienesSomos() {
  usePageTitle('Quiénes somos');

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Quiénes Somos</h1>
      <p className="mt-1 text-sm text-slate-500">Compromiso y frescura para tu hogar</p>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-2 text-lg font-bold text-blue-900">Nuestra Historia</h2>
        <p className="leading-relaxed text-slate-600">
          Fundado en 2010, nuestro supermercado nació con el objetivo de ofrecer productos frescos,
          abarrotes y artículos de primera necesidad a precios convenientes y con un estándar de
          calidad insuperable.
        </p>
      </section>

      <section className="mt-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-2 text-lg font-bold text-blue-900">Nuestra Misión</h2>
        <p className="leading-relaxed text-slate-600">
          Llevar bienestar a cada rincón de nuestra comunidad mediante un servicio cercano, apoyo a
          productores locales y un sistema de abastecimiento moderno y eficiente.
        </p>
      </section>
    </div>
  );
}
