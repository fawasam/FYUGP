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
import {
  useGetACollegeMutation,
  usePublishCollegeMutation,
} from "@/redux/services/collegeApi";
import { Badge } from "@/components/ui/badge";
import NoDataMessage from "@/components/common/Nodata";
import Image from "next/image";
import Loader from "@/components/common/Loader";
import { useGetAllBookingByAdvisorsMutation } from "@/redux/services/bookingApi";
import { formatedTime } from "@/utils/formateTime";

const Appointments = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const [appointment, setAppointment] = useState<any>({});
  const { redirectTo, redirectToHomeIfLoggedIn } = useRedirect();
  let userData = useSelector((state: RootState) => state.auth);
  let { userInfo: user, userToken, isAuthenticated } = userData;
  const [getAllBookingByAdvisors, { isLoading, isSuccess }] =
    useGetAllBookingByAdvisorsMutation();
  const [publishCollege] = usePublishCollegeMutation();

  console.log(user);

  const getAllBookingByAdvisorsFunc = async () => {
    const response: any = await getAllBookingByAdvisors({ id: user?._id });
    console.log(response);

    setAppointment(response?.data?.data?.bookings);
  };
  const handlePublish = async ({ id }: any) => {
    const res: any = await publishCollege({ id });
    toast({
      title: "Successfully Changed",
    });
    getAllBookingByAdvisorsFunc();
  };

  console.log(appointment);

  useEffect(() => {
    getAllBookingByAdvisorsFunc();
    if (!user) {
      redirectTo("/");
    }
  }, [userData, dispatch, router, user, getAllBookingByAdvisors]);
  return (
    <AnimationWrapper className="w-full sm:mt-20 mt-0">
      <h1 className="max-md:hidden mb-4 text-2xl font-semibold">
        Appointments
      </h1>
      {isLoading ? (
        <Loader />
      ) : !isSuccess ? (
        <NoDataMessage
          message={"Appointments Data Unavailable!"}
          icon={"fi fi-rr-search-alt"}
        />
      ) : (
        <section className="w-full  ">
          {appointment?.length > 0 &&
            appointment?.map((apt: any, key: any) => (
              <div
                key={key}
                className="border p-8 py-6 rounded-md my-4 flex flex-row justify-between"
              >
                <div>
                  <h3 className="text-accent mb-2">
                    {formatedTime(apt?.joinedAt)}
                  </h3>
                  <h1 className="text-3xl font-seemibold">
                    {" "}
                    <i className="fi fi-rr-user text-3xl mr-2"></i>
                    {apt?.name}
                  </h1>
                  <h2>Email : {apt?.email}</h2>
                  <h3>Phone : {apt?.phone}</h3>
                </div>
                <div>
                  <div className="flex flex-col gap-y-4">
                    <Button variant={"destructive"}>New</Button>
                    <Button>Consult Now</Button>
                    {/* <Button>Un consulted</Button> */}
                  </div>
                </div>
              </div>
            ))}
        </section>
      )}
    </AnimationWrapper>
  );
};

export default Appointments;
