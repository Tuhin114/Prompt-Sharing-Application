import Prompt from "@models/prompt";
import User from "@models/user";
import Notification from "@models/notification";
import { connectToDB } from "@utils/database";

export const PATCH = async (request) => {
  try {
    const { promptId, userId } = await request.json();

    if (!promptId || !userId) {
      return new Response("Missing promptId or userId", { status: 400 });
    }

    await connectToDB();

    // Fetch prompt and ensure it exists
    const prompt = await Prompt.findById(promptId);
    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    // Check if the user already liked the prompt
    if (!prompt.likes.includes(userId)) {
      prompt.likes.push(userId);
      await prompt.save();

      // Reward the creator with coins
      const creator = await User.findById(prompt.creator);
      const sender = await User.findById(userId); // Get the user who liked the post

      if (creator) {
        creator.coins += 3; // Add 3 coins per like

        await creator.save();
        console.log(
          `Coins updated for user ${creator._id}. New balance: ${creator.coins}`
        );

        // 1st Notification: User liked your post
        const likeNotification = new Notification({
          recipient: creator._id,
          type: "like",
          message: `${sender.username} liked your post "${prompt.prompt}"`, // Include username of the user who liked
          promptId: prompt._id,
          senderId: sender._id,
        });
        await likeNotification.save();
        console.log(
          `Like notification sent to ${creator._id} about the like on their prompt.`
        );

        // console.log(likeNotification);

        // 2nd Notification: +3 Coins
        const coinNotification = new Notification({
          recipient: creator._id,
          type: "coin",
          message: `You earned 3 coins for the like on your post. 💰`,
          promptId: prompt._id,
          senderId: sender._id,
        });
        await coinNotification.save();
        console.log(
          `Coin notification sent to ${creator._id} about the coin reward.`
        );
      }

      return new Response(
        JSON.stringify({
          message: "Liked successfully, 3 coins rewarded to creator",
        }),
        { status: 200 }
      );
    } else {
      return new Response("User has already liked this prompt", {
        status: 400,
      });
    }
  } catch (error) {
    console.error("Error in like route:", error.message);
    return new Response("Failed to like the prompt", { status: 500 });
  }
};
