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
import Loader from "@/components/common/Loader";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useDispatch } from "react-redux";
import AnimationWrapper from "@/components/common/page-animation";
import { useState } from "react";
import { useCreateCollegeMutation } from "@/redux/services/collegeApi";
import axios from "axios";
import { setCollege } from "@/redux/features/collegeSlice";
import { useRouter } from "next/navigation";
import { useGenerateCollegeCredentialsMutation } from "@/redux/services/authApi";
const MAX_FILE_SIZE = 10000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  collegename: z.string().min(2, {
    message: "college name must be at least 2 characters.",
  }),
  place: z.string().min(2, {
    message: "please enter a valid  address",
  }),
  email: z.string().min(6, {
    message: "please provide a valid email",
  }),
});

const CreateCollege = () => {
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [selectedImage, setSelectedImage] = useState<
    any | string | File | null
  >(null);
  const [
    createCollege,
    { isLoading, error, isSuccess },
  ] = useCreateCollegeMutation();
  const [generateCollegeCredentials] = useGenerateCollegeCredentialsMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      collegename: "",
      place: "",
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
      const response: any = await createCollege(newValues).unwrap();
      const newValues2 = { ...newValues, college: response?.newCollege?._id };

      if (response?.newCollege?._id) {
        const response2: any = await generateCollegeCredentials(
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
      }
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
                  Create College
                </h1>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className=" item-center sm:w-[60%] w-[90%] m-auto grid md:grid-cols-1 gap-4  sm:grid-cols-1 grid-cols-1"
                >
                  <FormField
                    control={form.control}
                    name="collegename"
                    render={({ field }) => (
                      <FormItem className="w-full m-0">
                        <FormLabel>College Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="college name"
                            {...field}
                            icon={"fi fi-rr-graduation-cap"}
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
                            placeholder="Email"
                            {...field}
                            icon={"fi fi-rr-envelope"}
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
                      <FormItem className=" w-full m-0">
                        <FormLabel>Place</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="place"
                            {...field}
                            icon={"fi fi-rr-map-marker"}
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
                  College Credential
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
                <p>Credentials must save before click save</p>
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

export default CreateCollege;
