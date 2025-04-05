import SchedulePost from "@models/schedulePost";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  let { userId, postId, scheduledAt } = await request.json();

  if (!userId || !scheduledAt) {
    return new Response(
      JSON.stringify({ message: "User ID and Scheduled At are required" }),
      { status: 400 }
    );
  }

  try {
    await connectToDB();

    const newSchedulePost = new SchedulePost({
      creatorId: userId,
      postId,
      scheduledAt,
    });

    await newSchedulePost.save();

    return new Response(JSON.stringify(newSchedulePost), { status: 201 });
  } catch (error) {
    console.error("Error creating schedule post:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
