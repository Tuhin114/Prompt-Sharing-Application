"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const CoinDisplay = () => {
  const { data: session } = useSession();
  const [coins, setCoins] = useState(0);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname(); // Detect route changes

  const fetchUserCoins = async () => {
    try {
      const userId = session?.user?.id;
      if (!userId) return;

      const response = await fetch(`/api/users/${userId}/coins`);
      if (!response.ok) {
        throw new Error("Failed to fetch coins");
      }

      const data = await response.json();
      setCoins(data.coins || 0);
    } catch (error) {
      console.error("Error fetching coins:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!session?.user?.id) return;

    fetchUserCoins(); // Fetch coins on initial mount and every route change
  }, [pathname, session]);

  if (loading) {
    return <div className="text-sm">Loading Coins...</div>;
  }

  return (
    <div className="flex items-center gap-2 p-2 bg-yellow-100 rounded-md">
      <span className="text-lg font-semibold">🪙 {coins}</span>
      <span className="text-sm text-gray-600">Coins</span>
    </div>
  );
};

export default CoinDisplay;
