import { Input } from "./ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";
import PromptCard from "./PromptCard";

const ProfileContent = ({
  loading,
  postsData,
  activeTab,
  handleEdit,
  handleDelete,
  handleView,
}) => {
  return (
    <div className="flex-1 p-4">
      <div className="text-xl font-bold">My Posts</div>
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

      {loading ? (
        <div className="text-center mt-8">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full mt-4">
          {postsData.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              actionType={activeTab}
              isLike={true}
              isSave={true}
              handleView={() => handleView?.(post)}
              handleEdit={() => handleEdit?.(post)}
              handleDelete={() => handleDelete?.(post)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileContent;
