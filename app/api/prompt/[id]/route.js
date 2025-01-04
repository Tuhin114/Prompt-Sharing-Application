import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// 🟢 GET: Fetch a Single Prompt by ID
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response("Prompt Not Found", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.error("Error fetching prompt:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

// 🟡 PATCH: Update a Prompt by ID
export const PATCH = async (request, { params }) => {
  try {
    await connectToDB();

    const { prompt, tag, isDraft } = await request.json();

    // Validate incoming data
    if (!prompt || !tag || isDraft === undefined) {
      return new Response("Invalid data provided", { status: 400 });
    }

    // Find the existing prompt by ID
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    // Update fields
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    existingPrompt.isDraft = isDraft;

    await existingPrompt.save();

    return new Response(
      JSON.stringify({ message: "Successfully updated the Prompt" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating prompt:", error);
    return new Response("Error Updating Prompt", { status: 500 });
  }
};

// 🔴 DELETE: Remove a Prompt by ID
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    const deletedPrompt = await Prompt.findByIdAndRemove(params.id);
    if (!deletedPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response(
      JSON.stringify({ message: "Prompt deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting prompt:", error);
    return new Response("Error deleting prompt", { status: 500 });
  }
};
