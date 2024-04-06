import React from "react";
import Loader from "./Loader";
import AnimationWrapper from "./page-animation";

const NoDataMessage = ({ message, icon }: any) => {
  return (
    <AnimationWrapper className="w-full">
      <div className="flex item-center justify-center text-center font-semibold w-full p-4 rounded-full bg-background mt-2">
        <i className={`${icon} mr-2 text-xl `}></i>
        <p className="text-xl">{message}</p>
      </div>
    </AnimationWrapper>
  );
};

export default NoDataMessage;
