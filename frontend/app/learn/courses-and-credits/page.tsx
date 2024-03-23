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
import book from "@/components/assets/cards/hat.svg";
import Image from "next/image";

const page = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <AnimationWrapper className="w-full  sm:p-[100px] p-[40px] m-auto sm:py-[5%] py-[20px] relative">
      <section className="max-w-[1060px] m-auto   flex-grow">
        <div className="sm:flex block items-center justify-center min-h-[240px] w-full bg-accent text-center rounded-sm">
          <div className="flex justify-center items-center">
            <Image
              priority
              src={book}
              alt="Follow us on Twitter"
              className="w-[200px] h-[100px] text-center"
            />
          </div>
          <h1 className="md:text-[48px] text-[36px] font-bold tracking-tighter text-center">
            Courses and Credit Structure of FYUGP
          </h1>
        </div>
        <div className="flex justify-between items-center  text-center m-auto">
          <div className="">
            <h3 className="text-[40px] font-normal  tracking-tight pt-[100px]">
              Understand Courses and Credit Structure of FYUGP
            </h3>
            <p></p>
          </div>
          <div className=""></div>
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
                      <h1>{path?.title}</h1>
                    </div>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                      <DrawerDescription>
                        This action cannot be undone.
                      </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                      <Button>Submit</Button>
                      <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>

                <div className="flex jusify-center item-center text-center flex-col mt-2">
                  <div className="text-lg font-medium">{path?.title}</div>
                  {/* <p>{path?.description}</p> */}
                </div>
              </>
            </div>
          ))}
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default page;
