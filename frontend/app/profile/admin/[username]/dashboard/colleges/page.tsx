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
import { useGetAllCollegeMutation } from "@/redux/services/collegeApi";
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
const AdminColleges = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const { redirectTo, redirectToHomeIfLoggedIn } = useRedirect();
  let userData = useSelector((state: RootState) => state.auth);
  let { userInfo: user, userToken, isAuthenticated } = userData;
  const [getAllCollege, { isLoading, error, isSuccess }] =
    useGetAllCollegeMutation();
  const [allColleges, setAllColleges] = useState<any[]>([]);

  let collegesData = useSelector((state: RootState) => state.college);
  let { collegeInfo: colleges, collegeInfo, items } = collegesData;

  const getAllColleges = async () => {
    const response: any = await getAllCollege("");
    dispatch(setCollege(response?.data));
    setAllColleges(response?.data?.data?.colleges);
  };
  const goBack = () => {
    router.back();
  };
  useEffect(() => {
    if (!user) {
      redirectTo("/");
    }
    getAllColleges();
  }, [userData, dispatch, router]);
  return (
    <AnimationWrapper>
      <div className="flex items-center justify-between text-center flex-row">
        <h1 className="max-md:hidden mb-4">All Colleges</h1>
        <Button>
          <Link href={`/profile/admin/${user.username}/dashboard/colleges/new`}>
            {" "}
            <i className="fi fi-rr-plus mr-2"></i>New
          </Link>
        </Button>
      </div>
      <Table className="mt-10">
        <TableCaption>A list of colleges.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">College name</TableHead>
            <TableHead>Place</TableHead>
            <TableHead>Joined At</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Task</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allColleges != null &&
            allColleges.length > 0 &&
            allColleges.map((college, key) => (
              <TableRow key={key}>
                <TableCell className="font-medium">
                  <div className="flex flex-col ">
                    <img
                      src={college.picture}
                      className="w-10 h-10 mb-2"
                      alt={"image"}
                    />
                    <span>{college?.collegename}</span>
                  </div>
                </TableCell>
                <TableCell>{college?.place}</TableCell>
                <TableCell>{formateDate(college.joinedAt)}</TableCell>
                <TableCell>{college.email}</TableCell>
                <div className="text-center flex item-center">
                  <Link
                    href={`/profile/admin/mynamefawas/dashboard/colleges/${college._id}/update`}
                  >
                    <Button
                      variant={"outline"}
                      className="mt-4 text-center"
                      size={"sm"}
                    >
                      <TableCell className="text-right">
                        <i className="fi fi-rs-edit mr-2"></i>
                        Update
                      </TableCell>
                    </Button>
                  </Link>
                </div>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AnimationWrapper>
  );
};

export default AdminColleges;
