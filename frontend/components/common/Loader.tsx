import React, { FC } from "react";
import Image from "next/image";
import spinner from "../assets/spinner.svg";
import spinnerWhite from "../assets/spinner-white.svg";

interface LoaderProps {
  white?: boolean;
}

const Loader: FC<LoaderProps> = ({ white }: LoaderProps) => {
  return (
    <>
      {white ? (
        <Image
          className="object-cover"
          src={spinnerWhite}
          alt={"spinner"}
          width={20}
        />
      ) : (
        <Image
          className="object-cover"
          src={spinner}
          alt={"spinner"}
          width={20}
        />
      )}
    </>
  );
};
export default Loader;
