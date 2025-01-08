import Prompt from "@models/prompt";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const PATCH = async (request) => {
  try {
    const { promptId, userId } = await request.json();
    if (!promptId || !userId) {
      return new Response("Missing promptId or userId", { status: 400 });
    }

    await connectToDB();

    const prompt = await Prompt.findById(promptId);
    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    // Remove user from the likes array if they already liked it
    if (prompt.likes.includes(userId)) {
      prompt.likes = prompt.likes.filter((id) => id.toString() !== userId);
      await prompt.save();
      const creator = await User.findById(prompt.creator);
      if (creator) {
        creator.coins = Math.max(0, creator.coins - 1); // Ensure coins don’t go negative
        await creator.save();
        console.log(
          `1 coin deducted from user ${creator._id}. New balance: ${creator.coins}`
        );
      }
      return new Response(JSON.stringify({ message: "Unliked successfully" }), {
        status: 200,
      });
    } else {
      return new Response("User has not liked this prompt", { status: 400 });
    }
  } catch (error) {
    return new Response("Failed to unlike the prompt", { status: 500 });
  }
};
