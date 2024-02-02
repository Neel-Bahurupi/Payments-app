import React from "react";
import { ToastContainer, toast } from "react-toastify";

export function Toast({ children }) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}

export function showToast(message, success = false) {
  const options = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  if (success) {
    return toast.success(message, options);
  }
  return toast.error(message, options);
}
