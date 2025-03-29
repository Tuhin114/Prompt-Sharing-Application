import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useCategoryActions = () => {
  const queryClient = useQueryClient();

  // ✅ Fetch posts by category
  const fetchCategoryPosts = (categoryId) =>
    useQuery({
      queryKey: ["categoryPosts", categoryId], // Unique cache key
      queryFn: async () => {
        const response = await fetch(`/api/catagory/${categoryId}`);
        if (!response.ok) throw new Error("Failed to fetch category posts");
        const { posts } = await response.json();
        return posts;
      },
      enabled: !!categoryId, // Avoid fetching when categoryId is null
    });

  // ✅ Function to Add Post to Category
  const addPostToCategory = async (categoryId, promptId) => {
    const response = await fetch("/api/catagory/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category_id: categoryId, prompt_id: promptId }),
    });
    if (!response.ok) throw new Error("Failed to add post to category");
    return await response.text();
  };

  // ✅ Function to Remove Post from Category
  const removePostFromCategory = async (categoryId, promptId) => {
    const response = await fetch("/api/catagory/post", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category_id: categoryId, prompt_id: promptId }),
    });
    if (!response.ok) throw new Error("Failed to remove post from category");
    return await response.text();
  };

  // ✅ Mutation Hook: Add Post
  const useAddPostMutation = () =>
    useMutation({
      mutationFn: ({ categoryId, promptId }) =>
        addPostToCategory(categoryId, promptId),
      onSuccess: (_, { categoryId }) => {
        queryClient.invalidateQueries(["categoryPosts", categoryId]); // Refresh category posts
      },
    });

  // ✅ Mutation Hook: Remove Post
  const useRemovePostMutation = () =>
    useMutation({
      mutationFn: ({ categoryId, promptId }) =>
        removePostFromCategory(categoryId, promptId),
      onSuccess: (_, { categoryId }) => {
        queryClient.invalidateQueries(["categoryPosts", categoryId]); // Refresh category posts
      },
    });

  return {
    fetchCategoryPosts,
    useAddPostMutation,
    useRemovePostMutation,
  };
};

export default useCategoryActions;
