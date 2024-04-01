"use client";
import { pathways } from "@/utils/pathways";
import AnimationWrapper from "@/components/common/page-animation";
import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import book from "@/components/assets/book0shack.svg";
import Image from "next/image";
import Link from "next/link";

const AcademicPathways = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <AnimationWrapper className="w-full  sm:p-[100px] p-[40px] m-auto sm:py-[5%] py-[20px] relative">
      <section className="max-w-[1060px] m-auto   flex-grow">
        <div className="learn-top-block">
          <div className="flex justify-center items-center my-4">
            <Image
              priority
              width={200}
              height={200}
              src={book}
              alt="Follow us on Twitter"
              className="w-[200px] h-[100px] text-center mt-4"
            />
          </div>
          <h1 className="md:text-[48px] text-[32px] font-bold tracking-tighter text-center">
            Different Acedemic Pathways
          </h1>
        </div>
        <div className="flex justify-between items-center  text-center m-auto">
          <div className="">
            <h3 className="md:text-[40px] text-3xl font-normal leading-10 tracking-tight pt-[100px]">
              Understand the different Pathways.
            </h3>
            <p></p>
          </div>
          <div className=""></div>
        </div>
        <div className="my-6 text-center md:text-left">
          <span className="learn-text ">
            The Calicut University's Four Year Undergraduate Program (CU-FYUGP)
            offers different academic pathways for students to customize their
            educational experience based on their interests and career goals.
            These pathways provide students with options to focus on specific
            disciplines, develop core competencies in multiple areas, or combine
            majors and minors. Here are the different academic pathways :
          </span>
        </div>
        <div className="grid lg:grid-cols-5  grid-cols-1 sm:grid-cols-2 gap-4 pt-[5rem]">
          {pathways.map((path, key) => (
            <div
              className="w-full flex justify-center items-center flex-col"
              onClick={toggleExpansion}
              key={key}
            >
              <>
                <Drawer>
                  <DrawerTrigger key={key}>
                    <div className=" flex justify-center items-center h-[220px] w-[200px] bg-accent rounded-3xl  text-center">
                      <h1 className="text-5xl font-light ">{path?.no}</h1>
                    </div>
                  </DrawerTrigger>
                  <DrawerContent className="min-h-screen ">
                    <DrawerHeader className="lg:w-[80%] m-auto">
                      <DrawerTitle className="text-center text-xl md:text-3xl mb-4 tracking-tighter">
                        {path.title} pathway
                      </DrawerTitle>
                      <DrawerDescription
                        className="text-md sm:text-lg font-thin leading-8  text-center text-primary"
                        dangerouslySetInnerHTML={path?.description}
                      ></DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                      <DrawerClose>
                        <Button variant="outline">Close</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>

                <div className="flex jusify-center item-center text-center flex-col mt-2">
                  <div className="text-md font-medium">{path?.title}</div>
                </div>
              </>
            </div>
          ))}
        </div>
        <div className="flex justify-end items-center mt-[40px]">
          <Button>
            <Link href={"/learn/courses-and-credits"}>
              Courses and Credits
              <i className="fi fi-rr-arrow-right ml-2 text-center "></i>
            </Link>
          </Button>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default AcademicPathways;
