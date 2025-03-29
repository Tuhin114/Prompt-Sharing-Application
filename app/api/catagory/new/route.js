import Catagory from "@models/category";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
  let { creator_id, type, name } = await req.json();

  console.log(
    "Received POST request to create category",
    creator_id,
    type,
    name
  );

  if (!name.trim()) {
    return new Response("Category name is required", { status: 400 });
  }

  try {
    await connectToDB();

    // Check if a category with the same name and type already exists for the creator
    const existingCategory = await Catagory.findOne({
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

    const newCatagory = new Catagory({
      name: name.trim(),
      creator: creator_id,
      type,
      post_id: [],
    });

    await newCatagory.save();

    return new Response(JSON.stringify(newCatagory), { status: 201 });
  } catch (error) {
    console.error("Failed to create category:", error);
    return new Response("Failed to create category", { status: 500 });
  }
};
