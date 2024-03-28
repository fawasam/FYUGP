// EditProfileForm.js
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updateUser } from "@/redux/features/authSlice";
import {
  useGetMeMutation,
  useUpdateMeMutation,
} from "@/redux/services/userApi";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";

const formSchema = z.object({
  fullname: z.string().min(2, {
    message: "fullname must be at least 2 characters.",
  }),
  bio: z.string(),
});

const EditProfileForm = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const bioLimit = 150;
  const [characterLeft, setCharacterLeft] = useState(bioLimit);
  const { userInfo: user } = useSelector((state: RootState) => state.auth);
  let { fullname, email, username, joinedAt, bio, role, profileImage } = user;

  const [updateMe] = useUpdateMeMutation();
  const [getMe] = useGetMeMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: user.fullname,
      bio: user.bio,
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response1: any = await updateMe(values).unwrap();
      const response: any = await getMe(" ");
      dispatch(updateUser({ fields: response?.data?.data?.user }));
      toast({
        title: "Profile Successfully Updated",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.data?.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form className="w-full" onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="w-full space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5 gap-2">
            <div>
              <Input
                name={"username"}
                type={"text"}
                value={username}
                placeholder={"Username"}
                disable={true}
                icon={"fi fi-rr-user"}
              />
            </div>
            <div>
              <Input
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
                <Input
                  placeholder="Fullname"
                  {...field}
                  icon={"fi fi-rr-user"}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <Textarea placeholder="Bio" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="mt-1 text-dark-grey">{characterLeft} characters left</p>

          <Button className="btn-dark w-auto px-10  mt-4" type="submit">
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditProfileForm;
