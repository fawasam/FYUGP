"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AnimationWrapper from "@/components/common/page-animation";
import Cards from "@/components/cards";
export default function Home() {
  return (
    <main className=" mt-24">
      <AnimationWrapper className="sm:w-[80%] w-[90%] m-auto">
        <div className="flex flex-col  sm:flex-row justify-between h-1/2 m-auto w-full">
          <div className="sm:w-1/2 w-full space-y-6">
            <h1 className="text-6xl font-bold ">YOUR DEGREE TRACKER</h1>
            <p className="text-slate-700 text-lg leading-8">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Laudantium accusantium non dicta odio mollitia, necessitatibus
              perspiciatis. Pariatur, labore quo corrupti libero odio nesciunt,
              dolor enim corporis commodi culpa soluta molestiae?
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
            <h1>Hello</h1>
          </div>
        </div>
        <Cards />
      </AnimationWrapper>
    </main>
  );
}
