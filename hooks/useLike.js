import { useState } from "react";

const useLike = (post, session) => {
  const isAlreadyLiked = post.likes.includes(session?.user?.id);
  const [isLiked, setIsLiked] = useState(isAlreadyLiked);
  const [totalLikes, setTotalLikes] = useState(post.likes.length);

  const handleLikeOrUnlike = async (e) => {
    e.preventDefault();
    if (!session?.user?.id) return;

    try {
      const response = await fetch(isLiked ? "/api/unlike" : "/api/like", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          promptId: post._id,
          userId: session.user.id,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isLiked ? "unlike" : "like"} the post`);
      }

      setIsLiked(!isLiked);
      setTotalLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };

  return { isLiked, totalLikes, handleLikeOrUnlike };
};

export default useLike;
