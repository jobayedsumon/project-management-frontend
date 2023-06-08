import Swal from "sweetalert2";

export const successAlert = (text) => {
  Swal.fire({
    icon: "success",
    title: "Success",
    text,
  });
};

export const errorAlert = (text) => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text,
  });
};
