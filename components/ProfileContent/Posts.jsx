import { useEffect, useState } from "react";
import PromptCard from "@components/PromptCard";
import useUserPosts from "@hooks/useUserPosts";
import useCategoryActions from "@hooks/useCategoryActions";
import NoDataFound from "@components/NoDataFound";

const Posts = ({
  sidebarTab,
  activeTab,
  handleEdit,
  handleDelete,
  handleView,
}) => {
  const { data: userPostsData = [], loading: postsLoading } =
    useUserPosts(activeTab);
  const { fetchCategoryPosts } = useCategoryActions();
  const [postsData, setPostsData] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("sidebarTab", sidebarTab);
  console.log("activeTab", activeTab);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchData = async () => {
      if (
        sidebarTab === "all_posts" ||
        sidebarTab === "all_saved" ||
        sidebarTab === "all_drafts"
      ) {
        setPostsData(userPostsData);
      } else {
        const categoryPosts = await fetchCategoryPosts(sidebarTab);
        if (isMounted) setPostsData(categoryPosts || []);
      }
      setLoading(false);
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [sidebarTab, activeTab, userPostsData]);

  // console.log("postsData", postsData);

  return (
    <div>
      {loading || postsLoading ? (
        <div>Loading...</div>
      ) : postsData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {postsData.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              actionType={activeTab}
              isLike
              isSave
              handleView={() => handleView?.(post)}
              handleEdit={() => handleEdit?.(post)}
              handleDelete={() => handleDelete?.(post)}
            />
          ))}
        </div>
      ) : (
        <NoDataFound actionType={activeTab} />
      )}
    </div>
  );
};

export default Posts;
