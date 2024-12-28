import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const PATCH = async (request) => {
  try {
    const { promptId, userId } = await request.json();
    console.log(promptId, userId);
    if (!promptId || !userId) {
      return new Response("Missing promptId or userId", { status: 400 });
    }

    await connectToDB();

    const prompt = await Prompt.findById(promptId);
    // console.log(prompt);
    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    if (!prompt.likes.includes(userId)) {
      prompt.likes.push(userId);
      await prompt.save();
      return new Response(JSON.stringify({ message: "Liked successfully" }), {
        status: 200,
      });
    } else {
      return new Response("User has already liked this prompt", {
        status: 400,
      });
    }
  } catch (error) {
    return new Response("Failed to like the prompt", { status: 500 });
  }
};
