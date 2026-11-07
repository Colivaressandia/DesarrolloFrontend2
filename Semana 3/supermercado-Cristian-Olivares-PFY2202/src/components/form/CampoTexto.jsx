// Campo de texto (o textarea) con etiqueta asociada, ayuda y mensaje de error accesibles
export default function CampoTexto({
  id,
  label,
  error,
  ayuda,
  multiline = false,
  name,
  type = 'text',
  ...props
}) {
  const Control = multiline ? 'textarea' : 'input';
  const ayudaId = `${id}-ayuda`;
  const errorId = `${id}-error`;
  const describedBy = [ayuda && ayudaId, error && errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div>
      <label htmlFor={id} className="label-field">{label}</label>
      <Control
        id={id}
        name={name ?? id}
        {...(!multiline && { type })}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        className={`input-field ${error ? 'input-error' : ''}`}
        {...props}
      />
      {ayuda && <p id={ayudaId} className="field-help">{ayuda}</p>}
      {error && <p id={errorId} role="alert" className="field-error">{error}</p>}
    </div>
  );
}
