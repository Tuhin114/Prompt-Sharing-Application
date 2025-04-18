import { useEffect, useState } from "react";
import ProfileHeader from "./Upper/ProfileHeader";
import ProfileTabs from "./Upper/ProfileTabs";
import ProfileSidebar from "./Lower/ProfileSidebar";
import Content from "./Lower/ProfileContent/Content";

const Profile = ({ handleEdit, handleDelete, handleView }) => {
  const [activeTab, setActiveTab] = useState("My Posts");
  const [sidebarTab, setSidebarTab] = useState("all_posts");
  const [sidebarTabName, setSidebarTabName] = useState("All Posts");

  const userId = "66c2ea75d5be47e78d405f67";

  useEffect(() => {
    if (activeTab === "My Posts") {
      setSidebarTab("all_posts");
      setSidebarTabName("All Posts");
    }

    if (activeTab === "Saved Items") {
      setSidebarTab("all_saved");
      setSidebarTabName("All Saved");
    }

    if (activeTab === "Drafts") {
      setSidebarTab("all_drafts");
      setSidebarTabName("All Drafts");
    }
    if (activeTab === "Following") {
      setSidebarTab("all_following");
      setSidebarTabName("Following");
    }
    if (activeTab === "Followers") {
      setSidebarTab("all_followers");
      setSidebarTabName("Followers");
    }
  }, [activeTab]);

  const tabConfig = [
    "My Posts",
    "Saved Items",
    "Drafts",
    "Following",
    "Followers",
    "Tags",
  ];

  const tabTypeMap = {
    "My Posts": "my_posts",
    "Saved Items": "saved_items",
    Drafts: "drafts",
    Following: "following",
    Followers: "followers",
    Tags: "tags",
  };

  const type = tabTypeMap[activeTab] || "my_posts";

  const tabProps = {
    activeTab,
    setActiveTab,
    sidebarTab,
    setSidebarTab,
    sidebarTabName,
    setSidebarTabName,
  };

  return (
    <section className="w-full min-h-screen">
      <div className="bg-white">
        <ProfileHeader />
        <ProfileTabs
          tabConfig={tabConfig}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      <div className="flex">
        <ProfileSidebar
          userId={userId}
          type={type}
          sidebarTab={sidebarTab}
          setSidebarTab={setSidebarTab}
          setSidebarTabName={setSidebarTabName}
        />
        <Content
          userId={userId}
          type={type}
          tabProps={tabProps}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleView={handleView}
        />
      </div>
    </section>
  );
};

export default Profile;
