"use client";
import AnimationWrapper from "@/components/common/page-animation";
import { Button } from "@/components/ui/button";
import React, { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useUpdatePasswordMutation } from "@/redux/services/userApi";
import { useDispatch } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import useRedirect from "@/hooks/useRedirect";
import Loader from "@/components/common/Loader";
import ChangePasswordForm from "@/components/forms/ChangePasswordForm";

const formSchema = z
  .object({
    currentPassword: z.string().min(6, {
      message: "password must be at least 6 characters.",
    }),
    password: z.string().min(6, {
      message: "password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "password must be at least 6 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { redirectTo, redirectToHomeIfLoggedIn } = useRedirect();
  const { toast } = useToast();
  const [updatePassword, { isLoading, error, isSuccess }] =
    useUpdatePasswordMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response: any = await updatePassword(values).unwrap();
      toast({
        title: "Successfully Updated Password",
      });
      console.log("Successfully Updated Password");
      if (response) {
        redirectTo("/profile/user/admin/dashboard");
      }
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
      <Form {...form}>
        <ChangePasswordForm
          form={form}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </Form>
    </AnimationWrapper>
  );
};

export default ChangePassword;
