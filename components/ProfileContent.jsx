import { useEffect, useState } from "react";
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
import NoDataFound from "./NoDataFound";
import useFollow from "@hooks/useFollow";
import { useSession } from "@node_modules/next-auth/react";

const ProfileContent = ({
  activeTab,
  handleEdit,
  handleDelete,
  handleView,
}) => {
  const isPosts = ["My Posts", "Saved Posts", "My Drafts"].includes(activeTab);
  const isFollow = ["Following", "Followers"].includes(activeTab);

  const {
    data: postsData = [],
    loading: postsLoading,
    refetch: refetchPosts,
  } = useUserPosts(isPosts ? activeTab : null);

  const {
    data: followData = [],
    loading: followLoading,
    refetch: refetchFollow,
  } = useUserConnections(isFollow ? activeTab : null);

  useEffect(() => {
    if (isPosts) refetchPosts();
    if (isFollow) refetchFollow();
  }, [activeTab]);

  return (
    <div className="flex-1 p-4">
      <h2 className="text-xl font-bold">{activeTab}</h2>

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
        <>
          {postsLoading ? (
            <LoadingState />
          ) : postsData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {postsData.map((post) => (
                <PromptCard
                  key={post._id}
                  post={post}
                  actionType={activeTab}
                  isLike
                  isSave
                  handleView={() => handleView?.(post)}
                  handleEdit={() => handleEdit?.(post)}
                  handleDelete={() => handleDelete?.(post)}
                />
              ))}
            </div>
          ) : (
            <NoDataFound actionType={activeTab} />
          )}
        </>
      )}

      {/* Follow Section */}
      {isFollow && (
        <>
          {followLoading ? (
            <LoadingState />
          ) : followData.length > 0 ? (
            <FollowContent followData={followData} activeTab={activeTab} />
          ) : (
            <NoDataFound actionType={activeTab} />
          )}
        </>
      )}
    </div>
  );
};

export default ProfileContent;

const LoadingState = () => <div className="text-center mt-8">Loading...</div>;

const FollowContent = ({ followData, activeTab }) => {
  const { data: session } = useSession();
  const currentUserId = session?.user.id;
  const { followUser, unfollowUser, isLoading } = useFollow();
  const [followState, setFollowState] = useState(
    followData.reduce((acc, person) => {
      acc[person._id] = activeTab === "Following";
      return acc;
    }, {})
  );

  const handleFollowToggle = async (targetId) => {
    console.log(targetId);
    const isFollowing = followState[targetId];

    const result = isFollowing
      ? await unfollowUser(currentUserId, targetId)
      : await followUser(currentUserId, targetId);

    if (result.success) {
      setFollowState((prev) => ({
        ...prev,
        [targetId]: !isFollowing,
      }));
    }
  };

  return (
    <div className="mx-auto mt-4 p-6 bg-white rounded-lg shadow-md border">
      {followData.map((person) => (
        <div key={person.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={person.image} alt={person.username} />
              <AvatarFallback>
                {person.username?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{person.username}</p>
              <p className="text-xs text-gray-500 line-clamp-1">{person.bio}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="w-24">
              View
            </Button>
            <Button
              className="w-24"
              onClick={() => handleFollowToggle(person._id)}
              disabled={isLoading}
            >
              {isLoading
                ? "Processing..."
                : followState[person._id]
                ? "Unfollow"
                : "Follow Back"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
