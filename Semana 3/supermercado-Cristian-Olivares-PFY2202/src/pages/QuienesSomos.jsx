import { usePageTitle } from '../hooks/usePageTitle';
import PageHeader from '../components/PageHeader';

export default function QuienesSomos() {
  usePageTitle('Quiénes somos');

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader titulo="Quiénes Somos" subtitulo="Compromiso y frescura para tu hogar" />

      <section className="card">
        <h2 className="mb-2 text-lg font-bold text-brand-900">Nuestra Historia</h2>
        <p className="leading-relaxed text-slate-600">
          Fundado en 2010, nuestro supermercado nació con el objetivo de ofrecer productos frescos,
          abarrotes y artículos de primera necesidad a precios convenientes y con un estándar de
          calidad insuperable.
        </p>
      </section>

      <section className="card mt-4">
        <h2 className="mb-2 text-lg font-bold text-brand-900">Nuestra Misión</h2>
        <p className="leading-relaxed text-slate-600">
          Llevar bienestar a cada rincón de nuestra comunidad mediante un servicio cercano, apoyo a
          productores locales y un sistema de abastecimiento moderno y eficiente.
        </p>
      </section>
    </div>
  );
}
