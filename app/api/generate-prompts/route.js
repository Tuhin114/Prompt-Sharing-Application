import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const YOUR_API_KEY = "AIzaSyDlBSG4OHEaGcd-WTvDZ9y4gMUEwVgf0BU"; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(YOUR_API_KEY);

export async function POST(request) {
  try {
    const { gptPrompt } = await request.json();
    console.log(gptPrompt);
    // const input = "Linkedin post";

    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // const prompt = `Create a list of five most used and genaral queries seached in the internet related to the ${gptPrompt} formatted as a single string. Each queries should be separated by '||'. This queries is for an AI generated prompt application where user will get most searched queries related to ${gptPrompt}. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example if user searched for "how to how to master typescript" then your output should be structured like this: 'How to effectively utilize TypeScript's type system to enhance code readability and maintainability?||What are the common TypeScript design patterns and how can they be applied to build robust applications?||What are the key differences between TypeScript and JavaScript?||What tools and libraries are best for testing TypeScript code?||What strategies are effective for migrating JavaScript to TypeScript?'Ensure that there should not be any extra text..only the single string`;

    // const result = await model.generateContent(prompt);
    // const response = await result.response;
    // const text = await response.text();

    // // Assuming the result is a comma-separated list of prompts
    // const prompts = text.split("||").map((prompt) => prompt.trim());

    const prompts = [
      "How to effectively utilize TypeScript's type system to enhance code readability and maintainability?",
      "What are the common TypeScript design patterns and how can they be applied to build robust applications?",
      "What are the key differences between TypeScript and JavaScript?",
      "What tools and libraries are best for testing TypeScript code?",
      "What strategies are effective for migrating JavaScript to TypeScript?",
    ];

    return NextResponse.json({ prompts });
  } catch (error) {
    console.error("Error fetching prompts:", error);
    return NextResponse.json(
      { error: "Failed to fetch prompts" },
      { status: 500 }
    );
  }
}
