"use client";
import { useState } from "react";
import Image from "next/image";
import ProfileDrawer from "./ProfileDrawer";
import EditProfileDialog from "./EditProfileDialog";

const ProfileHeader = () => {
  const currentUser = {
    _id: "67cafe7bf9ce8943cecb32ce",
    email: "tuhinpoddar114@gmail.com",
    bio: "AI Developer",
    username: "tuhinpoddar",
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocIYwFzW-PJsm67HmHM-gNLsuXVY5v…",
    __v: 0,
    followers: [],
    following: [],
  };

  const profileUser = {
    _id: "66c2ea75d5be47e78d405f67",
    email: "tuhinpoddar114@gmail.com",
    bio: "AI Developer",
    username: "tuhinpoddar",
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocL2vyGntv6QAWbdHjNtlGwBGQdkbnZo-iVWqJ51bLEBRa-z0vll=s96-c",
    __v: 0,
    followers: [],
    following: [],
  };
  const [isFollowing, setIsFollowing] = useState(
    profileUser.followers.includes(currentUser._id)
  );

  const [followersCount, setFollowersCount] = useState(
    profileUser.followers.length
  );

  const handleFollow = async () => {
    try {
      const response = await fetch("/api/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser._id,
          targetId: profileUser._id,
        }),
      });

      if (response.ok) {
        setIsFollowing(true);
        setFollowersCount((prev) => prev + 1); // Increase followers count in UI
      } else {
        console.error("Failed to follow");
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  return (
    <div className="relative w-full bg-white">
      {/* Cover Image */}
      <div className="relative w-full h-40 md:h-52 bg-gray-200 border-b-2 border-gray-300 rounded-t-lg overflow-hidden">
        <Image
          src="https://storyblok-cdn.photoroom.com/f/191576/768x432/0f78fe60a2/colors-backgrounds-cover.webp"
          alt="Cover Image"
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>

      {/* Profile Info */}
      <div className="relative mt-12 md:-mt-16 flex flex-col md:flex-row items-center md:items-end justify-between">
        <div className="px-6 md:px-12 flex">
          {/* Profile Picture */}
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white overflow-hidden">
            <Image
              src={
                profileUser.image ||
                "https://cdn.vectorstock.com/i/500p/97/32/man-silhouette-profile-picture-vector-2139732.jpg"
              }
              alt="Profile Picture"
              width={128}
              height={128}
              className="rounded-full"
            />
          </div>

          {/* User Info */}
          <div className="ml-4 mt-20 text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-bold">
              {profileUser.username}
            </h2>
            <div className="flex items-center gap-4 mt-4">
              <p className="text-black text-sm">
                <span className="font-semibold">{followersCount}</span>{" "}
                Followers
              </p>
              <p className="text-black text-sm">
                <span className="font-semibold">
                  {profileUser.following.length}
                </span>{" "}
                Following
              </p>
            </div>
          </div>
        </div>

        {/* Profile Actions */}
        <div className="flex gap-3">
          {currentUser._id !== profileUser._id && (
            <button
              onClick={handleFollow}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                isFollowing
                  ? "bg-gray-300 text-black cursor-not-allowed"
                  : "bg-black text-white hover:bg-white hover:text-black"
              }`}
              disabled={isFollowing}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          )}
          <ProfileDrawer />
          <EditProfileDialog />
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
