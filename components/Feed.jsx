"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import SortDropdown from "./Sortdown";
import TrendingTags from "./TrendingTags";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../src/components/ui/card";
import { Heart, Bookmark } from "lucide-react";

const prompts = [
  {
    id: 1,
    user: "tuhinpoddar",
    email: "tuhinpoddar111@gmail.com",
    title: "Common TypeScript Design Patterns",
    content:
      "What are the common TypeScript design patterns and how can they be applied to build robust applications in PC.",
    tags: ["#full-stack"],
    likes: 1,
    bookmarks: 2,
  },
  {
    id: 2,
    user: "tuhinpoddar",
    email: "tuhinpoddar111@gmail.com",
    title: "Excel as Text-Based",
    content:
      "I want you to act as a text-based excel. You'll only reply with the text-based 10 rows excel sheet.",
    tags: ["#excel"],
    likes: 2,
    bookmarks: 1,
  },
  {
    id: 3,
    user: "tuhinpoddar",
    email: "tuhinpoddar111@gmail.com",
    title: "Migrating JavaScript to TypeScript",
    content:
      "What strategies are effective for migrating JavaScript to TypeScript?",
    tags: ["#typescript", "#full-stack", "#development"],
    likes: 2,
    bookmarks: 1,
  },
];

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
    // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    //   {prompts.map((prompt) => (
    //     <Card key={prompt.id} className="shadow-md border border-gray-200">
    //       <CardHeader>
    //         <CardTitle className="text-lg">{prompt.title}</CardTitle>
    //       </CardHeader>
    //       <CardContent>
    //         <p className="text-gray-700 line-clamp-3">
    //           {prompt.content.length > 150
    //             ? `${prompt.content.slice(0, 150)}...`
    //             : prompt.content}
    //         </p>
    //         {prompt.content.length > 150 && (
    //           <button className="text-blue-500 mt-2">Read More</button>
    //         )}
    //         <div className="flex flex-wrap gap-2 mt-2">
    //           {prompt.tags.map((tag, index) => (
    //             <span
    //               key={index}
    //               className="bg-blue-500 text-white px-3 py-1 text-sm rounded-full"
    //             >
    //               {tag}
    //             </span>
    //           ))}
    //         </div>
    //         <div className="flex justify-between items-center mt-4 text-gray-500">
    //           <div className="flex items-center space-x-2">
    //             <Heart className="w-5 h-5" />
    //             <span>{prompt.likes}</span>
    //           </div>
    //           <div className="flex items-center space-x-2">
    //             <Bookmark className="w-5 h-5" />
    //             <span>{prompt.bookmarks}</span>
    //           </div>
    //         </div>
    //       </CardContent>
    //     </Card>
    //   ))}
    // </div>
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
      <div className="w-full flex items-center justify-center gap-2 px-36">
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
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-all"
            >
              ✖️
            </button>
          )}
        </form>

        {/* Sort Dropdown */}
        <div className="flex-shrink-0">
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
