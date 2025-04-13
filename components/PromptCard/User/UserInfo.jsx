import Image from "next/image";

const UserInfo = ({ post, session, router }) => {
  const handleProfileClick = () => {
    if (post.creator._id === session?.user?.id) {
      router.push("/profile");
    } else {
      router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
    }
  };

  return (
    <div
      className="flex items-center gap-3 cursor-pointer"
      onClick={handleProfileClick}
    >
      <Image
        src={post.creator.image}
        alt="user_image"
        width={40}
        height={40}
        className="rounded-full object-contain"
      />
      <div className="flex flex-col">
        <h3 className="font-semibold text-gray-900">{post.creator.username}</h3>
        <p className="text-sm text-gray-500">{post.creator.email}</p>
      </div>
    </div>
  );
};

export default UserInfo;
