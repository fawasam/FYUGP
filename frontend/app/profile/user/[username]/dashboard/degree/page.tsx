"use client";
import AnimationWrapper from "@/components/common/page-animation";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useRedirect from "@/hooks/useRedirect";
import { logout } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
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
// import { Courses } from "@/utils/Courses";

const Dashboard = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const { redirectTo, redirectToHomeIfLoggedIn } = useRedirect();
  let userData = useSelector((state: RootState) => state.auth);
  let { userInfo: user, userToken, isAuthenticated } = userData;

  const handleShow = () => {
    setShow(!show);
  };
  const handleLogout = () => {
    redirectTo("/");
    dispatch(logout());
  };

  // useEffect(() => {
  //   if (!user) {
  //     redirectTo("/");
  //   }
  // }, [userData, dispatch, router, user]);

  const {
    degree_info: {
      courses,
      currentCollege,
      discipline,
      pathway,
      total_course_enrolled,
      total_credits_earned,
      // academics: {
      //   academic_college,
      //   academic_pathway,
      //   academic_discipline,
      //   academic_program,
      // },
    },
  } = user;
  return (
    <>
      <AnimationWrapper className="w-full h-full  pt-[40px] sm:pt-[60px] ">
        <section className=" ">
          <div className="flex items-center  text-center justify-center space-y-6">
            <h1 className="text-3xl font-bold space-x-3">
              👋Hello {user?.username}, this is your dashboard!
            </h1>
          </div>

          {currentCollege != null ? (
            <div className=" mt-6 flex items-center text-center justify-center space-y-6  flex-col">
              <section>
                <span>
                  {pathway}-{discipline}
                </span>
                <br />
                <span>Major : </span>
              </section>
              {/* table of content  */}
              <Table className="">
                <TableCaption>
                  {`A list of course are assigned for ${pathway} in ${discipline} program.`}
                </TableCaption>
                <TableHeader className="border-foreground">
                  <TableRow className="border-foreground">
                    <TableHead>SEMESTER</TableHead>
                    <TableHead>DSC</TableHead>
                    <TableHead>AEC</TableHead>
                    <TableHead>SEC</TableHead>
                    <TableHead>MDC</TableHead>
                    <TableHead>VAC</TableHead>
                    <TableHead className="px-2">Total Courses</TableHead>
                    <TableHead className="px-2">Total Credits</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses != null && courses.length > 0 && (
                    // courses
                    //   .filter(
                    //     (course: any) =>
                    //       course.pathway === user?.degree_info?.pathway &&
                    //       course.discipline === user?.degree_info?.discipline
                    //   )
                    //   .map((data: any, key: any) => (
                    <>
                      {courses?.map((course: any, key2: any) => (
                        <TableRow key={key2}>
                          <TableCell>{course?.semester}</TableCell>
                          <TableCell>{course?.DSC}</TableCell>
                          <TableCell>{course?.AEC}</TableCell>
                          <TableCell>{course?.SEC}</TableCell>
                          <TableCell>{course?.MDC}</TableCell>
                          <TableCell>{course?.VAC}</TableCell>
                          <TableCell>{course?.courses_count}</TableCell>
                          <TableCell>{course?.credits_count}</TableCell>
                        </TableRow>
                      ))}
                    </>
                  )}
                </TableBody>
              </Table>
              <div>
                <h3>
                  EXIT WITH UG DEGREE / PROCEED TO FOURTH YEAR WITH 133 CREDITS
                  THOSE WITHOUT 133 CREDITS WILL NOT BE ELIGIBLE TO PROCEED TO
                  FOURTH YEAR
                </h3>
              </div>
              <div>
                <Link href={""}>
                  <Button onClick={handleShow}>
                    {!show ? "Proceed" : "close"}
                    <i className="ml-2 fi fi-bs-angle-double-right"></i>
                  </Button>
                </Link>
              </div>

              {/* after 6th sem  */}
              {show ? (
                <>
                  <Table className="">
                    <TableCaption>
                      {`A list of course are assigned for ${user?.degree_info?.pathway} in ${user?.degree_info?.discipline} program.`}
                    </TableCaption>
                    <TableHeader className="border-foreground">
                      <TableRow className="border-foreground">
                        <TableHead>SEMESTER</TableHead>
                        <TableHead>DSC</TableHead>
                        <TableHead>Nature of the Course</TableHead>
                        <TableHead className="px-2">Total Courses</TableHead>
                        <TableHead className="px-2">Total Credits</TableHead>
                        <TableHead className="px-2">Total Hrs/week</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courses != null &&
                        courses.length > 0 &&
                        courses
                          .filter(
                            (course: any) =>
                              course.pathway === user?.degree_info?.pathway &&
                              course.discipline ===
                                user?.degree_info?.discipline
                          )
                          .map((data: any, key: any) => (
                            <>
                              {data?.courses_after_six_sem?.map(
                                (course: any, key2: any) => (
                                  <TableRow key={key + "-" + key2}>
                                    <TableCell>{course?.semester}</TableCell>
                                    <TableCell>{course?.DSC}</TableCell>
                                    <TableCell>{course?.nature}</TableCell>
                                    <TableCell>
                                      {course?.total_courses}
                                    </TableCell>
                                    <TableCell>
                                      {course?.total_credits}
                                    </TableCell>
                                    <TableCell>
                                      {course?.total_hrs_week}
                                    </TableCell>
                                  </TableRow>
                                )
                              )}
                            </>
                          ))}
                    </TableBody>
                  </Table>
                </>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center mt-6">
              <Link href={`/profile/${user?.username}/degree`}>
                <Button>
                  Continue with step{" "}
                  <i className="ml-2 fi fi-rs-angle-right"></i>
                </Button>
              </Link>
            </div>
          )}
        </section>
      </AnimationWrapper>
    </>
  );
};

export default Dashboard;
