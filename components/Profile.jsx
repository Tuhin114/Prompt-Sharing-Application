import { useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";
import ProfileSidebar from "./ProfileSidebar";
import ProfileContent from "./ProfileContent";
import useProfileData from "../hooks/useProfileData";
import useLoading from "../hooks/useLoading";

const Profile = ({
  data,
  loading: initialLoading,
  handleEdit,
  handleDelete,
  handleView,
}) => {
  const { loading } = useLoading(initialLoading);
  // Default activeTab is already "My Posts"
  const [activeTab, setActiveTab] = useState("My Posts");
  const { data: profileData, fetchProfileData } = useProfileData(
    data,
    initialLoading
  );

  useEffect(() => {
    fetchProfileData("My Posts");
  }, []);

  // Fetch data on mount and whenever activeTab changes
  useEffect(() => {
    fetchProfileData(activeTab);
  }, [activeTab]);

  const tabConfig = [
    "My Posts",
    "Saved Posts",
    "My Drafts",
    "Following",
    "Followers",
    "Tags",
  ];

  return (
    <section className="w-full">
      <div className="bg-white">
        <ProfileHeader />
        <ProfileTabs
          tabConfig={tabConfig}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      <div className="flex">
        <ProfileSidebar />
        <ProfileContent
          loading={loading}
          postsData={profileData}
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
