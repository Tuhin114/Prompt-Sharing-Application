import { useEffect, useState, useCallback } from "react";

const useTrendingTags = () => {
  const [trendingTags, setTrendingTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTrendingTags = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/tags/trending");
      if (!response.ok) throw new Error("Failed to fetch trending tags");

      const data = await response.json();
      const formattedTags = data.map((tag) => ({
        name: tag._id,
        count: tag.count,
        trend: "up",
      }));

      setTrendingTags(formattedTags);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrendingTags();
  }, [fetchTrendingTags]);

  return { trendingTags, loading, error };
};

export default useTrendingTags;
