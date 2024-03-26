"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import AnimationWrapper from "./common/page-animation";

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
import useRedirect from "@/hooks/useRedirect";
import { useEffect } from "react";
import { Textarea } from "./ui/textarea";

import email from "@/components/assets/email2.png";
import Image from "next/image";
const formSchema = z.object({
  subject: z.string().min(2, {
    message: "subject must be at least 2 characters.",
  }),
  message: z.string().email({
    message: "please enter a message",
  }),
});

const Enquiry = () => {
  const dispatch = useDispatch();
  const { redirectTo, redirectToHomeIfLoggedIn } = useRedirect();
  const { toast } = useToast();
  const [signup, { isLoading, error, isSuccess }] = useRegisterMutation();
  //   useEffect(() => {
  //     redirectToHomeIfLoggedIn();
  //   });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    //   try {
    //     const response: any = await signup(values).unwrap();
    //     dispatch(setUser(response));
    //     if (response) {
    //       redirectTo("/");
    //     }
    //     toast({
    //       title: "Successfully signed up",
    //     });
    //     console.log("Successfully signed");
    //   } catch (error: any) {
    //     toast({
    //       variant: "destructive",
    //       title: "Uh oh! Something went wrong.",
    //       description: error.data.message,
    //     });
    //     console.log(error.data.message);
    //   }
  };

  return (
    <AnimationWrapper className="w-full">
      <section className="my-36  bg-acccent flex items-center justify-center flex-col md:flex-row space-y-10">
        <div className="w-full flex items-center justify-center">
          <Image src={email} alt="image" className=" w-[300px] md:w-[400px] " />
        </div>
        <div className="w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              <h2 className="text-3xl font-bold tracking-tighter">
                Get in touch
              </h2>
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem className="w-full m-auto">
                    {/* <FormLabel>Subject</FormLabel> */}
                    <FormControl>
                      <Input
                        placeholder="Subject"
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
                  <FormItem className=" w-full m-auto">
                    {/* <FormLabel>Email</FormLabel> */}
                    <FormControl>
                      <Input
                        placeholder="Email"
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
                name="message"
                render={({ field }) => (
                  <FormItem className=" w-full m-auto">
                    {/* <FormLabel>Message</FormLabel> */}
                    <FormControl>
                      <Textarea
                        className="input-box h-64 lg:h-40 resize-none leading-7 mt-5 pl-5"
                        placeholder="Message"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                    <div className="flex justify-center items-center flex-col ">
                      <Button type="submit" size={"lg"} className="w-full mt-4">
                        Send
                        <span> </span>
                        {isLoading ? <Loader white={true} /> : ""}
                      </Button>
                    </div>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default Enquiry;
