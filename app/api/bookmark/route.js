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
    // console.log(prompt);
    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    if (!prompt.saved.includes(userId)) {
      prompt.saved.push(userId);
      await prompt.save();

      const creator = await User.findById(prompt.creator);
      if (creator) {
        creator.coins += 2; // Add 2 coins per bookmark
        await creator.save();
        console.log(
          `Coins updated for user ${creator._id}. New balance: ${creator.coins}`
        );
      }

      return new Response(
        JSON.stringify({ message: "Bookmarked successfully" }),
        {
          status: 200,
        }
      );
    } else {
      return new Response("User has already bookmarked this prompt", {
        status: 400,
      });
    }
  } catch (error) {
    return new Response("Failed to bookmark the prompt", { status: 500 });
  }
};
