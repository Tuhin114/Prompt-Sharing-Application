import { useState, useEffect } from "react";

const useFetchPosts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setAllPosts(data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { allPosts, loading, fetchPosts };
};

export default useFetchPosts;
