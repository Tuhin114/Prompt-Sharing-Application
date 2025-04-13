"use client";
import Posts from "./Posts";
import Follow from "./Follow/Follow";
import DropDown from "@components/Categories/Category/DropDown";
import Map from "./Follow/Map/Map";
import useCategories from "@hooks/useCategories";

const Content = ({
  userId,
  type,
  tabProps,
  handleEdit,
  handleDelete,
  handleView,
}) => {
  const { activeTab, sidebarTabName, sidebarTab } = tabProps;
  const { updateCategory, deleteCategory } = useCategories(userId, type);
  const isCategory = [
    "All Posts",
    "All Saved",
    "All Drafts",
    "All Following",
    "All Followers",
  ].includes(sidebarTabName);
  const isPosts = ["My Posts", "Saved Items", "Drafts"].includes(activeTab);
  const isFollow = ["Following", "Followers"].includes(activeTab);

  return (
    <div className="flex-1 p-4 ">
      <div className="flex justify-between items-center space-between">
        <h2 className="text-xl font-bold">{sidebarTabName}</h2>
        <div className="flex justify-between items-center space-between">
          {(activeTab === "Following" || activeTab === "Followers") && <Map />}
          {!isCategory && (
            <DropDown
              updateCategory={updateCategory}
              deleteCategory={deleteCategory}
              tabProps={tabProps}
            />
          )}
        </div>
      </div>

      {/* Posts Section */}
      {isPosts && (
        <Posts
          type={type}
          sidebarTab={sidebarTab}
          activeTab={activeTab}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleView={handleView}
        />
      )}

      {/* Follow Section */}
      {isFollow && <Follow activeTab={activeTab} />}
    </div>
  );
};

export default Content;
