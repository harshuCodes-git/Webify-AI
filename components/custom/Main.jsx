"use client";
import { ContextMessage } from "@/context/ContextMessage";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import Lookup from "@/data/Lookup";
import { ArrowRight, Link } from "lucide-react";
import React, { useContext, useState } from "react";
import SignupDialog from "./SignupDialog";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "@/components/ui/text-reveal-card";

const Main = () => {
  const [userInput, setuserInput] = useState("");
  const context = useContext(ContextMessage);
  const { messages, setMessages } = context;
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const [openDialog, setOpenDialog] = useState(false);
  const createWorkSpace = useMutation(api.workspace.CreateWorkspace);
  const router = useRouter();

  const onGenerate = async (input) => {
    if (!userDetails?.name) {
      setOpenDialog(true);
      return;
    }

    if (userDetails?.token < 10) {
      toast("You dont have enough token");
      return;
    }

    if (typeof input !== "string" || input.trim() === "") {
      console.error("Invalid input. Expected a non-empty string.");
      return;
    }

    const msg = {
      role: "user",
      content: input.trim(),
    };

    setMessages({ ...msg });

    try {
      const worksSpaceID = await createWorkSpace({
        user: userDetails._id,
        messages: [{ ...msg }],
      });

      console.log(worksSpaceID);
      router.push(`/workspace/${worksSpaceID}`);
    } catch (error) {
      console.error("Error creating workspace:", error);
    }
  };

  return (
    <div
      className="flex flex-col mt-10 sm:mt-16 md:mt-20 justify-center items-center gap-4 px-4"
      suppressHydrationWarning
    >
      {/* Hero Section */}
      <div className="flex items-center justify-center w-full max-w-lg md:max-w-2xl">
        <TextRevealCard 
        className=" text-white flex items-center justify-center text-lg mb-2 w-full min-w-full"
          text="Build your WebApp"
          revealText="Just Type it"
        />
      </div>

      <p className="font-medium text-gray-400 text-center px-2 sm:text-lg">
        {Lookup.HERO_DESC}
      </p>

      {/* Input Box */}
      <div className="p-4 border rounded-xl w-full max-w-lg md:max-w-2xl">
        <div className="flex gap-2">
          <textarea
            placeholder={Lookup.INPUT_PLACEHOLDER}
            onChange={(event) => setuserInput(event.target.value)}
            className="outline-none bg-transparent w-full min-h-[100px] h-24 max-h-56 overflow-auto text-sm md:text-base p-2"
          ></textarea>

          {userInput?.trim() && (
            <ArrowRight
              onClick={() => onGenerate(userInput)}
              className="bg-blue-600 p-2 rounded-md cursor-pointer h-8 w-8"
            />
          )}
        </div>
        <div className="mt-2 flex justify-end">
          <Link className="h-5 w-5" />
        </div>
      </div>

      {/* Suggestions */}
      <div className="flex flex-wrap p-2 max-w-lg md:max-w-2xl justify-center gap-3">
        {Lookup?.SUGGSTIONS.map((suggestion, index) => (
          <h2
            key={index}
            onClick={() => onGenerate(suggestion)}
            className="px-3 py-1 border rounded-full text-gray-400 text-xs cursor-pointer hover:text-white"
          >
            {suggestion}
          </h2>
        ))}
      </div>

      {/* Signup Dialog */}
      <SignupDialog
        openDia={openDialog}
        closeDialog={() => setOpenDialog(false)}
      />
    </div>
  );
};

export default Main;
