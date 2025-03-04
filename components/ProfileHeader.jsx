import Image from "next/image";
import ProfileDrawer from "./ProfileDrawer";
import EditProfileDialog from "./EditProfileDialog";

const ProfileHeader = () => {
  const user = {
    name: "Tuhin Poddar",
    username: "4334Tuhin",
    verified: true,
    followers: 122,
    following: 128,
  };

  return (
    <div className="relative w-full px-2 bg-white">
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
              src="https://cdn.vectorstock.com/i/500p/97/32/man-silhouette-profile-picture-vector-2139732.jpg"
              alt="Profile Picture"
              width={128}
              height={128}
              className="rounded-full"
            />
          </div>

          {/* User Info */}
          <div className="ml-4 mt-20 text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-bold">{user.name}</h2>
            <div className="flex items-center gap-4 mt-4">
              <p className="text-black text-sm">
                <span className="font-semibold">{user.followers}</span>{" "}
                Followers
              </p>
              <p className="text-black text-sm">
                <span className="font-semibold">{user.following}</span>{" "}
                Following
              </p>
            </div>
          </div>
        </div>

        {/* Profile Actions */}
        <div className="flex gap-3">
          <button className="bg-black text-white px-4 py-2 rounded-full font-semibold hover:bg-white hover:text-black transition">
            Follow
          </button>
          <ProfileDrawer />
          <EditProfileDialog />
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
