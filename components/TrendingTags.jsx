"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";

const TrendingTags = ({ handleTrendingTagClick }) => {
  const [trendingTags, setTrendingTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingTags = async () => {
      try {
        const response = await fetch("/api/tags/trending");
        const data = await response.json();

        const formattedTags = data.map((tag) => ({
          name: tag._id,
          count: tag.count,
          trend: "up",
        }));

        setTrendingTags(formattedTags);
      } catch (error) {
        console.error("Failed to fetch trending tags:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingTags();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto my-4 bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-row items-center gap-2 text-xl font-semibold text-gray-800">
          <TrendingUp className="w-5 h-5 text-orange-500" />
          <h2>Trending Tags</h2>
        </div>
        <div className="mt-4">
          <p className="text-gray-500">Loading trending tags...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto my-8 bg-white shadow-lg rounded-lg p-6">
      <div className="flex flex-row items-center gap-2 text-xl font-semibold text-gray-800">
        <TrendingUp className="w-5 h-5 text-orange-500" />
        <h2>Trending Tags</h2>
      </div>
      <div className="mt-6">
        <div className="flex flex-wrap gap-4">
          {trendingTags.map((tag) => (
            <button
              key={tag.name}
              className="group relative px-6 py-3 bg-gradient-to-r from-orange-200 to-purple-300 hover:from-orange-300 hover:to-purple-400 rounded-full transition-all duration-300 ease-in-out"
              onClick={() => handleTrendingTagClick(tag.name)}
            >
              <span className="text-sm font-medium text-gray-800">
                #{tag.name}
              </span>
              <span className="ml-3 text-xs text-gray-500">{tag.count}</span>
              <span
                className={`absolute -top-1 -right-1 w-2 h-2 rounded-full transition-all duration-300 ${
                  tag.trend === "up"
                    ? "bg-green-500 scale-110"
                    : tag.trend === "down"
                    ? "bg-red-500 scale-110"
                    : "bg-gray-500 scale-90"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingTags;
