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

const Main = () => {
  const [userInput, setuserInput] = useState();
  const context = useContext(ContextMessage);
  const { messages, setMessages } = context;
  const {userDetails,setUserDetails}=useContext(UserDetailsContext)
  const [openDialog,setOpenDialog]=useState(false)
  const CreateWorkSpace=useMutation(api.workspace.CreateWorkspace)
  const router=useRouter();


  const  onGenerate = async(input) => {
    if(!userDetails?.name){
      setOpenDialog(true)
      return ; 
    }

    const msg = {
      role: "user",
      content: input,
    };
    setMessages(msg);

    const  worksSpaceID=await CreateWorkSpace({
      user:userDetails._id,
      messages:[msg],

    })
    console.log(worksSpaceID)
    router.push('/workspace/'+worksSpaceID)
    
  };
  return (
    <div className="flex flex-col mt-20 justify-center items-center  gap-2 ">
      <h2 className="font-bold text-4xl">{Lookup.HERO_HEADING}</h2>
      <p className="font-medium text-gray-400">{Lookup.HERO_DESC}</p>
      <div className="p-5 border rounded-xl w-full max-w-2xl ">
        <div className="flex gap-2">
          <textarea
            name=""
            id=""
            placeholder={Lookup.INPUT_PLACEHOLDER}
            onChange={(event) => {
              setuserInput(event);
            }}
            className="outline-none bg-transparent w-full h-32 max-h-56  overflow-auto"
          ></textarea>
          {userInput && (
            <ArrowRight
              onClick={() => onGenerate(userInput)}
              className="bg-blue-600 p-2  rounded-md cursor-pointer h-8 w-8 "
            />
          )}
        </div>
        <div>
          <Link className="h-4 w-4" />
        </div>
      </div>
      <div className="flex flex-wrap p-2 max-w-2xl justify-center gap-3">
        {Lookup?.SUGGSTIONS.map((suggestion, index) => (
          <h2
            key={index}
            onClick={() => onGenerate(suggestion)}
            className="px-2 p-1 border rounded-full text-gray-400 text-xs cursor-pointer hover:text-white"
          >
            {suggestion}
          </h2>
        ))}
      </div>
      <SignupDialog openDia={openDialog} closeDialog ={(v)=>setOpenDialog(false)}/>
    </div>
  );
};

export default Main;
