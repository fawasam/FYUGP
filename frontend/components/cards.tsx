import React from "react";
import book from "../components/assets/cards/book.svg";
import hat from "../components/assets/cards/hat.svg";
import pencil from "../components/assets/cards/pencil.svg";
import book2 from "../components/assets/cards/book2.svg";
import Image from "next/image";
import Link from "next/link";
const Cards = () => {
  return (
    <div className="my-24 m-auto items-center">
      <div className="grid  grid-cols-4 gap-6  m-auto ">
        <div className="bg-[#DAF5EF] card  text-center">
          <Link href={"learn/what-is-fyugp"}>
            <div className="flex justify-center items-center flex-col w-full h-full">
              <Image
                className="object-cover items-center"
                src={book}
                alt={"book"}
                width={100}
                height={100}
              />
              <h2 className="font-thin  text-center mt-4">
                What is FourthYear UndergraduatedDegree
              </h2>
            </div>
          </Link>
        </div>
        <div className=" bg-[rgb(255,253,207)] card">
          <Link href={"learn/design-of-fyugp"}>
            <div className="flex justify-center items-center flex-col w-full h-full">
              <Image
                className="object-cover items-center"
                src={hat}
                alt={"hat.svg"}
                width={100}
                height={100}
              />
              <h2 className="font-thin mt-4">Design of CU-FYUGP</h2>
            </div>
          </Link>
        </div>
        <div className="bg-[rgb(254,212,255)] card">
          <Link href={"learn/different-academic-pathways"}>
            <div className="flex justify-center items-center w-full h-full flex-col text-center">
              <Image
                className="object-cover text-center"
                // className="object-cover hover:scale-125 transition"
                src={book2}
                alt={"book2.svg"}
                width={100}
                height={100}
              />
              <h2 className="font-thin mt-4">Different Academic Pathways</h2>
            </div>
          </Link>
        </div>
        <div className="bg-[rgb(233,248,254)] card ">
          <Link href={"learn/courses-and-credits"}>
            <div className="flex justify-center items-center w-full h-full flex-col">
              <Image
                className="object-cover"
                src={pencil}
                alt={"pencil.svg"}
                width={90}
              />
              <h2 className="font-thin mt-6">
                Courses and Credit Structure of FYUGP
              </h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cards;
