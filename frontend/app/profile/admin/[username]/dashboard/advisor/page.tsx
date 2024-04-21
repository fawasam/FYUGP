"use client";
import AnimationWrapper from "@/components/common/page-animation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useRedirect from "@/hooks/useRedirect";
import { logout } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { ListItem } from "@/components/Header";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  useChangeAvailabilityOfAdvisorMutation,
  useDeleteAdvisorMutation,
  useGetAdvisorMutation,
  useGetAllAdvisorByCollegeMutation,
  useGetAllAdvisorMutation,
  useGetAllCourseByProgramMutation,
  useGetAllProgramByCollegeMutation,
} from "@/redux/services/collegeApi";
import Loader from "@/components/common/Loader";
import NoDataMessage from "@/components/common/Nodata";
import { formateDate } from "@/utils/formateDate";
import { icons } from "lucide-react";

const AdvisorPage = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const [advisors, setAdvisors] = useState<any>([]);
  const { redirectTo, redirectToHomeIfLoggedIn } = useRedirect();
  let userData = useSelector((state: RootState) => state.auth);
  let { userInfo: user, userToken, isAuthenticated } = userData;
  const [
    getAllAdvisor,
    { isLoading, isError, isSuccess },
  ] = useGetAllAdvisorMutation();
  const [deleteAdvisor] = useDeleteAdvisorMutation();
  const [
    changeAvailabilityOfAdvisor,
  ] = useChangeAvailabilityOfAdvisorMutation();

  const getAllAdvisors2 = async () => {
    const res: any = await getAllAdvisor();
    setAdvisors(res?.data?.data?.advisors);
  };

  const handleDeleteAdvisor = async (id: any) => {
    try {
      const response = await deleteAdvisor({ id });

      toast({
        title: "Advisor Deleted Successfully",
      });
      console.log("Advisor Deleted Successfully");
      getAllAdvisors2();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      });
      console.log(error);
    }
  };

  const handleAvailable = async (id: any) => {
    const res: any = await changeAvailabilityOfAdvisor({ id });
    toast({
      title: "Successfully Changed",
    });
    getAllAdvisors2();
  };

  useEffect(() => {
    const getAllAdvisors = async () => {
      const res: any = await getAllAdvisor();
      setAdvisors(res?.data?.data?.advisors);
    };
    getAllAdvisors();
    // if (!user) {
    //   redirectTo("/");
    // }
  }, [user, getAllAdvisor]);
  return (
    <AnimationWrapper className="w-full sm:mt-20 mt-0">
      <section className="">
        <div className="flex items-center justify-between text-center flex-row">
          <h1 className="max-md:hidden mb-4 text-2xl font-semibold">
            All Advisor
          </h1>
        </div>
        {isLoading ? (
          <Loader />
        ) : !isSuccess ? (
          <NoDataMessage
            message={"Advisor Data Unavailable!"}
            icon={"fi fi-rr-search-alt"}
          />
        ) : (
          <div className="my-6 space-y-4">
            {advisors?.length == 0 ? (
              <NoDataMessage
                message={"No Advisors exist"}
                icon={"fi fi-rr-search-alt"}
              />
            ) : (
              <>
                <Table className="mt-10">
                  <TableCaption>List of Advisors.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>College</TableHead>
                      <TableHead>Availability</TableHead>
                      <TableHead>Joined At</TableHead>
                      <TableHead className="text-right">Task</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {advisors != null &&
                      advisors.length > 0 &&
                      advisors.map((advisor: any, key: any) => (
                        <TableRow key={key}>
                          <TableCell className="font-medium">
                            {advisor?.fullname}
                          </TableCell>
                          <TableCell>{advisor?.email}</TableCell>
                          <TableCell>{advisor?.college?.collegename}</TableCell>
                          <TableCell>
                            {advisor?.availability
                              ? "available"
                              : "unavailable"}
                          </TableCell>
                          <TableCell className="">
                            {formateDate(advisor.joinedAt)}
                          </TableCell>
                          <TableCell className="text-right ">
                            <TooltipProvider>
                              <div className="flex space-x-1">
                                <Tooltip>
                                  <TooltipTrigger>
                                    {" "}
                                    <Button
                                      variant={"secondary"}
                                      onClick={() =>
                                        handleAvailable(advisor?._id)
                                      }
                                    >
                                      {" "}
                                      {advisor?.availability ? (
                                        <i className="fi fi-rs-cross"></i>
                                      ) : (
                                        <i className="fi fi-br-check"></i>
                                      )}
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    {advisor?.availability ? (
                                      <p>UnAvailable</p>
                                    ) : (
                                      <p>Available</p>
                                    )}
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
                                  ${advisor?.fullname}`}
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
                                                handleDeleteAdvisor(advisor._id)
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
                              </div>
                            </TooltipProvider>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </>
            )}
          </div>
        )}
      </section>
    </AnimationWrapper>
  );
};

export default AdvisorPage;
