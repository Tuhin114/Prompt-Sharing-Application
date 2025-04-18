import { useEffect, useState } from "react";
import CategoriesDialog from "@components/Categories/Add To/CategoriesDialog";
import Image from "@node_modules/next/image";
import useBookmark from "@hooks/useBookmark";
import useLike from "@hooks/useLike";

const Actions = ({ type, userId, handleView, post }) => {
  const { isBookmarked, totalBookmarks, addBookmark, removeBookmark } =
    useBookmark(post, userId);
  const { isLiked, totalLikes, handleLikeOrUnlike } = useLike(post, userId);

  const [open, setOpen] = useState(false);

  const isSaveBtn = true;

  const handleBookmarkClick = async (e) => {
    e.preventDefault();
    if (!isBookmarked) {
      await addBookmark(e);
    }
    setOpen(true);
  };

  return (
    <div className="flex items-end px-2">
      {type !== "drafts" && (
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
          <div className="flex items-center gap-1 cursor-pointer">
            <Image
              src={
                isBookmarked
                  ? "/assets/icons/bookmarked.svg"
                  : "/assets/icons/bookmark.svg"
              }
              alt="bookmark"
              width={21}
              height={21}
              onClick={handleBookmarkClick}
            />

            <CategoriesDialog
              type={type}
              isSaveBtn={isSaveBtn}
              removeBookmark={removeBookmark}
              post={post}
              open={open}
              setOpen={setOpen}
            />

            <span className="text-sm">{totalBookmarks}</span>
          </div>
        </div>
      )}
      {type === "drafts" && (
        <p
          className="text-sm text-blue-500 cursor-pointer"
          onClick={handleView}
        >
          View
        </p>
      )}
    </div>
  );
};

export default Actions;
