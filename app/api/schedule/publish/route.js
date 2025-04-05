import Prompt from "@models/prompt";
import SchedulePost from "@models/schedulePost";
import { connectToDB } from "@utils/database";

export const GET = async () => {
  await connectToDB();

  const now = new Date();

  try {
    const scheduledPosts = await SchedulePost.find({
      scheduledAt: { $lte: now },
    });

    if (scheduledPosts.length === 0) {
      return new Response(
        JSON.stringify({ message: "No scheduled posts found." }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const publishedPosts = [];

    for (const scheduled of scheduledPosts) {
      await Prompt.findByIdAndUpdate(scheduled.postId, {
        isPublished: true,
        publishedAt: now,
      });

      await SchedulePost.findByIdAndDelete(scheduled._id);
      publishedPosts.push(scheduled.postId);

      console.log(`✅ Published post ${scheduled.postId} at ${now}`);
    }

    return new Response(
      JSON.stringify({
        message: "Posts published successfully.",
        publishedCount: publishedPosts.length,
        publishedPosts,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("❌ Error publishing posts:", error);
    return new Response(
      JSON.stringify({ message: "Failed to process scheduled posts." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
