// Direcciones de la API REST de la librería (las responde el mock en src/mocks)
export const URL_CATEGORIAS = '/api/categories';
export const urlLibros = (slug) => `/api/books?genre=${encodeURIComponent(slug)}`;
