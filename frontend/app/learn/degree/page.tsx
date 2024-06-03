"use client";
import AnimationWrapper from "@/components/common/page-animation";
import React, { useState } from "react";
import { motion, useScroll } from "framer-motion";
import { steps } from "@/utils/Steps";
import Link from "next/link";
const LearnDegree = () => {
  const [show, setShow] = useState<any>(false);
  const { scrollYProgress } = useScroll();
  const handleShow = (item: any) => {
    // setShow(!show);
    setShow((prev: any) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };
  return (
    <AnimationWrapper className="mt-[5%] sm:w-[70%] w-[90%] m-auto min-h-[100vh]">
      <section className="my-4 mt-[150px]">
        <div className="flex  items-center justify-center min-h-[240px] w-full bg-background text-center rounded-sm shadow-sm">
          <div className="flex items-center justify-center h-full">
            <h1 className="md:text-[48px] text-[36px] font-bold tracking-tighter text-center">
              FYUGP Pathway
            </h1>
          </div>
        </div>
        <motion.div style={{ scaleX: scrollYProgress }} />
        <div className="space-y-8 mt-12">
          {steps.map((item: any, key: any) => (
            <div key={key}>
              <div className="flex text-center items-left  ">
                <span className="px-6 py-2 bg-orange-400 rounded-lg mr-4">
                  Step {item.no}
                </span>
                <h1 className="text-center text-md md:text-xl font-semibold ">
                  {item.title}
                  {item?.description ? (
                    <i
                      className="fi fi-rs-info  cursor-pointer"
                      onClick={() => handleShow(item?.no)}
                    ></i>
                  ) : (
                    ""
                  )}
                  {item?.link ? (
                    <Link href={item?.link}>
                      <i className="fi fi-rs-info  cursor-pointer ml-2"></i>
                    </Link>
                  ) : (
                    ""
                  )}
                </h1>
              </div>
              <div className="space-y-6 mt-6">
                {item?.substep?.map((item2: any, key: any) => (
                  <div key={key}>
                    <div className="flex text-center items-left pl-28 ">
                      <span className="px-6 py-2 bg-orange-400 rounded-lg mr-6">
                        Step {item2.no}
                      </span>
                      <h1 className="text-left text-md md:text-lg font-semibold ">
                        {item2.title}
                        {item2?.description ? (
                          <i
                            className="fi fi-rs-info  cursor-pointer"
                            onClick={() => handleShow(item2?.no)}
                          ></i>
                        ) : (
                          ""
                        )}
                      </h1>
                    </div>
                    {show[item2?.no] ? (
                      <p className="mt-4 text-base pl-28">
                        {item2?.description}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </div>
              {show[item?.no] ? (
                <p className="mt-4 text-base">{item?.description}</p>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default LearnDegree;
