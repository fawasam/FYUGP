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

const formSchema = z.object({
  collegename: z.string().min(2, {
    message: "college name must be at least 2 characters.",
  }),
  place: z.string().min(2, {
    message: "please enter a valid  address",
  }),
  pincode: z.string().min(6, {
    message: "please provide a valid pincode",
  }),
  phone: z.string().min(6, {
    message: "please provide a valid phone number",
  }),
});

const CreateCollege = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  //   const [signup, { isLoading, error, isSuccess }] = useRegisterMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      collegename: "",
      place: "",
      phone: "",
      pincode: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // const response: any = await signup(values).unwrap();
      // const userData = response.data;
      // dispatch(setUser(response));
      // toast({
      //   title: "Successfully signed up",
      // });
      // console.log("Successfully signed");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.data.message,
      });
      console.log(error.data.message);
    }
  };

  return (
    <AnimationWrapper>
      <div className="md:w-[60%] w-[90%] m-auto">
        <div className="my-10">
          <h1 className="text-2xl text-center underline underline-offset-8">
            Create College
          </h1>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 sm:w-[80%] w-[90%] m-auto"
          >
            <FormField
              control={form.control}
              name="collegename"
              render={({ field }) => (
                <FormItem className="sm:w-1/2 w-full m-auto">
                  <FormLabel>College Name</FormLabel>
                  <FormControl>
                    <Input placeholder="college name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="place"
              render={({ field }) => (
                <FormItem className="sm:w-1/2 w-full m-auto">
                  <FormLabel>Place</FormLabel>
                  <FormControl>
                    <Input placeholder="place" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem className="sm:w-1/2 w-full m-auto">
                  <FormLabel>Pincode</FormLabel>
                  <FormControl>
                    <Input placeholder="pincode" {...field} type="number" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="sm:w-1/2 w-full m-auto">
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="phone" {...field} type="number" />
                  </FormControl>

                  <FormMessage />
                  <div className="flex justify-center items-center flex-col ">
                    <Button type="submit" size={"lg"} className="w-full mt-4">
                      Create and Continue
                      <i className="fi fi-rr-arrow-right ml-2 text-center pt-2 "></i>
                      <span> </span>
                      {/* {isLoading ? <Loader white={true} /> : ""} */}
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
};

export default CreateCollege;
