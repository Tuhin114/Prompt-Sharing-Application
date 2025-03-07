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
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const ProfileContent = ({
  loading,
  postsData,
  activeTab,
  handleEdit,
  handleDelete,
  handleView,
}) => {
  console.log(activeTab);
  console.log(postsData);

  const isPrompts =
    activeTab === "My Posts" ||
    activeTab === "Saved Posts" ||
    activeTab === "My Drafts";

  const isFollow =
    (activeTab === "Following" || activeTab === "Followers") && !isPrompts;

  const isTags = activeTab === "Tags";

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
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {isPrompts &&
              postsData.map((post) => (
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

          {isFollow && <FollowerContent postsData={postsData} />}
        </div>
      )}
    </div>
  );
};

export default ProfileContent;

const FollowerContent = ({ postsData }) => {
  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-md border">
      {/* People List */}
      <div className="">
        <div className="space-y-3">
          {postsData.map((person, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={person.avatar} alt={person.name} />
                  <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{person.name}</p>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {person.bio}
                  </p>
                </div>
              </div>

              {/* Permission Dropdown */}
              <div className="flex items-center gap-2">
                <Button variant="outline" className="w-24">
                  View
                </Button>
                <Button className="w-24">Unfollow</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
