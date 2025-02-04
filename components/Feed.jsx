"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import SortDropdown from "./Sortdown";
import TrendingTags from "./TrendingTags";

const PromptCardList = ({ data, handleTagClick }) => {
  const isLike = true;
  const isSave = true;
  return (
    <div className="mt-8 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          isLike={isLike}
          isSave={isSave}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setAllPosts(data);
      setFilteredPosts(data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSortedPosts = async (sortType) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/prompt/sort/${sortType === "likes" ? "likes" : "bookmarks"}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch sorted posts");
      }
      const sortedPosts = await response.json();
      setFilteredPosts(sortedPosts);
    } catch (error) {
      console.error(`Failed to fetch sorted posts: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setFilteredPosts(searchResult);
      }, 500)
    );
  };

  const handleClearSearch = () => {
    clearTimeout(searchTimeout);
    setSearchText("");
    setFilteredPosts(allPosts);
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    const searchResult = filterPrompts(tagName);
    setFilteredPosts(searchResult);
  };

  const filterTrendingTags = (searchtext) => {
    setSearchText(searchtext);
    const regex = new RegExp(searchtext, "i");
    return allPosts.filter((item) => regex.test(item.tag));
  };

  const handleTrendingTagClick = (tagName) => {
    const searchResult = filterTrendingTags(tagName);
    setFilteredPosts(searchResult);
  };

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    setSortBy(selectedSort);

    if (selectedSort === "likes" || selectedSort === "bookmarks") {
      fetchSortedPosts(selectedSort);
    } else {
      fetchPosts();
    }
  };

  return (
    <section className="feed">
      <div className="flex gap-2">
        {/* Search Input */}
        <form className="relative w-64 flex-center mb-4 basis-10/12">
          <input
            type="text"
            placeholder="Search for a tag or a username"
            value={searchText}
            onChange={handleSearchChange}
            required
            className="search_input peer pr-10"
          />
          {searchText && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✖️
            </button>
          )}
        </form>

        {/* Sort Dropdown */}
        <div className="mb-4 basis-2/12 p-2 ">
          <SortDropdown onSortChange={handleSortChange} />
        </div>
      </div>

      <TrendingTags handleTrendingTagClick={handleTrendingTagClick} />

      {loading ? (
        <div className="text-center mt-8">Loading...</div>
      ) : (
        <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
