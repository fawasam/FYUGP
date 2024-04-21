"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { any, z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useResetPasswordMutation } from "@/redux/services/authApi";
import Loader from "@/components/common/Loader";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/authSlice";
import { useState } from "react";
import AnimationWrapper from "@/components/common/page-animation";

const formSchema = z
  .object({
    password: z.string().min(6, {
      message: "password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "confirm Password must be at least 6 characters.",
    }),
    token: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

function ResetPassword({ params }: { params: { token: string } }) {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [
    resetPassword,
    { isLoading, error, isSuccess },
  ] = useResetPasswordMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      token: params.token,
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response: any = await resetPassword(values).unwrap();
      dispatch(setUser(response));
      toast({
        title: "Success",
        description: "Successfully rested your password",
      });
      console.log("Reset token sent successfully");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      });
      console.log(error);
    }
  };

  return (
    <div className="md:w-[60%] w-[90%]  mt-[160px] m-auto block  md:gap-6">
      <AnimationWrapper>
        <div className="my-10">
          <h1 className="text-2xl text-center underline underline-offset-8">
            Reset your password
          </h1>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 sm:w-[80%] w-[90%] m-auto"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="sm:w-1/2 w-full m-auto">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="*********" {...field} type="password" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="sm:w-1/2 w-full m-auto">
                  <FormLabel>ConfirmPassword</FormLabel>
                  <FormControl>
                    <Input placeholder="*********" {...field} type="password" />
                  </FormControl>

                  <FormMessage />
                  <div className="flex justify-center items-center flex-col ">
                    <Button type="submit" size={"lg"} className="w-full mt-4">
                      Reset password
                      <span> </span>
                      {isLoading ? <Loader white={true} /> : ""}
                    </Button>
                    {/* <p className="my-4 text-pretty">
                      Have an account already?
                      <Link href={"/auth/login"} className="ml-2 text-">
                        Sign In
                      </Link>
                    </p> */}
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </AnimationWrapper>
    </div>
  );
}

export default ResetPassword;
