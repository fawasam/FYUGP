"use client";
import Loader from "@/components/common/Loader";
import AnimationWrapper from "@/components/common/page-animation";
import InputBox from "@/components/ui/InputBox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { RootState } from "@/redux/store";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { Textarea } from "@/components/ui/textarea";

import { Input } from "@/components/ui/input";
import axios from "axios";
import {
  useGetMeMutation,
  useUpdateMeMutation,
} from "@/redux/services/userApi";
import { setUser, updateUser } from "@/redux/features/authSlice";
import useRedirect from "@/hooks/useRedirect";
import EditProfileImage from "@/components/forms/EditProfileImage";
import EditProfileForm from "@/components/forms/EditProfileForm";

const formSchema = z.object({
  fullname: z.string().min(2, {
    message: "fullname must be at least 2 characters.",
  }),
  bio: z.string(),
});

const EditProfile = () => {
  let bioLimit = 150;
  const [loading, setLoading] = useState(false);
  const [characterLeft, setCharacterLeft] = useState(bioLimit);
  const [updatedProfileImg, setupdatedProfileImg] = useState<
    any | string | File | null
  >(null);
  let profileImageEle = useRef<HTMLImageElement | any | null>(null);
  let editProfileForm = useRef<HTMLFormElement>(null);
  const { redirectTo, redirectToHomeIfLoggedIn } = useRedirect();

  const { toast } = useToast();
  const dispatch = useDispatch();
  let userData = useSelector((state: RootState) => state.auth);
  let { userInfo: user, userToken, isAuthenticated } = userData;
  let { fullname, email, username, joinedAt, bio, role, profileImage } = user;

  const [updateMe, { isLoading, error, isSuccess }] = useUpdateMeMutation();
  const [getMe] = useGetMeMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: fullname,
      bio: bio,
    },
  });

  const handleCharacterChange = (e: any) => {
    setCharacterLeft(bioLimit - e.target.value.length);
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setupdatedProfileImg(file);
    }
  };
  const handleImagePreview = (e: any) => {
    let img = e.target.files[0];
    profileImageEle.current.src = URL.createObjectURL(img);
    setupdatedProfileImg(img);
  };
  const handleUpload = async () => {
    if (setupdatedProfileImg) {
      const formData = new FormData();
      formData.append("image", updatedProfileImg);
      try {
        const response: any = await axios.post(
          "http://localhost:3000/api/v1/upload/image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Image uploaded successfully!", response.data);
        setupdatedProfileImg(response.data.imageUrl);
        const response2: any = await updateMe({
          profileImage: response.data.imageUrl,
        }).unwrap();
        const response3: any = await getMe(" ");
        console.log(response);
        dispatch(updateUser({ fields: response3?.data?.data?.user }));

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
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const newValues = { ...values };
      console.log(newValues);
      const response1: any = await updateMe(newValues).unwrap();
      const response: any = await getMe(" ");
      console.log(response);
      dispatch(updateUser({ fields: response?.data?.data?.user }));
      toast({
        title: "Profile Successfully Updated",
      });
      console.log("Profile Successfully Updated");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      });
      console.log(error);
      console.log(error);
    }
  };
  console.log(user);

  // useEffect(() => {
  //   if (!user) {
  //     redirectTo("/");
  //   }
  // }, [user]);

  return (
    <AnimationWrapper className="w-full sm:mt-16 mt-0">
      <h1 className="max-md:hidden text-2xl font-semibold">Edit Profile</h1>
      <div className="flex flex-col lg:flex-row items-start py-10 gap-8 lg:gap-10">
        <EditProfileImage />
        <EditProfileForm />
      </div>
    </AnimationWrapper>
  );
};

export default EditProfile;
