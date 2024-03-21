"use client";
import AnimationWrapper from "@/components/common/page-animation";
import React, { useEffect } from "react";
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

const Dashboard = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const { redirectTo, redirectToHomeIfLoggedIn } = useRedirect();
  let userData = useSelector((state: RootState) => state.auth);
  let { userInfo: user, userToken, isAuthenticated } = userData;

  const handleLogout = () => {
    redirectTo("/");
    dispatch(logout());
  };

  useEffect(() => {
    if (!user) {
      redirectTo("/");
    }
  }, [userData, dispatch, router]);

  return (
    <>
      <AnimationWrapper className="w-full">
        <section>
          <div className="flex items-center  text-center justify-center space-y-12">
            <h1 className="text-3xl font-bold space-x-3">
              👋Hello {user?.username}, this is your dashboard!
            </h1>
          </div>

          <div className="mt-12 ">
            <div className="w-[400px] h-[250px] rounded-xl bg-slate-50 shadow-xl relative">
              <div className="flex  flex-row justify-between">
                <div>
                  <div className="  block w-28 h-28  rounded-full overflow-hidden pt-4 pl-4 ">
                    <img
                      src={user?.profileImage}
                      alt="image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-md font-light space-x-3 ml-4 mt-2">
                    {user?.fullname}
                  </h2>
                </div>
                <Button
                  className="mt-4 mr-4 bg-[#D2EEEE] text-[#49959B] hover:bg-[#b8d5d5]"
                  size={"sm"}
                >
                  <i className="fi fi-rr-pencil mr-2"></i>
                  Edit Profile
                </Button>
              </div>

              <div></div>
            </div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default Dashboard;
