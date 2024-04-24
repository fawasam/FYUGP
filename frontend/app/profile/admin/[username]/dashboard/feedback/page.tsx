import NoDataMessage from "@/components/common/Nodata";
import AnimationWrapper from "@/components/common/page-animation";
import React from "react";

const AdminFeedback = () => {
  return (
    <AnimationWrapper className="w-full sm:mt-20 mt-0">
      <h1 className="max-md:hidden mb-4 text-2xl font-semibold">
        All Feedbacks
      </h1>
      <NoDataMessage
        message={"Under Construction!"}
        icon={"fi fi-rr-rocket-lunch"}
      />
    </AnimationWrapper>
  );
};

export default AdminFeedback;
