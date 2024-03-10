"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AnimationWrapper from "@/components/common/page-animation";
import Cards from "@/components/cards";
import One from "@/public/one.svg";
export default function Home() {
  return (
    <main className=" mt-24">
      <AnimationWrapper className="sm:w-[80%] w-[90%] m-auto">
        <div className="flex flex-col  sm:flex-row justify-between h-1/2 m-auto w-full">
          <div className="sm:w-1/2 w-full space-y-6">
            <h1 className="text-6xl font-bold ">YOUR DEGREE TRACKER</h1>
            <p className="text-slate-700 text-lg leading-8">
              The "TrackYourDegree" is designed to assist students in
              monitoring, guiding and managing their academic progress during
              their fourth year of undergraduate studies
            </p>
            <Button
              className="text-md p-6 my-4 text-center"
              variant={"outline"}
            >
              <p className="text-center">
                Learn FYUGP{" "}
                <i className="fi fi-rr-arrow-right ml-2 text-center pt-2 mt-2"></i>
              </p>
            </Button>
          </div>
          <div>
            <Image
              priority
              src={One}
              alt="Follow us on Twitter"
              width={500}
              height={400}
            />
          </div>
        </div>
        <Cards />
      </AnimationWrapper>
    </main>
  );
}
