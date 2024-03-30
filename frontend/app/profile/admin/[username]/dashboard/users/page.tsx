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
import { formateDate } from "@/utils/formateDate";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllUsersMutation } from "@/redux/services/userApi";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

const AdminUsers = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const { redirectTo, redirectToHomeIfLoggedIn } = useRedirect();
  let userData = useSelector((state: RootState) => state.auth);
  let { userInfo: user, userToken, isAuthenticated } = userData;
  const [allUsers, setAllUsers] = useState<any[]>([]);

  let [getAllUsers] = useGetAllUsersMutation();

  const getAllUser = async () => {
    const response: any = await getAllUsers("");
    setAllUsers(response?.data?.data?.users);
  };

  useEffect(() => {
    if (!user) {
      redirectTo("/");
    }
    getAllUser();
  }, [userData, dispatch, router, user, redirectTo]);
  return (
    <AnimationWrapper className="w-full sm:mt-20 mt-0">
      <h1 className="max-md:hidden mb-4 text-2xl font-semibold">All User</h1>
      <Table className="mt-10">
        <TableCaption>A list of user who are Registered.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Joined At</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Task</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allUsers != null &&
            allUsers.length > 0 &&
            allUsers.map((user, key) => (
              <TableRow key={key}>
                <TableCell className="font-medium">{user?.username}</TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell>{formateDate(user?.joinedAt)}</TableCell>
                <TableCell>{user?.role}</TableCell>
                <TableCell>{user?.active ? "Active" : "Deactivated"}</TableCell>
                <TableCell className="text-right">
                  <Menubar>
                    <MenubarMenu>
                      <MenubarTrigger className="text-center ml-0">
                        {" "}
                        <i className="fi fi-rr-menu-dots-vertical"></i>
                      </MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem>Deativate</MenubarItem>
                        <MenubarItem>Delete</MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AnimationWrapper>
  );
};

export default AdminUsers;
