"use client";
import { pathways } from "@/utils/pathways";
import AnimationWrapper from "@/components/common/page-animation";
import React, { useRef, useState } from "react";
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
import book from "@/components/assets/cards/pencil.svg";
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { designOfCu } from "@/utils/DeisgnOfCU";
const DesignOfUg = () => {
  const [expanded, setExpanded] = useState(false);

  const scrollBottom = (e: any) => {
    e.current.scrollIntoView({
      behavior: "smooth",
    });
  };
  const scrollRef = useRef<any>();
  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  let count = 1;
  return (
    <AnimationWrapper className="w-full  sm:p-[100px] p-[40px] m-auto sm:py-[5%] py-[20px] relative">
      <section className="max-w-[1060px] m-auto   flex-grow">
        <div className=" flex items-center justify-center min-h-[240px] w-full bg-background text-center rounded-sm">
          <div className="flex justify-center items-center">
            <Image
              priority
              width={200}
              height={200}
              src={book}
              alt="Follow us on Twitter"
              className="w-[200px] h-[100px] text-center"
            />
          </div>
          <h1 className="md:text-[48px] text-[36px] font-bold tracking-tighter text-center">
            Design of FYUGP
          </h1>
        </div>
        <div className="flex justify-between items-center  text-center m-auto">
          <div className="">
            <h3 className="text-[40px] font-normal  tracking-tight pt-[100px]">
              Understand Design of FYUGP
            </h3>
            <p></p>
          </div>
          <div className=""></div>
        </div>
        <h2 className="mt-6 my-2 text-xl font-semibold">Table of content</h2>
        {designOfCu.map((d, key) => (
          <div
            key={key}
            className="flex"
            onClick={() => scrollBottom(scrollRef)}
          >
            <span>
              {count++} - {d.title}
            </span>
          </div>
        ))}
        <div className="my-6">
          <h2 className="learn-text mb-4">
            The design of the Calicut University Four Year Undergraduate Program
            (CU-FYUGP) includes various components and options for students to
            tailor their academic journey based on their interests and goals.
            Here are some key aspects of the design
          </h2>
          <Accordion type="single" collapsible>
            {designOfCu.map((d, key) => (
              <AccordionItem
                value={d.title}
                key={key}
                className="bg-background"
                ref={scrollRef}
              >
                <AccordionTrigger className="text-md  p-6">
                  {d.title}
                </AccordionTrigger>
                <AccordionContent className="p-6">
                  <span dangerouslySetInnerHTML={d?.content}></span>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="flex justify-end items-center mt-[40px]">
          <Button>
            <Link href={"/learn/different-academic-pathways"}>
              Academic Pathways{" "}
              <i className="fi fi-rr-arrow-right ml-2 text-center "></i>
            </Link>
          </Button>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default DesignOfUg;
