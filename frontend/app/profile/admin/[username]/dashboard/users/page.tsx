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

const AdminUsers = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const { redirectTo, redirectToHomeIfLoggedIn } = useRedirect();
  let userData = useSelector((state: RootState) => state.auth);
  let { userInfo: user, userToken, isAuthenticated } = userData;
  const [allUsers, setAllUsers] = useState<any[]>([]);

  let [getAllUsers, { isLoading, isSuccess }] = useGetAllUsersMutation();
  let [deleteUser] = useDeleteUserMutation();
  let [activeUser] = useActiveUserMutation();

  const getAllUser = async () => {
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
      getAllUser();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.data.message,
      });
      console.log(error.data.message);
    }
  };

  const handleActiveUser = async (id: any) => {
    try {
      const response = await activeUser({ id });

      toast({
        title: "Changed Successfully",
      });
      console.log("Changed Successfully");
      getAllUser();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.data.message,
      });
      console.log(error.data.message);
    }
  };
  useEffect(() => {
    if (!user) {
      redirectTo("/");
    }
    getAllUser();
  }, [userData, dispatch, router, user, getAllUsers, deleteUser, activeUser]);

  return (
    <AnimationWrapper className="w-full sm:mt-20 mt-0">
      <h1 className="max-md:hidden mb-4 text-2xl font-semibold">All User</h1>
      {isLoading ? (
        <Loader />
      ) : !isSuccess ? (
        <NoDataMessage
          message={"User Data Unavailable!"}
          icon={"fi fi-rr-search-alt"}
        />
      ) : (
        <div className="mt-6">
          {allUsers?.length == 0 ? (
            <NoDataMessage
              message={"No College Data exist"}
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
                {allUsers != null &&
                  allUsers?.length > 0 &&
                  allUsers?.map((user, key) => (
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
                                      You want to delete this user "
                                      {user?.username}"
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
