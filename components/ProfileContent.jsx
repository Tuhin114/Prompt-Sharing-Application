import { useEffect } from "react";
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
import useUserPosts from "@hooks/useUserPosts";
import useUserConnections from "@hooks/useUserConnections";

const ProfileContent = ({
  activeTab,
  handleEdit,
  handleDelete,
  handleView,
}) => {
  const isPosts = ["My Posts", "Saved Posts", "My Drafts"].includes(activeTab);
  const isFollow = ["Following", "Followers"].includes(activeTab);
  const isTags = activeTab === "Tags";

  const {
    data: postsData,
    loading: postsLoading,
    refetch: refetchPosts,
  } = useUserPosts(isPosts ? activeTab : null);
  const {
    data: followData,
    loading: followLoading,
    refetch: refetchFollow,
  } = useUserConnections(isFollow ? activeTab : null);

  useEffect(() => {
    if (isPosts) refetchPosts();
    if (isFollow) refetchFollow();
  }, [activeTab]);

  return (
    <div className="flex-1 p-4">
      <div className="text-xl font-bold">{activeTab}</div>
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

      {isPosts && postsLoading ? (
        <div className="text-center mt-8">Loading...</div>
      ) : isPosts && postsData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
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
      ) : isPosts ? (
        <p className="text-center mt-4">No posts found</p>
      ) : null}

      {isFollow && followLoading ? (
        <div className="text-center mt-8">Loading...</div>
      ) : isFollow ? (
        <FollowContent followData={followData} />
      ) : null}
    </div>
  );
};

export default ProfileContent;

const FollowContent = ({ followData = [] }) => (
  <div>
    {followData.length > 0 ? (
      <div className="mx-auto p-6 bg-white rounded-lg shadow-md border">
        {followData.map((person, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={person.image} alt={person.username} />
                <AvatarFallback>
                  {person.username?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{person.username}</p>
                <p className="text-xs text-gray-500 line-clamp-1">
                  {person.bio}
                </p>
              </div>
            </div>
            <Button variant="outline" className="w-24">
              View
            </Button>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-center mt-4">No connections found</p>
    )}
  </div>
);
