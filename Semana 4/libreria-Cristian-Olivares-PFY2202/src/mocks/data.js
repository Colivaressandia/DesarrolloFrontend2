// Datos que el "servidor" mock entrega. Drama queda vacío a propósito para probar el estado "sin libros".
export const LIBROS_POR_CATEGORIA = {
  ficcion: [
    { id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', anio: 1967, precio: 14990 },
    { id: 2, titulo: 'La casa de los espíritus', autor: 'Isabel Allende', anio: 1982, precio: 12990 },
    { id: 3, titulo: 'Pedro Páramo', autor: 'Juan Rulfo', anio: 1955, precio: 8990 },
  ],
  'ciencia-ficcion': [
    { id: 4, titulo: 'Fahrenheit 451', autor: 'Ray Bradbury', anio: 1953, precio: 9990 },
    { id: 5, titulo: 'Dune', autor: 'Frank Herbert', anio: 1965, precio: 16990 },
    { id: 6, titulo: 'Neuromante', autor: 'William Gibson', anio: 1984, precio: 11990 },
    { id: 7, titulo: 'Fundación', autor: 'Isaac Asimov', anio: 1951, precio: 10990 },
  ],
  fantasia: [
    { id: 8, titulo: 'El Hobbit', autor: 'J. R. R. Tolkien', anio: 1937, precio: 13990 },
    { id: 9, titulo: 'El nombre del viento', autor: 'Patrick Rothfuss', anio: 2007, precio: 15990 },
    { id: 10, titulo: 'Mistborn: El imperio final', autor: 'Brandon Sanderson', anio: 2006, precio: 14490 },
  ],
  misterio: [
    { id: 11, titulo: 'Asesinato en el Orient Express', autor: 'Agatha Christie', anio: 1934, precio: 8490 },
    { id: 12, titulo: 'El nombre de la rosa', autor: 'Umberto Eco', anio: 1980, precio: 13490 },
    { id: 13, titulo: 'Los hombres que no amaban a las mujeres', autor: 'Stieg Larsson', anio: 2005, precio: 12490 },
  ],
  historia: [
    { id: 14, titulo: 'Sapiens: de animales a dioses', autor: 'Yuval Noah Harari', anio: 2011, precio: 15490 },
    { id: 15, titulo: 'Armas, gérmenes y acero', autor: 'Jared Diamond', anio: 1997, precio: 14990 },
    { id: 16, titulo: 'SPQR: una historia de la antigua Roma', autor: 'Mary Beard', anio: 2015, precio: 17990 },
    { id: 17, titulo: '1491: una nueva historia de las Américas', autor: 'Charles C. Mann', anio: 2005, precio: 13990 },
  ],
  drama: [],
};

const INFO_CATEGORIAS = [
  { slug: 'ficcion', nombre: 'Ficción', descripcion: 'Novelas y relatos que nacen de la imaginación.' },
  { slug: 'ciencia-ficcion', nombre: 'Ciencia Ficción', descripcion: 'Futuros posibles, tecnología y otros mundos.' },
  { slug: 'fantasia', nombre: 'Fantasía', descripcion: 'Magia, criaturas y aventuras épicas.' },
  { slug: 'misterio', nombre: 'Misterio', descripcion: 'Crímenes, enigmas y detectives.' },
  { slug: 'historia', nombre: 'Historia', descripcion: 'Relatos y ensayos sobre el pasado de la humanidad.' },
  { slug: 'drama', nombre: 'Drama', descripcion: 'Historias intensas sobre las emociones humanas.' },
];

export const CATEGORIAS = INFO_CATEGORIAS.map((c, i) => ({
  id: i + 1,
  ...c,
  cantidad: LIBROS_POR_CATEGORIA[c.slug].length,
}));
