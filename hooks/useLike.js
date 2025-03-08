import { useState, useEffect } from "react";

const useLike = (post, session) => {
  // Validate inputs to prevent errors
  if (!post || typeof post !== "object" || !post.likes) {
    console.error("Invalid post object provided to useLike hook.");
    return { isLiked: false, totalLikes: 0, handleLikeOrUnlike: () => {} };
  }

  const userId = session?.user?.id;

  // Check if the user has already liked the post
  const isAlreadyLiked = userId ? post.likes.includes(userId) : false;

  // State for like status and total like count
  const [isLiked, setIsLiked] = useState(isAlreadyLiked);
  const [totalLikes, setTotalLikes] = useState(post.likes.length || 0);

  useEffect(() => {
    // Update state if post or session changes dynamically
    setIsLiked(isAlreadyLiked);
    setTotalLikes(post.likes.length || 0);
  }, [post, session]);

  const handleLikeOrUnlike = async (e) => {
    e.preventDefault();

    // Prevent action if user is not authenticated
    if (!userId) {
      console.warn("User not authenticated. Cannot like/unlike post.");
      return;
    }

    // Optimistic UI update (assume success)
    setIsLiked((prev) => !prev);
    setTotalLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));

    try {
      const response = await fetch(isLiked ? "/api/unlike" : "/api/like", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          promptId: post._id,
          userId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isLiked ? "unlike" : "like"} the post`);
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);

      // Revert UI if API call fails
      setIsLiked((prev) => !prev);
      setTotalLikes((prevLikes) => (isLiked ? prevLikes + 1 : prevLikes - 1));
    }
  };

  return { isLiked, totalLikes, handleLikeOrUnlike };
};

export default useLike;
