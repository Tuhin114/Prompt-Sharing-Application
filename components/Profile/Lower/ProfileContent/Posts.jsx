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
  const { data: userPostsData = [], loading: postsLoading } =
    useUserPosts(sidebarTab);

  // Determine if sidebarTab represents a category or a general view.
  const isCategory = !["all_posts", "all_saved", "all_drafts"].includes(
    sidebarTab
  );
  // If not a general view, treat sidebarTab as a category id; otherwise, pass null.
  const categoryId = isCategory ? sidebarTab : null;

  // Always call the hook so the hook order stays consistent.
  const { fetchCategoryPosts } = useCategoryActions();
  const { data: categoryPosts = [], isLoading: categoryLoading } =
    fetchCategoryPosts(categoryId);

  const [originalPosts, setOriginalPosts] = useState([]);
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    // Choose the data based on the sidebarTab:
    const newPosts = ["all_posts", "all_saved", "all_drafts"].includes(
      sidebarTab
    )
      ? userPostsData
      : categoryPosts;
    if (JSON.stringify(newPosts) !== JSON.stringify(originalPosts)) {
      setOriginalPosts(newPosts);
      setPostsData(newPosts);
    }
  }, [sidebarTab, userPostsData, categoryPosts]);

  // console.log(postsData);

  return (
    <div>
      {/* Search & Filter Bar */}
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
          originalPosts={originalPosts}
          sidebarTab={sidebarTab}
        />
      </div>

      {/* Posts Grid */}
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
