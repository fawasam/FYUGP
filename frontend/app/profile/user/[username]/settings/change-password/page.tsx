"use client";
import AnimationWrapper from "@/components/common/page-animation";
import InputBox from "@/components/ui/InputBox";
import { Button } from "@/components/ui/button";
import React, { useRef } from "react";

const ChangePassword = () => {
  const handleSubmit = () => {};
  let changePasswordForm = useRef<HTMLFormElement>(null);
  return (
    <AnimationWrapper>
      <form action="" ref={changePasswordForm}>
        <h1 className="max-md:hidden">Change Password</h1>
        <div className="py-10 w-full md:max-w-[400px] ">
          <InputBox
            name={"currentPassword"}
            type={"password"}
            className="profile-edit-input "
            placeholder={"Current Password"}
            icon={"fi fi-rr-unlock"}
          />
          <InputBox
            name={"newPassword"}
            type={"password"}
            className="profile-edit-input "
            placeholder={"New Password"}
            icon={"fi fi-rr-unlock"}
          />
          <Button className=" px-10" type="submit" onClick={handleSubmit}>
            {" "}
            Change Password
          </Button>
        </div>
      </form>
    </AnimationWrapper>
  );
};

export default ChangePassword;
