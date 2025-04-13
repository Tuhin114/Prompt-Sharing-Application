import { useMemo } from "react";

import useUserPosts from "@hooks/useUserPosts";
import useCategoryActions from "@hooks/useCategoryActions";
import NoDataFound from "@components/NoDataFound";
import Searchbar from "./Searchbar";
import Filter from "./Filter";
import useSearch from "@hooks/useSearch";
import useSortPosts from "@hooks/useSortPosts";
import PromptCard from "@components/PromptCard/PromptCard";

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

  const isCategory = !["all_posts", "all_saved", "all_drafts"].includes(
    sidebarTab
  );
  const categoryId = isCategory ? sidebarTab : null;

  const { fetchCategoryPosts } = useCategoryActions();
  const { data: categoryPosts = [], isLoading: categoryLoading } =
    fetchCategoryPosts(categoryId);

  // Memoize source data (either userPostsData or categoryPosts)
  const originalPosts = useMemo(() => {
    return ["all_posts", "all_saved", "all_drafts"].includes(sidebarTab)
      ? userPostsData
      : categoryPosts;
  }, [sidebarTab, userPostsData, categoryPosts]);

  const { searchText, filteredPosts, handleSearchChange, handleClearSearch } =
    useSearch(originalPosts);

  const { sortType, sortedPosts, handleSortChange } =
    useSortPosts(filteredPosts);

  // Use memoization to determine the final posts data,
  // ensuring it updates only when original data, search, or sorting changes.
  const postsData = useMemo(() => {
    return sortedPosts;
  }, [sortedPosts]);

  return (
    <div>
      <div className="flex justify-between items-center gap-2 mt-4">
        <Searchbar
          searchText={searchText}
          handleSearchChange={handleSearchChange}
          handleClearSearch={handleClearSearch}
        />
        <Filter
          categoryId={categoryId}
          activeTab={activeTab}
          sortType={sortType}
          handleSortChange={handleSortChange}
        />
      </div>

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
