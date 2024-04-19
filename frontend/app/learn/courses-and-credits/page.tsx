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
import Link from "next/link";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";
import useRedirect from "@/hooks/useRedirect";
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

const CourseAndCredits = () => {
  const [expanded, setExpanded] = useState(false);
  const { redirectTo, redirectToHomeIfLoggedIn } = useRedirect();
  const [loading, setLoading] = useState(false);

  const handleCompleted = () => {
    setLoading(true);
    redirectTo("/");
  };

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <AnimationWrapper className="w-full  sm:p-[100px] p-[40px] m-auto sm:py-[5%] py-[20px] relative">
      <section className="max-w-[1060px] m-auto   flex-grow">
        <div className="flex items-center justify-center min-h-[240px] w-full bg-background text-center rounded-sm">
          <div className="flex justify-center items-center">
            <Image
              priority
              width={200}
              height={200}
              src={book}
              alt="Follow us on Twitter"
              className="w-[200px] h-[100px] text-center"
              // fill
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
        <div className="my-6">
          <h2 className="learn-text ">
            The Four-Year UG Programme (FYUGP), has two possible versions:
            <br />
            (a) UG Honours Programme consisting of different courses in four
            years and an optional project in the fourth year <br />
            (b) UG Honours with Research Programme consisting of different
            courses in four years and a mandatory research project in the fourth
            year In either version, the student has the exit option at the end
            of the third year with a UG Degree. The students who complete the
            four-year UG programme need to do only one year of PG programme.
            <br /> • The students who exit at the end of the third year need to
            do two years of PG programme. The total credits of the three-year UG
            Programme are 133 and that of the four-year UG Programme are 177
          </h2>
          <span className="learn-text">
            <br />
            <br />
            <b>1.1. Major</b>
            <br />
            The student should choose any one discipline as the Major and earn
            minimum 50% credits in it out of the total credits. In the
            three-year UG programme, it is specified that the student should
            earn minimum 68 credits in the Major discipline out of the total
            credits of 133 to qualify for a UG Degree in that Major. • In the
            four-year UG programme, it is specified that the student should earn
            minimum 92 credits in the Major discipline out of the total credits
            of 177. • In the four-year programme, in addition to the 92 credits
            in the Major, the student should do either three courses of total 12
            credits in the Major discipline or a Project of 12 credits in the
            Major discipline to qualify for a UG Honours Degree in that Major
            discipline. • If the project in the Major discipline is a research
            project under a research guide, the student is qualified for a UG
            Honours with Research Degree in that Major discipline.
            <br />
            <br />
            <b>1.2. Minor</b>
            <br />
            If a student earns minimum 12 credits in a discipline other than the
            Major discipline, the student is said to have entered the Minor
            stream. In the case of “Major with Multiple Disciplines pathway”,
            the student should earn 12 credits each in two different disciplines
            other than the Major. • In the case of “Major with Minor pathway”,
            the student should earn minimum 20% credits out of the total credits
            of the programme, in a single discipline other than the Major, and
            this is called the Minor discipline. • In the three-year UG
            programme, it is specified that the student should earn minimum 27
            credits in the Minor discipline to qualify for a UG degree with a
            Major and a Minor. • In the four-year UG programme, it is specified
            that the student should earn minimum 35 credits in the Minor
            discipline to qualify for a UG Honours degree with a Major and a
            Minor.
            <br />
            <br />
            <b>1.3. General Foundation Courses</b>
            <br />
            It is mandatory for all the students who enrol for a four-year UG
            programme to acquire 39 credits from 13 general foundation courses
            which are classified into four different sub categories
            (approximately about 30% of the total credits of 133 decided for the
            three-year programme). • Each general foundation course has 3
            credits. The general foundation courses should be completed in the
            first three years of FYUGP.
            <br />
            <br />
            <b>
              <u>The four Ability Enhancement Courses</u>
            </b>
            <br />
            (AEC) are offered by language departments, one each in the first
            four semesters – two of them (AEC1 and AEC3) by English department,
            and the other two (AEC2 and AEC4) by Other Language departments.
            <br />
            <br />
            <b>
              <u>The three Value Added Courses</u>
            </b>
            <br />
            (VAC) are also offered by language departments – the first one
            (VAC1) in the first semester is offered by Other Language
            departments, the second and third ones (VAC2 and VAC3), respectively
            in second and sixth semesters, are offered by English department.
            <br />
            <br />
            <b>
              <u>Skill-Enhancement Courses</u>
            </b>
            <br />
            (SEC), the first one (SEC1) in the fourth semester is offered by
            English department. The other two SEC (SEC2 and SEC3), respectively
            in the fifth and sixth semesters, can be offered by all departments.
            <br />
            <br />
            <b>
              <u>Multi-Disciplinary Course </u>
            </b>
            <br />
            In the first three semesters of the FYUGP, the student should learn
            one Multi-Disciplinary Course (MDC) each from a discipline other
            than the Major and Minor disciplines already chosen.The first and
            second MDC (MDC1 and MDC2), respectively in the first and second
            semesters, can be offered by all departments. The third MDC (MDC3)
            in the third semester is common to all the students, with
            Kerala-Specific content (KS), and offered by English (E) and Other
            Language (OL) departments. Each MDC has 3 credits.  Total 9 credits
            should be earned from MDC. In the case of the “Double Major
            pathway”, except for the four AEC, all the other nine general
            foundation courses will be distributed between the two Major
            disciplines.
            <br />
            <br />
            <b>1.4. Internship</b>
            <br />
            All the students should undergo internships / apprenticeships in a
            firm, industry, or organization or training in labs with faculty and
            researchers in their own or other HEIs/research institutions during
            the summer term. Internship has 2 credits and it should be completed
            in the first three years of FYUGP
            <br />
            <br />
            <b>1.5. Project</b>
            <br /> In the fourth year of the four-year UG programme, the student
            has the option to do a Project of 12 credits in the chosen Major
            discipline to earn a UG Honours Degree in that Major. Any faculty
            member of the college / university / higher education institute
            (HEI) can guide the student for the project. Instead of the Project,
            in the fourth year of the four-year UG programme, the student has
            the option of doing three courses of total 12 credits in the chosen
            Major discipline to earn a UG Honours Degree in that Major. If the
            student opts for UG Honours with Research Degree, he/she should do a
            mandatory research project under the supervision of a faculty member
            who is a recognized research guide of the college / university /
            higher education institute (HEI). The detailed guidelines for the
            Project in UG Honours programme and UG Honours with Research
            Programme should be specified by the BoS in each Major discipline.
          </span>
        </div>

        {/* loader  */}
        <div className="w-full h-[30vh] flex items-center justify-center">
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
              onClick={() => handleCompleted()}
            >
              <IconSquareRoundedX className="h-10 w-10" />
            </button>
          )}
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default CourseAndCredits;
