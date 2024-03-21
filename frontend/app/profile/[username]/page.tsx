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
      <AnimationWrapper className="w-full h-screen bg-accent pt-[40px] sm:pt-[100px] ">
        <section className="w-[90%] m-auto md:w-[60%] ">
          <div className="flex items-center  text-center justify-center space-y-12">
            <h1 className="text-3xl font-bold space-x-3">
              👋Hello {user?.username}, this is your dashboard!
            </h1>
          </div>

          <div className="mt-12  grid grid-cols-1 lg:grid-cols-2">
            <div className="w-[400px] h-[250px] rounded-2xl bg-white shadow-xl relative">
              <div className="flex  flex-row justify-between">
                <div>
                  <div className="  block w-28 h-28  rounded-full overflow-hidden pt-4 pl-4 ">
                    <img
                      src={user?.profileImage}
                      alt="image"
                      className="w-full h-full object-cover"
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
                  <i className="fi fi-rr-pencil mr-2"></i>
                  Edit Your Profile
                </Button>
              </div>
              <div className="mt-2 grid grid-cols-3">
                <div className="pl-4">
                  <i className="fi fi-rr-home mr-2 text-sm"></i>
                  {user?.username}
                </div>
                <div className="pl-4">
                  {" "}
                  <i className="fi fi-rr-home mr-2 text-sm"></i>
                  {user?.username}
                </div>
              </div>
              <div className="pl-4">
                {" "}
                <i className="fi fi-rr-home mr-2 text-sm"></i>
                {user?.username}
              </div>
            </div>
            <div>
              <div className="w-[400px] h-[80px] mb-[20px] rounded-2xl bg-white shadow-xl relative mt-10 lg:mt-0"></div>
              <div className="w-[400px] h-[150px] rounded-2xl bg-white shadow-xl relative"></div>
            </div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default Dashboard;
