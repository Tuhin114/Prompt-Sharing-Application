import { useEffect, useState } from "react";
import PromptCard from "@components/PromptCard";
import useUserPosts from "@hooks/useUserPosts";
import useCategoryActions from "@hooks/useCategoryActions";
import NoDataFound from "@components/NoDataFound";
import Searchbar from "./Searchbar";
import Filter from "./Filter";

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

  const [originalPosts, setOriginalPosts] = useState([]);
  const [postsData, setPostsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchData = async () => {
      let fetchedData = [];
      if (["all_posts", "all_saved", "all_drafts"].includes(sidebarTab)) {
        fetchedData = userPostsData;
      } else {
        fetchedData = await fetchCategoryPosts(sidebarTab);
      }

      if (isMounted) {
        setOriginalPosts(fetchedData || []);
        setPostsData(fetchedData || []);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [sidebarTab, activeTab, userPostsData]);

  console.log(postsData);

  return (
    <div>
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
    </div>
  );
};

export default Posts;
