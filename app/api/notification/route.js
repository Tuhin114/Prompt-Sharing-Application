import Notification from "@models/notification";
import { connectToDB } from "@utils/database";

// GET: Fetch user notifications
export const GET = async (request) => {
  try {
    await connectToDB();
    const userId = request.nextUrl.searchParams.get("userId");

    if (!userId) {
      return new Response("User ID is required", { status: 400 });
    }

    const notifications = await Notification.find({ recipient: userId })
      .sort({ createdAt: -1 })
      .limit(20);

    return new Response(JSON.stringify(notifications), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    return new Response("Failed to fetch notifications", { status: 500 });
  }
};
