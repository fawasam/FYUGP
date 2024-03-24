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
  useCreateCourseMutation,
  useCreateProgramMutation,
  useGetACollegeMutation,
  useGetACourseMutation,
  useGetAProgramMutation,
  useGetAllCourseByProgramMutation,
  useGetAllCourseMutation,
  useGetAllProgramByCollegeMutation,
  useGetAllProgramMutation,
  useUpdateCourseMutation,
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
import { Categories } from "@/utils/Categories";

const formSchema = z.object({
  Cname: z.string().min(2, {
    message: "Course name is required",
  }),
  category: z.string().min(2, {
    message: "Category is required",
  }),
  semester: z.string().min(2, {
    message: "Please select a semester ",
  }),
});

const page = ({ params }: { params: { Cname: string } }) => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const [dname, setDname] = useState("");
  const [program, setProgram] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [allPrograms, setAllPrograms] = useState<any[]>([]);
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [headOfDepartment, setHeadOfDepartment] = useState("");
  const { redirectTo, redirectToHomeIfLoggedIn } = useRedirect();
  let userData = useSelector((state: RootState) => state.auth);
  let { userInfo: user, userToken, isAuthenticated } = userData;
  let [getAllCourse] = useGetAllCourseMutation();
  let [getACourse] = useGetACourseMutation();
  let [createCourse] = useCreateCourseMutation();
  let [updateCourse] = useUpdateCourseMutation();
  let [getAllCourseByProgram] = useGetAllCourseByProgramMutation();
  let [getAllProgramByCollege] = useGetAllProgramByCollegeMutation();

  const getAllPrograms = async () => {
    const response: any = await getAllProgramByCollege({ id: user?.college });
    setAllPrograms(response?.data?.data?.programs);
  };
  const getAllCoursesByProgram = async () => {
    const response: any = await getAllCourseByProgram({ id: params?.Cname });

    setAllCourses(response?.data?.data?.course);
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
      Cname: "",
      category: "",
      semester: "",
    },
  });
  const form2 = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Cname: "",
      category: "",
      semester: "",
    },
  });

  // console.log(form.watch());

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const newValues = { ...values, collegeId: user?.college };
      console.log(newValues);

      // const response: any = await createProgram(newValues).unwrap();
      setProgram("");
      setDname("");
      setDiscipline("");
      setHeadOfDepartment("");
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
      console.log(newValues);
      // const response: any = await updateProgram({
      //   id: program,
      //   data: newValues,
      // }).unwrap();
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

  const getCategoryCourse = (course, category) => {
    if (course.category === category) {
      return course.Cname;
    } else {
      return "";
    }
  };

  const getCoursesByCategory = (courses: any, category: any) => {
    const filteredCourses = courses.filter(
      (course) => course.category === category
    );
    return filteredCourses.map((course) => course.Cname).join(", ");
  };

  const groupCoursesBySemester = (courses: any) => {
    const groupedCourses = {};
    courses.forEach((course) => {
      if (!groupedCourses[course.semester]) {
        groupedCourses[course.semester] = [];
      }
      groupedCourses[course.semester].push(course);
    });
    return Object.values(groupedCourses);
  };

  const getTotalCourses = (courses: any) => {
    let uniqueCnames = [];
    courses.forEach((course) => {
      if (!uniqueCnames.includes(course.Cname)) {
        uniqueCnames.push(course.Cname);
      }
    });
    return uniqueCnames.length;
  };

  useEffect(() => {
    getAllPrograms();
    getAllCoursesByProgram();
    if (!user) {
      redirectTo("/");
    }
  }, [userData, router, program]);

  useEffect(() => {
    form2.reset({
      Cname: dname,
      category: headOfDepartment,
      semester: discipline,
    });
  }, [program]);

  return (
    <AnimationWrapper className="w-full ">
      <div className="flex items-center justify-between text-center flex-row">
        <h1 className="max-md:hidden mb-4 text-3xl text-center">
          <i className="fi fi-rr-book-alt mr-2"></i>
          {params?.Cname}
        </h1>
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
                  <DialogTitle>Add Course</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className=" space-y-4 py-4">
                  <div className="  items-center gap-4 space-y-4">
                    {/* cname  */}
                    <FormField
                      control={form.control}
                      name="Cname"
                      render={({ field }) => (
                        <FormItem className="w-full m-0">
                          <FormLabel>Enter Course Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Course Name"
                              icon={"fi fi-rr-graduation-cap"}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* category */}
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem className="w-full m-0">
                          <FormLabel>Select the Category </FormLabel>
                          <>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup {...field}>
                                  {Categories?.map((cat: any, key: any) => (
                                    <SelectItem value={cat} key={cat}>
                                      {cat}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* semester */}
                    <FormField
                      control={form.control}
                      name="semester"
                      render={({ field }) => (
                        <FormItem className="w-full m-0">
                          <FormLabel>Select the semster</FormLabel>
                          <>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Semester" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup {...field}>
                                  {[1, 2, 3, 4, 5, 6, 7, 8].map(
                                    (value, key) => (
                                      <SelectItem value={value} key={key}>
                                        {value}
                                      </SelectItem>
                                    )
                                  )}
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
                  <Button>Add Course</Button>
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
            <TableHead className="">SEMESTER</TableHead>
            <TableHead>CJ</TableHead>
            <TableHead>EJ</TableHead>
            <TableHead>MN</TableHead>
            <TableHead>VN</TableHead>
            <TableHead>AEC</TableHead>
            <TableHead>SEC</TableHead>
            <TableHead>VAC</TableHead>
            <TableHead>MDC</TableHead>
            <TableHead>Total courses</TableHead>
            <TableHead className="text-right">Task</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allCourses != null &&
            allCourses.length > 0 &&
            groupCoursesBySemester(allCourses).map((course: any, key: any) => (
              <TableRow key={key}>
                <TableCell className="font-medium">
                  {course[0]?.semester}
                </TableCell>
                <TableCell>
                  {getCoursesByCategory(course, "CORE IN MAJOR")}
                </TableCell>
                <TableCell>
                  {getCoursesByCategory(course, "ELECTIVE IN MAJOR")}
                </TableCell>
                <TableCell>{getCoursesByCategory(course, "MINOR")}</TableCell>
                <TableCell>
                  {getCoursesByCategory(course, "VOCATIONAL MINOR")}
                </TableCell>
                <TableCell>
                  {getCoursesByCategory(course, "ABILITY ENHANCEMENT COURSE")}
                </TableCell>
                <TableCell>
                  {getCoursesByCategory(course, "SKILL ENHANCEMENT COURSE")}
                </TableCell>
                <TableCell>
                  {getCoursesByCategory(course, "VALUE ADDED COURSE")}
                </TableCell>
                <TableCell>
                  {getCoursesByCategory(course, "MULTI-DISCIPLINARY COURSE")}
                </TableCell>
                <TableCell>{getTotalCourses(course)}</TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant={"outline"}
                        size={"lg"}
                        onClick={() => getAPrograms(course?._id)}
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
                                name="Cname"
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
                                name="category"
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
                                control={form2.control}
                                name="semester"
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
                                        {disciplines.map((dist) => (
                                          <SelectItem value={dist}>
                                            {dist}
                                          </SelectItem>
                                        ))}
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
                  <Link
                    href={`/profile/collegeAdmin/${user.username}/dashboard/courses/${course?.Cname}`}
                  >
                    <Button className="ml-2" variant={"secondary"} size={"lg"}>
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
