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
import { toast } from "@/hooks/use-toast";

// Function to count words (tokens)
export const countToken = (inputText) => {
  return inputText
    .trim()
    .split(/\s+/)
    .filter((word) => word).length;
};

const ChatView = () => {
  const { id } = useParams();
  const convex = useConvex();
  const { messages, setMessages } = useContext(ContextMessage);
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const [userInput, setuserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const UpdateMessages = useMutation(api.workspace.UpdateMessages);
  const { toggleSidebar } = useSidebar();
  const updateToken = useMutation(api.users.UpdateToken);

  const GetWorkspaceData = async () => {
    try {
      const result = await convex.query(api.workspace.GetWorkspace, {
        worksSpaceID: id,
      });
      setMessages(result?.messages || []);
    } catch (error) {
      console.error("Error fetching workspace data:", error);
    }
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages.length - 1].role;
      if (role === "user") {
        GetAIResponse();
      }
    }
  }, [messages]);

  const onGenerate = (input) => {
    if(userDetails?.token<10){
      toast('You dont have enough token')
      return; 
    }
    setMessages((prev) => [...prev, { role: "user", content: input }]);
  };

  const GetAIResponse = async () => {
    setLoading(true);
    try {
      const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
      const result = await axios.post("/api/ai-chat", { prompt: PROMPT });

      if (!result.data || !result.data.result) {
        console.error("Invalid AI response:", result.data);
        return;
      }

      const aiMessage = { role: "ai", content: result.data.result };

      setMessages((prev) => [...prev, aiMessage]);

      await UpdateMessages({
        messages: [...messages, aiMessage],
        worksSpaceID: id,
      });

      // **Calculate Tokens to Deduct**
      const usedTokens = countToken(aiMessage.content); // Count tokens in AI response
      // console.log("Tokens Used:", usedTokens);

      // **Ensure valid token update**
      let currentToken = Number(userDetails?.token) || 1000; // Default to 10,000
      let newToken = currentToken - usedTokens;

      if (isNaN(newToken) || newToken < 0) {
        console.warn(
          "Final token calculation resulted in NaN or negative value."
        );
        newToken = 0; // Prevents negative tokens
      }

      // console.log(`Updated Token: ${currentToken} -> ${newToken}`);

      await updateToken({
        userId: userDetails?._id,
        token: newToken,
      });

      setUserDetails((prev) => ({
        ...prev,
        token: newToken,
      }));
    } catch (error) {
      console.error("Error in GetAIResponse:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      GetWorkspaceData();
    }
  }, [id]);

  return (
    <div className="relative h-[85vh] flex flex-col">
      <div className="flex-1 pl-10 overflow-y-scroll scrollbar-hide">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className="p-3 rounded-lg mb-2 flex gap-2 items-start leading-5 text-sm"
              style={{ backgroundColor: Colors.CHAT_BACKGROUND }}
            >
              {msg?.role === "user" && (
                <Image
                  src={userDetails?.picture}
                  alt="userImage"
                  width={35}
                  height={35}
                  className="rounded-full"
                />
              )}
              <ReactMarkdown className="flex flex-col text-sm">
                {msg.content}
              </ReactMarkdown>
            </div>
          ))
        ) : (
          <p>No messages available</p>
        )}
        {loading && (
          <div className="p-3 rounded-lg mb-2 flex gap-2 items-start ">
            <Loader2Icon className="animate-spin" />
            <h2>Generating response...</h2>
          </div>
        )}
      </div>

      <div className="flex items-end gap-2">
        {userDetails && (
          <Image
            src={userDetails?.picture}
            alt="user"
            width={30}
            height={30}
            className="rounded-full cursor-pointer"
            onClick={toggleSidebar}
          />
        )}
        <div className="p-5 border rounded-xl w-full max-w-2xl">
          <div className="flex gap-2">
            <textarea
              placeholder={Lookup.INPUT_PLACEHOLDER}
              onChange={(event) => setuserInput(event.target.value)}
              className="outline-none bg-transparent w-full h-32 max-h-56 overflow-auto"
            ></textarea>
            {userInput.trim() && (
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
