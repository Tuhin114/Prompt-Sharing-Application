"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../src/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../src/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";
import DateTimeDisplay from "@utils/DateTimeDisplay";

// 1) Mock Data for Charts
const monthData = [
  { date: "week 1", followers: 12, count: 7, likes: 30, bookmarks: 15 },
  { date: "week 2", followers: 20, count: 14, likes: 50, bookmarks: 25 },
  { date: "week 3", followers: 8, count: 2, likes: 20, bookmarks: 10 },
  { date: "week 4", followers: 35, count: 23, likes: 70, bookmarks: 35 },
];

const yearData = [
  { date: "Jan", followers: 50, count: 40, likes: 400, bookmarks: 200 },
  { date: "Feb", followers: 140, count: 25, likes: 380, bookmarks: 190 },
  { date: "Mar", followers: 245, count: 50, likes: 450, bookmarks: 230 },
  { date: "Apr", followers: 74, count: 30, likes: 300, bookmarks: 150 },
  { date: "May", followers: 31, count: 45, likes: 480, bookmarks: 240 },
  { date: "Jun", followers: 214, count: 20, likes: 320, bookmarks: 160 },
  { date: "Jul", followers: 188, count: 15, likes: 290, bookmarks: 140 },
  { date: "Aug", followers: 520, count: 60, likes: 500, bookmarks: 250 },
  { date: "Sep", followers: 42, count: 55, likes: 470, bookmarks: 230 },
  { date: "Oct", followers: 74, count: 70, likes: 520, bookmarks: 260 },
  { date: "Nov", followers: 152, count: 35, likes: 350, bookmarks: 175 },
  { date: "Dec", followers: 120, count: 80, likes: 600, bookmarks: 300 },
];

// 2) Mock Recent Activity
const mockRecentActivities = [
  {
    type: "like",
    user: "JohnDoe",
    profileImg: "",
    msg: "My Awesome Prompt",
    time: "2 mins ago",
  },
  {
    type: "bookmark",
    user: "JaneSmith",
    profileImg: "",
    msg: "Cool AI Prompt",
    time: "10 mins ago",
  },
  {
    type: "coin",
    user: "SamWilson",
    postTitle: "Prompt about React",
    time: "30 mins ago",
    comment: "Great prompt! Very helpful.",
  },
];

// 2) Mock Recent Activity
// const mockRecentActivity = [
//   {
//     // Like by user2 on my prompt
//     _id: ObjectID("notif1"),
//     type: "LIKE",
//     details: {
//       sender_name: "user1",
//       sender_profile_img: "https://randomuser.me/api/portraits/lego/2.jpg",
//       receipt_name: "user",
//       prompt_content: "What is your favorite AI?",
//       coins_before: 100,
//       coins_after: 90,
//     },
//     is_read: false,
//     created_at: "2 mins ago",
//   },
//   {
//     // Like by me on user2's prompt
//     _id: ObjectID("notif2"),
//     type: "LIKE_ME",
//     details: {
//       sender_name: "user",
//       sender_profile_img: "https://randomuser.me/api/portraits/lego/2.jpg",
//       receipt_name: "user2",
//       prompt_content: "What is your favorite AI?",
//       coins_before: 100,
//       coins_after: 90,
//     },
//     is_read: false,
//     created_at: "20 mins ago",
//   },
//   {
//     // Bookmark by me on user2's prompt
//     _id: ObjectID("notif2"),
//     type: "BOOKMARK_ME",
//     details: {
//       sender_name: "user",
//       sender_profile_img: "https://randomuser.me/api/portraits/lego/2.jpg",
//       receipt_name: "user2",
//       prompt_content: "What is your favorite AI?",
//       coins_before: 100,
//       coins_after: 90,
//     },
//     is_read: false,
//     created_at: "20 hrs ago",
//   },
//   {
//     // Bookmark by user2 on my prompt
//     _id: ObjectID("notif2"),
//     type: "LIKE_ME",
//     details: {
//       sender_name: "user2",
//       sender_profile_img: "https://randomuser.me/api/portraits/lego/2.jpg",
//       receipt_name: "user",
//       prompt_content: "What is your favorite AI?",
//       coins_before: 100,
//       coins_after: 90,
//     },
//     is_read: false,
//     created_at: "20 minutes ago",
//   },
//   {
//     // Prompt purchase by me
//     _id: ObjectID("notif2"),
//     type: "COINS_SUB",
//     details: {
//       msg_type: "PURCHASE",
//       sender_name: "user",
//       sender_profile_img: "https://randomuser.me/api/portraits/lego/2.jpg",
//       receipt_name: "user2",
//       prompt_content: "What is your favorite AI?",
//       coins_before: 100,
//       coins_after: 90,
//     },
//     is_read: false,
//     created_at: "20 minutes ago",
//   },
//   {
//     // User2 purchased my prompt
//     _id: ObjectID("notif2"),
//     type: "COINS_ADD",
//     details: {
//       msg_type: "SELL",
//       sender_name: "user2",
//       sender_profile_img: "https://randomuser.me/api/portraits/lego/2.jpg",
//       receipt_name: "user",
//       prompt_content: "What is your favorite AI?",
//       coins_before: 100,
//       coins_after: 90,
//     },
//     is_read: false,
//     created_at: "20 minutes ago",
//   },
// ];

