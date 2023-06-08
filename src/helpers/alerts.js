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

export const confirmAlert = (callback) => {
  Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    }
  });
};
