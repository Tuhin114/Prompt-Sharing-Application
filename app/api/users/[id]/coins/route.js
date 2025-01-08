import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    const userId = params.id;

    if (!userId) {
      return new Response("User ID is required", { status: 400 });
    }

    console.log("User ID:", userId);

    await connectToDB();

    const user = await User.findById(userId);
    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    return new Response(JSON.stringify({ coins: user.coins || 0 }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching user coins:", error);
    return new Response("Failed to fetch coins", { status: 500 });
  }
};
