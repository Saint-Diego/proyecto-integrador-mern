export const validateTask = (input) => {
  let error = {};

  if (!input.nombre) error.nombre = "Ingrese nombre de la tarea";
  else if (!input.descripcion) error.descripcion = "Escriba una breve descripción";
  return error;
}