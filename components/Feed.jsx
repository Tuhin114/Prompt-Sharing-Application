"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import TrendingTags from "./TrendingTags";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@src/components/ui/select";
import useFetchPosts from "@hooks/useFetchPosts";
import useSearch from "@hooks/useSearch";
import useSortPosts from "@hooks/useSortPosts";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          isLike={true}
          isSave={true}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const { allPosts, loading } = useFetchPosts();
  const { searchText, filteredPosts, handleSearchChange, handleClearSearch } =
    useSearch(allPosts);
  const { sortedPosts, handleSortChange } = useSortPosts(filteredPosts);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (allPosts.length > 0) {
      setPosts(allPosts);
    }
  }, [allPosts]);

  useEffect(() => {
    if (sortedPosts.length > 0) {
      setPosts(sortedPosts);
    }
  }, [sortedPosts]);

  const handleSort = (sortType) => {
    handleSortChange(sortType);
  };

  return (
    <section className="w-full px-2">
      <div className="feed">
        <div className="w-full flex items-center justify-center gap-2 px-36">
          {/* Search Input */}
          <form className="relative flex-1">
            <input
              type="text"
              placeholder="Search for a tag or a username"
              value={searchText}
              onChange={handleSearchChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/70 backdrop-blur-lg shadow-md border border-gray-300"
            />
            {searchText && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                ✖️
              </button>
            )}
          </form>

          {/* Sort Dropdown */}
          <div className="flex-shrink-0">
            <SortDropdown onSortChange={handleSort} />
          </div>
        </div>

        {/* Trending Tags */}
        <TrendingTags handleTrendingTagClick={handleSearchChange} />
      </div>

      {/* Show Loading or Sorted Posts */}
      {loading ? (
        <div className="text-center mt-8">Loading...</div>
      ) : (
        <PromptCardList data={posts} handleTagClick={handleSearchChange} />
      )}
    </section>
  );
};

export default Feed;

/* Sort Dropdown Component */
const SortDropdown = ({ onSortChange }) => {
  return (
    <div className="w-32">
      <Select onValueChange={onSortChange} defaultValue="default">
        <SelectTrigger className="w-full px-4 py-3 h-12 rounded-lg bg-white/70 backdrop-blur-lg shadow-md border border-gray-300 text-gray-600">
          <SelectValue placeholder="Default" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort By</SelectLabel>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="likes">Most Liked</SelectItem>
            <SelectItem value="bookmarks">Most Saved</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
