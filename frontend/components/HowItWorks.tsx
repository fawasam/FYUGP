"use client";
import React, { useState } from "react";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";
import { Button } from "./ui/button";
import Link from "next/link";

const HowItWorks = () => {
  return (
    <section className="flex text-center flex-col justify-center my-20">
      <div className="mb-6">
        <h2 className="my-6 text-3xl font-semibold underline-offset-1 text-center mb-6">
          How It Works
        </h2>
      </div>
      <div className="grid gap-6 grid-col-1 md:grid-cols-3 ">
        <div className="flex flex-col items-center justify-center bg-[#E0EDFE] p-8 rounded-lg">
          <i className="fi fi-rs-map text-4xl border p-4 rounded-full bg-foreground text-primary-foreground "></i>
          <h2 className="text-black text-xl font-semibold tracking-tighter mt-2 stroke-black">
            Choose A Pathway
          </h2>
          <span className="text-black">
            Please select a pathway first to continue
          </span>
        </div>
        <div className="flex flex-col items-center justify-center bg-[#E0EDFE] p-8 rounded-lg">
          <i className="fi fi-rr-graduation-cap text-4xl border p-4 rounded-full bg-foreground text-primary-foreground"></i>
          <h2 className="text-black text-xl font-semibold tracking-tighter mt-2">
            Select A Discipline
          </h2>
          <span className="text-black">
            Please select a pathway first to continue
          </span>
        </div>
        <div className="flex flex-col items-center justify-center bg-[#E0EDFE] p-8 rounded-lg">
          <i className="fi fi-sr-list-check text-4xl border p-4 rounded-full bg-foreground text-primary-foreground"></i>
          <h2 className="text-black text-xl font-semibold tracking-tighter mt-2">
            Pick Approapriate Course
          </h2>
          <span className="text-black">
            Please select a pathway first to continue
          </span>
        </div>
      </div>
      <div className="mt-6 ">
        <Link href={"/learn/degree"}>
          <Button>Learn More</Button>
        </Link>
      </div>
      {/* <i className="fi fi-ts-book-open-cover text-4xl border p-4 rounded-full bg-foreground text-primary-foreground"></i>
      <i className="fi fi-ts-books text-4xl border p-4 rounded-full bg-foreground text-primary-foreground"></i>
      <i className="fi fi-rr-graduation-cap text-4xl border p-4 rounded-full bg-foreground text-primary-foreground"></i>
      <i className="fi fi-tr-book-open-reader text-4xl border p-4 rounded-full bg-foreground text-primary-foreground"></i> */}
    </section>
  );
};

export default HowItWorks;
