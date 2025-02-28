import { useState } from "react";

const useSortPosts = (allPosts) => {
  console.log(allPosts);
  const [sortedPosts, setSortedPosts] = useState(allPosts);

  const fetchSortedPosts = async (sortType) => {
    try {
      const response = await fetch(`/api/prompt/sort/${sortType}`);

      if (!response.ok) throw new Error("Failed to fetch sorted posts");
      const sortedData = await response.json();
      setSortedPosts(sortedData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSortChange = (selectedSort) => {
    if (selectedSort === "likes" || selectedSort === "bookmarks") {
      fetchSortedPosts(selectedSort);
    } else {
      setSortedPosts(allPosts);
    }
  };

  return { sortedPosts, handleSortChange };
};

export default useSortPosts;
