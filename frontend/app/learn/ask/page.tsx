"use client";
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
import AnimationWrapper from "@/components/common/page-animation";
import { Input } from "@/components/ui/input";

const AskQns = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const [searchKey, setSearchKey] = useState("");
  const [question, setQuestion] = useState("");

  const { redirectTo, redirectToHomeIfLoggedIn } = useRedirect();
  let userData = useSelector((state: RootState) => state.auth);
  let { userInfo: user, userToken, isAuthenticated } = userData;

  const handleSearch = async (e: any) => {
    setQuestion(searchKey);
    // if (searchKey == "") {
    //   toast({
    //     title: "Please Provide place or college name",
    //   });
    // } else {
    //   const response: any = await searchCollege(searchKey);
    //   dispatch(setCollege(response?.data));
    // }
  };

  useEffect(() => {
    if (!user) {
      redirectTo("/");
    }
  }, [userData, dispatch, router]);
  return (
    <AnimationWrapper className="w-full  sm:p-[100px] p-[40px] m-auto sm:py-[5%] py-[20px] relative">
      <section className="max-w-[1060px] m-auto   flex-grow">
        <div className="sm:flex flex items-center justify-center min-h-[240px] w-full bg-accent text-center rounded-sm">
          <div className="flex justify-center items-center">
            <h1 className="md:text-[48px] text-[36px] font-bold tracking-tighter text-center ">
              Ask about FourthYearDegree
            </h1>
          </div>
        </div>
        <div className=" w-full mt-6">
          <div className="flex w-full">
            <Input
              type="text"
              className="px-3 py-2 w-full "
              placeholder="Type your message..."
              onChange={(e: any) => setSearchKey(e.target.value)}
            />
            <Button className="px-3 py-2 ml-2" onClick={handleSearch}>
              Search
            </Button>
          </div>
          <div>
            <span>{question}</span>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default AskQns;
