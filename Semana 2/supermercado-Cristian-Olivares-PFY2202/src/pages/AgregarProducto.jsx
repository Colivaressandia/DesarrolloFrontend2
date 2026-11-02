import { useState, useContext } from 'react';
import { InventoryContext } from '../context/InventoryContext';

export default function AgregarProducto() {
  const { agregarArticulo } = useContext(InventoryContext);
  
  const [nombre, setNombre] = useState('');
  const [marca, setMarca] = useState('');
  const [tipo, setTipo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarArticulo({ nombre, marca, tipo });
    
    // Limpiar formulario tras guardar
    setNombre('');
    setMarca('');
    setTipo('');
    alert('¡Artículo agregado correctamente al inventario global!');
  };

  return (
    <div className="p-8 max-w-lg mx-auto mt-10 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Ingresar Nuevo Artículo</h2>
      <p className="text-gray-500 mb-6">Completa los datos para registrar un producto.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre del artículo:</label>
          <input 
            type="text" 
            required 
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Ej: Fideos Espagueti 400g"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Marca:</label>
          <input 
            type="text" 
            required 
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Ej: Lucchetti"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Tipo de Producto:</label>
          <select 
            required
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Selecciona una categoría --</option>
            <option value="Abarrotes">Abarrotes</option>
            <option value="Lácteos">Lácteos</option>
            <option value="Limpieza">Limpieza</option>
            <option value="Bebidas">Bebidas</option>
            <option value="Frutas y Verduras">Frutas y Verduras</option>
          </select>
        </div>

        <button 
          type="submit" 
          className="mt-4 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Guardar Artículo
        </button>
      </form>
    </div>
  );
}