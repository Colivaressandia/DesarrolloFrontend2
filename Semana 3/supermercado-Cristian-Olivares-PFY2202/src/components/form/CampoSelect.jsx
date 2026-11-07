// Lista desplegable con etiqueta asociada y mensaje de error accesible
export default function CampoSelect({ id, label, opciones, placeholder, error, name, ...props }) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="label-field">{label}</label>
      <select
        id={id}
        name={name ?? id}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`input-field ${error ? 'input-error' : ''}`}
        {...props}
      >
        <option value="">{placeholder}</option>
        {opciones.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      {error && <p id={errorId} role="alert" className="field-error">{error}</p>}
    </div>
  );
}
