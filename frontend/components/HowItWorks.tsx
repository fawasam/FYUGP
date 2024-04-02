"use client";
import React, { useState } from "react";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";

const loadingStates = [
  {
    text: "What is Fourth year UG program",
  },
  {
    text: "Design of FYUGP",
  },
  {
    text: "Different Acedemic Pathways",
  },
  {
    text: "Courses and Credit Structure of FYUGP",
  },
];

const HowItWorks = () => {
  const [loading, setLoading] = useState(false);
  return (
    <section className="flex text-center flex-col justify-center my-20">
      <div className="mb-6">
        <h2 className="my-6 text-3xl font-semibold underline-offset-1 text-center mb-6">
          How It Works
        </h2>
      </div>
      <div className="grid grid-col-1 md:grid-cols-3 gap-y-4">
        <div className="flex flex-col items-center justify-center">
          <i className="fi fi-rs-map text-4xl border p-4 rounded-full bg-foreground text-primary-foreground "></i>
          <h2 className="text-xl font-semibold tracking-tighter mt-2">
            Choose A Pathway
          </h2>
          <span>Please select a pathway first to continue</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <i className="fi fi-rr-graduation-cap text-4xl border p-4 rounded-full bg-foreground text-primary-foreground"></i>
          <h2 className="text-xl font-semibold tracking-tighter mt-2">
            Select A Discipline
          </h2>
          <span>Please select a pathway first to continue</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <i className="fi fi-sr-list-check text-4xl border p-4 rounded-full bg-foreground text-primary-foreground"></i>
          <h2 className="text-xl font-semibold tracking-tighter mt-2">
            Pick Approapriate Course
          </h2>
          <span>Please select a pathway first to continue</span>
        </div>
      </div>
      {/* <i className="fi fi-ts-book-open-cover text-4xl border p-4 rounded-full bg-foreground text-primary-foreground"></i>
      <i className="fi fi-ts-books text-4xl border p-4 rounded-full bg-foreground text-primary-foreground"></i>
      <i className="fi fi-rr-graduation-cap text-4xl border p-4 rounded-full bg-foreground text-primary-foreground"></i>
      <i className="fi fi-tr-book-open-reader text-4xl border p-4 rounded-full bg-foreground text-primary-foreground"></i> */}

      <div className="w-full h-[60vh] flex items-center justify-center">
        {/* Core Loader Modal */}
        <Loader
          loadingStates={loadingStates}
          loading={loading}
          duration={1000}
          loop={false}
        />

        {/* The buttons are for demo only, remove it in your actual code ⬇️ */}
        <button
          onClick={() => setLoading(true)}
          className="bg-[#39C3EF] hover:bg-[#39C3EF]/90 text-black mx-auto text-sm md:text-base transition font-medium duration-200 h-10 rounded-lg px-8 flex items-center justify-center"
          style={{
            boxShadow:
              "0px -1px 0px 0px #ffffff40 inset, 0px 1px 0px 0px #ffffff40 inset",
          }}
        >
          Continue
        </button>

        {loading && (
          <button
            className="fixed top-4 right-4 text-black dark:text-white z-[120]"
            onClick={() => setLoading(false)}
          >
            <IconSquareRoundedX className="h-10 w-10" />
          </button>
        )}
      </div>
    </section>
  );
};

export default HowItWorks;
