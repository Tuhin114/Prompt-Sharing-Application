import { useState, useEffect } from "react";

const useSearch = (allPosts) => {
  const [searchText, setSearchText] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(allPosts);

  useEffect(() => {
    setFilteredPosts(allPosts);
  }, [allPosts]);

  // Function to filter posts based on a query string.
  const filterPrompts = (query) => {
    if (!query) return allPosts;

    const regex = new RegExp(query, "i");
    return allPosts.filter(
      (post) =>
        regex.test(post.creator.username) ||
        regex.test(post.tag) ||
        regex.test(post.prompt)
    );
  };

  // Accepts either an event or a plain string.
  const handleSearchChange = (eOrQuery) => {
    let query =
      typeof eOrQuery === "string" ? eOrQuery : eOrQuery?.target?.value || "";
    setSearchText(query);
    setFilteredPosts(filterPrompts(query));
  };

  const handleClearSearch = () => {
    setSearchText("");
    setFilteredPosts(allPosts);
  };

  return { searchText, filteredPosts, handleSearchChange, handleClearSearch };
};

export default useSearch;
