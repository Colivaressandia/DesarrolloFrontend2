import { LIMITES, TIPOS_PRODUCTO } from '../data/constants';
import { formatoNumero } from './formato';

// Expresiones regulares (\p{L} = cualquier letra, incluye tildes y ñ)
export const REGEX = {
  nombreProducto: /^[\p{L}\p{N}][\p{L}\p{N} .,'’()/%&+-]{1,59}$/u,
  marca: /^[\p{L}\p{N}][\p{L}\p{N} .&'’-]{1,39}$/u,
  tipo: /^\p{L}[\p{L} ]{2,29}$/u,
  entero: /^\d+$/,
  nombrePersona: /^\p{L}[\p{L} .'’-]{1,59}$/u,
  correo: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
};

// Quita espacios de los extremos y colapsa espacios repetidos
const limpiar = (valor) => String(valor ?? '').trim().replace(/\s+/g, ' ');

// Valida que el texto sea un entero finito dentro del rango [min, max].
// Se exige solo dígitos para rechazar "1e3", "12.5", "-4", "NaN" o "Infinity".
function validarEntero(texto, min, max, etiqueta) {
  if (texto === '') return { error: `Ingresa el ${etiqueta}.` };
  if (!REGEX.entero.test(texto)) {
    return { error: `El ${etiqueta} debe ser un número entero, sin decimales, signos ni letras.` };
  }
  const numero = Number(texto);
  if (!Number.isFinite(numero) || !Number.isSafeInteger(numero)) {
    return { error: `El ${etiqueta} no es un número válido.` };
  }
  if (numero < min || numero > max) {
    return { error: `El ${etiqueta} debe estar entre ${formatoNumero(min)} y ${formatoNumero(max)}.` };
  }
  return { valor: numero };
}

/**
 * Valida los datos de un artículo antes de llegar al estado global.
 * Acepta strings (formulario) o números (acciones despachadas).
 * Devuelve { valido, errores, datos } donde `datos` ya viene limpio y con números reales.
 */
export function validarArticulo(valores, existentes = []) {
  const errores = {};
  const nombre = limpiar(valores.nombre);
  const marca = limpiar(valores.marca);
  const tipo = limpiar(valores.tipo);

  if (!nombre) errores.nombre = 'Ingresa el nombre del artículo.';
  else if (!REGEX.nombreProducto.test(nombre)) {
    errores.nombre = 'Usa entre 2 y 60 caracteres: letras, números y . , ( ) / % & + -';
  }

  if (!marca) errores.marca = 'Ingresa la marca.';
  else if (!REGEX.marca.test(marca)) {
    errores.marca = 'Usa entre 2 y 40 caracteres: letras, números y . & -';
  }

  if (!tipo) errores.tipo = 'Selecciona un tipo de producto.';
  else if (!REGEX.tipo.test(tipo) || !TIPOS_PRODUCTO.includes(tipo)) {
    errores.tipo = 'Selecciona un tipo de la lista.';
  }

  const precio = validarEntero(String(valores.precio ?? '').trim(), LIMITES.PRECIO_MIN, LIMITES.PRECIO_MAX, 'precio');
  if (precio.error) errores.precio = precio.error;

  const stock = validarEntero(String(valores.stock ?? '').trim(), LIMITES.STOCK_MIN, LIMITES.STOCK_MAX, 'stock');
  if (stock.error) errores.stock = stock.error;

  const duplicado =
    !errores.nombre &&
    !errores.marca &&
    existentes.some(
      (a) => a.nombre.toLowerCase() === nombre.toLowerCase() && a.marca.toLowerCase() === marca.toLowerCase()
    );
  if (duplicado) errores.nombre = 'Ya existe un artículo con ese nombre y esa marca.';

  if (Object.keys(errores).length > 0) return { valido: false, errores, datos: null };

  return {
    valido: true,
    errores: {},
    datos: { nombre, marca, tipo, precio: precio.valor, stock: stock.valor },
  };
}

export function validarContacto(valores) {
  const errores = {};
  const nombre = limpiar(valores.nombre);
  const correo = String(valores.correo ?? '').trim();
  const mensaje = String(valores.mensaje ?? '').trim();

  if (!nombre) errores.nombre = 'Ingresa tu nombre.';
  else if (!REGEX.nombrePersona.test(nombre)) errores.nombre = 'Usa solo letras, espacios, punto, apóstrofe o guion (2 a 60 caracteres).';

  if (!correo) errores.correo = 'Ingresa tu correo electrónico.';
  else if (!REGEX.correo.test(correo)) errores.correo = 'Ingresa un correo válido, por ejemplo nombre@dominio.cl';

  if (!mensaje) errores.mensaje = 'Escribe tu mensaje.';
  else if (mensaje.length < 10 || mensaje.length > 500) errores.mensaje = 'El mensaje debe tener entre 10 y 500 caracteres.';

  if (Object.keys(errores).length > 0) return { valido: false, errores, datos: null };
  return { valido: true, errores: {}, datos: { nombre, correo, mensaje } };
}
