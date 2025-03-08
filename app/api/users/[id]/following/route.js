import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  const userId = params.id;

  // console.log("User ID:", userId);

  if (!userId) {
    return new Response(JSON.stringify({ message: "User ID is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    await connectToDB();
    const user = await User.findById(userId).populate(
      "following",
      "username bio image"
    );

    // console.log("User:", user);

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(user.following), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching following:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
