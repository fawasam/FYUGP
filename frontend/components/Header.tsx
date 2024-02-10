"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/features/authSlice";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {}, []);
  let isAuthenticated = useSelector((state: RootState) => state.auth.userToken);

  let user = useSelector((state: RootState) => state.auth.userInfo);
  console.log(isAuthenticated, user);

  return (
    <header className="my-8 sm:w-[80%] w-[90%] m-auto pb-6 border-b">
      <div className="flex items-center justify-between ">
        <Link href={"/"}>
          <h2 className="font-light">TrackMyDegree</h2>
        </Link>
        <div className="flex space-x-2 items-center text-center">
          <div className=" hidden space-x-4 sm:flex  ">
            <Link href={"/"}>
              <p>Home</p>
            </Link>
            <Link href={"/"}>
              <p>About</p>
            </Link>
            <Link href={"/"}>
              <p className="mr-4">Contact</p>
            </Link>
          </div>
          {!isAuthenticated ? (
            <Button>
              <Link href={"/auth/register"}>
                <i className="fi fi-rr-user mr-2"></i>
                SignUp
              </Link>
            </Button>
          ) : (
            <Button>
              <Link href={`/`} onClick={() => dispatch(logout())}>
                <i className="fi fi-rr-user mr-2"></i>
                {user.fullname}
              </Link>
            </Button>
          )}
          <div className="ml-10 sm:block hidden">
            {theme === "light" ? (
              <i className="fn" onClick={() => setTheme("dark")}></i>
            ) : (
              <i
                className="fi fi-rr-sun h-6 w-6  text-xl"
                onClick={() => setTheme("light")}
              ></i>
            )}
          </div>
          <Sheet>
            <SheetTrigger className="sm:hidden">
              <i className="fi fi-br-menu-burger text-xl"></i>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
