"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { any, z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useResetPasswordMutation } from "@/redux/services/authApi";
import Loader from "@/components/common/Loader";
import { useToast } from "@/components/ui/use-toast";
import { RootState } from "@/redux/store";
import { logout, setUser } from "@/redux/features/authSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import useRedirect from "@/hooks/useRedirect";
import { usePathname } from "next/navigation";
import Dashboard from "./dashboard/page";

const User = ({ params }: { params: { username: string } }) => {
  const { redirectTo, redirectToHomeIfLoggedIn } = useRedirect();
  const router = useRouter();
  const pathname = usePathname();

  const { toast } = useToast();
  const dispatch = useDispatch();
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
  }, [user]);

  // Your logic to determine what to render based on the current route
  let content;
  switch (pathname) {
    case "/profile/user/admin/dashboard":
      content = <Dashboard />;
      break;
    // case "/dashboard/notifications":
    case "/profile/user/admin/notification":
      content = <h1>Hii2</h1>;
      break;
    case "/profile/user/admin/editor":
      content = <h1>Hii3</h1>;
      break;
    case "/profile/user/admin/settings/edit-profile":
      content = <h1>Hii3</h1>;
      break;
    case "/profile/user/admin/settings/change-password":
      content = <h1>Hii3</h1>;
      break;
    // Add more cases for other routes
    default:
      // content = <DefaultComponent />;
      content = <h1>Default</h1>;
      break;
  }

  return (
    <div className=" mt-24">
      <div className="content-outlet">{content}</div>
    </div>
  );
};

export default User;
