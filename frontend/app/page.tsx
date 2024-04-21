"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AnimationWrapper from "@/components/common/page-animation";
import Cards from "@/components/cards";
import One from "@/public/one.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetMeMutation } from "@/redux/services/userApi";
import { useEffect, useRef } from "react";
import { updateUser } from "@/redux/features/authSlice";
import Faq from "@/components/Faq";
import AskQns from "@/components/AskQns";
import Enquiry from "@/components/Enquiry";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import BookAnimated from "@/components/assets/books_animated_2.json";
import Hero from "@/components/assets/hero.json";
import Link from "next/link";
// import ChatBot from "react-simple-chatbot";
// import Lottie from "react-lottie";
import dynamic from "next/dynamic";
var Lottie = dynamic(() => import("react-lottie"), {
  ssr: false,
});
import lottie from "lottie-web";
export default function Home() {
  const dispatch = useDispatch();
  let userData = useSelector((state: RootState) => state.auth);
  let { userInfo: user, userToken, isAuthenticated } = userData;
  const [getMe] = useGetMeMutation();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Hero,
    // rendererSettings: {
    //   preserveAspectRatio: "xMidYMid slice",
    // },
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response: any = await getMe(" ");
      console.log(response);
      dispatch(updateUser({ fields: response?.data?.data?.user }));
    };
    fetchUser();
  }, [getMe, dispatch]);

  return (
    <main className="  ">
      <AnimationWrapper className="mt-[5%] sm:w-[70%] w-[90%] m-auto min-h-[100vh]">
        <div className=" flex flex-col  sm:flex-row justify-between h-1/2 m-auto w-full mt-[150px]">
          <div className="sm:w-1/2 w-full space-y-6  flex items-left justify-center flex-col">
            <h1 className="text-6xl font-bold  font-display">
              YOUR DEGREE TRACKER
            </h1>
            <p className=" text-lg leading-8 font-body">
              The TrackYourDegree is designed to assist students in monitoring,
              guiding and managing their academic progress during their fourth
              year of undergraduate studies
            </p>
            <Link href={"/learn/what-is-fyugp"}>
              <Button
                className="text-md p-6 my-4 text-center w-1/2"
                variant={"outline"}
              >
                <p className="text-center">
                  Learn FYUGP{" "}
                  <i className="fi fi-rr-arrow-right ml-2 text-center pt-2 mt-2"></i>
                </p>
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-end mt-0">
            {/* <div ref={animationContainer}></div> */}
            <Lottie options={defaultOptions} height={500} width={500} />
            {/* <Image
              priority
              src={One}
              alt="Follow us on Twitter"
              width={500}
              height={400}
            /> */}
          </div>
        </div>
        <div>
          <Cards />
          <HowItWorks />
          <Features />
          <AskQns />
          {/* <Enquiry /> */}
          {/* <Faq /> */}
          {/* <div className="flex">
            <ChatBot
              style={{ fontFamily: "system-ui" }}
              floating={true}
              headerTitle={"FYUGP CHAT"}
              steps={[
                {
                  id: "1",
                  message: "What is your name?",
                  trigger: "2",
                },
                {
                  id: "2",
                  user: true,
                  trigger: "3",
                },
                {
                  id: "3",
                  message: "Hi {previousValue}, nice to meet you!",
                  end: true,
                },
              ]}
            />
          </div> */}
        </div>
      </AnimationWrapper>
    </main>
  );
}
