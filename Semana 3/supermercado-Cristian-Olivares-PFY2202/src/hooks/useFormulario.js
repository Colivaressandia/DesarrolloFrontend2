import { useCallback, useState } from 'react';

/**
 * Gestiona valores, errores y envío de un formulario.
 * `validar(valores)` debe devolver { valido, errores, datos }.
 */
export function useFormulario(valoresIniciales, validar) {
  const [valores, setValores] = useState(valoresIniciales);
  const [errores, setErrores] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValores((prev) => ({ ...prev, [name]: value }));
    // Al corregir un campo, su error desaparece
    setErrores((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  }, []);

  const reiniciar = useCallback(() => {
    setValores(valoresIniciales);
    setErrores({});
  }, [valoresIniciales]);

  const handleSubmit = (onValido) => (e) => {
    e.preventDefault();
    const formulario = e.currentTarget;
    const resultado = validar(valores);

    if (!resultado.valido) {
      setErrores(resultado.errores);
      // Lleva el foco al primer campo con error
      const primerCampo = Object.keys(resultado.errores)[0];
      formulario.elements[primerCampo]?.focus();
      return;
    }

    setErrores({});
    onValido(resultado.datos, reiniciar);
  };

  return { valores, errores, handleChange, handleSubmit, reiniciar };
}
