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
import Loader from "@/components/common/Loader";
import { useToast } from "@/components/ui/use-toast";
import { RootState } from "@/redux/store";
import { logout, setUser } from "@/redux/features/authSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import useRedirect from "@/hooks/useRedirect";
import { usePathname } from "next/navigation";
import AdminDashboard from "./dashboard/page";
import EditProfile from "./settings/edit-profile/page";
import AdminUsers from "./dashboard/users/page";

const AdminPage = ({ params }: { params: { username: string } }) => {
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
  }, [userData, dispatch, router]);

  let content;
  switch (pathname) {
    case `/profile/admin/${user.username}/dashboard`:
      content = <AdminDashboard />;
      break;
    // case "/dashboard/notifications":
    case `/profile/admin/${user.username}/dashboard/users`:
      content = <AdminUsers />;
      break;
    case "/profile/admin/editor":
      content = <h1>Hii3</h1>;
      break;
    case "/profile/admin/settings/edit-profile":
      content = <EditProfile />;
      break;
    case "/profile/admin/settings/change-password":
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

export default AdminPage;
