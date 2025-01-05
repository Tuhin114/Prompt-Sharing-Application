"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({
  post,
  handleEdit,
  handleDelete,
  handleView,
  handleTagClick,
  isEdit,
  isDelete,
  isLike,
  isSave,
  isView,
}) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const isAlreadyLiked = post.likes.includes(session?.user?.id);
  const initialTotalLikes = post.likes.length;
  const isAlreadyBookmarked = post.saved.includes(session?.user?.id);
  const initialTotalBookmarks = post.saved.length;

  const [copied, setCopied] = useState("");
  const [isLiked, setIsLiked] = useState(isAlreadyLiked);
  const [isBookmarked, setIsBookmarked] = useState(isAlreadyBookmarked);
  const [totalLikes, setTotalLikes] = useState(initialTotalLikes);
  const [totalBookmarks, setTotalBookmarks] = useState(initialTotalBookmarks);

  const handleLikeOrUnlike = async (e) => {
    e.preventDefault();
    if (!session?.user?.id) return;

    try {
      const response = await fetch(isLiked ? "/api/unlike" : "/api/like", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          promptId: post._id,
          userId: session.user.id,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isLiked ? "unlike" : "like"} the post`);
      }

      setIsLiked(!isLiked);
      setTotalLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };

  const handleBookmarkOrUnbookmark = async (e) => {
    e.preventDefault();
    if (!session?.user?.id) return;

    try {
      const response = await fetch(
        isBookmarked ? "/api/unbookmark" : "/api/bookmark",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            promptId: post._id,
            userId: session.user.id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to ${isBookmarked ? "unbookmark" : "bookmark"} the post`
        );
      }

      setIsBookmarked(!isBookmarked);
      setTotalBookmarks((prevBookmarks) =>
        isBookmarked ? prevBookmarks - 1 : prevBookmarks + 1
      );
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };

  const handleProfileClick = () => {
    if (post.creator._id === session?.user?.id) {
      router.push("/profile");
    } else {
      router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
    }
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="prompt_card">
      {/* User Info */}
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
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
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        {/* Copy Button */}
        {post.prompt !== "" && (
          <div className="copy_btn" onClick={handleCopy}>
            <Image
              src={
                copied === post.prompt
                  ? "/assets/icons/tick.svg"
                  : "/assets/icons/copy.svg"
              }
              alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
              width={12}
              height={12}
            />
          </div>
        )}
      </div>

      {/* Prompt Content */}
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {post.tag.map((eachTag, index) => (
          <p
            key={index}
            className="inline-block cursor-pointer px-2 py-1 text-sm bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white"
            onClick={() => handleTagClick && handleTagClick(eachTag)}
          >
            #{eachTag}
          </p>
        ))}
      </div>

      {/* Actions */}
      {isLike && isSave && (
        <div className="flex justify-between items-center gap-2 mt-5">
          <div className="flex-center gap-2" onClick={handleLikeOrUnlike}>
            <Image
              src={
                isLiked
                  ? "/assets/icons/heart-fill.svg"
                  : "/assets/icons/heart.svg"
              }
              alt="heart"
              width={17}
              height={17}
            />
            <span>{totalLikes}</span>
          </div>

          <div
            className="flex-center gap-1"
            onClick={handleBookmarkOrUnbookmark}
          >
            <Image
              src={
                isBookmarked
                  ? "/assets/icons/bookmarked.svg"
                  : "/assets/icons/bookmark.svg"
              }
              alt="bookmark"
              width={21}
              height={21}
            />
            <span>{totalBookmarks}</span>
          </div>
        </div>
      )}

      {/* Edit and Delete and View Actions */}
      {session?.user?.id === post.creator._id && pathName === "/profile" && (
        <div className="flex-center gap-4 border-t border-gray-100 pt-3">
          {isEdit && (
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </p>
          )}
          {isView && (
            <p
              className="font-inter text-sm green_gradient  cursor-pointer"
              onClick={handleView}
            >
              View
            </p>
          )}
          {isDelete && (
            <p
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PromptCard;
