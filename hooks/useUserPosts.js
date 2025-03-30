import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

const useUserPosts = (type) => {
  const { data: session, status } = useSession();

  const userId = session?.user?.id;

  const isFetchable = ["all_posts", "all_saved", "all_drafts"].includes(type);

  const apiMap = {
    all_posts: `/api/users/${userId}/posts`,
    all_saved: `/api/users/${userId}/saved`,
    all_drafts: `/api/users/${userId}/drafts`,
  };

  // console.log(apiMap[type]);

  const fetchPosts = async () => {
    if (!userId || !apiMap[type]) return [];
    const response = await fetch(apiMap[type]);
    // console.log(response);
    if (!response.ok) throw new Error(`Failed to fetch ${type}`);
    return response.json();
  };

  const { data = [], isLoading } = useQuery({
    queryKey: ["userPosts", type, session?.user?.id],
    queryFn: fetchPosts,
    enabled: status === "authenticated" && !!userId && isFetchable,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  // console.log(data);

  return { data, loading: isLoading };
};

export default useUserPosts;
