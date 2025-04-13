import { useState, useMemo } from "react";

const useSortPosts = (filteredPosts) => {
  const [sortType, setSortType] = useState("default");

  // Derive sortedPosts using useMemo
  const sortedPosts = useMemo(() => {
    if (
      sortType === "default" ||
      !filteredPosts ||
      filteredPosts.length === 0
    ) {
      return filteredPosts || [];
    }

    // IMPORTANT: Create a shallow copy *only when sorting*, as .sort() mutates the array
    const postsToSort = [...filteredPosts];

    if (sortType === "likes") {
      postsToSort.sort(
        (a, b) => (b.likes?.length || 0) - (a.likes?.length || 0)
      );
    } else if (sortType === "bookmarks") {
      postsToSort.sort(
        (a, b) => (b.saved?.length || 0) - (a.saved?.length || 0)
      );
    } else if (sortType === "default") {
      postsToSort.sort(
        (a, b) =>
          new Date(b.createdAt || b._id) - new Date(a.createdAt || a._id)
      );
    }

    return postsToSort;
  }, [filteredPosts, sortType]);

  const handleSortChange = (selectedSort) => {
    setSortType(selectedSort);
  };

  return { sortType, sortedPosts, handleSortChange };
};

export default useSortPosts;
