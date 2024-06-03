import { Button } from "./ui/button";
import Lottie from "lottie-react";
import Hero from "@/components/assets/hero.json";
import Link from "next/link";
const Landing = () => {
  return (
    <>
      {" "}
      <div className=" flex flex-col  sm:flex-row justify-between h-1/2 m-auto w-full mt-[150px]">
        <div className="sm:w-1/2 w-full space-y-6  flex items-left justify-center flex-col">
          <h1 className="text-4xl md:text-6xl font-bold  font-display">
            YOUR DEGREE PARTNER
          </h1>
          <p className="text-sm md:text-lg leading-8 font-body">
            The My Degree is designed to assist students in monitoring, guiding
            and managing their academic progress during their fourth year of
            undergraduate studies
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
          <Lottie
            animationData={Hero}
            height={500}
            width={500}
            style={{ height: 500, width: 500 }}
          />
        </div>
      </div>
    </>
  );
};

export default Landing;
