import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export async function GET(req) {
  try {
    await connectToDB();

    const trendingTags = await Prompt.aggregate([
      { $match: { isDraft: false } }, // Only include published prompts
      { $unwind: "$tag" }, // Deconstruct the array of tags
      { $group: { _id: "$tag", count: { $sum: 1 } } }, // Group and count each tag
      { $sort: { count: -1 } }, // Sort by count descending
      { $limit: 12 }, // Limit to top 10 tags
    ]);

    return new Response(JSON.stringify(trendingTags), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch trending tags:", error);
    return new Response("Failed to fetch trending tags", { status: 500 });
  }
}
