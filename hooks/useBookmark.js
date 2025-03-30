import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useBookmark = (post, session) => {
  if (!post || typeof post !== "object" || !post.saved) {
    console.error("Invalid post object provided to useBookmark hook.");
    return {
      isBookmarked: false,
      totalBookmarks: 0,
      addBookmark: () => {},
      removeBookmark: () => {},
    };
  }

  const queryClient = useQueryClient();
  const userId = session?.user?.id;
  const isAlreadyBookmarked = userId ? post.saved.includes(userId) : false;

  const [isBookmarked, setIsBookmarked] = useState(isAlreadyBookmarked);
  const [totalBookmarks, setTotalBookmarks] = useState(post.saved.length || 0);

  useEffect(() => {
    setIsBookmarked(userId ? post.saved.includes(userId) : false);
    setTotalBookmarks(post.saved.length || 0);
  }, [post, session]);

  const bookmarkMutation = useMutation({
    mutationFn: async ({ action }) => {
      const response = await fetch("/api/bookmark", {
        method: action === "add" ? "POST" : "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promptId: post._id, userId }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to ${action === "add" ? "bookmark" : "unbookmark"} the post`
        );
      }
    },
    onMutate: async ({ action }) => {
      await queryClient.cancelQueries(["post", post._id]);

      const previousData = queryClient.getQueryData(["post", post._id]);
      queryClient.setQueryData(["post", post._id], (old) => {
        if (!old) return old;
        return {
          ...old,
          saved:
            action === "add"
              ? [...old.saved, userId]
              : old.saved.filter((id) => id !== userId),
        };
      });

      return { previousData };
    },
    onError: (error, { action }, context) => {
      console.error(error.message);
      if (context?.previousData) {
        queryClient.setQueryData(["post", post._id], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["post", post._id]);
    },
  });

  const addBookmark = async (e) => {
    e.preventDefault();
    if (!userId)
      return console.warn("User not authenticated. Cannot bookmark the post.");
    bookmarkMutation.mutate({ action: "add" });
  };

  const removeBookmark = async () => {
    if (!userId)
      return console.warn(
        "User not authenticated. Cannot unbookmark the post."
      );
    bookmarkMutation.mutate({ action: "remove" });
  };

  return {
    isBookmarked,
    totalBookmarks,
    addBookmark,
    removeBookmark,
    isLoading: bookmarkMutation.isLoading,
  };
};

export default useBookmark;
