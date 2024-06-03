"use client";
import AnimationWrapper from "@/components/common/page-animation";
import Cards from "@/components/cards";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetMeMutation } from "@/redux/services/userApi";
import { useEffect } from "react";
import { updateUser } from "@/redux/features/authSlice";
import AskQns from "@/components/AskQns";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Landing from "@/components/Landing";

export default function Home() {
  const dispatch = useDispatch();
  let userData = useSelector((state: RootState) => state.auth);
  const [getMe] = useGetMeMutation();

  useEffect(() => {
    const fetchUser = async () => {
      const response: any = await getMe(" ");
      dispatch(updateUser({ fields: response?.data?.data?.user }));
    };
    fetchUser();
  }, [getMe, dispatch]);

  return (
    <main className="  ">
      <AnimationWrapper className="mt-[5%] sm:w-[70%] w-[90%] m-auto min-h-[100vh]">
        <Landing />
        <div>
          <Cards />
          <HowItWorks />
          <Features />
          <AskQns />
        </div>
      </AnimationWrapper>
    </main>
  );
}
