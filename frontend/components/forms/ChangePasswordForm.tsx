import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import Loader from "../common/Loader";

const ChangePasswordForm = ({ form, onSubmit, isLoading }: any) => {
  return (
    <div className=" w-full md:max-w-[400px]  sm:mt-14 mt-0">
      <h1 className="max-md:hidden text-2xl font-semibold sm:mb-10">
        Change Password
      </h1>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem className=" w-full m-auto mb-6">
              <FormLabel className="my-4">Current Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Current Password"
                  type="password"
                  icon={"fi fi-rr-unlock"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className=" w-full m-auto mb-6">
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="New Password"
                  type="password"
                  icon={"fi fi-rr-unlock"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className=" w-full m-auto mb-6">
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  icon={"fi fi-rr-unlock"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button size={"lg"} className="w-full mt-4">
          Update Password
          <span> </span>
          {isLoading ? <Loader white={true} /> : ""}
        </Button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
