import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const useProfileData = (initialData = [], initialLoading = true) => {
  const { data: session, status } = useSession();
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(initialLoading);

  const fetchProfileData = async (type) => {
    if (!session?.user?.id) return;

    setData([]);
    setLoading(true);

    let api;
    switch (type) {
      case "My Posts":
        api = `/api/users/${session.user.id}/posts`;
        break;
      case "Saved Posts":
        api = `/api/users/${session.user.id}/saved`;
        break;
      case "My Drafts":
        api = `/api/users/${session.user.id}/drafts`;
        break;
      case "Following":
        api = `/api/users/${session.user.id}/following`;
        break;
      case "Followers":
        api = `/api/users/${session.user.id}/followers`;
        break;
      case "Tags":
        api = `/api/users/${session.user.id}/tags`;
        break;
      default:
        console.error("Invalid API type");
        setLoading(false);
        return;
    }

    try {
      const response = await fetch(api);
      if (!response.ok) throw new Error(`Failed to fetch ${type}`);

      const result = await response.json();

      setData(result);
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
    } finally {
      setLoading(false);
    }
  };

  // 🛠 Ensure fetching data only runs when session is ready
  useEffect(() => {
    if (status === "authenticated") {
      fetchProfileData("My Posts");
    }
  }, [status]);

  return { data, loading, fetchProfileData };
};

export default useProfileData;
