import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ToastWrapper() {
  const notify = (message, options = {}) => {
    toast(message, options);
  };

  return (
    <>
      <ToastContainer />
      {/* You can add more configurations here */}
    </>
  );
}

export default ToastWrapper;
