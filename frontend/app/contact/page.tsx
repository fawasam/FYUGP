import AnimationWrapper from "@/components/common/page-animation";
import Enquiry from "@/components/Enquiry";
import Enquiry2 from "@/components/Enquiry2";
import Faq from "@/components/Faq";
import React from "react";

const ContactPage = () => {
  return (
    <AnimationWrapper className="sm:w-[70%] w-[90%] m-auto min-h-[100vh]  py-[20px]">
      <section className="">
        <div className="flex items-center justify-center min-h-[240px] w-full bg-background text-center rounded-sm">
          <div className="flex items-center justify-center h-full">
            <h1 className="md:text-[48px] text-[36px] font-bold tracking-tighter text-center">
              Contact
            </h1>
          </div>
        </div>
        <Enquiry2 />
      </section>
    </AnimationWrapper>
  );
};

export default ContactPage;
