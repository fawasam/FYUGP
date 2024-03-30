"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/redux/services/authApi";
import Loader from "@/components/common/Loader";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/authSlice";
import AnimationWrapper from "@/components/common/page-animation";
import useRedirect from "@/hooks/useRedirect";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().email({
    message: "please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "password must be at least 6 characters.",
  }),
});

const Login = () => {
  const dispatch = useDispatch();
  const { redirectTo, redirectToHomeIfLoggedIn } = useRedirect();

  const { toast } = useToast();
  const [login, { isLoading }] = useLoginMutation();
  useEffect(() => {
    redirectToHomeIfLoggedIn();
  }, [redirectToHomeIfLoggedIn]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response: any = await login(values).unwrap();

      dispatch(setUser(response));
      if (response) {
        redirectTo("/");
      }
      toast({
        title: "Successfully signed up",
      });
      console.log("Successfully signed");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.data?.message,
      });
      console.log(error);
    }
  };

  return (
    <AnimationWrapper>
      <div className="md:w-[60%] w-[90%] m-auto">
        <div className="my-10">
          <h1 className="text-2xl text-center underline underline-offset-8">
            Login to your account
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
                <FormItem className="sm:w-1/2 w-full m-auto">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="*********"
                      {...field}
                      type="password"
                      icon={"fi fi-rr-lock"}
                    />
                  </FormControl>
                  <FormMessage />
                  <div className="mt-2 w-full flex justify-end">
                    <Link href={"/auth/forgotPassword"} className="ml-2 text-">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="flex justify-center items-center flex-col ">
                    <Button type="submit" size={"lg"} className="w-full mt-4">
                      Login
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
      </div>
    </AnimationWrapper>
  );
};

export default Login;
