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
  useGetAllCourseByProgramMutation,
  useGetAllProgramByCollegeMutation,
} from "@/redux/services/collegeApi";
import Loader from "@/components/common/Loader";
import NoDataMessage from "@/components/common/Nodata";

const Courses = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const [courses, setCourses] = useState<any>([]);
  const { redirectTo, redirectToHomeIfLoggedIn } = useRedirect();
  let userData = useSelector((state: RootState) => state.auth);
  let { userInfo: user, userToken, isAuthenticated } = userData;

  const [
    getAllProgramByCollege,
    { isLoading, isError, isSuccess },
  ] = useGetAllProgramByCollegeMutation();
  const handleOpenDialog = () => {};

  useEffect(() => {
    const getAllCoursesByProgram = async () => {
      const res: any = await getAllProgramByCollege({ id: user?.college });
      setCourses(res?.data?.data?.programs);
    };
    getAllCoursesByProgram();
    // if (!user) {
    //   redirectTo("/");
    // }
  }, [user, getAllProgramByCollege]);
  return (
    <AnimationWrapper className="w-full sm:mt-20 mt-0">
      <section className="">
        <h1 className="max-md:hidden mb-4 text-2xl font-semibold">
          All Courses
        </h1>
        {isLoading ? (
          <Loader />
        ) : !isSuccess ? (
          <NoDataMessage
            message={"Course Data Unavailable!"}
            icon={"fi fi-rr-search-alt"}
          />
        ) : (
          <div className="my-6 space-y-4">
            {courses.length == 0 ? (
              <NoDataMessage
                message={"No Course Data exist"}
                icon={"fi fi-rr-search-alt"}
              />
            ) : (
              <>
                {courses.length > 0 &&
                  courses?.map((c: any, key: any) => (
                    <Link
                      href={`/profile/collegeAdmin/${user.username}/dashboard/courses/${c._id}`}
                      key={key}
                      className="flex"
                    >
                      <Button
                        className="mr-2 bg-background"
                        variant={"secondary"}
                      >
                        {c?.Dname}
                      </Button>
                    </Link>
                  ))}
              </>
            )}
          </div>
        )}
      </section>
    </AnimationWrapper>
  );
};

export default Courses;
