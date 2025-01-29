import { chatSession } from "@/config/AIModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  const {prompt}=await req.json();

  try{
    const res=await chatSession.sendMessage(prompt);
    const AIresponse=res.response.text(); 

    return NextResponse.json({result:AIresponse})

  }catch(err){
    return NextResponse.json({err})
  }


}
