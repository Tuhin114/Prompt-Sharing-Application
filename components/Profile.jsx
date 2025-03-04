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
  const { postsData, activeTab, fetchMyPosts, fetchSavedPosts, fetchMyDrafts } =
    usePostsData(data, initialLoading);

  const tabConfig = [
    { label: "My Posts", action: fetchMyPosts },
    { label: "Saved Posts", action: fetchSavedPosts },
    { label: "My Drafts", action: fetchMyDrafts },
    { label: "Following", action: fetchMyDrafts },
    { label: "Followers", action: fetchMyDrafts },
    { label: "Tags", action: fetchMyDrafts },
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
