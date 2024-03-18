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
  pincode: z.string().min(6, {
    message: "please provide a valid pincode",
  }),
  phone: z.string().min(10, {
    message: "please provide a valid phone number",
  }),
  picture: z.any().nullable(),
});

const CreateCollege = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<
    any | string | File | null
  >(null);
  const [createCollege, { isLoading, error, isSuccess }] =
    useCreateCollegeMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      collegename: "",
      place: "",
      phone: "",
      pincode: "",
      picture: null,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);
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
        setSelectedImage(response.data.imageUrl);
        return response.data.imageUrl;
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const imageLink = await handleUpload();
      const newValues = { ...values, picture: imageLink };
      const response: any = await createCollege(newValues).unwrap();
      dispatch(setCollege(response));
      toast({
        title: "Successfully added college",
      });
      console.log("Successfully added College");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.data?.message,
      });
      console.log(error?.data?.message);
    }
  };

  return (
    <AnimationWrapper className="w-full">
      <div className="md:w-full w-[90%] m-auto">
        <div className="my-10">
          <h1 className="text-2xl text-center underline underline-offset-8">
            Create College
          </h1>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" item-center sm:w-[80%] w-[90%] m-auto grid md:grid-cols-2 gap-4  sm:grid-cols-1 grid-cols-1"
          >
            <FormField
              control={form.control}
              name="collegename"
              render={({ field }) => (
                <FormItem className="w-full m-0">
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
                <FormItem className=" w-full m-0">
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
                <FormItem className=" w-full">
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
              name="picture"
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel htmlFor="picture">Images</FormLabel>
                  <FormControl>
                    <Input
                      id="picture"
                      {...field}
                      type="file"
                      onChange={handleImageChange}
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
                    <Input placeholder="phone" {...field} type="number" />
                  </FormControl>

                  <FormMessage />
                  <div className="flex justify-center items-center flex-col ">
                    <Button
                      type="submit"
                      size={"lg"}
                      className="w-full my-4"
                      // onClick={handleUpload}
                      disabled={!selectedImage}
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
};

export default CreateCollege;
