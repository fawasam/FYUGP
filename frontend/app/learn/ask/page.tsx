"use client";
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
import AnimationWrapper from "@/components/common/page-animation";
import { Input } from "@/components/ui/input";
import axios from "axios";
const AskQns = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const [searchKey, setSearchKey] = useState("");
  const [question, setQuestion] = useState("");

  const { redirectTo, redirectToHomeIfLoggedIn } = useRedirect();
  let userData = useSelector((state: RootState) => state.auth);
  let { userInfo: user, userToken, isAuthenticated } = userData;

  const handleSearch = async (e: any) => {
    setQuestion(searchKey);
    // if (searchKey == "") {
    //   toast({
    //     title: "Please Provide place or college name",
    //   });
    // } else {
    //   const response: any = await searchCollege(searchKey);
    //   dispatch(setCollege(response?.data));
    // }
  };
  const [messages, setMessages] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleMessageSend = async () => {
    const userMessage = { text: inputValue, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue("");

    const options = {
      method: "POST",
      url: "https://simple-chatgpt-api.p.rapidapi.com/ask",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "b31fd4ef7fmshee8d59d225c8142p123b64jsn07f8b380c8ff",
        "X-RapidAPI-Host": "simple-chatgpt-api.p.rapidapi.com",
      },
      data: { question: inputValue },
    };

    try {
      const response = await axios.request(options);
      const botMessage = response.data;
      const { answer } = botMessage;
      let text = { text: answer };
      console.log(botMessage);

      setMessages((prevMessages) => [...prevMessages, text]);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(messages);

  useEffect(() => {
    if (!user) {
      redirectTo("/");
    }
  }, [user, dispatch, router]);
  return (
    <AnimationWrapper className="sm:w-[70%] w-[90%] m-auto min-h-[100vh]  py-[20px]">
      <section className="max-w-[1060px] m-auto   flex-grow">
        <div className=" flex items-center justify-center min-h-[240px] w-full bg-background text-center rounded-sm">
          <div className="flex justify-center items-center">
            <h1 className="md:text-[48px] text-[36px] font-bold tracking-tighter text-center ">
              Ask about FourthYearDegree
            </h1>
          </div>
        </div>
        <div className="flex flex-col h-screen">
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex justify-${
                  message.sender === "user" ? "end" : "start"
                } mb-2`}
              >
                <div
                  className={`bg-${
                    message.sender === "user" ? "blue" : "orange"
                  } text-black py-2 px-4 rounded-lg max-w-xs`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 flex items-center">
            <input
              type="text"
              className="flex-1 py-2 px-4 border rounded-full mr-4 focus:outline-none"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleMessageSend();
                }
              }}
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full"
              onClick={handleMessageSend}
            >
              Send
            </button>
          </div>
        </div>
        {/* <div className=" w-full mt-6">
          <div className="flex w-full">
            <Input
              type="text"
              className="px-3 py-2 w-full "
              placeholder="Type your message..."
              onChange={(e: any) => setSearchKey(e.target.value)}
            />
            <Button className="px-3 py-2 ml-2" onClick={handleSearch}>
              Search
            </Button>
          </div>
          <div>
            <span>{question}</span>
          </div>
        </div> */}
      </section>
    </AnimationWrapper>
  );
};

export default AskQns;
