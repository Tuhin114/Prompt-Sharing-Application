import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import useCategoryActions from "@/hooks/useCategoryActions";

const CategoryItem = ({ name, isAdded, categoryId, postId }) => {
  const { addPostToCategory, removePostFromCategory, loading } =
    useCategoryActions();

  const [added, setAdded] = useState(isAdded);

  const handleToggle = async () => {
    if (added) {
      await removePostFromCategory(categoryId, postId);
    } else {
      await addPostToCategory(categoryId, postId);
    }
    setAdded(!added);
  };

  return (
    <div className="grid grid-cols-3 items-center gap-2">
      <div className="col-span-2 text-center font-semibold hover:bg-gray-200 py-2 rounded-lg border-[1px] border-gray-300">
        {name}
      </div>
      <Button
        className="col-span-1"
        onClick={handleToggle}
        disabled={loading}
        size="sm"
      >
        {added ? "Remove" : "Add"}
      </Button>
    </div>
  );
};

export default CategoryItem;
