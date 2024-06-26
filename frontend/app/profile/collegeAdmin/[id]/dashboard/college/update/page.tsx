"use client";
import AnimationWrapper from "@/components/common/page-animation";
import React, { useEffect, useRef, useState } from "react";
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
  useUpdateCollegeMutation,
} from "@/redux/services/collegeApi";
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
import Loader from "@/components/common/Loader";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { log } from "console";
import Image from "next/image";

const formSchema = z.object({
  collegename: z.string().min(2, {
    message: "college name must be at least 2 characters.",
  }),
  place: z.string(),
  email: z.string(),
  website: z.string(),
  pincode: z.string(),
  phone: z.string(),
  about: z.string(),
  picture: z.any().nullable(),
});

const UpdateCollege = ({ params }: { params: { _id: string } }) => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const [college, setCollege] = useState<any>({});
  const { redirectTo, redirectToHomeIfLoggedIn } = useRedirect();
  let userData = useSelector((state: RootState) => state.auth);
  let { userInfo: user, userToken, isAuthenticated } = userData;
  let [getACollege, isLoading] = useGetACollegeMutation();
  const [selectedImage, setSelectedImage] = useState<
    any | string | File | null
  >(null);
  let profileImageEle = useRef<HTMLImageElement | any | null>(null);
  let editProfileForm = useRef<HTMLFormElement>(null);
  let [updateCollege] = useUpdateCollegeMutation();
  let bioLimit = 150;
  let {
    collegename,
    email,
    phone,
    picture,
    pincode,
    place,
    type,
    website,
    about,
  }: any = college;

  const goBack = () => {
    router.back();
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      collegename: collegename,
      place: place,
      phone: phone,
      pincode: pincode,
      picture: picture,
      email: email,
      website: website,
      about,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };
  const handleImagePreview = (e: any) => {
    let img = e.target.files[0];
    profileImageEle.current.src = URL.createObjectURL(img);
    setSelectedImage(img);
  };
  const handleUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);
      try {
        const response: any = await axios.post(
          ` ${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/upload/image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Image uploaded successfully!", response.data);
        setSelectedImage(response.data.imageUrl);
        const picture = { picture: response.data.imageUrl };
        const response2: any = await updateCollege({
          id: college?._id,
          data: picture,
        }).unwrap();
        console.log(response2);
        toast({
          title: "Profile Image Updated",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Image Upload failed",
          description: error,
        });
        console.error("Image upload failed:", error);
      }
    }
  };
  const getCollege2 = async () => {
    const response: any = await getACollege(user?.college);
    setCollege(response?.data?.data?.college);
  };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const newValues = { ...values };
      const response: any = await updateCollege({
        id: user.college,
        data: newValues,
      }).unwrap();
      await getCollege2();
      // dispatch(setCollege(response));
      toast({
        title: "Successfully added college",
      });
      console.log("Successfully added College");
      goBack();
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

  useEffect(() => {
    const getCollege = async () => {
      const response: any = await getACollege(user?.college);
      setCollege(response?.data?.data?.college);
    };
    getCollege();
    // if (!user) {
    //   redirectTo("/");
    // }
  }, [userData, dispatch, router, user, getACollege]);
  useEffect(() => {
    form.reset({
      collegename: collegename,
      place: place,
      phone: phone,
      pincode: pincode,
      picture: picture,
      email: email,
      website: website,
      about: about,
    });
  }, [
    collegename,
    place,
    phone,
    pincode,
    picture,
    email,
    website,
    about,
    form,
  ]);
  return (
    <AnimationWrapper className="w-full sm:mt-20 mt-0">
      <h1 className="max-md:hidden  text-2xl font-semibold">Edit College</h1>
      <div className="flex flex-col lg:flex-row items-start py-10 gap-8 lg:gap-10">
        <div className="max-lg:center mb-5 space-y-2">
          <label
            htmlFor="uploadImg"
            id="profileImgLable"
            className="relative block w-48 h-48 bg-[#F3F3F3] rounded-full overflow-hidden"
          >
            <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center text-white bg-black/30 opacity-0 hover:opacity-100 cursor-pointer">
              Upload Image
            </div>
            <Image
              src={`${picture}`}
              alt=""
              width={200}
              height={100}
              ref={profileImageEle}
              className="h-full object-cover"
            />
          </label>

          <input
            type="file"
            id="uploadImg"
            accept=".jpg, .png, .jpeg"
            hidden
            onChange={handleImagePreview}
          />
          <button
            className="btn-light mt-5 max-lg:center lg:w-full px-10"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
        {/* </div> */}
        <Form {...form}>
          <form
            ref={editProfileForm}
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-2"
          >
            <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:gap-5 space-y-2">
              <FormField
                control={form.control}
                name="collegename"
                render={({ field }) => (
                  <FormItem className="w-full m-0">
                    <FormLabel>College Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="college name"
                        defaultValue={collegename}
                        icon={"fi fi-rr-graduation-cap"}
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
                  <FormItem className=" w-full m-0">
                    <FormLabel>Place</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="place"
                        defaultValue={place}
                        {...field}
                        icon={"fi fi-rr-map-marker"}
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
                        placeholder="email"
                        icon={"fi fi-rr-envelope"}
                        defaultValue={email}
                        disabled={true}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem className="w-full m-0">
                    <FormLabel>About</FormLabel>
                    <FormControl>
                      <Textarea
                        className="input-box h-64 lg:h-40 resize-none leading-7 mt-5 pl-5"
                        placeholder="About"
                        // maxLength={bioLimit}
                        defaultValue={about}
                        // onChange={handleCharacterChange}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem className=" w-full m-0">
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="website"
                        defaultValue={website}
                        {...field}
                        icon={"fi  fi-rr-globe"}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
                <FormField
                  control={form.control}
                  name="pincode"
                  render={({ field }) => (
                    <FormItem className=" w-full">
                      <FormLabel>Pincode</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="pincode"
                          defaultValue={pincode}
                          {...field}
                          type="number"
                          icon={"fi fi-rs-marker"}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className=" w-full">
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="phone"
                          //   type="number"
                          defaultValue={phone}
                          icon={"fi fi-rr-smartphone"}
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-center items-center flex-col ">
              <Button size={"lg"} className="w-full my-4">
                Update
                <i className="fi fi-rr-arrow-right ml-2 text-center pt-2 "></i>
                <span> </span>
                {/* {isLoading ? <Loader white={true} /> : ""} */}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AnimationWrapper>
  );
};

export default UpdateCollege;
