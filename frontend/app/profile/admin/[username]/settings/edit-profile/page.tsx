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
import { useUpdateMeMutation } from "@/redux/services/userApi";
import { setUser, updateUser } from "@/redux/features/authSlice";
import useRedirect from "@/hooks/useRedirect";

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

        dispatch(updateUser({ fields: response2.updatedData.filterObj }));
        toast({
          title: "Profile Image Updated",
        });
      } catch (error: any) {
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
      const response: any = await updateMe(newValues).unwrap();
      dispatch(updateUser({ fields: response.updatedData.filterObj }));
      toast({
        title: "Profile Successfully Updated",
      });
      console.log("Profile Successfully Updated");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.data?.message,
      });
      console.log(error);
      console.log(error?.data?.message);
    }
  };

  useEffect(() => {
    if (!user) {
      redirectTo("/");
    }
  }, [userData, dispatch]);

  return (
    <AnimationWrapper>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="max-md:hidden">Edit Profile</h1>
          <div className="flex flex-col lg:flex-row items-start py-10 gap-8 lg:gap-10">
            <div className="max-lg:center mb-5">
              <label
                htmlFor="uploadImg"
                id="profileImgLable"
                className="relative block w-48 h-48 bg-[#F3F3F3] rounded-full overflow-hidden"
              >
                <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center text-white bg-black/30 opacity-0 hover:opacity-100 cursor-pointer">
                  Upload Image
                </div>
                <img src={`${profileImage}`} alt="" ref={profileImageEle} />
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
            <Form {...form}>
              <form
                action=""
                ref={editProfileForm}
                onSubmit={form.handleSubmit(handleSubmit)}
              >
                <div className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
                    <div>
                      <InputBox
                        name={"username"}
                        type={"text"}
                        value={username}
                        placeholder={"Username"}
                        disable={true}
                        icon={"fi fi-rr-user"}
                      />
                    </div>
                    <div>
                      <InputBox
                        name={"email"}
                        type={"email"}
                        value={email}
                        placeholder={"Email"}
                        disable={true}
                        icon={"fi fi-rr-envelope"}
                      />
                    </div>
                  </div>
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
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <p className="text-dark-grey my-3">
                    fullname will use to search user and will be visible to all
                    users{" "}
                  </p>
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            className="input-box h-64 lg:h-40 resize-none leading-7 mt-5 pl-5"
                            placeholder="Bio"
                            maxLength={bioLimit}
                            defaultValue={bio}
                            // onChange={handleCharacterChange}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <p className="mt-1 text-dark-grey">
                    {characterLeft} characters left
                  </p>

                  <Button className="btn-dark w-auto px-10  mt-4">
                    Update
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </>
      )}
    </AnimationWrapper>
  );
};

export default EditProfile;
