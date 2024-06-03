"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Icon from "@/components/assets/1.png";
import Icon2 from "@/components/assets/2.png";
const Footer = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className=" sm:w-[75%] w-[90%] h-full m-auto  border-b border-t mt-[100px]">
      <footer className=" rounded-lg   m-4">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:pt-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex">
              <Image
                src={theme === "dark" ? Icon : Icon2}
                alt={"icon"}
                width={100}
                height={100}
                className="w-100 md:w-200"
              />
              {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                MyDegree
              </span> */}
            </div>
            {/* </a> */}
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <Link href={"/faq"} className="hover:underline me-4 md:me-6">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href={"/contact"} className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <Link href="/" className="hover:underline">
              TrackMyDegree
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
