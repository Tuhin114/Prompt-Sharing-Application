import { useState } from "react";

const useCategoryActions = () => {
  const [loading, setLoading] = useState(false);

  // ✅ Fetch posts category-wise
  const fetchCategoryPosts = async (categoryId) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/catagory/${categoryId}`);

      if (!response.ok) throw new Error("Failed to fetch category posts");

      const { posts } = await response.json();
      return posts;
    } catch (error) {
      console.error("Error fetching category posts:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Function to add a post to a category
  const addPostToCategory = async (categoryId, promptId) => {
    setLoading(true);
    try {
      const response = await fetch("/api/catagory/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category_id: categoryId, prompt_id: promptId }),
      });

      if (!response.ok) throw new Error("Failed to add post to category");

      return await response.text(); // Since API returns a simple text response
    } catch (error) {
      console.error("Error adding post to category:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Function to remove a post from a category
  const removePostFromCategory = async (categoryId, promptId) => {
    setLoading(true);
    try {
      const response = await fetch("/api/catagory/post", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category_id: categoryId, prompt_id: promptId }),
      });

      if (!response.ok) throw new Error("Failed to remove post from category");

      return await response.text();
    } catch (error) {
      console.error("Error removing post from category:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchCategoryPosts,
    addPostToCategory,
    removePostFromCategory,
    loading,
  };
};

export default useCategoryActions;
