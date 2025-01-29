"use client";
import { useConvex } from "convex/react";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { ContextMessage } from "@/context/ContextMessage";
import Colors from "@/data/Colors";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import Image from "next/image";
import { ArrowRight, Link } from "lucide-react";
import Prompt from "@/data/Prompt";
import axios from "axios";

const ChatView = () => {
  const { id } = useParams();
  const convex = useConvex();
  const { messages, setMessages } = useContext(ContextMessage);
  const { userDetails, setUserDetails }= useContext(UserDetailsContext); 
  const [userInput, setuserInput] = useState("");

  useEffect(() => {
    if (id) {
      GetWorkspaceData();
    }
  }, [id]);

  const GetWorkspaceData = async () => {
    try {
      const result = await convex.query(api.workspace.GetWorkspace, {
        worksSpaceID: id,
      });
      console.log(result); // Inspect the response structure

      // Check if the response contains messages
      if (result && result.messages && Array.isArray(result.messages)) {
        setMessages(result.messages); // If messages are found, update state
      } else {
        setMessages([]); // If no messages or invalid structure, fallback
        console.error("Expected an array of messages, but got:", result);
      }
    } catch (error) {
      console.error("Error fetching workspace data:", error);
      setMessages([]); // Handle errors by setting an empty array
    }
  };

  const GetAIResponse=async()=>{
    const PROMPT=JSON.stringify(messages)+Prompt.CHAT_PROMPT
    const result = await axios.post('/api/ai-chat/',{
      prompt:PROMPT
    })
    console.log(result.data)
  }

  useEffect(()=>{
    if(messages?.length>0){
      const role=messages[messages?.length-1].role;
      if(role=='user'){
        GetAIResponse()
      }
    }
  },[messages])

  return (
    <div className="relative h-[85vh] flex flex-col">
      <div className="flex-1 overflow-y-scroll scroll-clip overscroll-auto overflow-visible">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className="p-3 rounded-lg mb-2 flex gap-2 items-start "
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
              <h2>{msg.content}</h2>
            </div>
          ))
        ) : (
          <p>No messages available</p> // Fallback if no messages are available
        )}
      </div>
      <div className="p-5 border rounded-xl w-full max-w-2xl">
        <div className="flex gap-2">
          <textarea
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
  );
};

export default ChatView;
