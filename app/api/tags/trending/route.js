import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export async function GET(req) {
  try {
    await connectToDB();

    const trendingTags = await Prompt.aggregate([
      { $unwind: "$tag" }, // Deconstruct the array of tags
      { $group: { _id: "$tag", count: { $sum: 1 } } }, // Count occurrences of each tag
      { $sort: { count: -1 } }, // Sort by most used
      { $limit: 10 }, // Limit to top 10 trending tags
    ]);

    return new Response(JSON.stringify(trendingTags), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch trending tags", { status: 500 });
  }
}
