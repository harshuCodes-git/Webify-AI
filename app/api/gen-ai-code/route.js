import { GenAICode } from "@/config/AIModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Parse JSON safely
    const { prompt } = await req.json();

    // Abort request if it takes too long (10 sec timeout)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 sec

    // Send the prompt to AI model
    const result = await GenAICode.sendMessage(prompt);
    const resp = await result.response.text();

    // Clear timeout when successful
    clearTimeout(timeoutId);

    // Ensure response is valid JSON
    return NextResponse.json(JSON.parse(resp));
  } catch (err) {
    console.error("API Error:", err.message);

    // Return a proper error message
    return NextResponse.json(
      { error: "Server error, please try again later.", details: err.message },
      { status: 504 }
    );
  }
}
