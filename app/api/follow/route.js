import User from "@models/user";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  try {
    const { userId, targetId } = await request.json();

    if (!userId || !targetId) {
      return new Response(
        JSON.stringify({ message: "User ID and Target ID are required" }),
        { status: 400 }
      );
    }

    if (userId === targetId) {
      return new Response(
        JSON.stringify({ message: "You cannot follow yourself" }),
        { status: 400 }
      );
    }

    await connectToDB();

    const user = await User.findById(userId);
    const targetUser = await User.findById(targetId);

    if (!user || !targetUser) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // Update followers and following lists without duplicating entries
    await User.updateOne(
      { _id: targetId },
      { $addToSet: { followers: userId } }
    );

    await User.updateOne(
      { _id: userId },
      { $addToSet: { following: targetId } }
    );

    return new Response(JSON.stringify({ message: "Followed successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error following user:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
