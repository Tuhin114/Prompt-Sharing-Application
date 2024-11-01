import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const YOUR_API_KEY = "AIzaSyCuzRMWPbNGhxJieuTNLPBgAqXTXUrKNfM"; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(YOUR_API_KEY);

export async function POST(request) {
  try {
    const { gptPrompt } = await request.json();
    console.log(gptPrompt);
    // const input = "Linkedin post";

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const tag = `Create a list of five most used and genaral one word tags seached in the internet related to the ${gptPrompt} formatted as a single string. Each tags should be separated by '||'. This tags is for an AI generated prompt application where user will get most searched tags related to ${gptPrompt}. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example if user searched for "how to how to master typescript" then your output should be structured like this: 'typescript||frontend||webdev||development||full-stack'Ensure that there should not be any extra text..only the single string`;

    const result = await model.generateContent(tag);
    const response = await result.response;
    const text = await response.text();

    // Assuming the result is a comma-separated list of prompts
    const tags = text.split("||").map((tag) => tag.trim());

    return NextResponse.json({ tags });
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json(
      { error: "Failed to fetch tags" },
      { status: 500 }
    );
  }
}
