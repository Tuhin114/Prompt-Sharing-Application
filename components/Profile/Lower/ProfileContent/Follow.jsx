import NoDataFound from "@components/NoDataFound";
import { Button } from "../../../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import useFollow from "@hooks/useFollow";
import useUserConnections from "@hooks/useUserConnections";
import { useSession } from "@node_modules/next-auth/react";
import React, { useState } from "react";

const Follow = ({ activeTab }) => {
  const {
    data: followData = [],
    loading: followLoading,
    refetch: refetchFollow,
  } = useUserConnections(activeTab);

  return (
    <div>
      {followLoading ? (
        <div>Loading...</div>
      ) : followData.length > 0 ? (
        <FollowContent followData={followData} activeTab={activeTab} />
      ) : (
        <NoDataFound actionType={activeTab} />
      )}
    </div>
  );
};

export default Follow;

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
