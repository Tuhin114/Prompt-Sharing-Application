import Category from "@models/category";
import { connectToDB } from "@utils/database";

export const GET = async (req) => {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");
    const type = searchParams.get("type");

    if (!user_id || !type) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing user_id or type" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const categories = await Category.find({ creator: user_id, type }).sort({
      updatedAt: -1,
    });

    return new Response(
      JSON.stringify({ success: true, categories: categories || [] }), // Ensure an empty array if no categories
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Internal Server Error",
        categories: [],
      }), // Return an empty array on failure
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
