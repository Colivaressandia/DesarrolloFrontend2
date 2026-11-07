const formateadorCLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

// Único lugar donde se decide cómo se muestra el dinero: formatoCLP(1190) -> "$1.190"
export const formatoCLP = (monto) => formateadorCLP.format(monto);

export const formatoNumero = (n) => n.toLocaleString('es-CL');
