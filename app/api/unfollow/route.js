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

    await connectToDB();

    // Remove userId from targetId's followers and targetId from userId's following
    await User.findByIdAndUpdate(targetId, { $pull: { followers: userId } });
    await User.findByIdAndUpdate(userId, { $pull: { following: targetId } });

    return new Response(
      JSON.stringify({ message: "Unfollowed successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error unfollowing user:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
