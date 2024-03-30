"use client";
import AnimationWrapper from "@/components/common/page-animation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useRedirect from "@/hooks/useRedirect";
import { useRouter } from "next/navigation";
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
import { Categories } from "@/utils/Categories";

const formSchema = z.object({
  courseCode: z.string().min(2, {
    message: "Course name is required",
  }),
  courseName: z.string().min(2, {
    message: "Course name is required",
  }),
  category: z.string().min(2, {
    message: "Category is required",
  }),
  semester: z.string(),
});

const SingleCourse = ({ params }: { params: { Cname: string } }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [dname, setDname] = useState("");
  const [cname, setCname] = useState("");
  const [category, setCategory] = useState("");
  const [semester, setSemester] = useState("");
  const [program, setProgram] = useState("");
  const [courseId, setCourseId] = useState("");
  const [code, setCode] = useState("");
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const { redirectTo, redirectToHomeIfLoggedIn } = useRedirect();
  let userData = useSelector((state: RootState) => state.auth);
  let { userInfo: user, userToken, isAuthenticated } = userData;
  let [getAllCourse] = useGetAllCourseMutation();
  let [getACourse] = useGetACourseMutation();
  let [createCourse] = useCreateCourseMutation();
  let [updateCourse] = useUpdateCourseMutation();
  let [getAllCourseByProgram] = useGetAllCourseByProgramMutation();
  let [getAProgram] = useGetAProgramMutation();
  let [getAllProgramByCollege] = useGetAllProgramByCollegeMutation();

  const getAllPrograms = async () => {
    const response: any = await getAllProgramByCollege({ id: user?.college });
    setAllCourses(response?.data?.data?.programs);
  };
  const getAllCoursesByProgram = async () => {
    const response: any = await getAllCourseByProgram({ id: params?.Cname });
    setAllCourses(response?.data?.data?.course);
  };
  const getACourses = async (id: any) => {
    resetData();
    const response: any = await getACourse(id);
    setProgram(id);
    setCname(response?.data?.data?.course?.course[0]?.courseName);
    setCode(response?.data?.data?.course?.course[0]?.courseCode);
    setCategory(response?.data?.data?.course?.category);
    setCourseId(response?.data?.data?.course?._id);
    setSemester(response?.data?.data?.course?.semester);
  };
  const getAPrograms = async (id: any) => {
    const response: any = await getAProgram(id);
    setDname(response?.data?.data?.program?.Dname);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseCode: "",
      courseName: "",
      category: "",
      semester: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // const newValues = { ...values, collegeId: user?.college };
      let newValues = {
        course: [
          {
            courseCode: values.courseCode,
            courseName: values.courseName,
          },
        ],
        category: values.category,
        semester: values.semester,
        collegeId: user?.college,
      };
      console.log(newValues);

      const response: any = await createCourse({
        programId: params.Cname,
        data: newValues,
      }).unwrap();
      resetData();
      console.log(response);

      toast({
        title: "Successfully added Course",
      });
      getAllCoursesByProgram();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.data?.message,
      });
      console.log(error?.data?.message);
      console.log(error);
    }
  };
  const onUpdate = async (values: z.infer<typeof formSchema>) => {
    try {
      // const newValues = { ...values };
      let newValues = {
        course: [
          {
            courseCode: values.courseCode,
            courseName: values.courseName,
          },
        ],
        category: values.category,
        semester: values.semester,
        collegeId: user?.college,
      };
      console.log(newValues);
      const response: any = await updateCourse({
        programId: params.Cname,
        courseId: courseId,
        data: newValues,
      }).unwrap();
      toast({
        title: "Successfully updated Program",
      });
      resetData();
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

  console.log(form.watch());

  useEffect(() => {
    getAllPrograms();
    getAPrograms(params?.Cname);
    getAllCoursesByProgram();
    if (!user) {
      redirectTo("/");
    }
  }, [user, redirectTo]);

  useEffect(() => {
    form.reset({
      courseCode: code,
      courseName: cname,
      category: category,
      semester: semester,
    });
  }, []);

  const resetData = () => {
    setProgram("");
    setCourseId("");
    setCname("");
    setCode("");
    setCategory("");
    setSemester("");
    form.reset();
  };
  return (
    <AnimationWrapper className="w-full  sm:mt-20 mt-0">
      <div className="flex items-center justify-between text-center flex-row">
        <h1 className="max-md:hidden mb-4 text-3xl text-center">
          <i className="fi fi-rr-book-alt mr-2"></i>
          {dname}
        </h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              {" "}
              <i className="fi fi-rr-plus mr-2"></i>New
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[900px]">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <DialogHeader>
                  <DialogTitle>Add Course</DialogTitle>
                  <DialogDescription>
                    A list of courses offered by {dname} department.
                  </DialogDescription>
                </DialogHeader>
                <div className=" space-y-4 py-4">
                  <div className="  items-center gap-4 space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      {/* code  */}
                      <FormField
                        control={form.control}
                        name="courseCode"
                        render={({ field }) => (
                          <FormItem className="w-full m-0">
                            <FormLabel>Enter Course Code</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Course Code"
                                icon={"fi fi-rr-graduation-cap"}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* cname  */}
                      <FormField
                        control={form.control}
                        name="courseName"
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
                    </div>
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
                                <SelectValue placeholder="semester" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup {...field}>
                                  {[1, 2, 3, 4, 5, 6, 7, 8].map(
                                    (value, key) => (
                                      <SelectItem
                                        value={value.toString()}
                                        key={key}
                                      >
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
                    <div>
                      {/* CJ  */}
                      {/* <FormField
                        control={form.control}
                        name="CJ"
                        render={({ field }) => (
                          <FormItem className="w-full m-0">
                            <FormLabel>Major Course </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Major Course "
                                icon={"fi fi-rr-graduation-cap"}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      /> */}
                    </div>
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
        <TableCaption>
          A list of courses offerde by {dname} department.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">SEMESTER</TableHead>
            <TableHead>COURSE CODE</TableHead>
            <TableHead>COURSE NAME</TableHead>
            <TableHead>CATEGORY</TableHead>
            <TableHead>Total courses</TableHead>
            <TableHead className="text-right">Task</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allCourses != null &&
            allCourses.length > 0 &&
            allCourses?.map((course, key) => (
              <TableRow key={key}>
                <TableCell className="font-medium">
                  {course?.semester}
                </TableCell>
                {course?.course?.map((c: any, key: any) => (
                  <>
                    <TableCell className="font-medium">
                      {c?.courseCode}
                    </TableCell>
                    <TableCell className="font-medium">
                      {c?.courseName}
                    </TableCell>
                  </>
                ))}
                <TableCell className="font-medium">
                  {course?.category}
                </TableCell>
                <TableCell className="font-medium">
                  {/* {getTotalCourses(course)} */}
                </TableCell>

                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant={"outline"}
                        size={"lg"}
                        onClick={() => getACourses(course?._id)}
                      >
                        {" "}
                        <i className="fi fi-rs-edit mr-2"></i>
                        Update
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[900px]">
                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(onUpdate)}
                          className="w-full"
                        >
                          <DialogHeader>
                            <DialogTitle>Edit Course</DialogTitle>
                            <DialogDescription>
                              Make changes to your profile here. Click save when
                              you are done.
                            </DialogDescription>
                          </DialogHeader>
                          <div className=" space-y-4 py-4">
                            <div className="  items-center gap-4 space-y-4">
                              <div className="grid grid-cols-2 gap-2">
                                {/* code  */}
                                <FormField
                                  control={form.control}
                                  name="courseCode"
                                  render={({ field }) => (
                                    <FormItem className="w-full m-0">
                                      <FormLabel>Enter Course Code</FormLabel>
                                      <FormControl>
                                        <Input
                                          defaultValue={code}
                                          placeholder="Course Code"
                                          icon={"fi fi-rr-graduation-cap"}
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                {/* cname  */}
                                <FormField
                                  control={form.control}
                                  name="courseName"
                                  render={({ field }) => (
                                    <FormItem className="w-full m-0">
                                      <FormLabel>Enter Course Name</FormLabel>
                                      <FormControl>
                                        <Input
                                          defaultValue={cname}
                                          placeholder="Course Name"
                                          icon={"fi fi-rr-graduation-cap"}
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
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
                                        value={semester}
                                      >
                                        <SelectTrigger className="w-full">
                                          <SelectValue placeholder="semester" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectGroup {...field}>
                                            {[1, 2, 3, 4, 5, 6, 7, 8].map(
                                              (value, key) => (
                                                <SelectItem
                                                  value={value.toString()}
                                                  key={key}
                                                >
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
                                        value={category}
                                      >
                                        <SelectTrigger className="w-full">
                                          <SelectValue placeholder="Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectGroup {...field}>
                                            {Categories?.map(
                                              (cat: any, key: any) => (
                                                <SelectItem
                                                  value={cat}
                                                  key={cat}
                                                >
                                                  {cat}
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
                            <Button>Update Course</Button>
                          </DialogFooter>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AnimationWrapper>
  );
};

export default SingleCourse;
