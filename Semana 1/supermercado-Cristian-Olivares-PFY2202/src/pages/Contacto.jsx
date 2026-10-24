export default function Contacto() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('¡Mensaje enviado con éxito! Nos contactaremos a la brevedad.');
  };

  return (
    <div className="page-container">
      <h1>Contáctanos</h1>
      <p className="subtitle">¿Tienes consultas o sugerencias sobre el inventario?</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre Completo:</label>
          <input type="text" placeholder="Ej: Cristian Olivares" required />
        </div>

        <div className="form-group">
          <label>Correo Electrónico:</label>
          <input type="email" placeholder="correo@ejemplo.com" required />
        </div>

        <div className="form-group">
          <label>Mensaje o Consulta:</label>
          <textarea rows="4" placeholder="Escribe aquí tu consulta..." required></textarea>
        </div>

        <button type="submit" className="btn-primary">Enviar Mensaje</button>
      </form>
    </div>
  );
}