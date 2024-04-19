"use client";
import AnimationWrapper from "@/components/common/page-animation";
import React from "react";

import CollegeAdminSideNav from "@/components/common/CollegeAdminSideNav";
import AdvisorSideNav from "@/components/common/AdvisorSideNav";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <AnimationWrapper className="sm:w-[80%] w-[90%] m-auto">
        <div className="relative flex gap-10 py-0 m-0 max-md:flex-col">
          <AdvisorSideNav />
          <>{children}</>
        </div>
      </AnimationWrapper>
    </div>
  );
};

export default layout;
