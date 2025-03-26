"use client";
import { useState } from "react";
import EditProfileDialog from "./EditProfileDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import {
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
  Mail,
  MapPin,
  Edit,
  Briefcase,
  Code,
} from "lucide-react";
import { Button } from "@components/ui/button";
import { LinksDialog } from "./LinksDialog";

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

  const profile = {
    name: "Tuhin Poddar",
    username: "tuhinpoddar",
    role: "AI Developer",
    avatar:
      "https://scontent.fccu27-2.fna.fbcdn.net/v/t39.30808-6/484903574_665966585991497_2098742146992293051_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=ZxjilumTK2AQ7kNvgHj6JBF&_nc_oc=Adnl3zxgVaeArrXdEXJKW1DB1MV8GBZa_pjEYEnxi6UVW0K1ykkjhwuy8Wxh0F0oaX54rgDbaf-GwLcM3N65IlaX&_nc_zt=23&_nc_ht=scontent.fccu27-2.fna&_nc_gid=B90KHiOBgoIGo_GgHdMBdw&oh=00_AYEvT7yvkIgVoHV8TJyx91icNNX-crnIM2ozlzXD8_w2gA&oe=67E84474",
    bio: "B.Tech CS '27 | 3⭐ @GeeksforGeeks(Max: 1689) | 400+ @LeetCode(Max: 1606) | Full-Stack Web Dev | Next.js | TypeScript | @Hack4Bengal 3.0 Runner up",
    location: "Kolkata",
    website: "https://linktr.ee/Tuhin114",
    followersCount: "12",
    followingCount: "20",
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "UI/UX Design",
      "Node.js",
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/in/tuhinpoddar",
      instagram: "https://instagram.com/tuhinpoddar",
      facebook: "https://facebook.com/tuhinpoddar",
      twitter: "https://twitter.com/tuhinpoddar",
    },
  };

  return (
    <div className="max-w-screen-xl mx-auto px-8 relative z-1">
      {/* Profile Info */}
      <div className="flex flex-wrap gap-8 items-start">
        {/* Avatar Section */}
        <div className="pt-2">
          <Avatar className="ml-6 rounded-full border-4 border-white bg-white shadow-xl transition-transform duration-200 hover:scale-105 h-28 w-28">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>

        {/* Profile Details Section */}
        <div className="flex-1 min-w-0">
          <div className="flex pt-2 flex-wrap justify-between gap-4">
            <div
              className="space-y-1 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              <h1 className="text-2xl sm:text-3xl font-bold">{profile.name}</h1>
              <p className="text-muted-foreground">@{profile.username}</p>
              {profile.role && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <Briefcase className="h-4 w-4" />
                  <span>{profile.role}</span>
                </div>
              )}
            </div>
          </div>

          {/* Bio, Location, Website, Followers */}
          <div
            className="mt-4 space-y-3 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            {profile.bio && <p className="text-sm max-w-2xl">{profile.bio}</p>}

            <div className="flex flex-wrap gap-4 text-sm">
              {profile.location && (
                <div className="flex items-center text-muted-foreground space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile.website && (
                <div className="flex items-center text-muted-foreground space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {profile.website.replace(/^https?:\/\/(www\.)?/, "")}
                  </a>
                </div>
              )}
              <div className="flex items-center text-muted-foreground space-x-1">
                <span className="font-medium">{profile.followersCount}</span>
                <span>Followers</span>
              </div>
              <div className="flex items-center text-muted-foreground space-x-1">
                <span className="font-medium">{profile.followingCount}</span>
                <span>Following</span>
              </div>
            </div>

            {/* Skills & Social Links */}
            {profile.skills && profile.skills.length > 0 && (
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons (Edit & Follow) */}
        <div className="flex gap-2 items-center pt-3">
          <LinksDialog profile={profile} />
          <EditProfileDialog />
          {currentUser._id === profileUser._id && (
            <Button
              onClick={handleFollow}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                isFollowing
                  ? "bg-gray-300 text-black cursor-not-allowed"
                  : "bg-black text-white hover:bg-white hover:text-black"
              }`}
              disabled={isFollowing}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
