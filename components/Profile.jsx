import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";
import ProfileSidebar from "./ProfileSidebar";
import ProfileContent from "./ProfileContent";
import usePostsData from "../hooks/usePostsData";
import useLoading from "../hooks/useLoading";

const Profile = ({
  data,
  loading: initialLoading,
  handleEdit,
  handleDelete,
  handleView,
}) => {
  const { loading, setLoading } = useLoading(initialLoading);
  const {
    postsData,
    activeTab,
    fetchMyPosts,
    fetchSavedPosts,
    fetchMyDrafts,
    fetchFollowers,
    fetchFollowing,
    fetchTags,
  } = usePostsData(data, initialLoading);

  const peopleWithAccess = [
    {
      name: "Olivia Martin",
      email: "m@example.com",
      avatar: "/avatars/olivia.png",
      permission: "edit",
    },
    {
      name: "Isabella Nguyen",
      email: "b@example.com",
      avatar: "/avatars/isabella.png",
      permission: "view",
    },
    {
      name: "Sofia Davis",
      email: "p@example.com",
      avatar: "/avatars/sofia.png",
      permission: "view",
    },
  ];

  const tabConfig = [
    { label: "My Posts", action: fetchMyPosts },
    { label: "Saved Posts", action: fetchSavedPosts },
    { label: "My Drafts", action: fetchMyDrafts },
    { label: "Following", action: fetchFollowing },
    { label: "Followers", action: fetchFollowers },
    { label: "Tags", action: fetchTags },
  ];

  return (
    <section className="w-full">
      <div className=" bg-white">
        <ProfileHeader />
        <ProfileTabs tabConfig={tabConfig} activeTab={activeTab} />
      </div>
      <div className="flex">
        <ProfileSidebar />
        <ProfileContent
          loading={loading}
          postsData={postsData}
          activeTab={activeTab}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleView={handleView}
        />
      </div>
    </section>
  );
};

export default Profile;
