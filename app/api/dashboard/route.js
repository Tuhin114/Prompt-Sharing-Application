import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";
import mongoose from "mongoose";

export async function GET(req) {
  try {
    await connectToDB();

    const userId = req.nextUrl.searchParams.get("userId");

    // console.log("Extracted User ID:", userId);

    // If no userId is provided, return an error response
    if (!userId) {
      return new Response("User ID is required", { status: 400 });
    }

    // Ensure that userId is a valid ObjectId string
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return new Response("Invalid User ID", { status: 400 });
    }

    // Aggregation pipeline to count total posts, likes, and saved items
    const analytics = await Prompt.aggregate([
      {
        $match: { creator: new mongoose.Types.ObjectId(userId) },
      },
      {
        $group: {
          _id: "$creator",
          totalPosts: { $sum: 1 },
          totalLikes: { $sum: { $size: "$likes" } },
          totalSaved: { $sum: { $size: "$saved" } },
        },
      },
      {
        $project: {
          _id: 0,
          totalPosts: 1,
          totalLikes: 1,
          totalSaved: 1,
        },
      },
    ]);

    console.log(
      "Aggregation Pipeline Result:",
      JSON.stringify(analytics, null, 2)
    );

    const data = {
      totalPosts: analytics[0]?.totalPosts || 0,
      totalLikes: analytics[0]?.totalLikes || 0,
      totalSaved: analytics[0]?.totalSaved || 0,
    };

    console.log("Parsed Analytics Data:", JSON.stringify(data, null, 2));

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    return new Response("Failed to fetch analytics data", { status: 500 });
  }
}
