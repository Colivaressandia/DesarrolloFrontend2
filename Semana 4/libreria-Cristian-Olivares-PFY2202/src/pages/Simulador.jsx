import { useState } from 'react';
import { Link } from 'react-router';
import { usePageTitle } from '../hooks/usePageTitle';
import { MODOS, fijarModo, obtenerModo } from '../mocks/config';
import { invalidarCache } from '../services/apiClient';
import PageHeader from '../components/PageHeader';

const MOCK_ACTIVO = import.meta.env.VITE_USE_MOCKS !== 'false';

export default function Simulador() {
  usePageTitle('Simulador del servidor');
  const [modo, setModo] = useState(obtenerModo);

  const cambiarModo = (nuevo) => {
    fijarModo(nuevo);
    invalidarCache(); // fuerza una nueva consulta; los datos antiguos quedan como respaldo
    setModo(nuevo);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader
        titulo="Simulador del servidor"
        subtitulo="Cambia el comportamiento del backend mock para ver cómo responde la interfaz."
      />

      {!MOCK_ACTIVO ? (
        <p className="alert alert-warning">El servidor mock está desactivado, por lo que no hay nada que simular.</p>
      ) : (
        <>
          <fieldset className="card space-y-3">
            <legend className="sr-only">Comportamiento del servidor mock</legend>
            {Object.entries(MODOS).map(([clave, { etiqueta, detalle }]) => (
              <label
                key={clave}
                htmlFor={`modo-${clave}`}
                className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 ${
                  modo === clave ? 'border-brand-500 bg-brand-50' : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  id={`modo-${clave}`}
                  type="radio"
                  name="modo"
                  value={clave}
                  checked={modo === clave}
                  onChange={() => cambiarModo(clave)}
                  className="mt-1"
                />
                <span>
                  <span className="block font-semibold text-slate-900">{etiqueta}</span>
                  <span className="block text-sm text-slate-600">{detalle}</span>
                </span>
              </label>
            ))}
          </fieldset>

          <p role="status" className="alert alert-success mt-4">
            Modo activo: <strong>{MODOS[modo].etiqueta}</strong>. Se aplica a las categorías y a los libros.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link to="/" className="btn-primary">Probar en las categorías</Link>
            <Link to="/categorias/ficcion" className="btn-secondary">Probar en Ficción</Link>
            <Link to="/categorias/drama" className="btn-secondary">Categoría sin libros (Drama)</Link>
            <Link to="/categorias/no-existe" className="btn-secondary">Categoría que no existe</Link>
          </div>
        </>
      )}
    </div>
  );
}
