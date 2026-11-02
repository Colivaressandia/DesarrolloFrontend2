import { createContext, useState } from 'react';

// Creamos el contexto
export const InventoryContext = createContext();

// Lista inicial con los campos solicitados: nombre, marca y tipo
const ARTICULOS_INICIALES = [
  { id: 1, nombre: 'Leche Entera 1L', marca: 'Colun', tipo: 'Lácteos' },
  { id: 2, nombre: 'Arroz Grano Largo', marca: 'Tucapel', tipo: 'Abarrotes' },
  { id: 3, nombre: 'Detergente Líquido 3L', marca: 'Omo', tipo: 'Limpieza' },
];

export function InventoryProvider({ children }) {
  const [articulos, setArticulos] = useState(ARTICULOS_INICIALES);

  // Función para agregar un nuevo artículo
  const agregarArticulo = (nuevoArticulo) => {
    setArticulos([...articulos, { ...nuevoArticulo, id: Date.now() }]);
  };

  return (
    <InventoryContext.Provider value={{ articulos, agregarArticulo }}>
      {children}
    </InventoryContext.Provider>
  );
}