import Prompt from "@models/prompt";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const POST = async (request, { params }) => {
  let { userId, prompt, tag } = await request.json();

  if (tag === "" || prompt === "") {
    return new Response("Prompt and tag is required", { status: 400 });
  }

  // Ensure `tag` is an array of strings
  if (!Array.isArray(tag)) {
    tag = typeof tag === "string" ? tag.split(",").map((t) => t.trim()) : [];
  }

  const creator = await User.findById(userId);
  if (creator) {
    creator.coins += 1; // Add 1 coin per post
    await creator.save();
    console.log(
      `Coins updated for user ${creator._id}. New balance: ${creator.coins}`
    );
  }

  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
      isDraft: false,
      likes: [],
      saved: [],
    });

    console.log(newPrompt);

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