// 3) Example user data
const userData = {
  name: "Tuhin",
  totalPosts: 1223,
  totallikes: 180,
  totalDrafts: 740,
  totalBookmarks: 220,
  totalfollowers: 1200,
  likesReceived: 180,
  bookmarksReceived: 60,
  postEngagementRate: 0.47, // 47%
  coinBalance: 528,
  totalCoinsEarned: 976,
  leaderboardRank: 12,
  badges: ["Early Bird", "Top Creator"],
};

const PostActivityChart = () => {
  const [timeframe, setTimeframe] = useState("month"); // Default to "Last Month"

  // Determine which dataset to use
  const barChartData = timeframe === "month" ? monthData : yearData;

  return (
    <Card className="shadow-sm rounded-xl">
      <CardHeader>
        <div className="flex justify-between w-full items-center">
          <CardTitle>Post Activity</CardTitle>
          <Select onValueChange={setTimeframe} defaultValue="month">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Last Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Timelines</SelectLabel>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={barChartData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1bc24a" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#6fe381" stopOpacity={0.7} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip cursor={{ fill: "#f3f4f6" }} />
            <Bar
              dataKey="count"
              stroke="#0cb328"
              strokeWidth={1}
              fill="url(#colorBar)"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const PostEngagementChart = () => {
  const [timeframe, setTimeframe] = useState("month");

  // Select appropriate dataset
  const chartData = timeframe === "month" ? monthData : yearData;

  return (
    <Card className="shadow-sm rounded-xl">
      <CardHeader>
        <div className="flex justify-between w-full items-center">
          <CardTitle>Post Engagement</CardTitle>
          <Select onValueChange={setTimeframe} defaultValue="month">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Last Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Timelines</SelectLabel>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip cursor={{ fill: "#f3f4f6" }} />
            <Line
              type="monotone"
              dataKey="likes"
              stroke="#f2a538"
              strokeWidth={1}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="bookmarks"
              stroke="#1cb9ed"
              strokeWidth={1}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const FollowersChart = () => {
  const [timeframe, setTimeframe] = useState("month");

  // Select appropriate dataset
  const chartData = timeframe === "month" ? monthData : yearData;

  return (
    <Card className="shadow-sm rounded-xl">
      <CardHeader>
        <div className="flex justify-between w-full items-center">
          <CardTitle>Followers</CardTitle>
          <Select onValueChange={setTimeframe} defaultValue="month">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Last Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Timelines</SelectLabel>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="95%" stopColor="#6a32ed" stopOpacity={0.7} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip cursor={{ fill: "#f3f4f6" }} />
            <Area
              type="monotone"
              dataKey="followers"
              stroke="#220170"
              fill="url(#colorFollowers)"
              strokeWidth={1}
              dot={{ r: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default function DashboardPage() {
  return (
    <div className="flex w-full min-h-screen text-gray-900">
      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
        {/* TOPBAR */}
        <header className="mb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          <div>
            <h1 className="text-5xl font-bold">
              Hello,{" "}
              <span className="text-5xl orange_gradient">{userData.name}</span>
            </h1>
            <div className="text-sm text-gray-500 py-4">
              <DateTimeDisplay />
            </div>
          </div>
        </header>

        {/* FIRST ROW: STATS */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <Card className="shadow-sm rounded-xl flex justify-between items-center p-4 py-8">
            <div>
              <CardContent className="p-0">
                <p className="text-3xl font-bold">{userData.totalPosts}</p>
              </CardContent>
              <CardHeader className="p-0 mt-2">
                <CardTitle>Total Posts</CardTitle>
              </CardHeader>
            </div>
            <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-full p-2">
              <Image
                src="/assets/icons/posts.svg"
                alt="heart"
                width={20}
                height={20}
              />
            </div>
            {/* Replace with your actual icon */}
          </Card>

          <Card className="shadow-sm rounded-xl flex justify-between items-center p-4 py-8">
            <div>
              <CardContent className="p-0">
                <p className="text-3xl font-bold">{userData.totallikes}</p>
              </CardContent>
              <CardHeader className="p-0 mt-2">
                <CardTitle>Total Likes</CardTitle>
              </CardHeader>
            </div>
            <div className="bg-gradient-to-r from-orange-400  to-orange-500 rounded-full p-2">
              <Image
                src="/assets/icons/heart-dashboard.svg"
                alt="heart"
                width={20}
                height={20}
              />
            </div>
            {/* Replace with your actual icon */}
          </Card>

          <Card className="shadow-sm rounded-xl flex justify-between items-center p-4 py-8">
            <div>
              <CardContent className="p-0">
                <p className="text-3xl font-bold">{userData.totalBookmarks}</p>
              </CardContent>
              <CardHeader className="p-0 mt-2">
                <CardTitle>Total Bookmarks</CardTitle>
              </CardHeader>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full p-2">
              <Image
                src="/assets/icons/bookmark-dashboard.svg"
                alt="heart"
                width={20}
                height={20}
              />
            </div>
            {/* Replace with your actual icon */}
          </Card>

          <Card className="shadow-sm rounded-xl flex justify-between items-center p-4 py-8">
            <div>
              <CardContent className="p-0">
                <p className="text-3xl font-bold">{userData.totalfollowers}</p>
              </CardContent>
              <CardHeader className="p-0 mt-2">
                <CardTitle>Total Followers</CardTitle>
              </CardHeader>
            </div>
            <div className="bg-gradient-to-r from-violet-400 to-violet-500 rounded-full p-2">
              <Image
                src="/assets/icons/users-dashboard.svg"
                alt="heart"
                width={20}
                height={20}
              />
            </div>
            {/* Replace with your actual icon */}
          </Card>
        </section>

        {/* SECOND ROW: CHARTS (More Compact) */}
        <section className="mt-4 grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Gradient Bar Chart */}
          <PostActivityChart />

          {/* Gradient Area Chart */}
          <PostEngagementChart />

          <FollowersChart />
        </section>

        {/* THIRD ROW: GAMIFICATION & RECENT ACTIVITY (Compact) */}
        <section className="mt-4 grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Gamification: Coin Balance & Badges */}
          <div className="xl:col-span-1 space-y-4">
            <Card className="shadow-sm rounded-xl flex justify-between items-center p-4 py-12 px-8">
              <div>
                <CardContent className="p-0">
                  <p className="text-3xl font-bold">{userData.coinBalance}</p>
                </CardContent>
                <CardHeader className="p-0 mt-4">
                  <CardTitle>Coin Balance</CardTitle>
                </CardHeader>
              </div>
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full p-2">
                <Image
                  src="/assets/icons/coin.svg"
                  alt="coin"
                  width={20}
                  height={20}
                />
              </div>
              {/* Replace with your actual icon */}
            </Card>

            <Card className="shadow-sm rounded-xl flex justify-between items-center p-4 py-12 px-8">
              <div>
                <CardContent className="p-0">
                  <p className="text-3xl font-bold">
                    #{userData.leaderboardRank}
                  </p>
                </CardContent>
                <CardHeader className="p-0 mt-4">
                  <CardTitle>Leaderboard</CardTitle>
                </CardHeader>
              </div>
              <div className="bg-gradient-to-r from-gray-400 to-gray-500 rounded-full p-2">
                <Image
                  src="/assets/icons/leaderboard-dashboard.svg"
                  alt="heart"
                  width={20}
                  height={20}
                />
              </div>

              {/* Replace with your actual icon */}
            </Card>

            <Card className="shadow-sm rounded-xl flex justify-between items-center p-4 py-12 px-8">
              <div>
                <CardContent className="p-0">
                  <p className="text-3xl font-bold"></p>
                </CardContent>
                <CardHeader className="p-0 mt-4">
                  <CardTitle>Badges & Achievements</CardTitle>
                </CardHeader>
              </div>

              {/* Replace with your actual icon */}
            </Card>
          </div>

          {/* Recent Activity Feed */}
          <Card className="xl:col-span-2 shadow-sm">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y divide-gray-100">
                {mockRecentActivities.map((activity, idx) => (
                  <li key={idx} className="p-4 flex items-center space-x-3">
                    {/* Activity icon */}
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100">
                      {activity.type === "like" && <span>❤️</span>}
                      {activity.type === "bookmark" && <span>🔖</span>}
                      {activity.type === "comment" && <span>💬</span>}
                    </div>
                    {/* Activity details */}
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">{activity.user}</span>{" "}
                        {activity.type === "like" && "liked"}
                        {activity.type === "bookmark" && "bookmarked"}
                        {activity.type === "comment" && "commented on"}{" "}
                        <span className="font-medium\">
                          {activity.postTitle}
                        </span>
                      </p>
                      {activity.comment && (
                        <p className="mt-1 text-xs text-gray-500 italic">
                          “{activity.comment}”
                        </p>
                      )}
                    </div>
                    {/* Time */}
                    <span className="text-xs text-gray-400">
                      {activity.time}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
