import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";

const useUserPosts = (type) => {
  const { data: session, status } = useSession();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiMap = {
    "My Posts": `/api/users/${session?.user?.id}/posts`,
    "Saved Posts": `/api/users/${session?.user?.id}/saved`,
    "My Drafts": `/api/users/${session?.user?.id}/drafts`,
  };

  const fetchPosts = useCallback(async () => {
    if (!session?.user?.id || !apiMap[type]) return;

    setLoading(true);
    try {
      const response = await fetch(apiMap[type]);
      if (!response.ok) throw new Error(`Failed to fetch ${type}`);
      const result = await response.json();
      setData(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id, type]);

  useEffect(() => {
    if (status === "authenticated" && type) fetchPosts();
  }, [status, type, fetchPosts]);

  return { data, loading, refetch: fetchPosts };
};

export default useUserPosts;
