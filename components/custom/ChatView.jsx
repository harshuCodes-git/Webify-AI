"use client";
import { useConvex, useMutation } from "convex/react";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { ContextMessage } from "@/context/ContextMessage";
import Colors from "@/data/Colors";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import Image from "next/image";
import { ArrowRight, Link, Loader2Icon } from "lucide-react";
import Prompt from "@/data/Prompt";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Lookup from "@/data/Lookup";
import { useSidebar } from "../ui/sidebar";

const ChatView = () => {
  const { id } = useParams();
  const convex = useConvex();
  const { messages, setMessages } = useContext(ContextMessage);
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const [userInput, setuserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const UpdateMessages=useMutation(api.workspace.UpdateMessages)
  const {toggleSidebar}=useSidebar()

  useEffect(() => {
    if (id) {
      GetWorkspaceData();
    }
  }, [id]);

  const GetWorkspaceData = async () => {
    const result = await convex.query(api.workspace.GetWorkspace, {
      worksSpaceID: id,
    });
    console.log(result); // Inspect the response structure

    setMessages(result?.messages);
  };

  const GetAIResponse = async () => {
    setLoading(true);
    const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
    const result = await axios.post("/api/ai-chat", {
      prompt: PROMPT,
    });
    console.log(result.data.result);
    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        content: result.data.result,
      },
    ]);

    await UpdateMessages({
      messages: [
        ...messages,
        {
          role: "ai",
          content: result.data.result,
        },
      ],worksSpaceID:id
    });

    setLoading(false);
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1].role;
      if (role == "user") {
        GetAIResponse();
      }
    }
  }, [messages]);

  // function for creating on generate response 

  const onGenerate=(input)=>{
    setMessages(prev=>[...prev,{
      role:'user',
      content:input,
    }])
  }

  return (
    <div className="relative h-[85vh] flex flex-col">
      <div className="flex-1 pl-10 overflow-y-scroll scroll-clip overscroll-auto overflow-visible scrollbar-hide">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className="p-3 rounded-lg mb-2 flex gap-2 items-start leading-5 text-sm"
              style={{
                backgroundColor: Colors.CHAT_BACKGROUND,
              }}
            >
              {msg?.role == "user" && (
                <Image
                  src={userDetails?.picture}
                  alt="userImage"
                  width={35}
                  height={35}
                  className="rounded-full"
                />
              )}
              <ReactMarkdown className="flex flex-col text-sm
              ">{msg.content}</ReactMarkdown>
            </div>
          ))
        ) : (
          <p>No messages available</p> // Fallback if no messages are available
        )}
        {loading && (
          <div className="p-3 rounded-lg mb-2 flex gap-2 items-start ">
            <Loader2Icon className="animate-spin" />
            <h2>Generating response...</h2>
          </div>
        )}
      </div>

      <div className="flex items-end gap-2">
        {userDetails&&<Image src={userDetails?.picture} alt="user" width={30} height={30} 
        className="rounded-full cursor-pointer" 
        onClick={toggleSidebar}/>}
      <div className="p-5 border rounded-xl w-full max-w-2xl">
        <div className="flex gap-2">
          <textarea
          placeholder={Lookup.INPUT_PLACEHOLDER}
            name=""
            id=""
            onChange={(event) => {
              setuserInput(event.target.value); // Correctly set the input value
            }}
            className="outline-none bg-transparent w-full h-32 max-h-56 overflow-auto"
          ></textarea>
          {userInput && userInput.trim() && (
            <ArrowRight
              onClick={() => onGenerate(userInput)}
              className="bg-blue-600 p-2 rounded-md cursor-pointer h-8 w-8"
            />
          )}
        </div>
        <div>
          <Link className="h-4 w-4" />
        </div>
      </div>
      </div>
    </div>
  );
};

export default ChatView;
