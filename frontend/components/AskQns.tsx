import React from "react";
import img from "@/components/assets/qns.png";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
const AskQns = () => {
  return (
    <div className=" px-12 bg-accent w-full mb-10 h-full py-12 rounded-md text-center block md:flex justify-center">
      <div className="flex justify-items-start items-start flex-col">
        <h3 className="text-3xl font-semibold mb-4">
          Still have an Doubts...?
        </h3>
        <span className="text-left text-gray-500 ">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam
          architecto doloremque corporis vero nemo!
        </span>

        <Link href={"/learn/ask"}>
          <Button size={"lg"} className="mt-4">
            <i className="fi fi-rs-comment-question mr-2 text-lg"></i>
            Ask
          </Button>
        </Link>
      </div>
      <div className="flex items-center sm:mt-0 mt-6 justify-center">
        <Image
          src={img}
          alt={"image"}
          width={200}
          className="flex item-center"
        />
      </div>
    </div>
  );
};

export default AskQns;
