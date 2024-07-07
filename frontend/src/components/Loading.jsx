import React from "react";
import RingLoader from "react-spinners/ClipLoader";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <RingLoader color="#7b7760" size={80} cssOverride={{}} />
    </div>
  );
};

export default Loading;
