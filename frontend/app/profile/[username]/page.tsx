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
import { Courses } from "@/utils/Courses";
import Image from "next/image";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Dashboard = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const { redirectTo, redirectToHomeIfLoggedIn } = useRedirect();
  let userData = useSelector((state: RootState) => state.auth);
  let { userInfo: user, userToken, isAuthenticated } = userData;

  const {
    degree_info: {
      courses,
      currentCollege,
      discipline,
      pathway,
      total_course_enrolled,
      total_credits_earned,
    },
  } = user;

  const handleShow = () => {
    setShow(!show);
  };
  const percentage = 66;
  // useEffect(() => {
  //   if (!user) {
  //     redirectTo("/");
  //   }
  // }, [userData, dispatch, router, user]);

  console.log(user?.degree_info?.pathway);

  return (
    <>
      <AnimationWrapper className="w-full h-full  pt-[40px] sm:pt-[100px]  min-h-screen">
        <section className="w-[90%] m-auto md:w-[60%] ">
          <div className="flex items-center  text-center justify-center space-y-12">
            <h1 className="text-3xl font-bold space-x-3">
              👋Hello {user?.username}, this is your dashboard!
            </h1>
          </div>

          {/* section setup  */}
          {pathway ? (
            <div>
              <div className="mt-12  grid grid-cols-1 lg:grid-cols-2">
                {/* box  one  */}
                <div className="w-[400px] h-[250px] rounded-2xl  shadow-xl relative bg-primary-foreground">
                  <div className="flex  flex-row justify-between">
                    <div>
                      <div className="  block w-28 h-28  rounded-full object-cover pt-4 pl-4 ">
                        <Image
                          src={user?.profileImage}
                          alt="image"
                          width={300}
                          height={100}
                          // fill
                          className="w-full h-full object-cover rounded-full "
                        />
                      </div>
                      <h2 className="text-lg font-medium space-x-3 ml-4 mt-2">
                        {user?.fullname}
                      </h2>
                    </div>
                    <Button
                      className="mt-4 mr-4 bg-[#D2EEEE] text-[#49959B] hover:bg-[#b8d5d5]"
                      size={"sm"}
                    >
                      <Link
                        href={`/profile/user/${user?.susername}/settings/edit-profile`}
                      >
                        <i className="fi fi-rr-pencil mr-2"></i>
                        Edit
                      </Link>
                    </Button>
                  </div>
                  <div className="flex  flex-col">
                    <div className="mt-2 grid grid-cols-2">
                      <div className="pl-4">
                        <i className="fi fi-rs-book-bookmark text-sm  "></i>
                        <span className=" text-md font-thin">
                          {" "}
                          {user?.degree_info?.currentCollege}
                        </span>
                      </div>
                      <div className="\">
                        {" "}
                        <span className="text-md font-thin">
                          <i className="fi fi-rr-home mr-2 text-sm leading-5"></i>
                          {user?.place}
                        </span>
                      </div>
                    </div>

                    <div className="pl-4 mb-4">
                      <span className=" pr-4 text-md font-thin leading-5">
                        <i className="fi fi-rr-quote-right mr-2 text-sm leading-5"></i>
                        {user?.bio}
                      </span>
                    </div>
                  </div>
                </div>
                {/* box  two  */}
                <div>
                  <div className="w-[500px] h-[80px] mb-[20px] rounded-2xl  shadow-xl relative  lg:mt-0 mt-10  bg-primary-foreground">
                    <div className="p-4 flex">
                      <div>
                        <h2 className="text-md font-thin">
                          Your Pathway :{" "}
                          <span>{user?.degree_info?.pathway}</span>
                        </h2>
                        <h2 className="text-md font-thin">
                          Your Discipline :{" "}
                          <span>{user?.degree_info?.discipline}</span>
                        </h2>
                      </div>
                      <Button
                        className=" absolute right-2  bg-[#D2EEEE] text-[#49959B] hover:bg-[#b8d5d5]"
                        size={"sm"}
                      >
                        <Link href={`/profile/${user?.username}/degree`}>
                          <i className="fi fi-rr-pencil mr-2"></i>
                          Edit
                        </Link>
                      </Button>
                    </div>
                  </div>
                  <div className="w-[500px] h-[150px] rounded-2xl shadow-xl relative bg-primary-foreground">
                    {/* <div
                      style={{ width: 80, height: 80 }}
                      className="absolute right-3 top-3"
                    >
                      <CircularProgressbar
                        value={percentage}
                        text={`${percentage}%`}
                      />
                    </div> */}
                  </div>
                </div>
              </div>
              <div className=" my-6 mt-20 flex items-center text-center justify-center space-y-6  flex-col">
                <div className="mt-6">
                  <h2 className="text-2xl font-bold ">
                    {user?.degree_info?.pathway}
                  </h2>
                  <span className="text-lg font-medium">
                    {user?.degree_info?.discipline}
                  </span>
                </div>
                {/* table of content  */}
                <Table className="">
                  <TableCaption>
                    {`A list of course are assigned for ${user?.degree_info?.pathway} in ${user?.degree_info?.discipline} program.`}
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
                      <TableHead className="px-2">Total Hrs/week</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Courses != null &&
                      Courses.length > 0 &&
                      Courses.filter(
                        (course) =>
                          course.pathway === user?.degree_info?.pathway &&
                          course.discipline === user?.degree_info?.discipline
                      ).map((data, key) => (
                        <>
                          {data?.courses?.map((course: any, key2: any) => (
                            <TableRow key={key + "-" + key2}>
                              <TableCell>{course?.semester}</TableCell>
                              <TableCell>{course?.DSC}</TableCell>
                              <TableCell>{course?.AEC}</TableCell>
                              <TableCell>{course?.SEC}</TableCell>
                              <TableCell>{course?.MDC}</TableCell>
                              <TableCell>{course?.VAC}</TableCell>
                              <TableCell>{course?.total_courses}</TableCell>
                              <TableCell>{course?.total_credits}</TableCell>
                              <TableCell>{course?.total_hrs_week}</TableCell>
                            </TableRow>
                          ))}
                        </>
                      ))}
                  </TableBody>
                </Table>
                <div>
                  <h3>
                    EXIT WITH UG DEGREE / PROCEED TO FOURTH YEAR WITH 133
                    CREDITS THOSE WITHOUT 133 CREDITS WILL NOT BE ELIGIBLE TO
                    PROCEED TO FOURTH YEAR
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
                        {Courses != null &&
                          Courses.length > 0 &&
                          Courses.filter(
                            (course) =>
                              course.pathway === user?.degree_info?.pathway &&
                              course.discipline ===
                                user?.degree_info?.discipline
                          ).map((data, key) => (
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
            </div>
          ) : (
            <div className="flex items-center justify-center mt-10">
              <Link href={`/profile/${user?.username}/degree`}>
                <Button size={"lg"} className="text-lg">
                  Continue with your Degree{" "}
                  <i className=" ml-2 fi fi-bs-angle-right"></i>
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
