import React from "react";
import { Button } from "./ui/button";

const NoDataFound = ({ actionType }) => {
  const messages = {
    "My Posts": (
      <div className="flex items-center justify-center gap-2">
        <p className="text-gray-500">Sorry! You have no posts yet.</p>
        <Button>Add Post</Button>
      </div>
    ),
    "Saved Posts": (
      <p className="text-gray-500">Sorry! You have no saved posts yet.</p>
    ),
    "My Drafts": (
      <p className="text-gray-500">Sorry! You have no drafts yet.</p>
    ),
    Following: (
      <p className="text-gray-500">Sorry! You are not following anyone yet.</p>
    ),
    Followers: (
      <p className="text-gray-500">Sorry! You have no followers yet.</p>
    ),
    Tags: <p className="text-gray-500">Sorry! You have no tags yet.</p>,
  };

  return <div className="text-center mt-8">{messages[actionType] || null}</div>;
};

export default NoDataFound;
