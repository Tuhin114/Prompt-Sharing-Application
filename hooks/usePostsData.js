import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const usePostsData = (initialData, initialLoading) => {
  const { data: session } = useSession();
  const [postsData, setPostsData] = useState(initialData || []);
  const [activeTab, setActiveTab] = useState("My Posts");
  const [loading, setLoading] = useState(initialLoading || true);

  useEffect(() => {
    if (initialData && activeTab === "My Posts") {
      setPostsData(initialData);
      setLoading(false);
    }
  }, [initialData, activeTab]);

  const fetchPosts = async (type) => {
    if (activeTab === type) return;
    setLoading(true);

    let api;
    if (type === "My Posts") {
      api = `/api/users/${session?.user?.id}/posts`;
    } else if (type === "Saved Posts") {
      api = `/api/users/${session?.user?.id}/saved`;
    } else if (type === "My Drafts") {
      api = `/api/users/${session?.user?.id}/drafts`;
    }

    if (!api) {
      console.error("Invalid API endpoint");
      setLoading(false);
      return;
    }

    try {
      //   console.log(`Fetching: ${api}`);
      const response = await fetch(api);
      if (!response.ok) throw new Error(`Failed to fetch ${type}`);

      const fetchedPosts = await response.json();
      setPostsData(fetchedPosts);
      setActiveTab(type);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    postsData,
    activeTab,
    loading,
    setLoading,
    fetchMyPosts: () => {
      setPostsData(initialData);
      setActiveTab("My Posts");
      setLoading(false);
    },
    fetchSavedPosts: () => fetchPosts("Saved Posts"),
    fetchMyDrafts: () => fetchPosts("My Drafts"),
  };
};

export default usePostsData;
