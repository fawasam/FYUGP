"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useForgotPasswordMutation } from "@/redux/services/authApi";
import Loader from "@/components/common/Loader";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/authSlice";
import { useState } from "react";
import AnimationWrapper from "@/components/common/page-animation";

const formSchema = z.object({
  email: z.string().email({
    message: "please enter a valid email address",
  }),
});

function ForgotPassword() {
  const { toast } = useToast();
  const [success, setSuccess] = useState<boolean>(false);
  const [
    forgotPassword,
    { isLoading, error, isSuccess },
  ] = useForgotPasswordMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response: any = await forgotPassword(values).unwrap();

      toast({
        title: "Success",
        description: response.message,
      });
      setSuccess(true);
      console.log("Reset token sent successfully");
    } catch (error) {
      const err: any = error;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: err?.data?.message,
      });
      console.log(err);
    }
  };

  return (
    <AnimationWrapper>
      <div className="md:w-[60%] w-[90%]  mt-[160px] m-auto block  md:gap-6">
        {!isSuccess ? (
          <AnimationWrapper>
            <div className="my-10">
              <h1 className="text-2xl text-center underline underline-offset-8">
                Forgot your password
              </h1>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 sm:w-[80%] w-[90%] m-auto"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="sm:w-1/2 w-full m-auto">
                      <p className="font-light text-sm mb-4 text-left">
                        Enter email address associated with your account and we
                        will send you a link to reset your password
                      </p>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="email"
                          {...field}
                          icon={"fi fi-rr-envelope"}
                        />
                      </FormControl>

                      <FormMessage />
                      <div className="flex w-full justify-center items-center flex-col mt-4">
                        <Button
                          type="submit"
                          size={"lg"}
                          className="w-full mt-4"
                        >
                          Continue
                          <span> </span>
                          {isLoading ? <Loader white={true} /> : ""}
                        </Button>
                        <p className="mt-4 text-pretty">
                          Dont have an account?
                          <Link href={"/auth/register"} className="ml-2 text-">
                            Sign Up
                          </Link>
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </AnimationWrapper>
        ) : (
          <AnimationWrapper>
            <div className="flex items-center justify-center flex-col md:w-1/2 w-full m-auto text-center p-12 border space-y-2">
              <h1 className="text-2xl">Email has been sent!</h1>
              <p className="font-light text-sm mb-8">
                Please check your email inbox and click in the received link to
                reset your password
              </p>
              <i className="fi fi-rr-envelope text-8xl mt-6"></i>
              <div className="flex w-full justify-center items-center flex-col mt-4">
                <p className="mt-4 text-pretty">
                  Back to login your account!
                  <Link href={"/auth/login"} className="ml-2 text-">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </AnimationWrapper>
        )}
      </div>
    </AnimationWrapper>
  );
}

export default ForgotPassword;
