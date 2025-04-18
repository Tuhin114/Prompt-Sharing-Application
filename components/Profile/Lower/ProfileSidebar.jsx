import useCategories from "@hooks/useCategories";
import AddCategoryDialog from "../../Categories/Add Categories/AddCategoryDialog";
import useUserPosts from "@hooks/useUserPosts";
import { Skeleton } from "@components/Skeletons/Skeleton";
import SidebarSkeleton from "@components/Skeletons/SidebarSkeleton";

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

  const { data } = useUserPosts(sidebarTab);

  return (
    <div className="min-w-[220px] border-r-[1px] border-gray-300">
      <div className="flex flex-col p-4">
        {/* Show Fixed Sidebar Items */}
        {filteredCategory ? (
          filteredCategory.items.map((item) => (
            <div
              key={item.id}
              className={`px-5 py-2.5 text-sm font-medium cursor-pointer rounded-md transition flex items-center justify-between
                ${
                  sidebarTab === item.key_name
                    ? "bg-black text-white font-semibold"
                    : "hover:bg-gray-200"
                }
              `}
              onClick={() => {
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
          <SidebarSkeleton />
        ) : (
          categories.map((category) => (
            <div
              key={category._id}
              className={`px-5 py-2.5 text-sm font-medium cursor-pointer rounded-md transition flex justify-between items-center
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
        <div className="flex items-center justify-center ">
          <AddCategoryDialog addCategory={addCategory} />
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
