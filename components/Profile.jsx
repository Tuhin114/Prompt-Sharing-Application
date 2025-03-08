import { useState } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";
import ProfileSidebar from "./ProfileSidebar";
import ProfileContent from "./ProfileContent";

const Profile = ({ handleEdit, handleDelete, handleView }) => {
  const [activeTab, setActiveTab] = useState("My Posts");

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
