import React from "react";

const NoDataMessage = ({ message, icon }: any) => {
  return (
    <div className="flex item-center justify-center text-center font-semibold w-full p-4 rounded-full bg-background mt-2">
      <i className={`${icon} mr-2 text-xl `}></i>
      <p className="text-xl">{message}</p>
    </div>
  );
};

export default NoDataMessage;
