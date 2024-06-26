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
import { useRegisterMutation } from "@/redux/services/authApi";
import Loader from "@/components/common/Loader";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/authSlice";
import AnimationWrapper from "@/components/common/page-animation";
import useRedirect from "@/hooks/useRedirect";
import { useEffect } from "react";
import Signup from "@/components/assets/signup.svg";
import Image from "next/image";

const formSchema = z
  .object({
    fullname: z.string().min(2, {
      message: "fullname must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "please enter a valid email address",
    }),
    password: z.string().min(6, {
      message: "password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "confirm Password must be at least 6 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

function Register() {
  const dispatch = useDispatch();
  const { redirectTo, redirectToHomeIfLoggedIn } = useRedirect();
  const { toast } = useToast();
  const [signup, { isLoading, error, isSuccess }] = useRegisterMutation();
  useEffect(() => {
    redirectToHomeIfLoggedIn();
  }, [redirectToHomeIfLoggedIn]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response: any = await signup(values).unwrap();

      dispatch(setUser(response));
      if (response) {
        redirectTo("/");
      }

      toast({
        title: "Successfully signed up",
      });
      console.log("Successfully signed");
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
      <div className="mt-[160px] md:w-[60%] w-[90%] m-auto block md:flex md:justify-between md:gap-6">
        <div className="my-10">
          <h1 className="text-3xl text-center  underline-offset-8 mb-4 font-semibold">
            Create an account
          </h1>
          <Image
            priority
            src={Signup}
            alt="Follow us on Twitter"
            width={600}
            height={400}
            className="mt-8"
          />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 sm:w-[80%] w-[90%] m-auto"
          >
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem className="sm:w-[80%] w-full m-auto">
                  <FormLabel>Fullname</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="fullname"
                      icon={"fi fi-rr-user"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="sm:w-[80%] w-full m-auto">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email"
                      icon={"fi fi-rr-envelope"}
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
                <FormItem className="sm:w-[80%] w-full m-auto">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="*********"
                      icon={"fi fi-rr-lock"}
                      {...field}
                      type="password"
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
                <FormItem className="sm:w-[80%] w-full m-auto">
                  <FormLabel>ConfirmPassword</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="*********"
                      icon={"fi fi-rr-lock"}
                      {...field}
                      type="password"
                    />
                  </FormControl>

                  <FormMessage />
                  <div className="flex justify-center items-center flex-col ">
                    <Button type="submit" size={"lg"} className="w-full mt-4">
                      Create account
                      <span> </span>
                      {isLoading ? <Loader white={true} /> : ""}
                    </Button>
                    <p className="my-4 text-pretty">
                      Have an account already?
                      <Link href={"/auth/login"} className="ml-2 text-">
                        Sign In
                      </Link>
                    </p>
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </AnimationWrapper>
  );
}

export default Register;
