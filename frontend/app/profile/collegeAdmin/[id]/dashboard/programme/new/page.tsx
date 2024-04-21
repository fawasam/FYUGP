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
  useCreateCollegeMutation,
  useCreateProgramMutation,
} from "@/redux/services/collegeApi";
import axios from "axios";
import { setCollege } from "@/redux/features/collegeSlice";
import { useRouter } from "next/navigation";
import {
  useGenerateCollegeCredentialsMutation,
  useGenerateDepartmentCredentialsMutation,
} from "@/redux/services/authApi";
import { RootState } from "@/redux/store";

const formSchema = z.object({
  Dname: z.string().min(2, {
    message: "Please provide a Department name ",
  }),
  headOfDepartment: z.string(),
  Discipline: z.string().min(2, {
    message: "Please choose a Discipline ",
  }),
  email: z
    .string()
    .min(2, {
      message: "Please provide a email ",
    })
    .email("This is not a valid email."),
});

const NewProgram = () => {
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  let userData = useSelector((state: RootState) => state.auth);
  let { userInfo: user, userToken, isAuthenticated } = userData;
  const [
    createProgram,
    { isLoading, error, isSuccess },
  ] = useCreateProgramMutation();
  const [
    generateDepartmentCredentials,
  ] = useGenerateDepartmentCredentialsMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Dname: "",
      headOfDepartment: "",
      Discipline: "",
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

      const response: any = await createProgram(newValues).unwrap();
      const newValues2 = {
        ...newValues,
        department: response?.newProgram?._id,
        college: user?.college,
      };

      console.log(newValues2);

      const response2: any = await generateDepartmentCredentials(
        newValues2
      ).unwrap();
      console.log(response2?.data?.user);
      setUserId(response2?.data?.user?.email);
      setUserPassword(response2?.data?.password);

      dispatch(setCollege(response));
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
                  Create Program
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
                    name="Dname"
                    render={({ field }) => (
                      <FormItem className="w-full m-0">
                        <FormLabel> Program Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Program Name"
                            icon={"fi fi-rr-graduation-cap"}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* hod */}
                  <FormField
                    control={form.control}
                    name="headOfDepartment"
                    render={({ field }) => (
                      <FormItem className="w-full m-0">
                        <FormLabel>Head Of Department</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Head Of Department"
                            icon={"fi fi-rr-graduation-cap"}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* discipline  */}
                  <FormField
                    control={form.control}
                    name="Discipline"
                    render={({ field }) => (
                      <FormItem className="w-full m-0">
                        <FormLabel>Select the Discipline</FormLabel>
                        <>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Discipline" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup {...field}>
                                <SelectItem value="Humanities">
                                  Humanities
                                </SelectItem>
                                <SelectItem value="Languages">
                                  Languages
                                </SelectItem>
                                <SelectItem value="Science">Science</SelectItem>
                                <SelectItem value="Commerce">
                                  Commerce
                                </SelectItem>
                                <SelectItem value="Management">
                                  Management
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </>
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
                            placeholder="enter email"
                            icon={"fi fi-rr-graduation-cap"}
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
                  Department Credential
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

export default NewProgram;
