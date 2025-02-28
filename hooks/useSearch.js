import { useState } from "react";

const useSearch = (allPosts) => {
  const [searchText, setSearchText] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(allPosts);

  const filterPrompts = (query) => {
    const regex = new RegExp(query, "i");
    return allPosts.filter(
      (post) =>
        regex.test(post.creator.username) ||
        regex.test(post.tag) ||
        regex.test(post.prompt)
    );
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
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
