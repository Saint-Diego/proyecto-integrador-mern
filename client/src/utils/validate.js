export const validateTask = (input) => {
  let error = {};

  if (!input.title) error.title = "Ingrese nombre de la tarea";
  else if (!input.description)
    error.description = "Escriba una breve descripción";
  return error;
};

export const validateLogin = (input) => {
  let errors = {};

  if (!input.username) errors.username = "Usuario es requerido";
  else if (!input.password) errors.password = "Contraseña es requerida";

  return errors;
};
