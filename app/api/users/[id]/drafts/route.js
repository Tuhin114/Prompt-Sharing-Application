import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export async function GET(request, { params }) {
  try {
    await connectToDB();

    const drafts = await Prompt.find({
      creator: params.id,
      isDraft: true,
    }).populate("creator");

    return new Response(JSON.stringify(drafts), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch drafts:", error);
    return new Response("Failed to fetch drafts", { status: 500 });
  }
}
