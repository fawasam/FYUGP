"use client";
import Loader from "@/components/common/Loader";
import NoDataMessage from "@/components/common/Nodata";
import AnimationWrapper from "@/components/common/page-animation";
import { Button } from "@/components/ui/button";
import {
  useDeleteEnquiryMutation,
  useGetAllEnquiryMutation,
  useReadEnquiryMutation,
} from "@/redux/services/enquiryApi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { formateDate } from "@/utils/formateDate";
import Link from "next/link";
const AdminEnquiry = () => {
  const [enquiries, setEnquiries] = useState<any>({});

  const [
    getAllEnquiry,
    { isLoading, isError, isSuccess },
  ] = useGetAllEnquiryMutation();
  const [readEnquiry] = useReadEnquiryMutation();
  const [deleteEnquiry] = useDeleteEnquiryMutation();

  const getAllEnquiries2 = async () => {
    const res: any = await getAllEnquiry("");
    setEnquiries(res?.data?.data?.enquiries);
  };
  console.log(enquiries);

  const handleReaded = async (id: any) => {
    const res = await readEnquiry({ id });
    getAllEnquiries2();
  };
  const handleDeleteAdvisor = async (id: any) => {
    const res = await deleteEnquiry({ id });
    getAllEnquiries2();
  };

  useEffect(() => {
    const getAllEnquiries = async () => {
      const res: any = await getAllEnquiry("");
      setEnquiries(res?.data?.data?.enquiries);
    };
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
                        <div className="space-x-2">
                          {enquiry?.isReaded ? (
                            <Button
                              variant={"secondary"}
                              className="text-[10px]"
                            >
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

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Link href={`mailto:${enquiry?.email}`}>
                                  <Button
                                    // variant={"destructive"}
                                    className=" text-center"
                                    size={"sm"}
                                  >
                                    <i className="fi fi-ss-paper-plane"></i>
                                  </Button>
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Replay</p>
                              </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger>
                                <Dialog>
                                  <DialogTrigger>
                                    <Button
                                      variant={"destructive"}
                                      className=" text-center"
                                      size={"sm"}
                                    >
                                      <i className="fi fi-rs-trash "></i>
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="">
                                    <DialogHeader className="mt-6">
                                      <DialogTitle className="text-2xl flex item-center justify-center flex-col text-center">
                                        <i className="fi fi-rs-trash "></i>
                                        Are you sure?
                                      </DialogTitle>
                                    </DialogHeader>
                                    <DialogDescription className="text-base text-center">
                                      {` You want to delete this Program 
                                  ${enquiry?.email}`}
                                      <div className="my-4 space-x-3">
                                        <DialogClose asChild>
                                          <Button
                                            type="button"
                                            variant="secondary"
                                          >
                                            Close
                                          </Button>
                                        </DialogClose>

                                        <Button
                                          variant={"destructive"}
                                          onClick={() =>
                                            handleDeleteAdvisor(enquiry._id)
                                          }
                                        >
                                          Confirm
                                        </Button>
                                      </div>
                                    </DialogDescription>
                                  </DialogContent>
                                </Dialog>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Delete</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
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
