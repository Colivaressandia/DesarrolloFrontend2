import { useState } from 'react';
import { useFormulario } from '../hooks/useFormulario';
import { usePageTitle } from '../hooks/usePageTitle';
import { validarContacto } from '../utils/validadores';
import PageHeader from '../components/PageHeader';
import CampoTexto from '../components/form/CampoTexto';

const FORM_VACIO = { nombre: '', correo: '', mensaje: '' };

export default function Contacto() {
  usePageTitle('Contáctanos');
  const [enviado, setEnviado] = useState(false);
  const { valores, errores, handleChange, handleSubmit } = useFormulario(FORM_VACIO, validarContacto);

  // Formulario demostrativo: no se envía ni se guarda nada
  const onValido = (_datos, reiniciar) => {
    reiniciar();
    setEnviado(true);
  };

  return (
    <div className="mx-auto max-w-xl">
      <PageHeader titulo="Contáctanos" subtitulo="¿Tienes consultas o sugerencias sobre el inventario?" />

      <p className="alert alert-warning">
        <strong>Formulario demostrativo:</strong> el mensaje no se envía ni se almacena en ningún lugar.
      </p>

      <form onSubmit={handleSubmit(onValido)} noValidate className="card mt-4 flex flex-col gap-4">
        <CampoTexto
          id="nombre" label="Nombre completo" placeholder="Ej: Cristian Olivares" autoComplete="name"
          value={valores.nombre} onChange={handleChange} error={errores.nombre} maxLength={60}
        />
        <CampoTexto
          id="correo" label="Correo electrónico" type="email" placeholder="correo@ejemplo.com" autoComplete="email"
          value={valores.correo} onChange={handleChange} error={errores.correo}
        />
        <CampoTexto
          id="mensaje" label="Mensaje o consulta" multiline rows={4} placeholder="Escribe aquí tu consulta..."
          value={valores.mensaje} onChange={handleChange} error={errores.mensaje} maxLength={500}
          ayuda="Entre 10 y 500 caracteres."
        />
        <button type="submit" className="btn-primary">Enviar mensaje</button>

        {enviado && (
          <p role="status" className="alert alert-success">
            Simulación completada: en una versión real, tu mensaje habría sido enviado.
          </p>
        )}
      </form>
    </div>
  );
}
