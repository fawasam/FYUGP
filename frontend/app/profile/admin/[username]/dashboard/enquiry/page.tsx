import AnimationWrapper from "@/components/common/page-animation";
import { Button } from "@/components/ui/button";
import React from "react";

const AdminEnquiry = () => {
  return (
    <AnimationWrapper className="w-full sm:mt-20 mt-0">
      <h1 className="max-md:hidden mb-4 text-2xl font-semibold">
        All Enquiries
      </h1>
      <div className="space-y-4 mt-10">
        <div className="flex   flex-col border p-4 rounded-sm bg-background">
          <div className="flex space-x-4">
            <i className="fi fi-rr-user text-2xl  border p-2 rounded-full  font-bold"></i>
            <div className="flex justify-between flex-row w-full">
              <div>
                <h2>fawasam32@gmail.com</h2>
                <span className="text-[12px] text-accent-foreground">
                  1 Mar 2024
                </span>
              </div>
              <Button>New</Button>
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <span className="text-[16px]">Subject:</span>
            <span className="text-thin">Message:</span>
          </div>
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default AdminEnquiry;
