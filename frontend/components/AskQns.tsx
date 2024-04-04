import React from "react";
import img from "@/components/assets/qns.png";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
const AskQns = () => {
  return (
    <div className=" px-12 bg-foreground w-full mb-10 h-full py-32 rounded-md text-center block md:flex justify-center">
      <div className="flex justify-center items-center flex-col text-center">
        <i className="fi text-background  fi-rr-cursor-finger text-6xl border-2 p-6 rounded-full"></i>
        <h3 className="text-5xl font-semibold mb-4 text-background">
          Still have an Doubts <br />- not anymore.
        </h3>
        {/* <span className="text-left text-gray-500 ">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam
          architecto doloremque corporis vero nemo!
        </span> */}

        <Link href={"/learn/ask"} className="mt-8">
          <span className="text-xl mt-4 bg-[#F8DB46] text-black p-6 py-4 rounded-xl font-bold ">
            {/* <i className="fi fi-rs-comment-question mr-2 text-lg font-bold"></i> */}
            Ask
          </span>
        </Link>
      </div>
      {/* <div className="flex items-center sm:mt-0 mt-6 justify-center">
        <Image
          src={img}
          alt={"image"}
          width={200}
          height={200}
          className="flex item-center"
        />
      </div> */}
    </div>
  );
};

export default AskQns;
