import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";

const useProfileData = () => {
  const { data: session, status } = useSession();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiMap = {
    "My Posts": `/api/users/${session?.user?.id}/posts`,
    "Saved Posts": `/api/users/${session?.user?.id}/saved`,
    "My Drafts": `/api/users/${session?.user?.id}/drafts`,
    Following: `/api/users/${session?.user?.id}/following`,
    Followers: `/api/users/${session?.user?.id}/followers`,
    Tags: `/api/users/${session?.user?.id}/tags`,
  };

  const fetchProfileData = useCallback(
    async (type) => {
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
    },
    [session?.user?.id]
  );

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      fetchProfileData("My Posts");
    }
  }, [status, session?.user?.id, fetchProfileData]);

  return { data, loading, fetchProfileData };
};

export default useProfileData;
