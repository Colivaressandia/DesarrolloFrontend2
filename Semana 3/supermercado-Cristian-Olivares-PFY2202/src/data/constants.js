export const TIPOS_PRODUCTO = [
  'Abarrotes',
  'Lácteos',
  'Limpieza',
  'Bebidas',
  'Frutas y Verduras',
  'Panadería',
  'Desayuno',
];

// Bajo este número de unidades disponibles el producto se considera en stock crítico
export const UMBRAL_STOCK_CRITICO = 20;

// Rangos aceptados para los datos numéricos del inventario
export const LIMITES = {
  PRECIO_MIN: 1,
  PRECIO_MAX: 10_000_000,
  STOCK_MIN: 0,
  STOCK_MAX: 100_000,
};

export const ARTICULOS_INICIALES = [
  { id: 1, nombre: 'Leche Entera 1L', marca: 'Colun', tipo: 'Lácteos', precio: 1190, stock: 45 },
  { id: 2, nombre: 'Arroz Grano Largo Grado 1 (1kg)', marca: 'Tucapel', tipo: 'Abarrotes', precio: 1590, stock: 82 },
  { id: 3, nombre: 'Aceite Maravilla 900ml', marca: 'Belmont', tipo: 'Abarrotes', precio: 2490, stock: 14 },
  { id: 4, nombre: 'Detergente Líquido 3L', marca: 'Omo', tipo: 'Limpieza', precio: 7990, stock: 8 },
  { id: 5, nombre: 'Manzana Royal Gala (Bolsa 1.5kg)', marca: 'Frutas del Valle', tipo: 'Frutas y Verduras', precio: 1890, stock: 30 },
  { id: 6, nombre: 'Bebida Original 2.5L', marca: 'Coca-Cola', tipo: 'Bebidas', precio: 2690, stock: 55 },
  { id: 7, nombre: 'Pan de Molde Blanco XL', marca: 'Ideal', tipo: 'Panadería', precio: 2190, stock: 18 },
  { id: 8, nombre: 'Café Instantáneo 170g', marca: 'Nescafé', tipo: 'Desayuno', precio: 4590, stock: 22 },
];
