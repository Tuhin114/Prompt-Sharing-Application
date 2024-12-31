import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export async function POST(req) {
  try {
    await connectToDB();

    console.log("Received POST request to save draft");

    const { userId, prompt, tag, isDraft } = await req.json();

    if (!userId) {
      return new Response("User ID is required", { status: 400 });
    }

    const newDraft = await Prompt.create({
      creator: userId,
      prompt: prompt || "",
      tag: Array.isArray(tag) ? tag : [],
      isDraft: isDraft || false,
    });

    return new Response(JSON.stringify(newDraft), { status: 201 });
  } catch (error) {
    console.error("Failed to save draft:", error);
    return new Response("Failed to save draft", { status: 500 });
  }
}
