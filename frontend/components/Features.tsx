import React from "react";
import AnimationWrapper from "./common/page-animation";
import Image from "next/image";
import Book from "@/components/assets/book-3.svg";
import { Button } from "./ui/button";
import { features } from "@/utils/features";
import Lottie from "react-lottie";
// import dynamic from "next/dynamic";
// var Lottie = dynamic(() => import("react-lottie"), {
//   ssr: false,
// });

const Features = () => {
  return (
    <AnimationWrapper className="flex  flex-col justify-center my-20">
      <div className="mb-6">
        <h2 className="my-6 text-3xl font-semibold underline-offset-1 text-center mb-6">
          Features
        </h2>
        <h3 className="text-center">
          Discover the Features that offering TrackMyDegree
        </h3>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] gap-4">
          {features?.map((item, i) => (
            <div
              key={i}
              className={` hover:drop-shadow-md border-2 border-card-foreground rounded-xl p-6 flex flex-col items-center justify-center ${
                i === 0 || i === 2 ? "row-span-2 bg-blueTwo  " : "bg-redOne "
              } ${item.color ? "bg-${item.color}" : "bg-blueTwo"} `}
            >
              <div
                className={` mb-4 border-2 border-card-foreground  bg-white rounded-md flex items-center justify-center ${
                  i == 0 || i == 2 ? "md:h-full h-fit " : "w-[200px]"
                }`}
              >
                <Lottie
                  options={{
                    animationData: item?.image,
                    loop: true,
                    autoplay: true,
                    rendererSettings: {
                      preserveAspectRatio: "xMidYMid slice",
                    },
                  }}
                />
                {/* <Image
                  src={item.image}
                  alt="book image"
                  width={100}
                  height={100}
                  className=""
                /> */}
              </div>

              <h2 className="text-left text-xl text-primary-foreground">
                {item.title}
              </h2>
              <p className="text-primary-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default Features;
