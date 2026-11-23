import { Link } from 'react-router';

export default function DestinationCard({ destino }) {
  const codigosBandera = {
    Chile: 'cl', Perú: 'pe', Colombia: 'co', Argentina: 'ar',
    Francia: 'fr', Italia: 'it', Grecia: 'gr', Japón: 'jp',
    Indonesia: 'id', Tailandia: 'th', 'República Dominicana': 'do', Cuba: 'cu',
    'Estados Unidos': 'us', 'Reino Unido': 'gb', España: 'es', Brasil: 'br', Australia: 'au',
  };
  return (
    <Link
      to={`/destinos/${destino.slug}`}
      className="group relative overflow-hidden rounded-[1.7rem] border-[5px] border-white/90 bg-white/90 shadow-[inset_0_1px_2px_white,0_12px_30px_rgba(25,134,180,0.18)] backdrop-blur transition duration-300 hover:-translate-y-2 hover:rotate-[0.5deg] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
    >
      <img
        src={destino.imagen}
        alt={`Paisaje de ${destino.nombre}`}
        className="h-56 w-full object-cover transition duration-700 group-hover:scale-[1.07]"
        loading="lazy"
      />
      <div className="relative p-5">
        {codigosBandera[destino.pais] && (
          <p className="absolute right-4 top-[-1.8rem] grid h-14 w-14 overflow-hidden place-items-center rounded-full border-[5px] border-white bg-sky-100 shadow-[0_5px_15px_rgba(20,130,185,0.25)]" aria-label={`Bandera de ${destino.pais}`}>
            <img
              src={`https://flagcdn.com/w80/${codigosBandera[destino.pais]}.png`}
              alt=""
              className="h-full w-full object-cover"
            />
          </p>
        )}
        <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-700">{destino.pais}</p>
        <h2 className="mt-1 text-xl font-bold text-slate-900 group-hover:text-emerald-700">{destino.nombre}</h2>
        <p className="mt-2 line-clamp-2 text-sm text-slate-600">{destino.descripcion}</p>
        <span className="mt-4 inline-block font-semibold text-brand-700">Ver vuelos y hoteles →</span>
      </div>
    </Link>
  );
}
