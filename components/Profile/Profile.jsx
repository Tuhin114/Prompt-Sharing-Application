import { useEffect, useState } from "react";
import ProfileHeader from "./Upper/ProfileHeader";
import ProfileTabs from "./Upper/ProfileTabs";
import ProfileSidebar from "./Lower/ProfileSidebar";
import useCategories from "@hooks/useCategories";
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
  }, [activeTab]);

  // console.log("sidebarTab", sidebarTab);

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

  // console.log("type", type);

  const { categories, loading, addCategory, updateCategory, deleteCategory } =
    useCategories(userId, type);

  // console.log("Categories:", categories);

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
          categories={categories}
          loading={loading}
          addCategory={addCategory}
          type={type}
          sidebarTab={sidebarTab}
          setSidebarTab={setSidebarTab}
          setSidebarTabName={setSidebarTabName}
        />
        <Content
          updateCategory={updateCategory}
          deleteCategory={deleteCategory}
          type={type}
          setSidebarTabName={setSidebarTabName}
          sidebarTabName={sidebarTabName}
          setSidebarTab={setSidebarTab}
          activeTab={activeTab}
          sidebarTab={sidebarTab}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleView={handleView}
        />
      </div>
    </section>
  );
};

export default Profile;
