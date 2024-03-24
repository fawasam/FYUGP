"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import Loader from "@/components/common/Loader";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import AnimationWrapper from "@/components/common/page-animation";
import { useEffect, useState } from "react";
import { useCreateCollegeMutation } from "@/redux/services/collegeApi";
import axios from "axios";
import { setCollege } from "@/redux/features/collegeSlice";
import { useRouter } from "next/navigation";
import { useGenerateCollegeCredentialsMutation } from "@/redux/services/authApi";
import useRedirect from "@/hooks/useRedirect";
import { RootState } from "@/redux/store";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { districts } from "@/utils/districts";
import { LocateFixed } from "lucide-react";
import { pathways } from "@/utils/pathways";
import { disciplines } from "@/utils/disciplines";
import {
  useGetMeMutation,
  useUpdateMeMutation,
} from "@/redux/services/userApi";
import { updateUser } from "@/redux/features/authSlice";

const formSchema = z.object({
  fullname: z.string().min(2, {
    message: "fullname  must be at least 2 characters.",
  }),
  place: z.string().min(6, {
    message: "please provide a place",
  }),
  district: z.string().min(6, {
    message: "please provide a district",
  }),
  currentCollege: z.string(),
  pathway: z.string().min(2, {
    message: "Please select a pathway",
  }),
  discipline: z.string().min(2, {
    message: "Please select a disciple",
  }),
});

