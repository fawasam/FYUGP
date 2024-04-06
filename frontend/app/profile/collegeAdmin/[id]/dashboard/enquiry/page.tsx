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
  useGetACollegeMutation,
  usePublishCollegeMutation,
} from "@/redux/services/collegeApi";
import { Badge } from "@/components/ui/badge";
import NoDataMessage from "@/components/common/Nodata";
import Image from "next/image";
import Loader from "@/components/common/Loader";

const CollegeAdminEnquiry = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const [college, setCollege] = useState<any>({});
  const { redirectTo, redirectToHomeIfLoggedIn } = useRedirect();
  let userData = useSelector((state: RootState) => state.auth);
  let { userInfo: user, userToken, isAuthenticated } = userData;
  const [getACollege, { isLoading, isSuccess }] = useGetACollegeMutation();
  const [publishCollege] = usePublishCollegeMutation();

  const getCollegeData = async () => {
    const response: any = await getACollege(user.college);
    setCollege(response?.data?.data?.college);
  };
  const handlePublish = async ({ id }: any) => {
    const res: any = await publishCollege({ id });
    toast({
      title: "Successfully Changed",
    });
    getCollegeData();
  };

  useEffect(() => {
    if (!user) {
      redirectTo("/");
    }
  }, [userData, dispatch, router, user, getACollege]);
  return (
    <AnimationWrapper className="w-full sm:mt-20 mt-0">
      <h1 className="max-md:hidden mb-4 text-2xl font-semibold">Enquiry</h1>
      {isLoading ? (
        <Loader />
      ) : !isSuccess ? (
        <NoDataMessage
          message={"Enquiry Data Unavailable!"}
          icon={"fi fi-rr-search-alt"}
        />
      ) : (
        <section className="w-full  "></section>
      )}
    </AnimationWrapper>
  );
};

export default CollegeAdminEnquiry;
