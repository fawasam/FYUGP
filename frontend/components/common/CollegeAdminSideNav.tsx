"use client";
import useRedirect from "@/hooks/useRedirect";
import { RootState } from "@/redux/store";
import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";

const CollegeAdminSideNav: React.FC | any = () => {
  let userData = useSelector((state: RootState) => state.auth);
  let { userInfo: user, userToken, isAuthenticated } = userData;
  const { redirectTo, redirectToHomeIfLoggedIn } = useRedirect();
  const page = usePathname()
    .split("/")
    .pop();

  const [pageState, setPageState] = useState<string | any>(
    page?.replace("-", " ")
  );
  const [showSideNav, setShowSideNav] = useState<boolean>(false);
  let activeTabLine = useRef<HTMLHRElement>(null);
  let sideBarIcon = useRef<HTMLButtonElement>(null);
  let pageStateTab = useRef<HTMLButtonElement>(null);
  const IsLinkActive = (link: string) => usePathname().includes(link);

  const changePageState = (e: any) => {
    let { offsetWidth, offsetLeft } = e.target;
    if (activeTabLine.current) {
      activeTabLine.current.style.width = offsetWidth + "px";
      activeTabLine.current.style.left = offsetLeft + "px";
    }

    if (e.target == sideBarIcon.current) {
      setShowSideNav(true);
    } else {
      setShowSideNav(false);
    }
  };

  useEffect(() => {
    setShowSideNav(false);
    pageStateTab?.current?.click();
  }, [pageState]);

  return userToken === null ? (
    redirectTo("/signin")
  ) : (
    <>
      <section>
        <div className="sticky top-[80px] z-10">
          <div className="md:hidden  py-1 border-b border-grey flex flex-nowrap overflow-x-auto">
            <button
              className="p-5 capitalize"
              ref={sideBarIcon}
              onClick={changePageState}
            >
              <i className="fi fi-rr-bars-staggered pointer-events-none"></i>
            </button>
            <button
              className="p-2 capitalize"
              ref={pageStateTab}
              onClick={changePageState}
            >
              {pageState}
            </button>
            <hr
              className="absolute bottom-0 duration-500"
              ref={activeTabLine}
            />
          </div>
          <div
            className={
              " min-w-[200px] bg-background md:h-cover h-[calc(100vh-80px-60px)] md:sticky top-24 overflow-y-auto p-6 md:pr-0  md:border-grey md:border-r absolute max-md:top-[64px]  max-md:[calc(100%+80px)] max-md:px-16 max-md:-ml-7 duration-500 no-scrollbar " +
              (!showSideNav
                ? "max-md:opacity-0 max-md:pointer-events-none "
                : "opacity-100 pointer-events-auto")
            }
          >
            <h1 className="text-xl text-dark-grey mb-3">Dashboard</h1>
            <hr className="border-grey -ml-6 mb-8 mr-6" />

            {/* dashboard */}
            <Link
              href={`/profile/${user?.role}/${user?.username}/dashboard`}
              onClick={(e: any) => setPageState(e.target.innerText)}
              className={`sidebar-link + ${
                IsLinkActive("/123") ? "active" : " "
              } `}
            >
              <i className="fi fi-rs-settings"></i>
              Dashboard
            </Link>

            {/* dashboard college */}
            {user?.role === "collegeAdmin" ? (
              <Link
                href={`/profile/${user?.role}/${user?.username}/dashboard/college`}
                onClick={(e: any) => setPageState(e.target.innerText)}
                className={`sidebar-link + ${
                  IsLinkActive("/dashboard/college") ? "active" : " "
                } `}
              >
                <i className="fi fi-rr-school"></i>
                College
              </Link>
            ) : (
              ""
            )}

            {/* dashboard program */}

            <Link
              href={`/profile/${user?.role}/${user?.username}/dashboard/programme`}
              onClick={(e: any) => setPageState(e.target.innerText)}
              className={`sidebar-link + ${
                IsLinkActive("/dashboard/programme") ? "active" : " "
              } `}
            >
              <i className="fi fi-rr-graduation-cap"></i>
              Programme
            </Link>

            {/* dashboard course */}

            <Link
              href={`/profile/${user?.role}/${user?.username}/dashboard/courses`}
              onClick={(e: any) => setPageState(e.target.innerText)}
              className={`sidebar-link + ${
                IsLinkActive("/dashboard/courses") ? "active" : " "
              } `}
            >
              <div className="relative">
                <i className="fi fi-rr-book"></i>
              </div>
              Courses
            </Link>

            {/* dashboard advisor */}

            {user?.role === "collegeAdmin" ? (
              <Link
                href={`/profile/${user?.role}/${user?.username}/dashboard/advisor`}
                onClick={(e: any) => setPageState(e.target.innerText)}
                className={`sidebar-link + ${
                  IsLinkActive("/dashboard/advisor") ? "active" : " "
                } `}
              >
                <i className="fi fi fi-sr-calendar-lines-pen"></i>
                Advisor
              </Link>
            ) : (
              ""
            )}

            {/* dashboard enquiry */}

            <Link
              href={`/profile/${user?.role}/${user?.username}/dashboard/enquiry`}
              onClick={(e: any) => setPageState(e.target.innerText)}
              className={`sidebar-link + ${
                IsLinkActive("/dashboard/enquiry") ? "active" : " "
              } `}
            >
              <div className="relative">
                <i className="fi fi-rr-comment-alt"></i>
                {/* {new_notification_available && ( */}
                <span className="bg-[#e57361] w-2 h-2 rounded-full absolute z-10 top-0 right-0 "></span>
              </div>
              {/* )} */}
              Enquiry
            </Link>

            <h1 className="text-xl text-dark-grey mb-3 mt-20">Settings</h1>
            <hr className="border-grey -ml-6 mb-8 mr-6" />

            {/* settings Edit Profile */}
            <Link
              href={`/profile/${user?.role}/${user?.username}/settings/edit-profile`}
              onClick={(e: any) => setPageState(e.target.innerText)}
              className={`sidebar-link + ${
                IsLinkActive("/edit-profile") ? "active" : " "
              } `}
            >
              <i className="fi fi-rr-user "></i>
              Edit Profile
            </Link>

            {/* settings Change Password */}
            <Link
              href={`/profile/${user?.role}/${user?.username}/settings/change-password`}
              onClick={(e: any) => setPageState(e.target.innerText)}
              className={`sidebar-link + ${
                IsLinkActive("/change-password") ? "active" : " "
              } `}
            >
              <i className="fi fi-rr-lock"></i>
              Change Password
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CollegeAdminSideNav;