const page = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const router = useRouter();
  const { redirectTo, redirectToHomeIfLoggedIn } = useRedirect();
  let userData = useSelector((state: RootState) => state.auth);
  let { userInfo: user, userToken, isAuthenticated } = userData;
  const [updateMe] = useUpdateMeMutation();
  const [getMe] = useGetMeMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      place: "",
      district: "",
      currentCollege: "",
      pathway: "",
      discipline: "",
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

  const handleSubmit = async () => {
    const value: any = form.watch();
    const response1: any = await updateMe(value).unwrap();
    const response: any = await getMe(" ");
    console.log(response);
    dispatch(updateUser({ fields: response?.data?.data?.user }));
  };
  console.log(form.watch());

  useEffect(() => {
    if (!user) {
      redirectTo("/");
    }
  }, [dispatch, router]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <AnimationWrapper>
            <section className="max-w-[1060px] m-auto   flex-grow">
              <div className="flex justify-between items-center  text-center m-auto">
                <div className="flex justify-end">
                  <h3 className="text-[36px] font-normal  tracking-tight py-[60px]">
                    Add your Personal Information
                  </h3>
                </div>
                <div className="">
                  <span className="text-accent text-xl ">{step} / 3</span>
                </div>
              </div>
              <Form {...form}>
                <form action="">
                  <div className="w-full space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                      <FormField
                        control={form.control}
                        name="fullname"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fullname</FormLabel>
                            <FormControl>
                              <Input
                                icon={"fi fi-rr-at"}
                                placeholder="fullname"
                                defaultValue={user.fullname}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="place"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Place</FormLabel>
                            <FormControl>
                              <Input
                                icon={"fi fi-rr-at"}
                                placeholder="place"
                                defaultValue={user?.place}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="district"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>district</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={user?.district}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your district " />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {districts.map((dist) => (
                                  <SelectItem value={dist}>{dist}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="currentCollege"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>College</FormLabel>
                            <FormControl>
                              <Input
                                icon={"fi fi-rr-at"}
                                placeholder="Add college if enrolled"
                                defaultValue={user?.degree_info?.currentCollege}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </form>
                <div className=" flex justify-end">
                  <Button
                    className="btn-dark w-auto px-10  mt-4"
                    variant={"outline"}
                    onClick={prevStep}
                    disabled={true}
                  >
                    <i className="fi fi-rr-arrow-left mr-2 text-center "></i>
                    Back
                  </Button>
                  <Button
                    className="btn-dark w-auto px-10  mt-4 ml-2"
                    onClick={() => {
                      // form.trigger([
                      //   "fullname",
                      //   "place",
                      //   "district",
                      // ]);
                      // const emailState = form.getFieldState("fullname");
                      // const nameState = form.getFieldState("place");
                      // const yearState = form.getFieldState("district");

                      // if (!emailState.isDirty || emailState.invalid) return;
                      // if (!nameState.isDirty || nameState.invalid) return;
                      // if (!yearState.isDirty || yearState.invalid) return;

                      nextStep();
                    }}
                  >
                    Next Step
                  </Button>
                </div>
              </Form>
            </section>
          </AnimationWrapper>
        );
      case 2:
        return (
          <AnimationWrapper>
            <section className="max-w-[1060px] m-auto   flex-grow">
              <div className="flex justify-between items-center  text-center m-auto">
                <div className="flex justify-end">
                  <h3 className="text-[36px] font-normal  tracking-tight py-[60px]">
                    Please choose a pathway
                  </h3>
                </div>
                <div className="">
                  <span className="text-accent text-xl ">{step} / 3</span>
                </div>
              </div>
              <Form {...form}>
                <form>
                  <div className="w-full space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                      <FormField
                        control={form.control}
                        name="pathway"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                {pathways.map((path) => (
                                  <FormItem
                                    className="flex items-center space-x-3 space-y-0"
                                    key={path.title}
                                  >
                                    <FormControl>
                                      <RadioGroupItem value={path.title} />
                                    </FormControl>
                                    <FormLabel className="font-normal text-[18px] ">
                                      {path.title}
                                    </FormLabel>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </form>
                <div className=" flex justify-end">
                  <Button
                    className="btn-dark w-auto px-10  mt-4"
                    variant={"outline"}
                    onClick={prevStep}
                  >
                    <i className="fi fi-rr-arrow-left mr-2 text-center "></i>
                    Back
                  </Button>
                  <Button
                    className="btn-dark w-auto px-10  mt-4 ml-2"
                    type="submit"
                    onClick={() => {
                      // form.trigger(["pathway"]);
                      // const pathwayState = form.getFieldState("pathway");
                      // if (!pathwayState.isDirty || pathwayState.invalid) return;
                      nextStep();
                    }}
                  >
                    Next Step
                  </Button>
                </div>
              </Form>
            </section>
          </AnimationWrapper>
        );
      case 3:
        return (
          <AnimationWrapper>
            <section className="max-w-[1060px] m-auto   flex-grow">
              <div className="flex justify-between items-center  text-center m-auto">
                <div className="flex justify-end">
                  <h3 className="text-[36px] font-normal  tracking-tight py-[60px]">
                    Please choose a Discipline
                  </h3>
                </div>
                <div className="">
                  <span className="text-accent text-xl ">{step} / 3</span>
                </div>
              </div>
              <Form {...form}>
                <form action="">
                  <div className="w-full space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                      <FormField
                        control={form.control}
                        name="discipline"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                {disciplines.map((discipline) => (
                                  <FormItem
                                    className="flex items-center space-x-3 space-y-0"
                                    key={discipline}
                                  >
                                    <FormControl>
                                      <RadioGroupItem value={discipline} />
                                    </FormControl>
                                    <FormLabel className="font-normal text-[18px] ">
                                      {discipline}
                                    </FormLabel>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </form>
                <div className=" flex justify-end">
                  <Button
                    className="btn-dark w-auto px-10  mt-4"
                    variant={"outline"}
                    onClick={prevStep}
                  >
                    <i className="fi fi-rr-arrow-left mr-2 text-center "></i>
                    Back
                  </Button>
                  {step === 3 ? (
                    <Button
                      className="btn-dark w-auto px-10  mt-4 ml-2"
                      onClick={() => {
                        // form.trigger(["discipline"]);
                        // const disciplineState =
                        //   form.getFieldState("discipline");
                        // if (!disciplineState.isDirty || disciplineState.invalid)
                        //   return;
                        handleSubmit();
                      }}
                    >
                      Submit
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              </Form>
            </section>
          </AnimationWrapper>
        );
      default:
        return;
        null;
    }
  };

  return (
    <AnimationWrapper className="w-full  sm:p-[100px] p-[40px] m-auto sm:py-[5%] py-[20px] relative">
      <section className="max-w-[1060px] m-auto   flex-grow">
        <div className="sm:flex flex items-center justify-center min-h-[240px] w-full bg-accent text-center rounded-sm">
          <div className="flex justify-center items-center">
            <h1 className="md:text-[48px] text-[36px] font-bold tracking-tighter text-center ">
              Lets go through your degree
            </h1>
          </div>
        </div>
        {renderStep()}
      </section>
    </AnimationWrapper>
  );
};

export default page;
