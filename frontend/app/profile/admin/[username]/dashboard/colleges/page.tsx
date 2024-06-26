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
  useGetAllCollegeMutation,
  usePublishCollegeMutation,
} from "@/redux/services/collegeApi";
import { setCollege } from "@/redux/features/collegeSlice";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formateDate } from "@/utils/formateDate";
import NoDataMessage from "@/components/common/Nodata";
import Loader from "@/components/common/Loader";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { Input } from "@/components/ui/input";

const AdminColleges = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const { redirectTo, redirectToHomeIfLoggedIn } = useRedirect();
  let userData = useSelector((state: RootState) => state.auth);
  let { userInfo: user, userToken, isAuthenticated } = userData;
  const [getAllCollege, { isLoading, isSuccess }] = useGetAllCollegeMutation();

  const [publishCollege] = usePublishCollegeMutation();
  const [allColleges, setAllColleges] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  let collegesData = useSelector((state: RootState) => state.college);
  let { collegeInfo: colleges, collegeInfo, items } = collegesData;

  const goBack = () => {
    router.back();
  };

  const handlePublish = async ({ id }: any) => {
    const res: any = await publishCollege({ id });
    toast({
      title: "Successfully Changed",
    });
    getAllColleges2();
  };

  const getAllColleges2 = async () => {
    const response: any = await getAllCollege("");
    dispatch(setCollege(response?.data));
    setAllColleges(response?.data?.data?.colleges);
  };
  useEffect(() => {
    // if (!user) {
    //   redirectTo("/");
    // }
    const getAllColleges = async () => {
      const response: any = await getAllCollege("");
      dispatch(setCollege(response?.data));
      setAllColleges(response?.data?.data?.colleges);
    };
    getAllColleges();
  }, [userData, dispatch, router, user, getAllCollege]);
  console.log(allColleges);

  const filteredColleges = allColleges.filter((college) =>
    college.collegename.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <AnimationWrapper className="w-full sm:mt-20 mt-0">
      <div className="mb-4 flex items-center justify-between text-center flex-row">
        <h1 className="max-md:hidden mb-4 text-2xl font-semibold">
          All Colleges
        </h1>

        <Button>
          <Link
            href={`/profile/admin/${user?.username}/dashboard/colleges/new`}
          >
            {" "}
            <i className="fi fi-rr-plus mr-2"></i>New College
          </Link>
        </Button>
      </div>
      <Input
        // className="mt-4"
        placeholder="Search college"
        icon={"fi-rr-graduation-cap"}
        // icon2={"fi-br-paper-plane"}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {isLoading ? (
        <Loader />
      ) : !isSuccess ? (
        <NoDataMessage
          message={"Enquiry Data Unavailable!"}
          icon={"fi fi-rr-search-alt"}
        />
      ) : (
        <div className="mt-6">
          {filteredColleges?.length == 0 ? (
            <NoDataMessage
              message={"No College Data exist"}
              icon={"fi fi-rr-search-alt"}
            />
          ) : (
            <div className="my-6 ">
              <Table className="mt-10">
                <TableCaption>A list of colleges.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">College name</TableHead>
                    <TableHead>Place</TableHead>
                    <TableHead>Joined At</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Published</TableHead>
                    <TableHead className="text-center">Task</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredColleges != null &&
                    filteredColleges?.length > 0 &&
                    filteredColleges?.map((college, key) => (
                      <TableRow key={key}>
                        <TableCell className="font-medium">
                          <div className="flex flex-col ">
                            <Image
                              src={college?.picture}
                              className="w-20 object-cover rounded-sm h-10 mb-2"
                              alt={"image"}
                              width={100}
                              height={100}
                            />
                            <span>{college?.collegename}</span>
                          </div>
                        </TableCell>
                        <TableCell>{college?.place}</TableCell>
                        <TableCell>{formateDate(college?.joinedAt)}</TableCell>
                        <TableCell>{college?.email}</TableCell>
                        <TableCell>
                          {college?.published ? "Published" : "UnPublished"}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="block space-x-1">
                            <TooltipProvider>
                              {/* publish button  */}
                              <Tooltip>
                                <TooltipTrigger>
                                  <Button
                                    variant={"link"}
                                    className="mt-4 text-center"
                                    size={"sm"}
                                    onClick={() =>
                                      handlePublish({
                                        id: college._id,
                                      })
                                    }
                                  >
                                    <i className="fi fi-rr-paper-plane "></i>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>
                                    {college?.published
                                      ? "unPublish"
                                      : "Publish"}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                              {/* view college  */}

                              <Tooltip>
                                <TooltipTrigger>
                                  {" "}
                                  <Link href={`/college/${college._id}`}>
                                    <Button
                                      variant={"outline"}
                                      className="mt-4 text-center"
                                      size={"sm"}
                                    >
                                      <i className="fi fi-rs-eye "></i>
                                    </Button>
                                  </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>View College</p>
                                </TooltipContent>
                              </Tooltip>

                              {/* edit college */}

                              <Tooltip>
                                <TooltipTrigger>
                                  <Link
                                    href={`/profile/admin/mynamefawas/dashboard/colleges/${college._id}/update`}
                                  >
                                    <Button
                                      variant={"default"}
                                      className="mt-4 text-center"
                                      size={"sm"}
                                    >
                                      <i className="fi fi-rs-edit 2"></i>
                                    </Button>
                                  </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Edit College</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      )}
    </AnimationWrapper>
  );
};

export default AdminColleges;
