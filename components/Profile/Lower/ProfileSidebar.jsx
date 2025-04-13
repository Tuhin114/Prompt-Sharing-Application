import useCategories from "@hooks/useCategories";
import AddCategoryDialog from "../../Categories/Add Categories/AddCategoryDialog";

const ProfileSidebar = ({
  userId,
  type,
  sidebarTab,
  setSidebarTab,
  setSidebarTabName,
}) => {
  const { categories, loading, addCategory } = useCategories(userId, type);
  const SideBarFixedData = [
    {
      type: "my_posts",
      items: [
        { id: "1", name: "All Posts", key_name: "all_posts" },
        { id: "2", name: "Scheduled", key_name: "scheduled_posts" },
      ],
    },
    {
      type: "saved_items",
      items: [{ id: "1", name: "All Saved", key_name: "all_saved" }],
    },
    {
      type: "drafts",
      items: [{ id: "1", name: "All Drafts", key_name: "all_drafts" }],
    },
    {
      type: "following",
      items: [{ id: "1", name: "Following", key_name: "all_following" }],
    },
    {
      type: "followers",
      items: [{ id: "1", name: "Followers", key_name: "all_followers" }],
    },
  ];

  // Find the category that matches the provided type
  const filteredCategory = SideBarFixedData.find(
    (category) => category.type === type
  );

  return (
    <div className="min-w-[220px] border-r-[1px] border-gray-300">
      <div className="flex flex-col p-4">
        {/* Show Fixed Sidebar Items */}
        {filteredCategory ? (
          filteredCategory.items.map((item) => (
            <div
              key={item.id}
              className={`px-3 py-2.5 text-sm font-medium cursor-pointer text-center rounded-md transition 
                ${
                  sidebarTab === item.key_name
                    ? "bg-black text-white font-semibold"
                    : "hover:bg-gray-200"
                }
              `}
              onClick={() => {
                // console.log("item.key_name", item.key_name);
                setSidebarTab(item.key_name);
                setSidebarTabName(item.name);
              }}
            >
              {item.name}
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center">No items found</div>
        )}

        {/* Show Dynamic Additional Categories */}
        {loading ? (
          <div>Loading...</div>
        ) : (
          categories.map((category) => (
            <div
              key={category._id}
              className={`px-3 py-2.5 text-sm font-medium cursor-pointer text-center rounded-md transition
                ${
                  sidebarTab === category._id
                    ? "bg-black text-white font-semibold"
                    : "hover:bg-gray-200"
                }
              `}
              onClick={() => {
                console.log("category.name", category.name);
                setSidebarTab(category._id);
                setSidebarTabName(category.name);
              }}
            >
              {category.name}
            </div>
          ))
        )}
        <div className="mt-2">
          <AddCategoryDialog addCategory={addCategory} />
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
