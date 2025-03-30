import { set } from "mongoose";
import { useState, useEffect } from "react";

const useSortPosts = (allPosts) => {
  // console.log(allPosts);
  const [sortedPosts, setSortedPosts] = useState([]);
  const [sortType, setSortType] = useState("default");

  useEffect(() => {
    let sortedData = [...allPosts];

    if (sortType === "likes") {
      sortedData.sort(
        (a, b) => (b.likes?.length || 0) - (a.likes?.length || 0)
      ); // Sort by like count
    } else if (sortType === "bookmarks") {
      sortedData.sort(
        (a, b) => (b.saved?.length || 0) - (a.saved?.length || 0)
      ); // Sort by bookmark count
    }

    setSortedPosts(sortedData);
  }, [sortType, allPosts]);

  const handleSortChange = (selectedSort) => {
    setSortType(selectedSort);
  };

  return { sortedPosts, handleSortChange };
};

export default useSortPosts;
