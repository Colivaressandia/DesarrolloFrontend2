import { useState } from 'react';

const PRODUCTOS_INICIALES = [
  { id: 101, nombre: 'Leche Entera Colun 1L', categoria: 'Lácteos', precio: 1190, stock: 45 },
  { id: 102, nombre: 'Arroz Grano Largo Grado 1 (1kg)', categoria: 'Abarrotes', precio: 1590, stock: 82 },
  { id: 103, nombre: 'Aceite Maravilla Belmont 900ml', categoria: 'Abarrotes', precio: 2490, stock: 14 },
  { id: 104, nombre: 'Detergente Omo Líquido 3L', categoria: 'Limpieza', precio: 7990, stock: 8 },
  { id: 105, nombre: 'Manzana Royal Gala (Bolsa 1.5kg)', categoria: 'Frutas y Verduras', precio: 1890, stock: 30 },
  { id: 106, nombre: 'Bebida Coca-Cola Original 2.5L', categoria: 'Bebidas', precio: 2690, stock: 55 },
  { id: 107, nombre: 'Pan Molde Blanco Ideal XL', categoria: 'Panadería', precio: 2190, stock: 18 },
  { id: 108, nombre: 'Café Instantáneo Nescafé 170g', categoria: 'Desayuno', precio: 4590, stock: 22 }
];

export default function Home() {
  const [productos] = useState(PRODUCTOS_INICIALES);
  const [busqueda, setBusqueda] = useState('');

  // Filtro en tiempo real por nombre o categoría
  const productosFiltrados = productos.filter((prod) =>
    prod.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    prod.categoria.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Métricas para el resumen superior
  const totalStock = productos.reduce((acc, prod) => acc + prod.stock, 0);
  const productosBajoStock = productos.filter(p => p.stock < 20).length;
  const valorTotalInventario = productos.reduce((acc, p) => acc + (p.precio * p.stock), 0);

  return (
    <div className="page-container">
      <div className="header-section">
        <h1>Gestión de Inventario</h1>
        <p className="subtitle">Panel de control de stock y abastecimiento en sucursales</p>
      </div>

      {/* Tarjetas de Métricas Rápidas (KPIs) */}
      <div className="metrics-grid">
        <div className="metric-card">
          <span className="metric-icon">📦</span>
          <div>
            <h4>Total Productos</h4>
            <p className="metric-value">{productos.length} ítems</p>
          </div>
        </div>

        <div className="metric-card">
          <span className="metric-icon">📊</span>
          <div>
            <h4>Unidades en Stock</h4>
            <p className="metric-value">{totalStock} unids.</p>
          </div>
        </div>

        <div className="metric-card warning">
          <span className="metric-icon">⚠️</span>
          <div>
            <h4>Stock Crítico</h4>
            <p className="metric-value">{productosBajoStock} alertas</p>
          </div>
        </div>

        <div className="metric-card success">
          <span className="metric-icon">💰</span>
          <div>
            <h4>Valor Inventario</h4>
            <p className="metric-value">${valorTotalInventario.toLocaleString('es-CL')}</p>
          </div>
        </div>
      </div>

      {/* Barra de búsqueda interactiva */}
      <div className="inventory-toolbar">
        <input
          type="text"
          placeholder="🔍 Buscar por nombre de producto o categoría..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="search-input"
        />
        <span className="results-count">Mostrando: {productosFiltrados.length} productos</span>
      </div>

      {/* Tabla Estilizada */}
      <div className="table-wrapper">
        <table className="modern-table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio Unitario</th>
              <th>Stock Actual</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((item) => (
                <tr key={item.id}>
                  <td className="sku-cell">#{item.id}</td>
                  <td><strong>{item.nombre}</strong></td>
                  <td><span className="category-pill">{item.categoria}</span></td>
                  <td className="price-cell">${item.precio.toLocaleString('es-CL')}</td>
                  <td><strong>{item.stock}</strong> unids.</td>
                  <td>
                    <span className={`status-badge ${item.stock >= 20 ? 'status-ok' : 'status-danger'}`}>
                      {item.stock >= 20 ? '● En Stock' : '▲ Crítico'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">No se encontraron productos que coincidan con tu búsqueda.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}