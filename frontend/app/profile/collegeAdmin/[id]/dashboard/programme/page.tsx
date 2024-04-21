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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  useCreateProgramMutation,
  useDeleteProgramMutation,
  useGetACollegeMutation,
  useGetAProgramMutation,
  useGetAllProgramByCollegeMutation,
  useGetAllProgramMutation,
  useUpdateProgramMutation,
} from "@/redux/services/collegeApi";
import { formateDate } from "@/utils/formateDate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { disciplines } from "@/utils/disciplines";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Loader from "@/components/common/Loader";
import NoDataMessage from "@/components/common/Nodata";

const formSchema = z.object({
  Dname: z.string().min(2, {
    message: "Department name must be at least 2 characters.",
  }),
  headOfDepartment: z.string(),
  Discipline: z.string().min(2, {
    message: "Please choose a Discipline ",
  }),
});

const Programme = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();

  const [dname, setDname] = useState("");
  const [program, setProgram] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [allPrograms, setAllPrograms] = useState<any[]>([]);
  const [headOfDepartment, setHeadOfDepartment] = useState("");
  const { redirectTo, redirectToHomeIfLoggedIn } = useRedirect();
  let userData = useSelector((state: RootState) => state.auth);
  let { userInfo: user, userToken, isAuthenticated } = userData;
  let [getAllProgram] = useGetAllProgramMutation();
  let [getAProgram] = useGetAProgramMutation();
  let [createProgram] = useCreateProgramMutation();
  let [deleteProgram] = useDeleteProgramMutation();
  let [updateProgram] = useUpdateProgramMutation();
  let [
    getAllProgramByCollege,
    { isLoading, isError, isSuccess },
  ] = useGetAllProgramByCollegeMutation();

  const getAPrograms = async (id: any) => {
    const response: any = await getAProgram(id);
    setProgram(id);
    setDname(response?.data?.data?.program?.Dname);
    setDiscipline(response?.data?.data?.program?.Discipline);
    setHeadOfDepartment(response?.data?.data?.program?.headOfDepartment);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Dname: "",
      headOfDepartment: "",
      Discipline: "",
    },
  });
  const form2 = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Dname: "",
      headOfDepartment: "",
      Discipline: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const newValues = { ...values };

      const response: any = await createProgram(newValues).unwrap();
      setProgram("");
      setDname("");
      setDiscipline("");
      setHeadOfDepartment("");
      toast({
        title: "Successfully added Program",
      });
      getAllPrograms2();
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      });
      console.log(error);
    }
  };

  const onUpdate = async (values: z.infer<typeof formSchema>) => {
    try {
      const newValues = { ...values };
      console.log(newValues);

      const response: any = await updateProgram({
        id: program,
        data: newValues,
      }).unwrap();
      toast({
        title: "Successfully updated Program",
      });
      setProgram("");
      setDname("");
      setHeadOfDepartment("");
      form.reset();
      getAllPrograms2();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      });
      console.log(error);
    }
  };
  const getAllPrograms2 = async () => {
    const response: any = await getAllProgramByCollege({
      id: user?.college,
    });
    setAllPrograms(response?.data?.data?.programs);
  };

  const handleDeleteProgram = async (id: any) => {
    try {
      const response = await deleteProgram({ id });

      toast({
        title: "Program Deleted Successfully",
      });
      console.log("Program Deleted Successfully");
      getAllPrograms2();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      });
      console.log(error);
    }
  };
  useEffect(() => {
    const getAllPrograms = async () => {
      const response: any = await getAllProgramByCollege({
        id: user?.college,
      });
      setAllPrograms(response?.data?.data?.programs);
    };

    getAllPrograms();
    // if (!user) {
    //   redirectTo("/");
    // }
  }, [userData, router, program, user, getAllProgramByCollege]);

  useEffect(() => {
    form2.reset({
      Dname: dname,
      headOfDepartment: headOfDepartment,
      Discipline: discipline,
    });
  }, [discipline, dname, headOfDepartment, form2]);

  return (
    <AnimationWrapper className="w-full sm:mt-20 mt-0">
      <div className="flex items-center justify-between text-center flex-row">
        <h1 className="max-md:hidden mb-4 text-2xl font-semibold">
          All Programs
        </h1>

        {isSuccess ? (
          <Button>
            <Link
              href={`/profile/${user.role}/${user?.username}/dashboard/programme/new`}
            >
              {" "}
              <i className="fi fi-rr-plus mr-2"></i>New
            </Link>
          </Button>
        ) : (
          " "
        )}
      </div>

      {isLoading ? (
        <Loader />
      ) : !isSuccess ? (
        <NoDataMessage
          message={"Program Data Unavailable!"}
          icon={"fi fi-rr-user"}
        />
      ) : (
        <>
          {allPrograms?.length == 0 ? (
            <NoDataMessage
              message={"No Program Data exist"}
              icon={"fi fi-rr-search-alt"}
            />
          ) : (
            <Table className="mt-10">
              <TableCaption>List of Porgramms.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Department</TableHead>
                  <TableHead>Hod</TableHead>
                  <TableHead>Discipline</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Joined At</TableHead>
                  <TableHead>Total courses</TableHead>
                  <TableHead className="text-right">Task</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allPrograms != null &&
                  allPrograms.length > 0 &&
                  allPrograms.map((program, key) => (
                    <TableRow key={key}>
                      <TableCell className="font-medium">
                        {program?.Dname}
                      </TableCell>
                      <TableCell>{program?.headOfDepartment}</TableCell>
                      <TableCell>{program?.Discipline}</TableCell>
                      <TableCell>{program?.email}</TableCell>
                      <TableCell className="text-center">
                        {formateDate(program.joinedAt)}
                      </TableCell>
                      <TableCell>{program?.coursesOffered.length}</TableCell>
                      <TableCell className="text-right ">
                        <TooltipProvider>
                          <div className="flex space-x-1">
                            <Link
                              href={`/profile/collegeAdmin/${user.username}/dashboard/courses/${program._id}`}
                            >
                              <Tooltip>
                                <TooltipTrigger>
                                  {" "}
                                  <Button variant={"secondary"}>
                                    {" "}
                                    <i className="fi fi-rs-eye "></i>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>View</p>
                                </TooltipContent>
                              </Tooltip>
                            </Link>
                            <Dialog>
                              <Tooltip>
                                <DialogTrigger asChild>
                                  <TooltipTrigger>
                                    <Button
                                      variant={"outline"}
                                      onClick={() => getAPrograms(program?._id)}
                                    >
                                      {" "}
                                      <i className="fi fi-rs-edit "></i>
                                    </Button>
                                  </TooltipTrigger>
                                </DialogTrigger>
                                <TooltipContent>
                                  <p>Edit</p>
                                </TooltipContent>
                              </Tooltip>
                              <DialogContent className="sm:max-w-[425px]">
                                <Form {...form2}>
                                  <form
                                    onSubmit={form2.handleSubmit(onUpdate)}
                                    className="w-full"
                                  >
                                    <DialogHeader>
                                      <DialogTitle>Add Programme</DialogTitle>
                                      <DialogDescription>
                                        Make changes to your Program here. Click
                                        save when you are done.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className=" space-y-4 py-4">
                                      <div className="  items-center gap-4 space-y-4">
                                        <FormField
                                          control={form2.control}
                                          name="Dname"
                                          render={({ field }) => (
                                            <FormItem className="w-full m-0">
                                              <FormLabel>
                                                Enter Program Name
                                              </FormLabel>
                                              <FormControl>
                                                <Input
                                                  placeholder="Program Name"
                                                  defaultValue={dname}
                                                  icon={
                                                    "fi fi-rr-graduation-cap"
                                                  }
                                                  {...field}
                                                />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                        <FormField
                                          control={form2.control}
                                          name="headOfDepartment"
                                          render={({ field }) => (
                                            <FormItem className="w-full m-0">
                                              <FormLabel>
                                                Enter Head Of Department
                                              </FormLabel>
                                              <FormControl>
                                                <Input
                                                  placeholder="Head Of Department"
                                                  defaultValue={
                                                    headOfDepartment
                                                  }
                                                  icon={
                                                    "fi fi-rr-graduation-cap"
                                                  }
                                                  {...field}
                                                />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />

                                        <FormField
                                          control={form2.control}
                                          name="Discipline"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>Discipline</FormLabel>
                                              <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                              >
                                                <FormControl>
                                                  <SelectTrigger>
                                                    <SelectValue placeholder="Select your Discipline " />
                                                  </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                  {disciplines.map(
                                                    (dist, key) => (
                                                      <SelectItem
                                                        value={dist}
                                                        key={key}
                                                      >
                                                        {dist}
                                                      </SelectItem>
                                                    )
                                                  )}
                                                </SelectContent>
                                              </Select>

                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <Button>Update Program</Button>
                                    </DialogFooter>
                                  </form>
                                </Form>
                              </DialogContent>
                            </Dialog>

                            <Tooltip>
                              <TooltipTrigger>
                                <Dialog>
                                  <DialogTrigger>
                                    <Button
                                      variant={"destructive"}
                                      className=" text-center"
                                      size={"sm"}
                                    >
                                      <i className="fi fi-rs-trash "></i>
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="">
                                    <DialogHeader className="mt-6">
                                      <DialogTitle className="text-2xl flex item-center justify-center flex-col text-center">
                                        <i className="fi fi-rs-trash "></i>
                                        Are you sure?
                                      </DialogTitle>
                                    </DialogHeader>
                                    <DialogDescription className="text-base text-center">
                                      {` You want to delete this Program 
                                  ${program?.Dname}`}
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
                                            handleDeleteProgram(program._id)
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
                                <p>Delete</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </TooltipProvider>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </>
      )}
    </AnimationWrapper>
  );
};

export default Programme;
