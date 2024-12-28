import Prompt from "@models/prompt";
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

    if (prompt.saved.includes(userId)) {
      prompt.saved = prompt.saved.filter((id) => id.toString() !== userId);
      await prompt.save();
      return new Response(
        JSON.stringify({ message: "Remove bookmark successfully" }),
        {
          status: 200,
        }
      );
    } else {
      return new Response("User has not bookmarked this prompt", {
        status: 400,
      });
    }
  } catch (error) {
    return new Response("Failed to unbookmark the prompt", {
      status: 500,
    });
  }
};
