function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

if (!validarEmail(correo)) {
  alert("Por favor, introduce un correo válido.");
  return;
}
if (telefono.length < 10) {
  alert("El teléfono debe tener al menos 10 dígitos.");
  return;
}
const fechaEvento = new Date(fecha);
const fechaActual = new Date();

if (fechaEvento < fechaActual) {
  alert("La fecha del evento debe ser posterior a hoy.");
  return;
}
