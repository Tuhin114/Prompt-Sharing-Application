import React, { useState } from "react";
import { Button } from "../../../../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../ui/avatar";
import useFollow from "@hooks/useFollow";
import { useSession } from "@node_modules/next-auth/react";

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
        <div
          key={person.id}
          className="flex items-center justify-between p-2 border-b border-gray-200"
        >
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={person.image} alt={person.name} />
              <AvatarFallback>
                {person.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1">
                <p className="text-base font-medium">{person.name}</p>
                <p className="text-xs text-gray-400 mt-1">{person.role}</p>{" "}
              </div>
              <p className="text-xs text-gray-500 line-clamp-1">{person.bio}</p>
              {/* Added Role Here */}
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

export default FollowContent;
