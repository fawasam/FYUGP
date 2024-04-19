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
  const components: {
    title: string;
    href: string;
    icon: string;
    bgColor: string;
  }[] = [
    {
      title: "All Users",
      href: `/profile/${user?.role}/${user?.username}/dashboard/users`,
      icon: "fi fi-rr-user",
      bgColor: "#DAE9F0",
    },
    {
      title: "All Colleges",
      href: `/profile/${user?.role}/${user?.username}/dashboard/colleges`,
      icon: "fi fi-rr-school",
      bgColor: "#FFD3C6",
    },
    {
      title: "All Advisors",
      href: `/profile/${user?.role}/${user?.username}/dashboard/advisor`,
      icon: "fi fi-sr-calendar-lines-pen",
      bgColor: "#FFD3C6",
    },
    {
      title: "Enquiry",
      href: `/profile/${user?.role}/${user?.username}/dashboard/enquiry`,
      icon: "fi fi-rr-comment-alt",
      bgColor: "#FFD3C6",
    },
    {
      title: "FeedBack",
      href: `/profile/${user?.role}/${user?.username}/dashboard/feedback`,
      icon: "fi fi-rr-user",
      bgColor: "#FFD3C6",
    },
  ];

  useEffect(() => {
    const GetCountData = async () => {
      const res: any = await getCount();
      setCountData(res?.data?.data);
    };
    GetCountData();

    if (!user) {
      redirectTo("/");
    }
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

          {/* <ul className=" mt-12 grid w-full gap-3 pl-0 p-4  lg:grid-cols-3 md:grid-cols-2 ">
            {components &&
              components.map((component) => (
                <li key={component.title}>
                  <Link
                    href={component.href}
                    className={`items-center py-4 justify-center select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors bg-background  hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground flex ${
                      component.bgColor
                        ? `bg-[${component.bgColor}]`
                        : "bg-background "
                    }`}
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
          </ul> */}
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default AdminDashboard;
