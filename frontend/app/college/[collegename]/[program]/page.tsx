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
import Loader from "@/components/common/Loader";
import NoDataMessage from "@/components/common/Nodata";
import Link from "next/link";

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

const CollegeProgram = ({ params }: { params: { program: string } }) => {
  const { toast } = useToast();
  let depName = params.program.split("-").join(" ");
  const router = useRouter();
  const [dname, setDname] = useState("");
  const [cname, setCname] = useState("");
  const [category, setCategory] = useState("");
  const [semester, setSemester] = useState("");
  const [syllabus, setSyllabus] = useState(null);
  const [program, setProgram] = useState("");
  const [code, setCode] = useState("");
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
  let [getAProgram, { isLoading, isSuccess }] = useGetAProgramMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseCode: "",
      courseName: "",
      category: "",
      semester: "",
    },
  });

  const getCoursesByCategory = (courses: any, category: any) => {
    const filteredCourses = courses.filter(
      (course: any) => course.category === category
    );

    return filteredCourses.map((c: any) => c?.course[0]?.courseCode).join(", ");
  };

  const groupCoursesBySemester = (courses: any) => {
    const groupedCourses: any = {};
    courses.forEach((course: any) => {
      if (!groupedCourses[course.semester]) {
        groupedCourses[course.semester] = [];
      }
      groupedCourses[course.semester].push(course);
    });
    return Object.values(groupedCourses);
  };
  const getTotalCourses = (courses: any) => {
    let uniqueCnames: any = [];
    courses?.forEach((c: any) => {
      if (!uniqueCnames.includes(c)) {
        uniqueCnames.push(c);
      }
    });

    return uniqueCnames.length;
  };
  useEffect(() => {
    const getAPrograms = async (id: any) => {
      const response: any = await getAProgram(id);
      setAllCourses(response?.data?.data?.program?.coursesOffered);
      setSyllabus(response?.data?.data?.program?.syllabus);
      setProgram(id);
    };
    getAPrograms(depName);
  }, [user, getAProgram, depName]);

  useEffect(() => {
    form.reset({
      courseCode: "",
      courseName: "",
      category: category,
      semester: semester,
    });
  }, [form, category, semester]);

  console.log(syllabus);

  return (
    <AnimationWrapper className="w-full  sm:p-[100px] p-[40px] m-auto sm:py-[5%] py-[20px] relative">
      <section className="max-w-[1060px] m-auto   flex-grow">
        <div className="flex items-center justify-between text-center flex-row ">
          <h1 className="mb-4 text-3xl text-center">
            <i className="fi fi-rr-book-alt mr-2"></i>
            {depName}
          </h1>
          {syllabus ? (
            <Link href={syllabus}>
              <Button>
                <i className="fi fi-sr-eye mr-2"></i>
                View Syllabus
              </Button>
            </Link>
          ) : (
            "Syllabus Not Found"
          )}
          {/* add new course  */}
        </div>

        {/* table of content  */}

        {isLoading ? (
          <Loader />
        ) : !isSuccess ? (
          <NoDataMessage
            message={"Course Data Unavailable!"}
            icon={"fi fi-rr-search-alt"}
          />
        ) : (
          <>
            <Table className="mt-10 ">
              <TableCaption>
                A list of courses offerde by {depName} department.
              </TableCaption>
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {allCourses != null &&
                  allCourses.length > 0 &&
                  groupCoursesBySemester(allCourses).map(
                    (course: any, key: any) => (
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
                        <TableCell>
                          {getCoursesByCategory(course, "MINOR")}
                        </TableCell>
                        <TableCell>
                          {getCoursesByCategory(course, "VOCATIONAL MINOR")}
                        </TableCell>
                        <TableCell>
                          {getCoursesByCategory(
                            course,
                            "ABILITY ENHANCEMENT COURSE"
                          )}
                        </TableCell>
                        <TableCell>
                          {getCoursesByCategory(
                            course,
                            "SKILL ENHANCEMENT COURSE"
                          )}
                        </TableCell>
                        <TableCell>
                          {getCoursesByCategory(course, "VALUE ADDED COURSE")}
                        </TableCell>
                        <TableCell>
                          {getCoursesByCategory(
                            course,
                            "MULTI-DISCIPLINARY COURSE"
                          )}
                        </TableCell>
                        <TableCell>{getTotalCourses(course)}</TableCell>
                      </TableRow>
                    )
                  )}
              </TableBody>
            </Table>

            {/* second table  */}
            <Table className="mt-10">
              <TableHeader>
                <TableRow>
                  <TableHead className="">SEMESTER</TableHead>
                  <TableHead>COURSE CODE</TableHead>
                  <TableHead>COURSE NAME</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allCourses != null &&
                  allCourses?.length > 0 &&
                  allCourses?.map((course: any, key: any) => (
                    <TableRow key={key}>
                      <TableCell className="font-medium">
                        {course?.semester}
                      </TableCell>
                      <TableCell>{course?.course[0]?.courseCode}</TableCell>
                      <TableCell>{course?.course[0]?.courseName}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </>
        )}
      </section>
    </AnimationWrapper>
  );
};

export default CollegeProgram;
