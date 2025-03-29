import { useState, useEffect } from "react";

const useBookmark = (post, session) => {
  // Validate inputs to prevent errors
  if (!post || typeof post !== "object" || !post.saved) {
    console.error("Invalid post object provided to useBookmark hook.");
    return {
      isBookmarked: false,
      totalBookmarks: 0,
      addBookmark: () => {},
      removeBookmark: () => {},
    };
  }

  const userId = session?.user?.id;

  // Initial bookmark state
  const isAlreadyBookmarked = userId ? post.saved.includes(userId) : false;

  // State for bookmark status and total bookmark count
  const [isBookmarked, setIsBookmarked] = useState(isAlreadyBookmarked);
  const [totalBookmarks, setTotalBookmarks] = useState(post.saved.length || 0);

  useEffect(() => {
    // Update state dynamically if post or session changes
    setIsBookmarked(userId ? post.saved.includes(userId) : false);
    setTotalBookmarks(post.saved.length || 0);
  }, [post, session]);

  // ✅ Add Bookmark Function
  const addBookmark = async (e) => {
    e.preventDefault();

    if (!userId) {
      console.warn("User not authenticated. Cannot bookmark the post.");
      return;
    }

    // Optimistic UI update
    setIsBookmarked(true);
    setTotalBookmarks((prev) => prev + 1);

    try {
      const response = await fetch("/api/bookmark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promptId: post._id, userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to bookmark the post");
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);

      // Revert UI if API call fails
      setIsBookmarked(false);
      setTotalBookmarks((prev) => prev - 1);
    }
  };

  // ✅ Remove Bookmark Function
  const removeBookmark = async () => {
    if (!userId) {
      console.warn("User not authenticated. Cannot unbookmark the post.");
      return;
    }

    // Optimistic UI update
    setIsBookmarked(false);
    setTotalBookmarks((prev) => prev - 1);

    try {
      const response = await fetch("/api/bookmark", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promptId: post._id, userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to unbookmark the post");
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);

      // Revert UI if API call fails
      setIsBookmarked(true);
      setTotalBookmarks((prev) => prev + 1);
    }
  };

  return {
    isBookmarked,
    totalBookmarks,
    addBookmark,
    removeBookmark,
  };
};

export default useBookmark;
