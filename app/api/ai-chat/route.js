import { ChatSession } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const result = await ChatSession.sendMessage(prompt);

    // Check the structure of the result
    const AIresp = result?.response?.text ?? "No response from AI";

    return NextResponse.json({ result: AIresp });
  } catch (err) {
    console.error("Error in ChatSession:", err);
    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
}
