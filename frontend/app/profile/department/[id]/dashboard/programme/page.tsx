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
  useGetAProgramMutation,
} from "@/redux/services/collegeApi";
import Loader from "@/components/common/Loader";
import NoDataMessage from "@/components/common/Nodata";
import { formateDate } from "@/utils/formateDate";
import { icons } from "lucide-react";

const ProgramDetails = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const [department, setDepartment] = useState<any>([]);
  const { redirectTo, redirectToHomeIfLoggedIn } = useRedirect();
  let userData = useSelector((state: RootState) => state.auth);
  let { userInfo: user, userToken, isAuthenticated } = userData;
  const [getAProgram, { isLoading, isError, isSuccess }] =
    useGetAProgramMutation();

  const getAllAdvisors = async () => {
    const res: any = await getAProgram(user?.department);
    setDepartment(res?.data?.data?.program);
  };

  useEffect(() => {
    getAllAdvisors();
    if (!user) {
      redirectTo("/");
    }
  }, [user, getAProgram]);
  console.log(setDepartment);

  return (
    <AnimationWrapper className="w-full sm:mt-20 mt-0">
      <section className="">
        <div className="flex items-center justify-between text-center flex-row">
          <h1 className="max-md:hidden mb-4 text-2xl font-semibold">
            Department Details
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
            <div>
              <div className="mb-2">
                <h1 className="text-lg font-semibold border-b ">
                  Department <br />
                </h1>
              </div>
              <div className="my-4">
                <span className="my-4">{department?.Dname}</span>
              </div>
            </div>

            <div>
              <div className="mb-2">
                <h1 className="text-lg font-semibold border-b ">
                  HOD <br />
                </h1>
              </div>
              <div className="my-4">
                <span className="my-4">{department?.headOfDepartment}</span>
              </div>
            </div>
            <div>
              <div className="mb-2">
                <h1 className="text-lg font-semibold border-b ">
                  Discipline <br />
                </h1>
              </div>
              <div className="my-4">
                <span className="my-4">{department?.Discipline}</span>
              </div>
            </div>

            <div>
              <div className="mb-2">
                <h1 className="text-lg font-semibold border-b ">
                  Email <br />
                </h1>
              </div>
              <div className="my-4">
                <span className="my-4">{department?.email}</span>
              </div>
            </div>

            <div>
              <div className="mb-2">
                <h1 className="text-lg font-semibold border-b ">
                  Courses <br />
                </h1>
              </div>
              <div className="my-4">
                <span className="my-4">
                  {/* {department?.coursesOffered.map((c: any, key: any) => (
                    <div className="" key={key}>
                      <h1>{c?.category}</h1>
                    </div>
                  ))} */}
                  {department?.coursesOffered?.length}
                </span>
              </div>
            </div>
          </div>
        )}
      </section>
    </AnimationWrapper>
  );
};

export default ProgramDetails;
