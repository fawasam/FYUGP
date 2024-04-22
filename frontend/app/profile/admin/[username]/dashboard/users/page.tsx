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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  useActiveUserMutation,
  useDeleteUserMutation,
  useGetAllUsersMutation,
  useGetCountMutation,
} from "@/redux/services/userApi";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import NoDataMessage from "@/components/common/Nodata";
import LoaderPage from "@/components/common/LoaderPage";
import Loader from "@/components/common/Loader";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import InputBox from "@/components/ui/InputBox";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
const AdminUsers = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const { redirectTo, redirectToHomeIfLoggedIn } = useRedirect();
  let userData = useSelector((state: RootState) => state.auth);
  let { userInfo: user, userToken, isAuthenticated } = userData;
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  let [getAllUsers, { isLoading, isSuccess }] = useGetAllUsersMutation();

  let [deleteUser] = useDeleteUserMutation();
  let [activeUser] = useActiveUserMutation();

  const getAllUser2 = async () => {
    const response: any = await getAllUsers("");
    setAllUsers(response?.data?.data?.users);
  };

  const handleDeleteUser = async (id: any) => {
    try {
      const response = await deleteUser({ id });

      toast({
        title: "User Deleted Successfully",
      });
      console.log("User Deleted Successfully");
      getAllUser2();
    } catch (error) {
      const err: any = error;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: err?.data?.message,
      });
      console.log(err);
    }
  };

  const handleActiveUser = async (id: any) => {
    try {
      const response = await activeUser({ id });

      toast({
        title: "Changed Successfully",
      });
      console.log("Changed Successfully");
      getAllUser2();
    } catch (error) {
      const err: any = error;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: err?.data?.message,
      });
      console.log(err);
    }
  };

  const filteredUsers = allUsers.filter((user) =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  useEffect(() => {
    // if (!user) {
    //   redirectTo("/");
    // }
    const getAllUser = async () => {
      const response: any = await getAllUsers("");
      setAllUsers(response?.data?.data?.users);
    };
    getAllUser();
  }, [userData, dispatch, router, user, getAllUsers, deleteUser, activeUser]);

  return (
    <AnimationWrapper className="w-full sm:mt-20 mt-0">
      <h1 className="max-md:hidden mb-4 text-2xl font-semibold">All User</h1>
      <Input
        placeholder="Search user"
        icon={"fi-rr-user"}
        // icon2={"fi-br-paper-plane"}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {isLoading ? (
        <Loader />
      ) : !isSuccess ? (
        <NoDataMessage
          message={"User Data Unavailable!"}
          icon={"fi fi-rr-search-alt"}
        />
      ) : (
        <div className="mt-2">
          {filteredUsers?.length == 0 ? (
            <NoDataMessage
              message={"No User Data exist"}
              icon={"fi fi-rr-search-alt"}
            />
          ) : (
            <Table className="mt-10">
              <TableCaption>A list of user who are Registered.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Joined At</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="">Task</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers != null &&
                  filteredUsers?.length > 0 &&
                  filteredUsers?.map((user, key) => (
                    <TableRow key={key}>
                      <TableCell className="font-medium">
                        {user?.username}
                      </TableCell>
                      <TableCell>{user?.email}</TableCell>
                      <TableCell>{formateDate(user?.joinedAt)}</TableCell>
                      <TableCell>{user?.role}</TableCell>
                      <TableCell>
                        {user?.active ? "Activate" : "Deactivated"}
                      </TableCell>
                      <TableCell className="">
                        <div className=" space-x-1">
                          <TooltipProvider>
                            {/* view college  */}
                            <Tooltip>
                              <TooltipTrigger>
                                {" "}
                                {user?.active ? (
                                  <Button
                                    variant={"default"}
                                    className="mt-4 text-center"
                                    size={"sm"}
                                  >
                                    <i
                                      className="fi fi-rs-check"
                                      onClick={() =>
                                        handleActiveUser(user?._id)
                                      }
                                    ></i>
                                  </Button>
                                ) : (
                                  <Button
                                    variant={"default"}
                                    className="mt-4 text-center"
                                    size={"sm"}
                                  >
                                    <i
                                      className="fi fi-sr-cross-small"
                                      onClick={() =>
                                        handleActiveUser(user?._id)
                                      }
                                    ></i>
                                  </Button>
                                )}
                              </TooltipTrigger>
                              <TooltipContent>
                                {user?.active ? (
                                  <p>Deactivate User</p>
                                ) : (
                                  <p>Activate User</p>
                                )}
                              </TooltipContent>
                            </Tooltip>

                            {/* edit college */}

                            <Tooltip>
                              <TooltipTrigger>
                                <Dialog>
                                  <DialogTrigger>
                                    <Button
                                      variant={"destructive"}
                                      className="mt-4 text-center"
                                      size={"sm"}
                                    >
                                      <i className="fi fi-rs-trash "></i>
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="mt-4">
                                    <DialogHeader className="mt-6">
                                      <DialogTitle className="text-2xl flex item-center justify-center flex-col text-center">
                                        <i className="fi fi-rs-trash "></i>
                                        Are you sure?
                                      </DialogTitle>
                                    </DialogHeader>
                                    <DialogDescription className="text-base text-center">
                                      You want to delete this user
                                      {user?.username}
                                      <div className="my-4 space-x-3">
                                        <DialogClose asChild>
                                          <Button
                                            type="button"
                                            variant="secondary"
                                          >
                                            Close
                                          </Button>
                                        </DialogClose>

                                        <Button
                                          variant={"destructive"}
                                          onClick={() =>
                                            handleDeleteUser(user._id)
                                          }
                                        >
                                          Confirm
                                        </Button>
                                      </div>
                                    </DialogDescription>
                                  </DialogContent>
                                </Dialog>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Delete User</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </div>
      )}
    </AnimationWrapper>
  );
};

export default AdminUsers;
