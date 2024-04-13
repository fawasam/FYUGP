"use client";
import Loader from "@/components/common/Loader";
import NoDataMessage from "@/components/common/Nodata";
import AnimationWrapper from "@/components/common/page-animation";
import { Button } from "@/components/ui/button";
import {
  useGetAllEnquiryMutation,
  useReadEnquiryMutation,
} from "@/redux/services/enquiryApi";
import React, { useEffect, useState } from "react";
import { formateDate } from "@/utils/formateDate";
const AdminEnquiry = () => {
  const [enquiries, setEnquiries] = useState<any>({});

  const [getAllEnquiry, { isLoading, isError, isSuccess }] =
    useGetAllEnquiryMutation();
  const [readEnquiry] = useReadEnquiryMutation();

  const getAllEnquiries = async () => {
    const res: any = await getAllEnquiry("");
    setEnquiries(res?.data?.data?.enquiries);
  };
  console.log(enquiries);

  const handleReaded = async (id: any) => {
    const res = await readEnquiry({ id });
    getAllEnquiries();
  };

  useEffect(() => {
    getAllEnquiries();
  }, [getAllEnquiry]);

  return (
    <AnimationWrapper className="w-full sm:mt-20 mt-0">
      <h1 className="max-md:hidden mb-4 text-2xl font-semibold">
        All Enquiries
      </h1>
      {isLoading ? (
        <Loader />
      ) : !isSuccess ? (
        <NoDataMessage
          message={"Enquiry Data Unavailable!"}
          icon={"fi fi-rr-search-alt"}
        />
      ) : (
        <div className="space-y-4 mt-10">
          {enquiries?.length == 0 ? (
            <NoDataMessage
              message={"No Advisors exist"}
              icon={"fi fi-rr-search-alt"}
            />
          ) : (
            <>
              {enquiries != null &&
                enquiries.length > 0 &&
                enquiries.map((enquiry: any, key: any) => (
                  <div
                    key={key}
                    className="flex   flex-col border p-4 rounded-sm bg-background"
                  >
                    <div className="flex space-x-4">
                      <i className="fi fi-rr-user text-2xl  border p-2 rounded-full  font-bold"></i>
                      <div className="flex justify-between flex-row w-full">
                        <div>
                          <h2>{enquiry?.email}</h2>
                          <span className="text-[12px] text-accent-foreground">
                            {formateDate(enquiry?.createdAt)}
                          </span>
                        </div>
                        {enquiry?.isReaded ? (
                          <Button variant={"secondary"} className="text-[10px]">
                            Readed
                          </Button>
                        ) : (
                          <Button
                            variant={"destructive"}
                            className="text-[10px] "
                            onClick={() => handleReaded(enquiry?._id)}
                          >
                            UnReaded
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col mt-2">
                      <span className="text-[16px]">
                        Subject :
                        <span className="font-light ml-1">
                          {enquiry?.subject}
                        </span>
                      </span>
                      <span className="text-thin">
                        Message :
                        <span className="font-light ml-1">
                          {enquiry?.message}
                        </span>
                      </span>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      )}
    </AnimationWrapper>
  );
};

export default AdminEnquiry;
