"use client";

import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto"; // For Chart.js compatibility
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session } = useSession();
  const [analytics, setAnalytics] = useState({
    totalPosts: 0,
    totalLikes: 0,
    totalSaved: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (session?.user.id) {
        try {
          const response = await fetch(
            `/api/dashboard?userId=${session.user.id}`
          );
          const data = await response.json();
          setAnalytics(data);
        } catch (error) {
          console.error("Failed to fetch analytics:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAnalytics();
  }, [session?.user.id]);

  if (loading) {
    return <div>Loading analytics...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">📊 Analytics Dashboard</h1>

      {/* Metrics Overview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-100 rounded-lg text-center">
          <h2 className="text-xl font-bold">👍 Total Likes</h2>
          <p className="text-2xl">{analytics.totalLikes}</p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg text-center">
          <h2 className="text-xl font-bold">🔖 Total Saved</h2>
          <p className="text-2xl">{analytics.totalSaved}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-lg text-center">
          <h2 className="text-xl font-bold">📝 Total Posts</h2>
          <p className="text-2xl">{analytics.totalPosts}</p>
        </div>
      </div>

      {/* Engagement Chart */}
      <h2 className="text-2xl font-semibold mb-3">📈 Engagement Overview</h2>
      <Bar
        data={{
          labels: ["Total Likes", "Total Saved", "Total Posts"],
          datasets: [
            {
              label: "User Engagement",
              data: [
                analytics.totalLikes,
                analytics.totalSaved,
                analytics.totalPosts,
              ],
              backgroundColor: ["#4f46e5", "#22c55e", "#facc15"],
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
          },
        }}
      />
    </div>
  );
};

export default Dashboard;
