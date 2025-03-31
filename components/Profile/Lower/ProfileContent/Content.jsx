import Posts from "./Posts";
import Follow from "./Follow/Follow";
import DropDown from "@components/Categories/Category/DropDown";
import Map from "./Follow/Map/Map";

const Content = ({
  updateCategory,
  deleteCategory,
  type,
  sidebarTab,
  setSidebarTab,
  sidebarTabName,
  setSidebarTabName,
  activeTab,
  handleEdit,
  handleDelete,
  handleView,
}) => {
  const isCategory = ["All Posts", "All Saved", "All Drafts"].includes(
    sidebarTabName
  );
  const isPosts = ["My Posts", "Saved Items", "Drafts"].includes(activeTab);
  const isFollow = ["Following", "Followers"].includes(activeTab);

  console.log(activeTab);

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
              activeTab={activeTab}
              sidebarTab={sidebarTab}
              setSidebarTab={setSidebarTab}
              sidebarTabName={sidebarTabName}
              setSidebarTabName={setSidebarTabName}
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
