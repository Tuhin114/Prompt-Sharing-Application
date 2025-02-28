import PromptCard from "./PromptCard";
import usePostsData from "../hooks/usePostsData";
import useLoading from "../hooks/useLoading";

const Profile = ({
  name,
  desc,
  data,
  loading: initialLoading,
  handleEdit,
  handleDelete,
  handleView,
}) => {
  const { loading, setLoading } = useLoading(initialLoading);
  const { postsData, activeTab, fetchMyPosts, fetchSavedPosts, fetchMyDrafts } =
    usePostsData(data, initialLoading);

  const tabConfig = [
    { label: "My Posts", action: fetchMyPosts },
    { label: "Saved Posts", action: fetchSavedPosts },
    { label: "My Drafts", action: fetchMyDrafts },
  ];

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      {/* Tabs */}
      <div className="flex justify-start gap-2 mt-8">
        {tabConfig.map(({ label, action }) => (
          <div
            key={label}
            className={`px-5 py-1.5 text-sm cursor-pointer font-semibold rounded-full text-white ${
              activeTab === label
                ? "bg-primary-orange"
                : "bg-gray-300 text-gray-700"
            }`}
            onClick={action}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center mt-8">Loading...</div>
      ) : (
        <div className="prompt_layout mt-4">
          {postsData.length > 0 ? (
            postsData.map((post) => (
              <PromptCard
                key={post._id}
                post={post}
                isLike={activeTab !== "My Drafts"}
                isSave={activeTab !== "My Drafts"}
                isEdit={activeTab === "My Posts"}
                isDelete={activeTab !== "Saved Posts"}
                isView={activeTab === "My Drafts"}
                handleView={() => handleView?.(post)}
                handleEdit={() => handleEdit?.(post)}
                handleDelete={() => handleDelete?.(post)}
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
