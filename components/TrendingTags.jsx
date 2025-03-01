"use client";

import { TrendingUp } from "lucide-react";
import useTrendingTags from "@/hooks/useTrendingTags";

const TrendingTags = ({ handleTrendingTagClick }) => {
  const { trendingTags, loading, error } = useTrendingTags();

  return (
    <div className="my-8 p-6 w-full rounded-lg border border-gray-300 bg-white/20 bg-clip-padding backdrop-blur-lg backdrop-filter">
      {/* Header */}
      <div className="flex flex-row items-center gap-2 text-xl font-semibold text-gray-800">
        <TrendingUp className="w-5 h-5 text-orange-500" />
        <h2>Trending Tags</h2>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-gray-500 mt-4">Loading trending tags...</div>
      )}

      {/* Error State */}
      {error && <div className="text-red-500 mt-4">{error}</div>}

      {/* Tags Grid */}
      {!loading && !error && trendingTags.length > 0 && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {trendingTags.map((tag) => (
            <button
              key={tag.name}
              className="group relative px-4 py-2 text-xs bg-gradient-to-r from-orange-200 to-purple-300 hover:from-orange-300 hover:to-purple-400 rounded-2xl transition-all duration-300 ease-in-out flex items-center justify-center"
              onClick={() => handleTrendingTagClick(tag.name)}
            >
              <span className="text-sm font-medium text-gray-800">
                #{tag.name}
              </span>
              <span className="ml-2 text-xs text-gray-500">{tag.count}</span>
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
      )}

      {/* No Tags Message */}
      {!loading && !error && trendingTags.length === 0 && (
        <div className="text-gray-500 mt-4">No trending tags available.</div>
      )}
    </div>
  );
};

export default TrendingTags;
