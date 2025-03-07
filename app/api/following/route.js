import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  let { userId } = await request.json();

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    await connectToDB();
    const user = await User.findById(userId).populate(
      "following",
      "username email image"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ followers: user.followers });
  } catch (error) {
    console.error("Error fetching followers:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
