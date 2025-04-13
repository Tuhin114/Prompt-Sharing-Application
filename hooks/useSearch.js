import { useState, useMemo } from "react";

const useSearch = (allPosts) => {
  const [searchText, setSearchText] = useState("");

  // Derive filteredPosts using useMemo
  const filteredPosts = useMemo(() => {
    const query = searchText.trim();

    if (!query || !allPosts) {
      return allPosts || [];
    }

    const regex = new RegExp(query, "i"); // 'i' for case-insensitive

    // Filter based on the original posts
    return allPosts.filter(
      (post) =>
        (post?.creator?.username && regex.test(post.creator.username)) ||
        (post?.tag && regex.test(post.tag)) ||
        (post?.prompt && regex.test(post.prompt))
    );
  }, [allPosts, searchText]);

  const handleSearchChange = (eOrQuery) => {
    let query =
      typeof eOrQuery === "string" ? eOrQuery : eOrQuery?.target?.value || "";
    setSearchText(query);
  };

  const handleClearSearch = () => {
    setSearchText("");
  };

  return { searchText, filteredPosts, handleSearchChange, handleClearSearch };
};

export default useSearch;
