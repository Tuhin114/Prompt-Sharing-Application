"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import UserInfo from "./User/UserInfo";
import PromptText from "./PromptText/PromptText";
import Actions from "./CardActions/Actions";
import CreatorActions from "./User/CreatorActions";

const PromptCard = ({
  type,
  post,
  handleEdit,
  handleDelete,
  handleView,
  handleTagClick,
  actionType,
}) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const pathName = usePathname();
  const router = useRouter();

  const isOwner = session?.user?.id === post.creator._id;

  return (
    <div className="prompt_card flex flex-col">
      {/* Upper Section */}
      <div className="flex justify-between items-start gap-5 p-2">
        <UserInfo post={post} session={session} router={router} />
        {isOwner && pathName === "/profile" && actionType === "My Posts" && (
          <CreatorActions
            post={post}
            type={type}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}
      </div>

      {/* Middle Section */}
      <PromptText post={post} handleTagClick={handleTagClick} />

      {/* Lower Section */}
      <Actions
        type={type}
        userId={userId}
        handleView={handleView}
        post={post}
      />
    </div>
  );
};

export default PromptCard;
