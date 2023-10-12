export const validateTask = (input) => {
  let error = {};

  if (!input.title) error.title = "Ingrese nombre de la tarea";
  else if (!input.description) error.description = "Escriba una breve descripción";
  return error;
}