import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useCategoryActions = () => {
  const queryClient = useQueryClient();

  const fetchCategoryPosts = (categoryId) => {
    return useQuery({
      queryKey: ["categoryPosts", categoryId],
      queryFn: async () => {
        if (!categoryId) return [];
        const response = await fetch(`/api/category/${categoryId}`);
        if (!response.ok) throw new Error("Failed to fetch category posts");
        const json = await response.json();
        return Array.isArray(json.posts) ? json.posts : [];
      },

      enabled: !!categoryId,
      staleTime: 1000 * 60 * 5,
    });
  };

  // ✅ Function to Add Post to Category
  const addPostToCategory = async (categoryId, promptId) => {
    const response = await fetch("/api/category/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category_id: categoryId, prompt_id: promptId }),
    });
    if (!response.ok) throw new Error("Failed to add post to category");
    return await response.text();
  };

  // ✅ Function to Remove Post from Category
  const removePostFromCategory = async (categoryId, promptId) => {
    const response = await fetch("/api/category/post", {
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
        queryClient.invalidateQueries(["categoryPosts", categoryId]);
      },
    });

  // ✅ Mutation Hook: Remove Post
  const useRemovePostMutation = () =>
    useMutation({
      mutationFn: ({ categoryId, promptId }) =>
        removePostFromCategory(categoryId, promptId),
      onSuccess: (_, { categoryId }) => {
        queryClient.invalidateQueries(["categoryPosts", categoryId]);
      },
    });

  return {
    fetchCategoryPosts,
    useAddPostMutation,
    useRemovePostMutation,
  };
};

export default useCategoryActions;
