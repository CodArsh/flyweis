import React from "react";
import Lottie from "lottie-react";
import Loader from "../../assets/loader.json";
const LoaderAnimation = () => {
  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Lottie animationData={Loader} style={{ height: 200 }} />
    </div>
  );
};

export default LoaderAnimation;
