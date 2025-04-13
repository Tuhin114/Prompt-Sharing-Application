import Category from "@models/category";
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// GET: Fetch posts by category ID
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const { id: category_id } = params;

    if (!category_id) {
      return new Response(
        JSON.stringify({ message: "Category ID is required" }),
        { status: 400 }
      );
    }

    const category = await Category.findById(category_id);
    if (!category) {
      return new Response(JSON.stringify({ message: "No category found" }), {
        status: 404,
      });
    }

    const postIds = category.post_id || [];
    const posts = await Prompt.find({ _id: { $in: postIds } }).populate(
      "creator"
    );

    return new Response(JSON.stringify({ posts }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
};

// DELETE: Remove a category by ID and update prompts
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    const { id: category_id } = params;

    if (!category_id) {
      return new Response(
        JSON.stringify({ message: "Category ID is required" }),
        { status: 400 }
      );
    }

    const category = await Category.findByIdAndDelete(category_id);
    if (!category) {
      return new Response(JSON.stringify({ message: "Category not found" }), {
        status: 404,
      });
    }

    // Remove category reference from associated prompts
    await Prompt.updateMany(
      { category: category_id },
      { $pull: { category: category_id } }
    );

    return new Response(
      JSON.stringify({ message: "Category deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting category:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
};

// PATCH: Update category name
export const PATCH = async (req, { params }) => {
  try {
    await connectToDB();
    const { id: category_id } = params;
    const { new_name } = await req.json();

    if (!new_name?.trim()) {
      return new Response(
        JSON.stringify({ message: "Category name is required" }),
        { status: 400 }
      );
    }

    const category = await Category.findByIdAndUpdate(
      category_id,
      { name: new_name },
      { new: true }
    );

    if (!category) {
      return new Response(JSON.stringify({ message: "Category not found" }), {
        status: 404,
      });
    }

    // Update category name in related prompts
    await Prompt.updateMany(
      { category: category_id },
      { $set: { category: new_name } }
    );

    return new Response(JSON.stringify({ category }), { status: 200 });
  } catch (error) {
    console.error("Error updating category:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
};
