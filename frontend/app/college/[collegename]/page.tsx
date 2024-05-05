"use client";
import AnimationWrapper from "@/components/common/page-animation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useRedirect from "@/hooks/useRedirect";
import { logout } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { ListItem } from "@/components/Header";
import Link from "next/link";
import { useGetACollegeMutation } from "@/redux/services/collegeApi";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import NoDataMessage from "@/components/common/Nodata";
import Image from "next/image";
import { disciplines } from "@/utils/disciplines";
import Loader from "@/components/common/Loader";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateBookingMutation } from "@/redux/services/bookingApi";
import Enquiry from "@/components/Enquiry";
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Department name must be at least 2 characters.",
  }),
  email: z.string(),
  phone: z.string().min(2, {
    message: "Please choose a Discipline ",
  }),
});
const SingleCollege = ({ params }: { params: { collegename: string } }) => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const [college, setCollege] = useState<any>({});
  const [advisorId, setAdvisorId] = useState<any>("");
  const { redirectTo, redirectToHomeIfLoggedIn } = useRedirect();
  let userData = useSelector((state: RootState) => state.auth);
  let { userInfo: user, userToken, isAuthenticated } = userData;
  const [getACollege, { isLoading, isSuccess }] = useGetACollegeMutation();
  const [createBooking] = useCreateBookingMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (user == null) {
      toast({
        title: "Please login to get appointment",
        // description: "You will be contacted soon!!",
      });
    }
    try {
      const newValues = { ...values, advisorId };
      console.log(newValues);

      const response: any = await createBooking(newValues).unwrap();

      toast({
        title: "Appointment Successfully added",
        description: "You will be contacted soon!!",
      });
      getCollegeData2();
      form.reset();
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

  const getCollegeData2 = async () => {
    const response: any = await getACollege(params.collegename);
    setCollege(response?.data?.data?.college);
  };
  useEffect(() => {
    const getCollegeData = async () => {
      const response: any = await getACollege(params.collegename);
      setCollege(response?.data?.data?.college);
    };
    getCollegeData();
  }, [getACollege, params.collegename]);

  return (
    <AnimationWrapper className="w-full  sm:p-[100px] p-[40px] m-auto sm:py-[5%] py-[20px] relative">
      {isLoading ? (
        <Loader />
      ) : !isSuccess ? (
        <NoDataMessage
          message={"College Data Unavailable!"}
          icon={"fi fi-rr-search-alt"}
        />
      ) : (
        <section className="max-w-[1060px] m-auto   flex-grow">
          <div className="relative w-full h-[250px]">
            {college?.picture ? (
              <Image
                src={college?.picture}
                alt="image"
                className="w-full  h-[250px] object-cover rounded-sm"
                fill
              />
            ) : (
              <Skeleton className=" w-full h-[250px] rounded-sm" />
            )}
          </div>
          <div className="w-full">
            {college?.collegename ? (
              <h1 className="text-2xl mt-4 font-bold">
                {college?.collegename}
              </h1>
            ) : (
              <Skeleton className=" w-[20px] h-[20px] rounded-sm ,mt-4" />
            )}

            <i className="fi  fi-rr-marker mr-2"></i>
            <span className="text-md  font-thin">{college?.place}</span>
            <div className="mt-4">
              <Link
                href={college?.website ? college?.website : ""}
                target="_blank"
              >
                <i className="fi  fi-rr-globe mr-2"></i>
                <Button variant={"link"} className=" pl-0">
                  {college?.website ? college?.website : "Not provided"}
                </Button>
              </Link>
              <div>
                <Link
                  href={
                    college?.email
                      ? "mailto: " + college?.email
                      : "Not provided"
                  }
                  target="_blank"
                >
                  <i className="fi fi-rr-envelope mr-2"></i>
                  <Button variant={"link"} className=" pl-0">
                    <span>
                      {college?.email ? college?.email : "Not provided"}
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
            {college?.about ? (
              <div className="pt-4 flex flex-col">
                <h3 className="text-lg font-medium">ABOUT</h3>
                <span className="leading-normal font-light">
                  {college?.about}
                </span>
              </div>
            ) : (
              ""
            )}
            {/* <div className="pt-4 flex flex-col">
              <h3 className="text-lg font-medium ">DISCIPLINES</h3>
              <div className="mr-2 mt-2">
                {disciplines.map((d: any, key: any) => (
                  <Link
                    // href={`/college/${params.collegename}/${dep?.Dname.replace(
                    //   /\s+/g,
                    //   "-"
                    // )}`}
                    href={"/"}
                    key={key}
                  >
                    <Button variant="outline" className="mr-2 ">
                      {d}
                    </Button>
                  </Link>
                ))}
              </div>
            </div> */}
            <div className="pt-4 flex flex-col">
              <h3 className="text-lg font-medium ">DEPARTMENT</h3>
              <div className="mr-2 mt-2">
                {college?.departments && college.departments.length > 0 ? (
                  college.departments.map((dep: any, key: any) => (
                    <Link
                      href={`/college/${
                        params.collegename
                      }/${dep?.Dname.replace(/\s+/g, "-")}`}
                      key={key}
                    >
                      <Button variant="outline" className="mr-2 ">
                        {dep?.Dname}
                      </Button>
                    </Link>

                    // <span key={key}>{dep?.Dname}</span>
                  ))
                ) : (
                  <NoDataMessage message={"No Departments found"} />
                )}
              </div>
            </div>
            {/* consaltants  */}
            <div className="pt-10 flex flex-col ">
              <h3 className="text-lg font-medium  uppercase">consultants</h3>
              <div className="mr-2 mt-2 md:flex block gap-y-4  gap-4">
                {college.advisor?.map((adv: any, key: any) => (
                  <div
                    key={key}
                    className="rounded-md border p-8 w-fit space-y-1"
                  >
                    <h2 className="font-semibold">{adv.fullname}</h2>
                    <h3>{adv?.email}</h3>
                    <h4>{adv?.availability ? "unavailable" : "available"}</h4>
                    <Dialog>
                      <DialogTrigger
                        disabled={adv?.availability ? true : false}
                      >
                        <Button
                          disabled={adv?.availability ? true : false}
                          className="mt-6"
                          onClick={() => setAdvisorId(adv?._id)}
                        >
                          Get Appointment
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="">
                        <DialogHeader className="mt-6">
                          <DialogTitle className="text-2xl flex item-center justify-center flex-col text-center">
                            Get Appoinment
                          </DialogTitle>
                        </DialogHeader>
                        {user ? (
                          <DialogDescription className="text-base ">
                            <Form {...form}>
                              <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="w-full"
                              >
                                <div className=" space-y-4 py-4">
                                  <div className="  items-center gap-4 space-y-4">
                                    <FormField
                                      control={form.control}
                                      name="name"
                                      render={({ field }) => (
                                        <FormItem className="w-full m-0">
                                          <FormLabel>Enter Your Name</FormLabel>
                                          <FormControl>
                                            <Input
                                              placeholder="Name"
                                              // defaultValue={dname}
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
                                          <FormLabel>
                                            Enter Your email
                                          </FormLabel>
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
                                    {/* phone  */}
                                    <FormField
                                      control={form.control}
                                      name="phone"
                                      render={({ field }) => (
                                        <FormItem className="w-full m-0">
                                          <FormLabel>
                                            Enter your Phone Number
                                          </FormLabel>
                                          <FormControl>
                                            <Input
                                              type="number"
                                              placeholder="Phone"
                                              icon={"fi fi-rr-phone-call"}
                                              {...field}
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button>Book Now</Button>
                                </DialogFooter>
                              </form>
                            </Form>
                          </DialogDescription>
                        ) : (
                          <DialogDescription className="text-center">
                            Please Login to Get Appointment <br />
                            <Link href={"/auth/login"} className="text-xl">
                              {" "}
                              Login
                            </Link>
                          </DialogDescription>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Enquiry id={college?._id} />
        </section>
      )}
    </AnimationWrapper>
  );
};

export default SingleCollege;
