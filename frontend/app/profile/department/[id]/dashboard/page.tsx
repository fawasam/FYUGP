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
import Link from "next/link";
import axios from "axios";
import { useGetAProgramMutation } from "@/redux/services/collegeApi";
const DepartmentDashboard = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const { redirectTo, redirectToHomeIfLoggedIn } = useRedirect();
  let userData = useSelector((state: RootState) => state.auth);
  let { userInfo: user, userToken, isAuthenticated } = userData;
  const [pdfFile, setPdfFile] = useState(null);
  const [loadedpdfFile, setLoadedPdfFile] = useState(null);
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [getAProgram] = useGetAProgramMutation();

  const components: {
    title: string;
    href: string;
    icon: string;
    bgColor: string;
  }[] = [
    {
      title: "View Program",
      href: `/profile/${user?.role}/${user?.username}/dashboard/programme`,
      icon: "fi fi-rr-graduation-cap",
      bgColor: "#FFD3C6",
    },
    {
      title: "View Courses",
      href: `/profile/${user?.role}/${user?.username}/dashboard/courses`,
      icon: "fi fi-rr-book",
      bgColor: "#FFD3C6",
    },
    {
      title: "Enquiry",
      href: `/profile/${user?.role}/${user?.username}/dashboard/enquiry`,
      icon: "fi fi-rr-comment-alt",
      bgColor: "#FFD3C6",
    },
  ];
  console.log(user?.department);

  const handleFileChange = (event: any) => {
    setPdfFile(event.target.files[0]);
  };
  const handleFileUpload = async () => {
    if (pdfFile) {
      const formData = new FormData();
      formData.append("file", pdfFile);

      try {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_BACKEND_URL +
            `/api/v1/upload/file/${user?.department}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("File uploaded successfully:", response.data);
        toast({
          title: "File uploaded successfully:",
        });
        setPdfFile(null);
      } catch (error) {
        toast({
          title: "Error uploading file:" + error,
        });
        setPdfFile(null);
      }
    } else {
      toast({
        title: "No file selected.",
      });
    }
  };

  useEffect(() => {
    const GetAprogram = async () => {
      const res: any = await getAProgram(user?.department);
      console.log(res);
      setLoadedPdfFile(res?.data?.data?.program?.syllabus);
    };

    GetAprogram();
    if (!user) {
      redirectTo("/");
    }
  }, [userData, dispatch, router, user]);

  console.log(loadedpdfFile);
  console.log(pdfFile);

  return (
    <>
      <AnimationWrapper className="mt-20">
        <h1 className="max-md:hidden text-2xl font-semibold ">
          Welcome to Department Dashboard
        </h1>
        <div className="">
          <ul className=" mt-12 grid w-[400px] gap-3 p-4 md:w-[500px] lg:grid-cols-4 md:grid-cols-2 lg:w-[900px] ">
            {components.map((component) => (
              <li key={component.title}>
                <Link
                  href={component.href}
                  className={`items-center py-4 justify-center select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors bg-background hover:bg-[#DAE9F0] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground flex `}
                >
                  <span className="w-10 h-10 rounded-full text-center  flex item-center justify-center">
                    <i
                      className={component.icon + " text-xl mt-2 font-bold"}
                    ></i>
                  </span>
                  <div className="ml-2 text-lg  font-medium leading-none">
                    {component.title}
                  </div>
                </Link>
              </li>
            ))}
            {loadedpdfFile && (
              <li>
                <Link
                  href={loadedpdfFile}
                  className={`items-center py-4 justify-center select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors bg-background hover:bg-[#DAE9F0] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground flex `}
                >
                  <span className="w-10 h-10 rounded-full text-center  flex item-center justify-center">
                    <i className={"fi fi-rr-eye text-xl mt-2 font-bold"}></i>
                  </span>
                  <div className="ml-2 text-lg  font-medium leading-none">
                    View Syllabus
                  </div>
                </Link>
              </li>
            )}
          </ul>
          <div className="my-6">
            <p className="mb-4 text-xl">
              {loadedpdfFile ? "Update Syllabus" : "Upload Syllabus"}
            </p>
            <input
              placeholder="Upload "
              type="file"
              className="w-full md:w-[60%] border p-2 rounded-md"
              accept=".pdf"
              onChange={handleFileChange}
            />
            <Button onClick={handleFileUpload} className="ml-2">
              Upload PDF
            </Button>
          </div>
        </div>
      </AnimationWrapper>
    </>
  );
};

export default DepartmentDashboard;
