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
  useGetACollegeMutation,
  useGetAProgramMutation,
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

const formSchema = z.object({
  Dname: z.string().min(2, {
    message: "Department name must be at least 2 characters.",
  }),
  headOfDepartment: z.string(),
  Discipline: z.string(),
});

const page = () => {
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
  let [updateProgram] = useUpdateProgramMutation();

  const getAllPrograms = async () => {
    const response: any = await getAllProgram("");
    setAllPrograms(response?.data?.data?.programs);
  };
  const getAPrograms = async (id: any) => {
    const response: any = await getAProgram(id);

    setProgram(id);
    setDname(response?.data?.data?.program?.Dname);
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
      Dname: dname,
      headOfDepartment: headOfDepartment,
      Discipline: discipline,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const newValues = { ...values };
      console.log(newValues);

      const response: any = await createProgram(newValues).unwrap();
      toast({
        title: "Successfully added Program",
      });
      getAllPrograms();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.data?.message,
      });
      console.log(error?.data?.message);
    }
  };

  const onUpdate = async (values: z.infer<typeof formSchema>) => {
    try {
      const newValues = { ...values };
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
      getAllPrograms();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.data?.message,
      });
      console.log(error?.data?.message);
    }
  };
  useEffect(() => {
    getAllPrograms();
    if (!user) {
      redirectTo("/");
    }
  }, [userData, router, program]);

  useEffect(() => {
    form2.reset({
      Dname: dname,
      headOfDepartment: headOfDepartment,
      Discipline: discipline,
    });
  }, [program]);

  return (
    <AnimationWrapper className="w-full">
      <div className="flex items-center justify-between text-center flex-row">
        <h1 className="max-md:hidden mb-4">All Courses</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              {" "}
              <i className="fi fi-rr-plus mr-2"></i>New
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <DialogHeader>
                  <DialogTitle>Add Programme</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className=" space-y-4 py-4">
                  <div className="  items-center gap-4 space-y-4">
                    <FormField
                      control={form.control}
                      name="Dname"
                      render={({ field }) => (
                        <FormItem className="w-full m-0">
                          <FormLabel>Enter Program Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Program Name"
                              icon={"fi fi-rr-graduation-cap"}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="headOfDepartment"
                      render={({ field }) => (
                        <FormItem className="w-full m-0">
                          <FormLabel>Enter Head Of Department</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Head Of Department"
                              icon={"fi fi-rr-graduation-cap"}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="Discipline"
                      render={({ field }) => (
                        <FormItem className="w-full m-0">
                          <FormLabel>Select the Discipline</FormLabel>
                          <>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Discipline" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup {...field}>
                                  <SelectItem value="Humanities">
                                    Humanities
                                  </SelectItem>
                                  <SelectItem value="Languages">
                                    Languages
                                  </SelectItem>
                                  <SelectItem value="Science">
                                    Science
                                  </SelectItem>
                                  <SelectItem value="Commerce">
                                    Commerce
                                  </SelectItem>
                                  <SelectItem value="Management">
                                    Management
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button>Add Program</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* table of content  */}
      <Table className="mt-10">
        <TableCaption>A list of user who are Registered.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Department</TableHead>
            <TableHead>Hod</TableHead>
            <TableHead>Disciple</TableHead>
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
                <TableCell className="font-medium">{program?.Dname}</TableCell>
                <TableCell>{program?.headOfDepartment}</TableCell>
                <TableCell>{program?.Discipline}</TableCell>
                <TableCell className="text-center">
                  {formateDate(program.joinedAt)}
                </TableCell>
                <TableCell>{program?.coursesOffered.length}</TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant={"outline"}
                        onClick={() => getAPrograms(program?._id)}
                      >
                        {" "}
                        <i className="fi fi-rs-edit mr-2"></i>
                        Update
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <Form {...form2}>
                        <form
                          onSubmit={form2.handleSubmit(onUpdate)}
                          className="w-full"
                        >
                          <DialogHeader>
                            <DialogTitle>Add Programme</DialogTitle>
                            <DialogDescription>
                              Make changes to your profile here. Click save when
                              you're done.
                            </DialogDescription>
                          </DialogHeader>
                          <div className=" space-y-4 py-4">
                            <div className="  items-center gap-4 space-y-4">
                              <FormField
                                control={form2.control}
                                name="Dname"
                                render={({ field }) => (
                                  <FormItem className="w-full m-0">
                                    <FormLabel>Enter Program Name</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Program Name"
                                        defaultValue={dname}
                                        icon={"fi fi-rr-graduation-cap"}
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
                                        defaultValue={headOfDepartment}
                                        icon={"fi fi-rr-graduation-cap"}
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="Discipline"
                                render={({ field }) => (
                                  <FormItem className="w-full m-0">
                                    <FormLabel>Select the Discipline</FormLabel>
                                    <>
                                      <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                      >
                                        <SelectTrigger className="w-[180px]">
                                          <SelectValue placeholder="Discipline" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectGroup {...field}>
                                            <SelectItem value="Humanities">
                                              Humanities
                                            </SelectItem>
                                            <SelectItem value="Languages">
                                              Languages
                                            </SelectItem>
                                            <SelectItem value="Science">
                                              Science
                                            </SelectItem>
                                            <SelectItem value="Commerce">
                                              Commerce
                                            </SelectItem>
                                            <SelectItem value="Management">
                                              Management
                                            </SelectItem>
                                          </SelectGroup>
                                        </SelectContent>
                                      </Select>
                                    </>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose>
                              <Button>Update Program</Button>
                            </DialogClose>
                          </DialogFooter>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                  <Link
                    href={`/profile/collegeAdmin/${user.username}/dashboard/programme/${program.Dname}`}
                  >
                    <Button className="ml-2" variant={"secondary"}>
                      {" "}
                      <i className="fi fi-rs-edit mr-2"></i>
                      View
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AnimationWrapper>
  );
};

export default page;
