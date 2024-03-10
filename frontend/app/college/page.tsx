"use client";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRegisterMutation } from "@/redux/services/authApi";
import Loader from "@/components/common/Loader";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/features/authSlice";
import AnimationWrapper from "@/components/common/page-animation";
import useRedirect from "@/hooks/useRedirect";
import {
  useGetAllCollegeMutation,
  useSearchCollegeMutation,
} from "@/redux/services/collegeApi";
import { setCollege } from "@/redux/features/collegeSlice";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const College = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [searchKey, setSearchKey] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(0);

  const [getAllCollege, { isLoading, error, isSuccess }] =
    useGetAllCollegeMutation();
  const [searchCollege] = useSearchCollegeMutation();

  let collegesData = useSelector((state: RootState) => state.college);
  let { collegeInfo: colleges, collegeInfo, items } = collegesData;
  console.log(colleges.length);

  const getAllColleges = async () => {
    const response: any = await getAllCollege("");
    dispatch(setCollege(response?.data));
  };

  const handleSearch = async (e: any) => {
    if (searchKey == "") {
      toast({
        title: "Please Provide place or college name",
      });
    } else {
      const response: any = await searchCollege(searchKey);
      dispatch(setCollege(response?.data));
    }
  };
  useEffect(() => {
    getAllColleges();

    clearTimeout(typingTimeout);

    if (searchKey !== "") {
      const timeoutId: any = setTimeout(() => {
        getAllColleges();
      }, 500); // Adjust the delay (in milliseconds) as needed

      setTypingTimeout(timeoutId);
    }
  }, [searchKey]);
  return (
    <AnimationWrapper>
      <div className="md:w-[60%] w-[90%] m-auto">
        <div className="my-10">
          <h1 className="text-2xl text-center underline underline-offset-8">
            Colleges under CU
          </h1>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <Input
            type="text"
            className="px-3 py-2 w-80"
            placeholder="Search..."
            onChange={(e: any) => setSearchKey(e.target.value)}
          />
          <Button className="px-3 py-2" onClick={handleSearch}>
            Search
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mt-12">
          {colleges.length === 0 ? <h2>No data</h2> : null}
          {colleges?.map((college: any, i: number) => (
            <div key={i}>
              {isLoading ? (
                <>
                  <Skeleton className=" w-full h-[200px] rounded-xl" />
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-[200px] mt-2" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </>
              ) : (
                <Link
                  href={college._id}
                  className="group flex flex-col justify-between"
                >
                  <div className=" ">
                    <div className="border w-full h-[200px]  overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                      {college?.picture ? (
                        <img
                          src={college?.picture}
                          alt={college?.collegename}
                          className="object-cover w-full h-full  group-hover:opacity-75 border"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    <h3 className="mt-4 text-sm text-gray-700 uppercase">
                      {college.collegename}
                    </h3>
                    <Badge variant="secondary" className="capitalize">
                      {college.type}
                    </Badge>
                    <p className="mt-1 text-lg font-medium text-gray-900 capitalize">
                      {college.place}
                    </p>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default College;
