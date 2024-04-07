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
  useDeleteCourseMutation,
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
import Loader from "@/components/common/Loader";
import NoDataMessage from "@/components/common/Nodata";

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
  const [addopen, setAddOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  const [code, setCode] = useState("");
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const { redirectTo, redirectToHomeIfLoggedIn } = useRedirect();
  let userData = useSelector((state: RootState) => state.auth);
  let { userInfo: user, userToken, isAuthenticated } = userData;
  let [getAllCourse] = useGetAllCourseMutation();
  let [getACourse] = useGetACourseMutation();
  let [deleteCourse] = useDeleteCourseMutation();
  let [createCourse] = useCreateCourseMutation();
  let [updateCourse] = useUpdateCourseMutation();
  let [getAllCourseByProgram, { isLoading, isError, isSuccess }] =
    useGetAllCourseByProgramMutation();
  let [getAProgram] = useGetAProgramMutation();
  let [getAllProgramByCollege] = useGetAllProgramByCollegeMutation();

  let count = 1;

  console.log(user);

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

      const response: any = await createCourse({
        programId: user?.department,
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
        description: error?.data?.error,
      });
      console.log(error?.data?.message);
      console.log(error);
    }
    setAddOpen(false);
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
      const response: any = await updateCourse({
        programId: user?.department,
        courseId: courseId,
        data: newValues,
      }).unwrap();
      toast({
        title: "Successfully updated Program",
      });
      resetData();
      getAllCoursesByProgram();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.data?.message,
      });
      console.log(error?.data?.message);
    }
    setEditOpen(false);
  };

  const getAllCoursesByProgram = async () => {
    const response: any = await getAllCourseByProgram({ id: user?.department });
    setAllCourses(response?.data?.data?.course);
  };
  const getAPrograms = async (id: any) => {
    const response: any = await getAProgram(id);
    setDname(response?.data?.data?.program?.Dname);
  };
  const handleDeleteCourse = async (id: any) => {
    try {
      const response = await deleteCourse({ id });
      toast({
        title: "Course Deleted Successfully",
      });
      console.log("Course Deleted Successfully");
      getAllCoursesByProgram();
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
    form.reset({
      courseCode: code,
      courseName: cname,
      category: category,
      semester: semester,
    });
  }, [form, code, cname, category, semester, addopen, editopen]);

  useEffect(() => {
    getAPrograms(user?.department);
    getAllCoursesByProgram();
    resetData();
    if (!user) {
      redirectTo("/");
    }
  }, [
    user,
    getAllProgramByCollege,
    getAllCourseByProgram,
    getAProgram,
    params?.Cname,
    addopen,
    editopen,
  ]);

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
        <h1 className=" mb-4 text-3xl text-center">
          <i className="fi fi-rr-book-alt mr-2"></i>
          {dname}
        </h1>
        <Dialog open={addopen} onOpenChange={setAddOpen}>
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
                  </div>
                </div>
                <DialogFooter>
                  {/* <DialogClose asChild> */}
                  <Button>Add Course</Button>
                  {/* </DialogClose> */}
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <Loader />
      ) : !isSuccess ? (
        <NoDataMessage
          message={"Course Data Unavailable!"}
          icon={"fi fi-rr-search-alt"}
        />
      ) : (
        <div className="mt-6">
          {allCourses?.length == 0 ? (
            <NoDataMessage
              message={"No Course Data exist"}
              icon={"fi fi-rr-search-alt"}
            />
          ) : (
            <Table className="mt-10">
              <TableCaption>
                A list of courses offerde by {dname} department.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>SI NO</TableHead>
                  <TableHead className="">SEMESTER</TableHead>
                  <TableHead>COURSE CODE</TableHead>
                  <TableHead>COURSE NAME</TableHead>
                  <TableHead>CATEGORY</TableHead>
                  <TableHead className="text-right">TASK</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allCourses?.length > 0 &&
                  allCourses
                    ?.slice()
                    ?.sort(
                      (a, b) => parseInt(a.semester) - parseInt(b.semester)
                    )
                    ?.map((course, key) => (
                      <TableRow key={key}>
                        <TableCell className="font-medium">{count++}</TableCell>
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
                        {course?.course?.map((c: any, key: any) => (
                          <TableCell className="text-right ">
                            <div className="flex">
                              <Dialog>
                                {/* delete start  */}
                                <DialogTrigger>
                                  <Button
                                    variant={"destructive"}
                                    className=" text-center mr-2"
                                    size={"sm"}
                                  >
                                    <i className="fi fi-rs-trash "></i>
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="mt-4">
                                  <DialogHeader className="mt-6">
                                    <DialogTitle className="text-2xl flex item-center justify-center flex-col text-center">
                                      <i className="fi fi-rs-trash mr-2"></i>
                                      Are you sure?
                                    </DialogTitle>
                                  </DialogHeader>
                                  <DialogDescription className="text-base text-center">
                                    You want to delete this course "
                                    {c?.courseName}"
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
                                          handleDeleteCourse(course._id)
                                        }
                                      >
                                        Confirm
                                      </Button>
                                    </div>
                                  </DialogDescription>
                                </DialogContent>
                              </Dialog>
                              <Dialog
                                open={editopen}
                                onOpenChange={setEditOpen}
                              >
                                {/* edit start  */}
                                <DialogTrigger asChild>
                                  <Button
                                    variant={"outline"}
                                    // size={"lg"}
                                    onClick={() => getACourses(course?._id)}
                                  >
                                    {" "}
                                    <i className="fi fi-rs-edit "></i>
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
                                          Make changes to your profile here.
                                          Click save when you are done.
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
                                                  <FormLabel>
                                                    Enter Course Code
                                                  </FormLabel>
                                                  <FormControl>
                                                    <Input
                                                      defaultValue={code}
                                                      placeholder="Course Code"
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
                                            {/* cname  */}
                                            <FormField
                                              control={form.control}
                                              name="courseName"
                                              render={({ field }) => (
                                                <FormItem className="w-full m-0">
                                                  <FormLabel>
                                                    Enter Course Name
                                                  </FormLabel>
                                                  <FormControl>
                                                    <Input
                                                      defaultValue={cname}
                                                      placeholder="Course Name"
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
                                          </div>
                                          {/* semester */}
                                          <FormField
                                            control={form.control}
                                            name="semester"
                                            render={({ field }) => (
                                              <FormItem className="w-full m-0">
                                                <FormLabel>
                                                  Select the semster
                                                </FormLabel>
                                                <>
                                                  <Select
                                                    onValueChange={
                                                      field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                    value={semester}
                                                  >
                                                    <SelectTrigger className="w-full">
                                                      <SelectValue placeholder="semester" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                      <SelectGroup {...field}>
                                                        {[
                                                          1, 2, 3, 4, 5, 6, 7,
                                                          8,
                                                        ].map((value, key) => (
                                                          <SelectItem
                                                            value={value.toString()}
                                                            key={key}
                                                          >
                                                            {value}
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
                                          {/* category */}
                                          <FormField
                                            control={form.control}
                                            name="category"
                                            render={({ field }) => (
                                              <FormItem className="w-full m-0">
                                                <FormLabel>
                                                  Select the Category{" "}
                                                </FormLabel>
                                                <>
                                                  <Select
                                                    onValueChange={
                                                      field.onChange
                                                    }
                                                    defaultValue={form.getValues(
                                                      "category"
                                                    )}
                                                    value={category}
                                                  >
                                                    <SelectTrigger className="w-full">
                                                      <SelectValue placeholder="Category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                      <SelectGroup {...field}>
                                                        {Categories?.map(
                                                          (
                                                            cat: any,
                                                            key: any
                                                          ) => (
                                                            <SelectItem
                                                              value={cat}
                                                              key={key}
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
                            </div>
                          </TableCell>
                        ))}
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

export default SingleCourse;
