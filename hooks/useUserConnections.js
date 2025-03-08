import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";

const useUserConnections = (type) => {
  const { data: session, status } = useSession();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiMap = {
    Following: `/api/users/${session?.user?.id}/following`,
    Followers: `/api/users/${session?.user?.id}/followers`,
  };

  const fetchConnections = useCallback(async () => {
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
    if (status === "authenticated" && type) fetchConnections();
  }, [status, type, fetchConnections]);

  return { data, loading, refetch: fetchConnections };
};

export default useUserConnections;
