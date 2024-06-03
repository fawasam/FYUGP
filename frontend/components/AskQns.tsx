import React from "react";
import Link from "next/link";
import Lottie from "lottie-react";
import Hero from "@/components/assets/qns.json";
const AskQns = () => {
  return (
    <div className=" px-12 bg-foreground w-full mb-10 h-full pt-0 py-32 rounded-md text-center block md:flex justify-center">
      <div className="flex justify-center items-center flex-col text-center">
        <Lottie animationData={Hero} />

        <h3 className="text-5xl font-semibold mb-4 text-background">
          Still have an Doubts <br />- not anymore.
        </h3>
        <Link href={"/learn/ask"} className="mt-8">
          <span className="text-xl mt-4 bg-[#F8DB46] text-black p-6 py-4 rounded-xl font-bold ">
            Ask
          </span>
        </Link>
      </div>
    </div>
  );
};

export default AskQns;
