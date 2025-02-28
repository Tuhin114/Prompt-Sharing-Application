"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import useLike from "../hooks/useLike";
import useBookmark from "../hooks/useBookmark";

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

  const { isLiked, totalLikes, handleLikeOrUnlike } = useLike(post, session);
  const { isBookmarked, totalBookmarks, handleBookmarkOrUnbookmark } =
    useBookmark(post, session);

  const [copied, setCopied] = useState("");

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
    <div className="prompt_card flex flex-col">
      {/* User Info */}
      <div className="flex justify-between items-start gap-5 p-2">
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
            <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">
              {post.creator.username}
            </h3>
            <p className="text-xs text-gray-500">{post.creator.email}</p>
          </div>
        </div>
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

      <div className="flex-grow p-2 px-2">
        {/* Title */}
        <h3 className="font-semibold text-lg mt-2 my-1 line-clamp-2">
          {post.title ||
            "What strategies are effective for migrating JavaScript to TypeScript?"}
        </h3>

        {/* Prompt Content */}
        <p className="text-sm text-gray-800 my-3 line-clamp-3">
          {post.prompt.length > 140
            ? `${post.prompt.slice(0, 140)}...`
            : post.prompt}
          {post.prompt.length > 140 && (
            <span className="text-gray-500 text-sm mt-1 cursor-pointer hover:underline hover:text-blue-500">
              more
            </span>
          )}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 my-2">
          {post.tag.map((eachTag, index) => (
            <p
              key={index}
              className="px-4 py-2 text-xs bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white cursor-pointer"
              onClick={() => handleTagClick && handleTagClick(eachTag)}
            >
              #{eachTag}
            </p>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="h-[50px] flex items-end px-2">
        {isLike && isSave && (
          <div className="flex justify-between w-full mt-auto">
            {/* Like Section */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleLikeOrUnlike}
            >
              <div className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full">
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
              </div>
              <span className="text-sm">{totalLikes}</span>
            </div>

            {/* Bookmark Section */}
            <div
              className="flex items-center gap-1 cursor-pointer"
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
              <span className="text-sm">{totalBookmarks}</span>
            </div>
          </div>
        )}
      </div>

      {/* Edit/Delete/View Actions */}
      {session?.user?.id === post.creator._id && pathName === "/profile" && (
        <div className="flex justify-between border-t border-gray-100 pt-3 mt-2">
          {isEdit && (
            <p
              className="text-sm text-green-500 cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </p>
          )}
          {isView && (
            <p
              className="text-sm text-blue-500 cursor-pointer"
              onClick={handleView}
            >
              View
            </p>
          )}
          {isDelete && (
            <p
              className="text-sm text-orange-500 cursor-pointer"
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
