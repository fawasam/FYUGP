import AnimationWrapper from "@/components/common/page-animation";
import React from "react";

const page = () => {
  return (
    <main className=" mt-24">
      <AnimationWrapper className="sm:w-[80%] w-[90%] m-auto">
        <div className="flex flex-col  sm:flex-row justify-between h-1/2 m-auto w-full">
          <h1 className="text-lg">What is FourthYear UndergraduatedDegree ?</h1>
        </div>
      </AnimationWrapper>
    </main>
  );
};

export default page;
