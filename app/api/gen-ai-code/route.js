import { GenAICode } from "@/config/AIModel"
import { NextResponse } from "next/server"

export async function POST(req) {
    const {prompt}= await req.json()

    try{
        const result= await GenAICode.sendMessage(prompt)
        const resp=result.response.text()
        return NextResponse.json(JSON.parse(resp))


    }catch(err){
        return NextResponse.json({err})
    }
}