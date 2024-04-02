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
import book from "@/components/assets/cards/book.svg";
import Image from "next/image";
import Link from "next/link";

const WhatIsFYUGP = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <AnimationWrapper className="w-full   m-auto py-[20px] relative">
      <section className="max-w-[1060px] m-auto   flex-grow">
        <div className="sm:flex block items-center justify-center min-h-[240px] w-full bg-accent text-center rounded-sm">
          <div className="flex justify-center items-center">
            <Image
              priority
              src={book}
              // fill
              width={200}
              height={200}
              alt="Follow us on Twitter"
              className="w-[200px] h-[100px] text-center"
            />
          </div>
          <h1 className="md:text-[48px] text-[36px] font-bold tracking-tighter text-center">
            What is Fourth year UG program
          </h1>
        </div>
        <div className="flex justify-between items-center  text-center m-auto">
          <div className="">
            <h3 className="text-[40px] font-normal  tracking-tight pt-[100px]">
              Understand FYUGP
            </h3>
            <p></p>
          </div>
          <div className=""></div>
        </div>
        <div className="my-6">
          <h2 className="learn-text ">
            A four-year undergraduate program typically refers to a bachelor's
            degree program that spans four years of full-time study at a
            university or college. In this type of program, students complete a
            specified number of credits over four academic years, usually
            leading to a bachelor's degree in a specific field of study. <br />{" "}
            <br />
          </h2>
          <span className="learn-text ">
            In the context of the Calicut University's Four Year Undergraduate
            Program (CU-FYUGP), there are different options available for
            students:
          </span>

          <span className="learn-text ">
            <br /> <br />
            <b>1. Three-Year UG Degree </b>: Students can opt to exit after
            three years of the four-year degree program and will be awarded a UG
            Degree in the Major discipline upon successful completion of three
            years. <br /> <br />
            <b>2. Four-Year UG Degree (Honours)</b>: Students completing the
            full four-year program with a specific number of credits and
            satisfying the minimum course requirements will be awarded a UG
            Honours Degree in the Major discipline.
            <br /> <br /> <b>
              {" "}
              3. Four-Year UG Degree (Honours with Research)
            </b>{" "}
            : This option is for students highly motivated to pursue research as
            a career. They undertake a research project or dissertation in the
            major discipline in the fourth year, in addition to completing the
            required credits for the Honours degree.
            <br />
            <br />
            <br />
            Each of these options provides students with different pathways and
            opportunities based on their academic interests and career goals
            within the framework of a four-year undergraduate program
          </span>
        </div>
        <div className="flex justify-end items-center mt-[40px]">
          <Button>
            <Link href={"/learn/design-of-fyugp"}>
              Design-of-fyugp{" "}
              <i className="fi fi-rr-arrow-right ml-2 text-center "></i>
            </Link>
          </Button>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default WhatIsFYUGP;
