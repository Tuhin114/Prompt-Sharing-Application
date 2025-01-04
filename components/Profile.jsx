import { useSession } from "next-auth/react";
import PromptCard from "./PromptCard";
import { useState, useEffect } from "react";

const Profile = ({
  name,
  desc,
  data,
  loading: initialLoading,
  setLoading,
  handleEdit,
  handleDelete,
  handleView,
}) => {
  const { data: session } = useSession();

  const isEdit = true;
  const isDelete = true;

  const isLike = true;
  const isSave = true;

  const isView = true;

  const [postsData, setPostsData] = useState([]);
  const [loading, setLocalLoading] = useState(initialLoading || true);
  const [activeTab, setActiveTab] = useState("My Posts");

  // Load "My Posts" on initial render or tab switch
  useEffect(() => {
    if (data && activeTab === "My Posts") {
      setPostsData(data);
      setLocalLoading(false);
    }
  }, [data, activeTab]);

  // Handle fetching Saved Posts
  const handleSaved = async () => {
    if (activeTab === "Saved Posts") return;

    setLoading(true);
    setLocalLoading(true);
    try {
      const response = await fetch(`/api/users/${session?.user.id}/saved`);
      if (!response.ok) throw new Error("Failed to fetch saved posts");

      const savedPosts = await response.json();
      setPostsData(savedPosts);
      setActiveTab("Saved Posts");
    } catch (error) {
      console.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
      setLocalLoading(false);
    }
  };

  const handleMyDrafts = async () => {
    if (activeTab === "My Drafts") return;

    setLoading(true);
    setLocalLoading(true);
    try {
      const response = await fetch(`/api/users/${session?.user.id}/drafts`);
      if (!response.ok) throw new Error("Failed to fetch draft posts");

      const draftPosts = await response.json();
      setPostsData(draftPosts);
      setActiveTab("My Drafts");
    } catch (error) {
      console.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
      setLocalLoading(false);
    }
  };

  // Handle switching to My Posts
  const handleMyPosts = () => {
    setPostsData(data);
    setActiveTab("My Posts");
    setLocalLoading(false);
  };

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      {/* Tabs for My Posts, Saved Posts, and My Drafts */}
      <div className="flex justify-start gap-2 mt-8">
        {["My Posts", "Saved Posts", "My Drafts"].map((tab) => (
          <div
            key={tab}
            className={`px-5 py-1.5 text-sm cursor-pointer font-semibold rounded-full text-white ${
              activeTab === tab
                ? "bg-primary-orange"
                : "bg-gray-300 text-gray-700"
            }`}
            onClick={
              tab === "My Posts"
                ? handleMyPosts
                : tab === "Saved Posts"
                ? handleSaved
                : handleMyDrafts
            }
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Loading State */}
      {loading || initialLoading || loading === undefined ? (
        <div className="text-center mt-8">Loading...</div>
      ) : (
        <div className="prompt_layout mt-4">
          {postsData.length > 0 ? (
            postsData.map((post) => (
              <PromptCard
                key={post._id}
                post={post}
                isLike={activeTab === "My Drafts" ? !isLike : isLike}
                isSave={activeTab === "My Drafts" ? !isSave : isSave}
                isEdit={activeTab === "My Posts" ? isEdit : !isEdit}
                isDelete={activeTab === "Saved Posts" ? !isDelete : isDelete}
                isView={activeTab === "My Drafts" ? isView : !isView}
                handleView={() => handleView && handleView(post)}
                handleEdit={() => handleEdit && handleEdit(post)}
                handleDelete={() => handleDelete && handleDelete(post)}
              />
            ))
          ) : (
            <div className="text-center text-gray-500 mt-8">
              No posts available.
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Profile;
