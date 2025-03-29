import { useEffect, useState } from "react";
import PromptCard from "@components/PromptCard";
import useUserPosts from "@hooks/useUserPosts";
import useCategoryActions from "@hooks/useCategoryActions";
import NoDataFound from "@components/NoDataFound";
import Searchbar from "./Searchbar";
import Filter from "./Filter";

const Posts = ({
  type,
  sidebarTab,
  activeTab,
  handleEdit,
  handleDelete,
  handleView,
}) => {
  const { data: userPostsData = [], isLoading: postsLoading } =
    useUserPosts(activeTab);
  const [originalPosts, setOriginalPosts] = useState([]);
  const [postsData, setPostsData] = useState([]);

  // ✅ React Query for fetching category posts
  const { fetchCategoryPosts } = useCategoryActions();
  const { data: categoryPosts, isLoading: categoryLoading } =
    fetchCategoryPosts(sidebarTab);

  // Fetch initial posts
  useEffect(() => {
    if (
      sidebarTab === "all_posts" ||
      sidebarTab === "all_saved" ||
      sidebarTab === "all_drafts"
    ) {
      setPostsData(userPostsData);
    } else {
      setPostsData(categoryPosts || []);
    }
  }, [sidebarTab, activeTab, userPostsData, categoryPosts]);

  return (
    <div>
      {/* 🔹 Search & Filter Bar */}
      <div className="flex justify-between items-center gap-2 mt-4">
        <Searchbar
          activeTab={activeTab}
          sidebarTab={sidebarTab}
          originalPosts={originalPosts}
          postsData={postsData}
          setPostsData={setPostsData}
        />
        <Filter
          activeTab={activeTab}
          postsData={postsData}
          setPostsData={setPostsData}
          sidebarTab={sidebarTab}
        />
      </div>

      {/* 🔹 Posts Grid */}
      <div>
        {postsLoading || categoryLoading ? (
          <div>Loading...</div>
        ) : postsData.length > 0 ? (
          <div className="max-h-[calc(100vh-180px)] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 pr-2">
            {postsData.map((post) => (
              <PromptCard
                type={type}
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
          <NoDataFound />
        )}
      </div>
    </div>
  );
};

export default Posts;
