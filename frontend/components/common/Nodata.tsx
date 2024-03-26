import React from "react";

const NoDataMessage = ({ message }: any) => {
  return (
    <div className="text-center font-semibold w-full p-4 rounded-full  bg-accent mt-2">
      <p>{message}</p>
    </div>
  );
};

export default NoDataMessage;
