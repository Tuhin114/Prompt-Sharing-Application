import { useState } from "react";

const useBookmark = (post, session) => {
  const isAlreadyBookmarked = post.saved.includes(session?.user?.id);
  const [isBookmarked, setIsBookmarked] = useState(isAlreadyBookmarked);
  const [totalBookmarks, setTotalBookmarks] = useState(post.saved.length);

  const handleBookmarkOrUnbookmark = async (e) => {
    e.preventDefault();
    if (!session?.user?.id) return;

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
            userId: session.user.id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to ${isBookmarked ? "unbookmark" : "bookmark"} the post`
        );
      }

      setIsBookmarked(!isBookmarked);
      setTotalBookmarks((prevBookmarks) =>
        isBookmarked ? prevBookmarks - 1 : prevBookmarks + 1
      );
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };

  return { isBookmarked, totalBookmarks, handleBookmarkOrUnbookmark };
};

export default useBookmark;
