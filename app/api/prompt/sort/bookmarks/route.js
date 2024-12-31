import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export const GET = async () => {
  try {
    await connectToDB();

    // Fetch posts sorted by bookmarks in descending order
    const sortedPosts = await Prompt.find({})
      .populate("creator")
      .sort({ saved: -1 });

    // console.log(sortedPosts);

    return new Response(JSON.stringify(sortedPosts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch posts sorted by bookmarks", {
      status: 500,
    });
  }
};
