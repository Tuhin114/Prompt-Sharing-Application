import Category from "@models/category";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
  let { creator_id, type, name } = await req.json();

  if (!name.trim()) {
    return new Response("Category name is required", { status: 400 });
  }

  try {
    await connectToDB();

    const existingCategory = await Category.findOne({
      name: name.trim(),
      type,
      creator: creator_id,
    });

    if (existingCategory) {
      return new Response(
        "Category with the same name and type already exists",
        { status: 400 }
      );
    }

    const newCategory = new Category({
      name: name.trim(),
      creator: creator_id,
      type,
      post_id: [],
    });

    await newCategory.save();

    return new Response(JSON.stringify(newCategory), { status: 201 });
  } catch (error) {
    console.error("Failed to create category:", error);
    return new Response("Failed to create category", { status: 500 });
  }
};
