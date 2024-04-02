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
      <h2 className="my-6 text-3xl font-semibold underline-offset-1 text-center mb-10">
        Learn through these Steps
      </h2>
      <div className="grid  lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:gap-6  gap-2 m-auto ">
        <div className=" card  text-center border">
          <Link href={"learn/what-is-fyugp"}>
            <div className="flex justify-center items-center flex-col w-full h-full">
              <h1 className="text-4xl font-semibold mb-4 text-accent">
                Step 1
              </h1>
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
        <div className="  card w-[250px] border">
          <Link href={"learn/design-of-fyugp"}>
            <div className="flex justify-center items-center flex-col w-full h-full">
              <h1 className="text-4xl font-semibold mb-4 text-accent">
                Step 2
              </h1>
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
        <div className="card w-[250px] border">
          <Link href={"learn/different-academic-pathways"}>
            <div className="flex justify-center items-center w-full h-full flex-col text-center">
              <h1 className="text-4xl font-semibold mb-4 text-accent">
                Step 3
              </h1>
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
        <div className=" card  border">
          <Link href={"learn/courses-and-credits"}>
            <div className="flex justify-center items-center w-full h-full flex-col">
              <h1 className="text-4xl font-semibold mb-4 text-accent">
                Step 4
              </h1>
              <Image
                className="object-cover"
                src={pencil}
                alt={"pencil.svg"}
                width={100}
                height={100}
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
