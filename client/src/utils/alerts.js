import Swal from "sweetalert2";

export const showAlertWithTimer = (titulo, mensaje, tipo) => {
  return Swal.fire({
    title: titulo,
    text: mensaje,
    icon: tipo,
    showConfirmButton: false,
    allowEscapeKey: false,
    allowOutsideClick: false,
    timer: 1700,
  });
};

export const showAlertDelete = (
  titulo,
  mensaje,
  tipo,
  mostrarBtnCancelar = false,
  mostrarBtnConfirmar = true
) => {
  return Swal.fire({
    title: titulo,
    text: mensaje,
    icon: tipo,
    showConfirmButton: mostrarBtnConfirmar,
    showCancelButton: mostrarBtnCancelar,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
    allowEscapeKey: false,
    allowOutsideClick: false,
  });
};
