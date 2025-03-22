import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";

import Posts from "./Posts";
import Follow from "./Follow";
import DropDown from "@components/Categories/Category/DropDown";

const Content = ({
  updateCategory,
  deleteCategory,
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

  return (
    <div className="flex-1 p-4">
      <div className="flex justify-between items-center space-between">
        <h2 className="text-xl font-bold">{sidebarTabName}</h2>
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

      <div className="flex justify-between items-center gap-2 mt-4">
        <Input type="text" placeholder="Search" className="w-full bg-white" />
        <Select>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Filter</SelectLabel>
              <SelectItem value="recent">Recent</SelectItem>
              <SelectItem value="liked">Most Liked</SelectItem>
              <SelectItem value="saved">Most Saved</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Posts Section */}
      {isPosts && (
        <Posts
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
