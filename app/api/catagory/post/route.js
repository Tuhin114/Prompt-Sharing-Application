import Category from "@models/category";
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { category_id, prompt_id } = await request.json();
  try {
    await connectToDB();

    // Find the category by ID and add the prompt ID to its post_id array
    const category = await Category.findByIdAndUpdate(
      category_id,
      { $addToSet: { post_id: prompt_id } },
      { new: true }
    );

    // Find the prompt by ID and add the category ID to its category array
    const prompt = await Prompt.findByIdAndUpdate(
      prompt_id,
      { $addToSet: { catagories: category_id } },
      { new: true }
    );

    if (!category || !prompt) {
      return new Response("Category or Prompt not found", { status: 404 });
    }

    return new Response("Added successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating category:", error);
    return new Response("Failed to update category", { status: 500 });
  }
};

export const DELETE = async (req, res) => {
  try {
    const { category_id, prompt_id } = await req.json();
    await connectToDB();

    // Find the category by ID and remove the prompt ID from its post_id array
    const category = await Category.findByIdAndUpdate(
      category_id,
      { $pull: { post_id: prompt_id } },
      { new: true }
    );

    // Find the prompt by ID and remove the category ID from its category array
    const prompt = await Prompt.findByIdAndUpdate(
      prompt_id,
      { $pull: { catagories: category_id } },
      { new: true }
    );

    if (!category || !prompt) {
      return new Response("Category or Prompt not found", { status: 404 });
    }

    return new Response("Removed successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating category:", error);
    return new Response("Failed to update category", { status: 500 });
  }
};
