import { useState } from 'react';
import { useInventory } from '../hooks/useInventory';
import { usePageTitle } from '../hooks/usePageTitle';
import { TIPOS_PRODUCTO } from '../data/constants';

const inputClass =
  'w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500';
const labelClass = 'mb-1 block text-sm font-semibold text-gray-700';

const FORM_VACIO = { nombre: '', marca: '', tipo: '', precio: '', stock: '' };

export default function AgregarProducto() {
  usePageTitle('Agregar artículo');
  const { agregarArticulo } = useInventory();

  const [form, setForm] = useState(FORM_VACIO);
  const [mensaje, setMensaje] = useState(null); // { tipo: 'ok' | 'error', texto }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nombre = form.nombre.trim();
    const marca = form.marca.trim();
    if (!nombre || !marca) {
      setMensaje({ tipo: 'error', texto: 'El nombre y la marca no pueden estar vacíos.' });
      return;
    }

    agregarArticulo({
      nombre,
      marca,
      tipo: form.tipo,
      precio: Number(form.precio),
      stock: Number(form.stock),
    });

    setForm(FORM_VACIO);
    setMensaje({ tipo: 'ok', texto: `"${nombre}" se agregó correctamente al inventario.` });
  };

  return (
    <div className="mx-auto mt-4 max-w-lg rounded-xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8">
      <h1 className="mb-2 text-2xl font-bold text-gray-800">Ingresar Nuevo Artículo</h1>
      <p className="mb-6 text-gray-500">Completa los datos para registrar un producto.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="nombre" className={labelClass}>Nombre del artículo</label>
          <input
            id="nombre" name="nombre" type="text" required
            value={form.nombre} onChange={handleChange}
            className={inputClass} placeholder="Ej: Fideos Espagueti 400g"
          />
        </div>

        <div>
          <label htmlFor="marca" className={labelClass}>Marca</label>
          <input
            id="marca" name="marca" type="text" required
            value={form.marca} onChange={handleChange}
            className={inputClass} placeholder="Ej: Lucchetti"
          />
        </div>

        <div>
          <label htmlFor="tipo" className={labelClass}>Tipo de producto</label>
          <select id="tipo" name="tipo" required value={form.tipo} onChange={handleChange} className={inputClass}>
            <option value="">-- Selecciona una categoría --</option>
            {TIPOS_PRODUCTO.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="precio" className={labelClass}>Precio (CLP)</label>
            <input
              id="precio" name="precio" type="number" required min="0" step="1" inputMode="numeric"
              value={form.precio} onChange={handleChange}
              className={inputClass} placeholder="Ej: 1490"
            />
          </div>
          <div>
            <label htmlFor="stock" className={labelClass}>Stock (unidades)</label>
            <input
              id="stock" name="stock" type="number" required min="0" step="1" inputMode="numeric"
              value={form.stock} onChange={handleChange}
              className={inputClass} placeholder="Ej: 30"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 rounded-lg bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Guardar Artículo
        </button>

        {mensaje && (
          <p
            role={mensaje.tipo === 'error' ? 'alert' : 'status'}
            className={`rounded-lg px-4 py-3 text-sm font-medium ${
              mensaje.tipo === 'error' ? 'bg-red-50 text-red-800' : 'bg-emerald-50 text-emerald-800'
            }`}
          >
            {mensaje.texto}
          </p>
        )}
      </form>
    </div>
  );
}
