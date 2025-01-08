import Prompt from "@models/prompt";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const PATCH = async (request) => {
  try {
    const { promptId, userId } = await request.json();
    // console.log("Prompt ID:", promptId, "User ID:", userId);

    if (!promptId || !userId) {
      return new Response("Missing promptId or userId", { status: 400 });
    }

    await connectToDB();

    // Fetch prompt and ensure it exists
    const prompt = await Prompt.findById(promptId);
    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    // Check if the user already liked the prompt
    if (!prompt.likes.includes(userId)) {
      prompt.likes.push(userId);
      await prompt.save();

      // Reward the creator with coins
      const creator = await User.findById(prompt.creator);
      if (creator) {
        creator.coins += 3; // Add 3 coins per like

        await creator.save();
        console.log(
          `Coins updated for user ${creator._id}. New balance: ${creator.coins}`
        );
      }

      return new Response(
        JSON.stringify({
          message: "Liked successfully, 3 coins rewarded to creator",
        }),
        { status: 200 }
      );
    } else {
      return new Response("User has already liked this prompt", {
        status: 400,
      });
    }
  } catch (error) {
    console.error("Error in like route:", error.message);
    return new Response("Failed to like the prompt", { status: 500 });
  }
};
