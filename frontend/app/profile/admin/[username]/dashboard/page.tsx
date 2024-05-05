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
import { useGetCountMutation } from "@/redux/services/userApi";

const AdminDashboard = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const { redirectTo, redirectToHomeIfLoggedIn } = useRedirect();
  let userData = useSelector((state: RootState) => state.auth);
  let { userInfo: user, userToken, isAuthenticated } = userData;
  const [countData, setCountData] = useState<any>({});
  let [getCount] = useGetCountMutation();
  useEffect(() => {
    const GetCountData = async () => {
      const res: any = await getCount();
      setCountData(res?.data?.data);
    };
    GetCountData();
  }, [userData, dispatch, router, user, getCount]);

  return (
    <AnimationWrapper className="w-full sm:mt-20 mt-0">
      <section className="">
        <h1 className="max-md:hidden text-3xl font-semibold">
          Welcome Back {user?.username}!
        </h1>
        <div className="mt-10">
          <div className="grid md:grid-cols-3  gap-4 text-center my-6">
            <div className="admin-tile">
              <span className="text-4xl">{countData?.users}</span>
              <br />
              <i className="fi mr-2 fi-rr-users-alt"></i>USER
            </div>
            <div className="admin-tile">
              <span className="text-4xl">{countData?.colleges}</span>
              <br />
              <i className="fi mr-2 fi-rr-graduation-cap"></i>
              COLLEGES
            </div>
            <div className="admin-tile">
              <span className="text-4xl">{countData?.enquiries}</span>
              <br />
              <i className="fi mr-2 fi-rr-comment-alt"></i>
              ENQUIRY
            </div>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default AdminDashboard;
