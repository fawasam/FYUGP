import AnimationWrapper from "@/components/common/page-animation";
import Enquiry from "@/components/Enquiry";
import Faq from "@/components/Faq";
import React from "react";

const page = () => {
  return (
    <AnimationWrapper className="sm:w-[70%] w-[90%] m-auto min-h-[100vh]">
      <section className="">
        <Enquiry />
      </section>
    </AnimationWrapper>
  );
};

export default page;
