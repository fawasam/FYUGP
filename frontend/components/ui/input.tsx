import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      name,
      id,
      value,
      placeholder,
      icon,
      disable = false,
      ...props
    },
    ref
  ) => {
    const [passwordVisible, setPasswordVisible] = React.useState(false);

    return (
      <div className="w-full relative mb-0">
        <input
          id={id}
          name={name}
          type={
            type == "password" ? (passwordVisible ? "text" : "password") : type
          }
          disabled={disable}
          defaultValue={value}
          placeholder={placeholder}
          className={cn(" input-box", className)}
          ref={ref}
          {...props}
        />
        {type === "password" ? (
          <i
            className={`fi fi-rr-eye${
              !passwordVisible ? "-crossed" : ""
            } input-icon left-[auto] right-4 cursor-pointer `}
            onClick={() => setPasswordVisible((currentVal) => !currentVal)}
          ></i>
        ) : (
          ""
        )}
        <i className={`fi ${icon} input-icon`}></i>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
