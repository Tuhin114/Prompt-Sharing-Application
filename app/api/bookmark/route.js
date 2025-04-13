import Prompt from "@models/prompt";
import Category from "@models/category";
import { connectToDB } from "@utils/database";

// ✅ Bookmark a prompt
export const POST = async (request) => {
  try {
    const { promptId, userId } = await request.json();

    if (!promptId || !userId) {
      return new Response("Missing promptId or userId", { status: 400 });
    }

    await connectToDB();

    const prompt = await Prompt.findById(promptId);

    if (!prompt) return new Response("Prompt not found", { status: 404 });

    // If already bookmarked, return early
    if (prompt.saved.includes(userId)) {
      return new Response("Already bookmarked", { status: 200 });
    }

    // Add userId to prompt.saved and promptId to user.savedPrompts
    prompt.saved.push(userId);

    await prompt.save();

    return new Response(
      JSON.stringify({ message: "Bookmarked successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error bookmarking:", error);
    return new Response("Failed to bookmark", { status: 500 });
  }
};

// ✅ Unbookmark a prompt
export const DELETE = async (request) => {
  try {
    const { promptId, userId } = await request.json();

    if (!promptId || !userId) {
      return new Response("Missing promptId or userId", { status: 400 });
    }

    await connectToDB();

    const prompt = await Prompt.findById(promptId);
    if (!prompt) return new Response("Prompt not found", { status: 404 });

    // If not bookmarked, return early
    if (!prompt.saved.includes(userId)) {
      return new Response("Not bookmarked", { status: 200 });
    }

    const savedCategories = await Category.find({
      type: "saved_items",
      post_id: promptId,
    });

    // Remove userId from prompt.saved
    prompt.saved = prompt.saved.filter((id) => id.toString() !== userId);

    await prompt.save();

    await Prompt.updateMany(
      {
        creator: userId,
        _id: { $ne: promptId },
      },
      {
        $pull: {
          categories: { $in: savedCategories.map((category) => category._id) },
        },
      }
    );

    // Update all matching categories by removing the promptId from post_id array
    await Category.updateMany(
      {
        type: "saved_items",
        creator: userId,
        post_id: promptId,
      },
      {
        $pull: { post_id: promptId },
      }
    );

    return new Response(
      JSON.stringify({ message: "Unbookmarked successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error unbookmarking:", error);
    return new Response("Failed to unbookmark", { status: 500 });
  }
};
