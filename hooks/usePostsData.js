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
    const peopleWithAccess = [
      {
        name: "Olivia Martin",
        bio: "B.Tech CS '27 | 3⭐ @GeeksforGeeks(Max : 1689) | 400+ @LeetCode(Max : 1606) | Full-Stack Dev | Next.js | TypeScript | Hack4Bengal 3.0 Runner up",
        avatar: "/avatars/olivia.png",
      },
      {
        name: "Isabella Nguyen",
        bio: "Making AI simple for all | IIT Madras",
        avatar: "/avatars/isabella.png",
      },
      {
        name: "Sofia Davis",
        bio: "retired from corporate and full time YouTuber, x founder of LCO (acquired), x CTO, Sr. Director at PW. 2 YT channels (950k & 470k)",
        avatar: "/avatars/sofia.png",
      },
      {
        name: "Sofia Davis",
        bio: "retired from corporate and full time YouTuber, x founder of LCO (acquired), x CTO, Sr. Director at PW. 2 YT channels (950k & 470k)",
        avatar: "/avatars/sofia.png",
      },
      {
        name: "Sofia Davis",
        bio: "retired from corporate and full time YouTuber, x founder of LCO (acquired), x CTO, Sr. Director at PW. 2 YT channels (950k & 470k)",
        avatar: "/avatars/sofia.png",
      },
      {
        name: "Sofia Davis",
        bio: "retired from corporate and full time YouTuber, x founder of LCO (acquired), x CTO, Sr. Director at PW. 2 YT channels (950k & 470k)",
        avatar: "/avatars/sofia.png",
      },
      {
        name: "Sofia Davis",
        bio: "retired from corporate and full time YouTuber, x founder of LCO (acquired), x CTO, Sr. Director at PW. 2 YT channels (950k & 470k)",
        avatar: "/avatars/sofia.png",
      },
    ];

    if (type == "Following") {
      setPostsData(peopleWithAccess);
      setActiveTab("Following");
    }
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
    fetchFollowing: () => fetchPosts("Following"),
  };
};

export default usePostsData;
