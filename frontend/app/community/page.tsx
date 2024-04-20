"use client";
import AnimationWrapper from "@/components/common/page-animation";
import Enquiry from "@/components/Enquiry";
import Faq from "@/components/Faq";
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useRedirect from "@/hooks/useRedirect";
import { logout } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { ListItem } from "@/components/Header";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateQnsCommentMutation,
  useCreateQnsMutation,
  useGetAllCommunityQnsMutation,
  useLikeCommentByUserMutation,
} from "@/redux/services/communityApi";
import Loader from "@/components/common/Loader";
import NoDataMessage from "@/components/common/Nodata";
import { formatedTime } from "@/utils/formateTime";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Please add a title",
  }),
  description: z.string().min(2, {
    message: "Please add a question ",
  }),
});
const formSchema2 = z.object({
  comment: z.string().min(2, {
    message: "Please add a comment",
  }),
});

const CommunityPage = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  let userData = useSelector((state: RootState) => state.auth);
  let { userInfo: user, userToken, isAuthenticated } = userData;
  const [comment, setComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [allQns, setAllQns] = useState<any>([]);
  const [showComments, setShowComments] = useState<any>(false);

  const [createQns] = useCreateQnsMutation();
  const [createQnsComment] = useCreateQnsCommentMutation();
  const [likeCommentByUser] = useLikeCommentByUserMutation();

  const [getAllCommunityQns, { isLoading, isSuccess }] =
    useGetAllCommunityQnsMutation();

  const handleOpenComment = (questionId: any) => {
    setShowComments((prev: any) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const handleLikeComment = async (
    communityId: any,
    commentId: any,
    userId: any
  ) => {
    if (!userId) {
      toast({
        variant: "destructive",
        title: "Something Went Wrong!",
        description: "Please Login to add Comment",
      });
    } else {
      try {
        const res: any = await likeCommentByUser({
          communityId,
          commentId,
          userId,
        });
        console.log(res);

        getAllCommunityQuestions2();
        setIsLiked(!isLiked);
        toast({
          title: res?.data?.message,
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Something Went Wrong!",
          // description: error,
        });
      }
    }
  };
  const handleChange = (event: any) => {
    setComment(event.target.value);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleSubmit = async (event: any, id: any) => {
    event.preventDefault();
    if (!user) {
      toast({
        variant: "destructive",
        title: "You are not Logged In!",
      });
    } else {
      try {
        const response: any = await createQnsComment({
          id,
          data: { comment, user: user?._id },
        }).unwrap();
        toast({
          title: response?.message,
        });
        setComment("");
        getAllCommunityQuestions2();
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error?.data?.message,
        });
        console.log(error);
      }
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const newValues = { ...values, user: user?._id };

      const response: any = await createQns(newValues).unwrap();
      toast({
        title: response?.message,
      });

      form.reset();
      getAllCommunityQuestions2();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.data?.message,
      });
      console.log(error?.data?.message);
    }
  };

  const isCommentLikedByUser = (commentLikes: any, loggedInUserId: any) => {
    return commentLikes.includes(loggedInUserId);
  };

  const getAllCommunityQuestions2 = async () => {
    const res: any = await getAllCommunityQns("");
    setAllQns(res?.data?.data?.community);
  };
  useEffect(() => {
    const getAllCommunityQuestions = async () => {
      const res: any = await getAllCommunityQns("");

      setAllQns(res?.data?.data?.community);
    };
    getAllCommunityQuestions();
  }, [getAllCommunityQns]);

  return (
    <AnimationWrapper className="sm:w-[70%] w-[90%] m-auto min-h-[100vh]  py-[20px]">
      <section className="">
        <div className="flex items-center justify-center min-h-[240px] w-full bg-background text-center rounded-sm">
          <div className="flex items-center justify-center h-full">
            <h1 className="md:text-[48px] text-[36px] font-bold tracking-tighter text-center">
              Community
            </h1>
          </div>
        </div>
        {isLoading ? (
          <Loader />
        ) : !isSuccess ? (
          <NoDataMessage
            message={"Community Data Unavailable!"}
            icon={"fi fi-rr-search-alt"}
          />
        ) : (
          <div>
            {allQns?.length == 0 ? (
              <NoDataMessage
                message={"No Community Data exist"}
                icon={"fi fi-rr-search-alt"}
              />
            ) : (
              <div className="gap-4  my-8 relative md:mt-0 mt-20">
                {allQns?.map((q: any, key: any) => (
                  <div
                    className=" w-full md:w-[80%] h-full my-4 flex flex-row"
                    key={key}
                  >
                    <div className=" h-fit pr-3  w-full bg-background text-left rounded-sm py-6">
                      <div className="pl-8 items-center justify-center h-full">
                        <h2 className="font-semibold text-2xl mb-2">
                          {q?.title}
                        </h2>
                        <span className="font-thin font-md ">
                          {q?.description}
                        </span>
                        <div className="border-b w-full h-1 mt-2"></div>
                        <div className="mt-2 flex justify-between">
                          <div className="flex text-center justify-between items-center space-x-2">
                            <Avatar>
                              <AvatarImage
                                sizes="10px"
                                src={q?.user?.profileImage}
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div>
                              <span className="font-thin text-sm">
                                posted by
                              </span>
                              <span className="pl-2 pr-2">
                                {q?.user?.username}
                              </span>
                              <span className="font-thin text-sm">
                                {formatedTime(q?.createdAt)}
                              </span>
                            </div>
                          </div>

                          {/* comment button  */}
                          <div className="flex gap-2">
                            <div
                              className="mr-2 cursor-pointer"
                              onClick={() => handleOpenComment(q._id)}
                            >
                              <i className="fi font-thin fi-rs-comment text-xl mr-1"></i>
                              <span className="text-thin text-center">
                                {q?.comments?.length}
                              </span>
                            </div>
                          </div>
                        </div>
                        {showComments[q._id] && (
                          <AnimationWrapper>
                            {q?.comments.length < 0 ? (
                              <>no</>
                            ) : (
                              <>
                                {q?.comments?.map((cmt: any, key: any) => (
                                  <div className="mt-8 " key={key}>
                                    {/* comment details  */}

                                    <div
                                      key={key}
                                      className="ml-14 border p-4 rounded-sm"
                                    >
                                      <span className="font-thin font-md ">
                                        {cmt?.comment}
                                      </span>
                                      <div className="border-b w-full h-1 mt-2"></div>

                                      {/* user details  */}
                                      <div className="mt-2 flex justify-between">
                                        <div className="flex text-center  items-center space-x-2">
                                          <Avatar>
                                            <AvatarImage
                                              sizes="10px"
                                              src={cmt?.user?.profileImage}
                                            />
                                            <AvatarFallback>CN</AvatarFallback>
                                          </Avatar>
                                          <div>
                                            <span className="font-thin text-sm">
                                              posted by
                                            </span>
                                            <span className="pl-2 pr-2">
                                              {cmt?.user?.username}
                                            </span>
                                            <span className="font-thin text-sm">
                                              {formatedTime(cmt?.createdAt)}
                                            </span>
                                          </div>
                                        </div>
                                        {/* like details  */}
                                        <div
                                          className="ml-2 cursor-pointer"
                                          onClick={() =>
                                            handleLikeComment(
                                              q?._id,
                                              cmt?._id,
                                              user?._id
                                            )
                                          }
                                        >
                                          {isCommentLikedByUser(
                                            cmt?.likes,
                                            user?._id
                                          ) ? (
                                            <i className="fi font-thin fi-sr-heart text-xl mr-1"></i>
                                          ) : (
                                            <i className="fi font-thin fi-rs-heart text-xl mr-1"></i>
                                          )}
                                          <span className="text-thin text-center">
                                            {cmt?.likes?.length
                                              ? cmt?.likes?.length
                                              : "0"}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                                {/* input comment  */}
                                <div className="mt-6">
                                  <form
                                    action=""
                                    onSubmit={() => handleSubmit(event, q?._id)}
                                    className="w-full"
                                  >
                                    <Input
                                      placeholder="Write a comment"
                                      icon={"fi fi-rr-edit"}
                                      value={comment} // Set the value of the input to the comment state
                                      onChange={handleChange}
                                      required
                                    />
                                    <Button
                                      type="submit"
                                      className="flex justify-end mt-2"
                                    >
                                      Submit
                                    </Button>
                                  </form>
                                </div>
                              </>
                            )}
                          </AnimationWrapper>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {/* Start a new Topic */}
                <div className="absolute md:top-0 top-[-10] right-0">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full">
                        <i className="fi fi-rr-plus mr-2"></i>
                        Start a new Topic
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="">
                      <DialogHeader className="mt-6">
                        <DialogTitle className="text-2xl flex item-center justify-center flex-col text-center">
                          Start a new Topic
                        </DialogTitle>
                      </DialogHeader>
                      {user ? (
                        <DialogDescription>
                          <Form {...form}>
                            <form
                              onSubmit={form.handleSubmit(onSubmit)}
                              className="w-full"
                            >
                              <DialogHeader>
                                <DialogTitle>
                                  Add New Community Question
                                </DialogTitle>
                              </DialogHeader>
                              <div className=" space-y-4 py-4">
                                <div className="  items-center gap-4 space-y-4">
                                  <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                      <FormItem className="w-full m-0">
                                        <FormLabel>
                                          Enter Question title
                                        </FormLabel>
                                        <FormControl>
                                          <Input
                                            placeholder="Title"
                                            // defaultValue={title}
                                            icon={"fi fi-rr-comment-alt"}
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                      <FormItem className="w-full m-0">
                                        <FormLabel>
                                          Enter Question description
                                        </FormLabel>
                                        <FormControl>
                                          <Textarea
                                            placeholder="Description"
                                            // defaultValue={}
                                            // icon={"fi fi-rr-graduation-cap"}
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
                                <Button>Create New Topic</Button>
                              </DialogFooter>
                            </form>
                          </Form>{" "}
                        </DialogDescription>
                      ) : (
                        <DialogDescription className="text-center">
                          Please Login to Start a New Topic <br />
                          <Link href={"/auth/login"} className="text-xl mt-4">
                            {" "}
                            <Button size={"lg"} className="mt-4 w-full">
                              Login
                            </Button>
                          </Link>
                        </DialogDescription>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </AnimationWrapper>
  );
};

export default CommunityPage;
