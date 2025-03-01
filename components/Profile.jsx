import PromptCard from "./PromptCard";
import usePostsData from "../hooks/usePostsData";
import useLoading from "../hooks/useLoading";
import Image from "@node_modules/next/image";
import ProfileDrawer from "./ProfileDrawer";
import EditProfileDialog from "./EditProfileDialog";

const Profile = ({
  name,
  desc,
  profileImage,
  backgroundImage,
  followers = [],
  following = [],
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

  const user = {
    name: "Tuhin Poddar",
    username: "4334Tuhin",
    verified: true,
    followers: 122,
    following: 128,
  };

  return (
    <section className="w-full">
      <div className="relative w-full px-2">
        {/* Background Cover Image */}
        <div className="relative w-full h-40 md:h-52 bg-gray-200 border-b-2 border-gray-300 rounded-t-lg overflow-hidden">
          <Image
            src="https://storyblok-cdn.photoroom.com/f/191576/768x432/0f78fe60a2/colors-backgrounds-cover.webp"
            alt="Cover Image"
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>

        {/* Profile Section */}
        <div className="relative mt-12   md:-mt-16 flex flex-col md:flex-row items-center md:items-end justify-between">
          {/* Profile Picture */}
          <div className="px-6 md:px-12 flex">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white overflow-hidden">
              <Image
                src="https://cdn.vectorstock.com/i/500p/97/32/man-silhouette-profile-picture-vector-2139732.jpg"
                alt="Profile Picture"
                width={128}
                height={128}
                className="rounded-full"
              />
            </div>

            {/* User Info */}
            <div className="ml-4 mt-20 text-center md:text-left">
              <h2 className="text- text-xl md:text-2xl font-bold flex items-center gap-1">
                {user.name}{" "}
                {/* {user.verified && (
                <span className="text-blue-500 bg-gray-900 px-2 py-1 text-xs rounded-full">
                  ✅ Verified
                </span>
              )} */}
              </h2>
              <div className="md:ml-auto flex items-center gap-4 mt-4 md:mt-0">
                <p className="text-black text-sm">
                  <span className="font-semibold">{user.followers}</span>{" "}
                  Followers
                </p>
                <p className="text-black text-sm">
                  <span className="font-semibold">{user.following}</span>{" "}
                  Following
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-3">
            <button className="bg-black text-white px-4 py-2 rounded-full font-semibold hover:bg-white hover:text-black transition">
              Follow
            </button>
            <ProfileDrawer />
            <EditProfileDialog />
          </div>
        </div>
      </div>

      {/* Edit Profile Button */}

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-4 w-full">
          {postsData.length > 0 ? (
            postsData.map((post) => (
              <PromptCard
                key={post._id}
                post={post}
                actionType={activeTab}
                isLike={true}
                isSave={true}
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
