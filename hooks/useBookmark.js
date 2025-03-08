import { useState, useEffect } from "react";

const useBookmark = (post, session) => {
  // Validate inputs to prevent errors
  if (!post || typeof post !== "object" || !post.saved) {
    console.error("Invalid post object provided to useBookmark hook.");
    return {
      isBookmarked: false,
      totalBookmarks: 0,
      handleBookmarkOrUnbookmark: () => {},
    };
  }

  const userId = session?.user?.id;

  // Check if the user has already bookmarked the post
  const isAlreadyBookmarked = userId ? post.saved.includes(userId) : false;

  // State for bookmark status and total bookmark count
  const [isBookmarked, setIsBookmarked] = useState(isAlreadyBookmarked);
  const [totalBookmarks, setTotalBookmarks] = useState(post.saved.length || 0);

  useEffect(() => {
    // Update state if post or session changes dynamically
    setIsBookmarked(isAlreadyBookmarked);
    setTotalBookmarks(post.saved.length || 0);
  }, [post, session]);

  const handleBookmarkOrUnbookmark = async (e) => {
    e.preventDefault();

    // Prevent action if user is not authenticated
    if (!userId) {
      console.warn("User not authenticated. Cannot bookmark/unbookmark post.");
      return;
    }

    // Optimistic UI update (assume success)
    setIsBookmarked((prev) => !prev);
    setTotalBookmarks((prevBookmarks) =>
      isBookmarked ? prevBookmarks - 1 : prevBookmarks + 1
    );

    try {
      const response = await fetch(
        isBookmarked ? "/api/unbookmark" : "/api/bookmark",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            promptId: post._id,
            userId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to ${isBookmarked ? "unbookmark" : "bookmark"} the post`
        );
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);

      // Revert UI if API call fails
      setIsBookmarked((prev) => !prev);
      setTotalBookmarks((prevBookmarks) =>
        isBookmarked ? prevBookmarks + 1 : prevBookmarks - 1
      );
    }
  };

  return { isBookmarked, totalBookmarks, handleBookmarkOrUnbookmark };
};

export default useBookmark;
