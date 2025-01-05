"use client";

import React, { useEffect, useState } from "react";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("likes"); // Default sorting

  useEffect(() => {
    fetch(`/api/leaderboard?sort=${sortBy}`)
      .then((res) => res.json())
      .then((data) => {
        setLeaderboardData(data);
        setLoading(false);
      });

    console.log(setLeaderboardData);
  }, [sortBy]);

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          🏆 Leaderboard
        </h1>
        <select
          className="p-2 border rounded-md"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="likes">Most Likes</option>
          <option value="bookmarks">Most Bookmarks</option>
          <option value="posts">Most Posts</option>
        </select>
      </div>

      {/* Loading State */}
      {loading && <div className="text-center">Loading...</div>}

      {/* No Data State */}
      {!loading && leaderboardData.length === 0 && (
        <div className="text-center text-gray-500">
          No contributors found. Start contributing now!
        </div>
      )}

      {/* Leaderboard Table */}
      {!loading && leaderboardData.length > 0 && (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Rank</th>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Likes</th>
              <th className="p-3 text-left">Bookmarks</th>
              <th className="p-3 text-left">Posts</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((user, index) => (
              <tr
                key={user._id}
                className={`${
                  index === 0
                    ? "bg-yellow-50"
                    : index === 1
                    ? "bg-gray-50"
                    : index === 2
                    ? "bg-orange-50"
                    : ""
                }`}
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3 flex items-center gap-2">
                  <img
                    src={user.avatar || "/default-avatar.png"}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  {user.name}
                </td>
                <td className="p-3">{user.totalLikes}</td>
                <td className="p-3">{user.totalBookmarks}</td>
                <td className="p-3">{user.totalPosts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;
