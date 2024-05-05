import AnimationWrapper from "@/components/common/page-animation";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <AnimationWrapper className="sm:w-[70%] w-[90%] m-auto min-h-[100vh]  py-[20px]">
      <div className="flex items-center justify-center mt-[200px] flex-col space-y-2">
        <h1 className="text-5xl font-bold">404</h1>
        <h1 className="text-5xl font-thin">Page Not Found!</h1>
        <span>
          <i className="mr-2 fi fi-rr-angle-right"></i>
          <Link href={"/"} className="underline">
            Back Home
          </Link>
        </span>
      </div>
    </AnimationWrapper>
  );
};

export default NotFound;
