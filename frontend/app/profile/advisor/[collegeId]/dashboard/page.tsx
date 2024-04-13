"use client";
import AnimationWrapper from "@/components/common/page-animation";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useRedirect from "@/hooks/useRedirect";
import { logout } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { ListItem } from "@/components/Header";
import Link from "next/link";

const AdvisorDashboard = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const { redirectTo, redirectToHomeIfLoggedIn } = useRedirect();
  let userData = useSelector((state: RootState) => state.auth);
  let { userInfo: user, userToken, isAuthenticated } = userData;

  const components: {
    title: string;
    href: string;
    icon: string;
    bgColor: string;
  }[] = [
    {
      title: "Enquiry",
      href: `/profile/${user.role}/${user?.username}/dashboard/enquiry`,
      icon: "fi fi-rr-comment-alt",
      bgColor: "#FFD3C6",
    },
    {
      title: "FeedBack",
      href: `/profile/${user.role}/${user?.username}/dashboard/feedback`,
      icon: "fi fi-rr-user",
      bgColor: "#FFD3C6",
    },
  ];

  useEffect(() => {
    if (!user) {
      redirectTo("/");
    }
  }, [userData, dispatch, router, user, redirectTo]);

  return (
    <AnimationWrapper className="w-full sm:mt-20 mt-0">
      <section className="">
        <h1 className="max-md:hidden text-2xl font-semibold">
          Advisor Dashboard
        </h1>
        <div className="">
          <ul className=" mt-12 grid w-[400px] gap-3 p-4 md:w-[500px] lg:grid-cols-4 md:grid-cols-2 lg:w-[900px] ">
            {components &&
              components.map((component) => (
                <li key={component.title}>
                  <Link
                    href={component.href}
                    className={`items-center py-4 justify-center select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors bg-background  hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground flex `}
                  >
                    <span className="w-10 h-10 rounded-full text-center  flex item-center justify-center">
                      <i
                        className={component.icon + " text-xl mt-2 font-bold"}
                      ></i>
                    </span>
                    <div className="ml-2 text-lg  font-medium leading-none">
                      {component.title}
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default AdvisorDashboard;
