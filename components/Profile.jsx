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
}) => {
  const { data: session } = useSession();

  const [postsData, setPostsData] = useState([]);
  const [loading, setLocalLoading] = useState(initialLoading || true);
  true;
  const [activeTab, setActiveTab] = useState("My Posts");

  useEffect(() => {
    if (data && activeTab === "My Posts") {
      setPostsData(data);
      setLocalLoading(false);
    }
  }, [data, activeTab]);

  const handleSaved = async () => {
    if (activeTab === "Saved Posts") return;

    setLoading(true);
    setLocalLoading(true);
    try {
      const response = await fetch(`/api/users/${session?.user.id}/saved`);
      if (!response.ok) {
        throw new Error("Failed to fetch saved posts");
      }
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

      {/* Tabs for My Posts and Saved Posts */}
      <div className="flex justify-start gap-2 mt-8">
        <div
          className={`px-5 py-1.5 text-sm cursor-pointer font-semibold rounded-full text-white ${
            activeTab === "My Posts"
              ? "bg-primary-orange"
              : "bg-gray-300 text-gray-700"
          }`}
          onClick={handleMyPosts}
        >
          My Posts
        </div>
        <div
          className={`px-5 py-1.5 text-sm cursor-pointer font-semibold rounded-full text-white ${
            activeTab === "Saved Posts"
              ? "bg-primary-orange"
              : "bg-gray-300 text-gray-700"
          }`}
          onClick={handleSaved}
        >
          Saved Posts
        </div>
      </div>

      {loading || initialLoading || loading === undefined ? (
        <div className="text-center mt-8">Loading...</div>
      ) : (
        <div className="prompt_layout mt-4">
          {postsData.length > 0 ? (
            postsData.map((post) => (
              <PromptCard
                key={post._id}
                post={post}
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
