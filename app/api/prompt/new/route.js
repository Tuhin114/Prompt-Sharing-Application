import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  let { userId, prompt, tag } = await request.json();

  // Ensure `tag` is an array of strings
  if (!Array.isArray(tag)) {
    tag = typeof tag === "string" ? tag.split(",").map((t) => t.trim()) : [];
  }

  try {
    await connectToDB();
    const newPrompt = new Prompt({ creator: userId, prompt, tag });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
