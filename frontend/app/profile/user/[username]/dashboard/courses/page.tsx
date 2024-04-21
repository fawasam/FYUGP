"use client";
import AnimationWrapper from "@/components/common/page-animation";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useRedirect from "@/hooks/useRedirect";
import { logout } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
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
import { Courses } from "@/utils/Courses";
import {
  useGetAllCollegeMutation,
  useGetAllProgramByCollegeMutation,
} from "@/redux/services/collegeApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
const FormSchema = z.object({
  college: z.string({
    required_error: "Please select a college.",
  }),
  department: z.string(),
  semester: z.string(),
  course: z.string(),
});

const StudentCourse = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [colleges, setColleges] = useState<any[]>([]);
  const [college, setCollege] = useState(null);
  const [departments, setDepartments] = useState<any[]>([]);
  const [department, setDepartment] = useState("");
  const [courses, setCourses] = useState<any[]>([]);
  const [semester, setSemester] = useState<any | number>(0);
  const { redirectTo, redirectToHomeIfLoggedIn } = useRedirect();
  let userData = useSelector((state: RootState) => state.auth);
  let { userInfo: user, userToken, isAuthenticated } = userData;

  const [getAllCollege] = useGetAllCollegeMutation();
  const [getAllProgramByCollege] = useGetAllProgramByCollegeMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      college: "",
      department: "",
      semester: "",
      course: "",
    },
  });

  const handleChangeCollege = async (college: string) => {
    if (college) {
      const res: any = await getAllProgramByCollege({ id: college });
      setDepartments(res?.data?.data?.programs || []);
      const currentCollege = form.getValues("college");
      form.reset({ department: "", college: currentCollege });
    } else {
      setDepartments([]);
    }
  };

  function fetchCoursesByDepartmentAndSemester(
    inputDepartment: any,
    inputSemester: any
  ) {
    const coursesBySemester: any = [];
    departments.forEach((program: any) => {
      if (program.Dname === inputDepartment) {
        program.coursesOffered.forEach((course: any) => {
          if (course.semester === inputSemester) {
            if (!coursesBySemester[inputSemester]) {
              coursesBySemester[inputSemester] = [];
            }
            coursesBySemester[inputSemester].push(course);
          }
        });
      }
    });
    setCourses(coursesBySemester);
    return coursesBySemester;
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  useEffect(() => {
    const getAllColleges = async () => {
      const res: any = await getAllCollege("");
      setColleges(res?.data?.data?.colleges);
    };
    getAllColleges();
  }, [getAllCollege]);

  return (
    <AnimationWrapper className="w-full h-full  pt-[40px] sm:pt-[100px] ">
      <section className=" ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            {/* college select field  */}
            <FormField
              control={form.control}
              name="college"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Colleges</FormLabel>
                  <Select
                    onValueChange={(value: string) => {
                      field.onChange(value);
                      handleChangeCollege(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a college" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colleges &&
                        colleges?.map((c, key) => (
                          <SelectItem value={c?.collegename} key={key}>
                            {c?.collegename.toUpperCase()}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can view all college available
                    <Link href="/examples/forms"> email settings</Link>.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* department  select field  */}
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select
                    onValueChange={(value: string) => {
                      field.onChange(value);
                      setDepartment(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your Department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {departments?.length == 0
                        ? "No Department found"
                        : departments?.map((d, key) => (
                            <SelectItem value={d?.Dname} key={key}>
                              {d?.Dname.toUpperCase()}
                            </SelectItem>
                          ))}
                    </SelectContent>
                  </Select>

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
                      onValueChange={(value: string) => {
                        field.onChange(value);
                        setSemester(value);
                        fetchCoursesByDepartmentAndSemester(department, value);
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="semester" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup {...field}>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((value, key) => (
                            <SelectItem value={value.toString()} key={key}>
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

            {/* courses  */}
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {courses?.length == 0
                        ? "No Course found"
                        : courses[semester]?.map((c: any, key: any) => (
                            <SelectItem
                              value={c?.course[0]?.courseName}
                              key={key}
                            >
                              {c?.course[0]?.courseCode}-
                              {c?.course[0]?.courseName?.toUpperCase()}-(
                              {c?.category})
                            </SelectItem>
                          ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </section>
    </AnimationWrapper>
  );
};

export default StudentCourse;
