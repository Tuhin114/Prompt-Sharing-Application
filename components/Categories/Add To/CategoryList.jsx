import React from "react";
import CategoryItem from "./CategoryItem";

const CategoryList = ({
  addPostToCategory,
  removePostFromCategory,
  categoryLoading,
  categories,
  loading,
  post,
}) => {
  console.log(categories);
  console.log(post);
  return (
    <div className="flex flex-col gap-2 overflow-y-auto max-h-[300px]">
      {loading ? (
        <p>Loading...</p>
      ) : categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <>
          {categories.map((category) => (
            <CategoryItem
              categoryLoading={categoryLoading}
              addPostToCategory={addPostToCategory}
              removePostFromCategory={removePostFromCategory}
              key={category._id}
              name={category.name}
              categoryId={category._id}
              postId={post._id}
              isAdded={post?.catagories?.includes(category._id)}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default CategoryList;
