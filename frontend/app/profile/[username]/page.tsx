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
import Link from "next/link";

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
      <AnimationWrapper className="w-full h-full bg-accent pt-[40px] sm:pt-[100px] ">
        <section className="w-[90%] m-auto md:w-[60%] ">
          <div className="flex items-center  text-center justify-center space-y-12">
            <h1 className="text-3xl font-bold space-x-3">
              👋Hello {user?.username}, this is your dashboard!
            </h1>
          </div>

          <div className="mt-12  grid grid-cols-1 lg:grid-cols-2">
            <div className="w-[400px] h-[250px] rounded-2xl  shadow-xl relative bg-primary-foreground">
              <div className="flex  flex-row justify-between">
                <div>
                  <div className="  block w-28 h-28  rounded-full object-cover pt-4 pl-4 ">
                    <img
                      src={user?.profileImage}
                      alt="image"
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
                  <Link href={"/profile/user/fawasam32/settings/edit-profile"}>
                    <i className="fi fi-rr-pencil mr-2"></i>
                    Edit Your Profile
                  </Link>
                </Button>
              </div>
              <div className="flex  flex-col">
                <div className="mt-2 grid grid-cols-2">
                  <div className="pl-4">
                    <i className="fi fi-rs-book-bookmark text-sm mr-2 "></i>
                    <span className="text-sm">
                      {" "}
                      {user?.degree_info?.currentCollege}
                    </span>
                  </div>
                  <div className="\">
                    {" "}
                    <span className="text-sm">
                      <i className="fi fi-rr-home mr-2 text-sm leading-5"></i>
                      {user?.place}
                    </span>
                  </div>
                </div>

                <div className="pl-4 mb-4">
                  <span className=" pr-4 text-sm leading-5">
                    Bio : {user?.bio}
                  </span>
                </div>
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
