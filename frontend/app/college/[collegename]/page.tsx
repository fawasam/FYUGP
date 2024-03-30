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
import { useGetACollegeMutation } from "@/redux/services/collegeApi";
import { Badge } from "@/components/ui/badge";

import NoDataMessage from "@/components/common/Nodata";

const SingleCollege = ({ params }: { params: { collegename: string } }) => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const [college, setCollege] = useState<any>({});
  const { redirectTo, redirectToHomeIfLoggedIn } = useRedirect();
  let userData = useSelector((state: RootState) => state.auth);
  let { userInfo: user, userToken, isAuthenticated } = userData;
  const [getACollege] = useGetACollegeMutation();

  const getCollegeData = async () => {
    const response: any = await getACollege(params.collegename);
    setCollege(response?.data?.data?.college);
  };

  useEffect(() => {
    getCollegeData();
    // if (!user) {
    //   redirectTo("/");
    // }
  }, [userData, dispatch, router]);
  return (
    <AnimationWrapper className="w-full  sm:p-[100px] p-[40px] m-auto sm:py-[5%] py-[20px] relative">
      <section className="max-w-[1060px] m-auto   flex-grow">
        <div className="relative">
          <img
            src={`${
              college?.picture
                ? college?.picture
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCNw7r0CbmQXzKBodXPHKi4HdYZ_Wd9esyqHHrR8lVxA&s"
            }`}
            alt="image"
            className="w-full  h-[250px] object-cover rounded-sm"
          />
        </div>
        <div>
          <h1 className="text-2xl mt-4 font-bold">{college?.collegename}</h1>

          <i className="fi  fi-rr-marker mr-2"></i>
          <span className="text-md  font-thin">{college?.place}</span>
          <div className="mt-4">
            <Link
              href={college?.website ? college?.website : ""}
              target="_blank"
            >
              <i className="fi  fi-rr-globe mr-2"></i>
              <Button variant={"link"} className=" pl-0">
                {college?.website ? college?.website : "Not provided"}
              </Button>
            </Link>
            <div>
              <Link
                href={
                  college?.email ? "mailto: " + college?.email : "Not provided"
                }
                target="_blank"
              >
                <i className="fi fi-rr-envelope mr-2"></i>
                <Button variant={"link"} className=" pl-0">
                  <span>
                    {college?.email ? college?.email : "Not provided"}
                  </span>
                </Button>
              </Link>
            </div>
          </div>
          {college?.about ? (
            <div className="pt-4 flex flex-col">
              <h3 className="text-lg font-medium">ABOUT</h3>
              <span className="leading-normal font-light">
                {college?.about}
              </span>
            </div>
          ) : (
            ""
          )}
          <div className="pt-4 flex flex-col">
            <h3 className="text-lg font-medium ">DEPARTMENT</h3>
            <div className="mr-2 mt-2">
              {college?.departments && college.departments.length > 0 ? (
                college.departments.map((dep: any, key: any) => (
                  <Link
                    href={`/college/${params.collegename}/${dep?.Dname.replace(
                      /\s+/g,
                      "-"
                    )}`}
                    key={key}
                  >
                    <Button variant="outline" className="mr-2 ">
                      {dep?.Dname}
                    </Button>
                  </Link>

                  // <span key={key}>{dep?.Dname}</span>
                ))
              ) : (
                <NoDataMessage message={"No Departments found"} />
              )}
            </div>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default SingleCollege;
