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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Loader from "@/components/common/Loader";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import AnimationWrapper from "@/components/common/page-animation";
import { useState } from "react";
import {
  useCreateAdvisorMutation,
  useCreateCollegeMutation,
  useCreateProgramMutation,
} from "@/redux/services/collegeApi";
import axios from "axios";
import { setCollege } from "@/redux/features/collegeSlice";
import { useRouter } from "next/navigation";
import {
  useGenerateAdvisorCredentialsMutation,
  useGenerateCollegeCredentialsMutation,
  useGenerateDepartmentCredentialsMutation,
} from "@/redux/services/authApi";
import { RootState } from "@/redux/store";

const formSchema = z.object({
  fullname: z.string().min(2, {
    message: "Please provide a Name ",
  }),

  email: z
    .string()
    .min(2, {
      message: "Please provide a email ",
    })
    .email("This is not a valid email."),
});

const NewAdvisor = () => {
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  let userData = useSelector((state: RootState) => state.auth);
  let { userInfo: user, userToken, isAuthenticated } = userData;
  const [
    createAdvisor,
    { isLoading, error, isSuccess },
  ] = useCreateAdvisorMutation();
  const [generateAdvisorCredentials] = useGenerateAdvisorCredentialsMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
    },
  });

  const goBack = () => {
    router.back();
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };
  const handleSave = () => {
    goBack();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const newValues = { ...values };

      const response: any = await generateAdvisorCredentials(
        newValues
      ).unwrap();
      console.log(response?.data?.user);
      setUserId(response?.data?.user?.email);
      setUserPassword(response?.data?.password);

      const newValues2: any = {
        ...newValues,
        email: response?.data?.user?.email,
        user: response?.data?.user?._id,
        collegeId: user?.college,
      };
      console.log(newValues2);

      const response2: any = await createAdvisor(newValues2).unwrap();

      console.log(response2);
      // dispatch(setCollege(response));
      toast({
        title: "Successfully added college",
      });
      nextStep();
      console.log("Successfully added College");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      });
      console.log(error);
    }
  };
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <AnimationWrapper className="w-full">
            <div className="md:w-full w-[90%] m-auto">
              <div className="my-10 ">
                <h1 className="text-2xl font-semibold text-center underline underline-offset-8">
                  Create New Advisor
                </h1>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className=" item-center sm:w-[60%] w-[90%] m-auto grid md:grid-cols-1 gap-4  sm:grid-cols-1 grid-cols-1"
                >
                  {/* dname  */}
                  <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                      <FormItem className="w-full m-0">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Name"
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
                      <FormItem className="w-full m-0">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter email"
                            icon={"fi fi-rr-envelope"}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                        <div className="flex justify-center items-center flex-col ">
                          <Button
                            type="submit"
                            size={"lg"}
                            className="w-full my-4"
                          >
                            Create and Continue
                            <i className="fi fi-rr-arrow-right ml-2 text-center pt-2 "></i>
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
          </AnimationWrapper>
        );
      case 2:
        return (
          <AnimationWrapper className="w-full">
            <div className="md:w-full w-[90%] m-auto">
              <div className="my-10 ">
                <h1 className="text-2xl text-center underline underline-offset-8">
                  Advisore Credential
                </h1>
              </div>
              <div className=" item-center sm:w-[60%] w-[90%] m-auto grid md:grid-cols-1 gap-4  sm:grid-cols-1 grid-cols-1">
                <span>UserId</span>
                <Input
                  placeholder="Email"
                  icon={"fi fi-rr-envelope"}
                  defaultValue={userId}
                />
                <span>Password</span>
                <Input
                  placeholder="password"
                  type="password"
                  defaultValue={userPassword}
                  icon={"fi fi-rr-unlock"}
                />
                <div className="flex justify-center items-center flex-col ">
                  <Button
                    size={"lg"}
                    className="w-full my-4"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </AnimationWrapper>
        );
      default:
        return null;
    }
  };
  return <>{renderStep()}</>;
};

export default NewAdvisor;
