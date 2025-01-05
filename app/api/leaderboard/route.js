import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export async function GET(req) {
  try {
    await connectToDB();

    const sortBy = req.nextUrl.searchParams.get("sort") || "likes";

    console.log(sortBy);

    const sortOptions = {
      likes: { totalLikes: -1 },
      bookmarks: { totalBookmarks: -1 },
      posts: { totalPosts: -1 },
    };

    const leaderboard = await Prompt.aggregate([
      {
        $group: {
          _id: "$creator", // Group by creator (user ID)
          totalLikes: { $sum: { $size: "$likes" } }, // Sum likes array length
          totalBookmarks: { $sum: { $size: "$saved" } }, // Sum bookmarks array length
          totalPosts: { $sum: 1 }, // Count documents per creator
        },
      },
      {
        $lookup: {
          from: "users", // Assuming your user collection is named 'users'
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user", // Flatten the user array
      },
      {
        $project: {
          _id: 0,
          userId: "$user._id",
          name: "$user.username",
          avatar: "$user.image",
          totalLikes: 1,
          totalBookmarks: 1,
          totalPosts: 1,
        },
      },
      {
        $sort: sortOptions[sortBy],
      },
      {
        $limit: 10,
      },
    ]);
    console.log(leaderboard);
    return new Response(JSON.stringify(leaderboard), { status: 200 });
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    return new Response("Failed to fetch leaderboard data", { status: 500 });
  }
}
