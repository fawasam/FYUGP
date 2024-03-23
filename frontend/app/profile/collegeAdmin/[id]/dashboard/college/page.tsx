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

const AdminCollege = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const [college, setCollege] = useState<any>({});
  const { redirectTo, redirectToHomeIfLoggedIn } = useRedirect();
  let userData = useSelector((state: RootState) => state.auth);
  let { userInfo: user, userToken, isAuthenticated } = userData;
  const [getACollege] = useGetACollegeMutation();

  const getCollegeData = async () => {
    const response: any = await getACollege(user.college);
    setCollege(response?.data?.data?.college);
  };
  console.log(college);

  useEffect(() => {
    getCollegeData();
    if (!user) {
      redirectTo("/");
    }
  }, [userData, dispatch, router]);
  return (
    <AnimationWrapper className="w-full">
      <section className="w-full ">
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
          <Link
            href={`/profile/${user.role}/${user?.username}/dashboard/college/update`}
          >
            <Button
              size={"sm"}
              variant={"outline"}
              className=" my-4 absolute top-0 right-0  mr-4"
            >
              Update
              <i className="fi fi-rs-edit ml-2 "></i>
            </Button>
          </Link>
        </div>
        <div>
          <h1 className="text-2xl mt-4 font-bold">{college?.collegename}</h1>
          <span className="text-md  font-thin">{college?.place}</span>
          <div className="pt-4 flex flex-col">
            <h3 className="text-lg font-medium">ABOUT</h3>
            <span className="leading-normal">{college?.about}</span>
          </div>
          <div className="pt-4 flex flex-col">
            <h3 className="text-lg font-medium pb-2">DEPARTMENT</h3>
            <div className="mr-2">
              {college?.departments && college.departments.length > 0 ? (
                college.departments.map((dep: any, key: any) => (
                  <Button variant="outline" key={key} className="mr-2 ">
                    {dep?.Dname}
                  </Button>

                  // <span key={key}>{dep?.Dname}</span>
                ))
              ) : (
                <span>No departments found</span>
              )}
            </div>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default AdminCollege;
