import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const useCategories = (userId, type) => {
  const queryClient = useQueryClient();

  // ✅ Fetch Categories
  const {
    data: categories = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["categories", userId, type],
    queryFn: async () => {
      if (!userId || !type) return [];
      const response = await fetch(
        `/api/category?user_id=${userId}&type=${type}`
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Failed to fetch categories");
      return data.categories || [];
    },
    enabled: !!userId && !!type, // Only fetch if userId & type are available
  });

  // ✅ Add Category
  const addCategory = useMutation({
    mutationFn: async (name) => {
      if (!name.trim()) throw new Error("Category name cannot be empty.");
      const response = await fetch("/api/category/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creator_id: userId, type, name }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Failed to create category");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categories", userId, type]); // Refetch categories
    },
  });

  // ✅ Update Category
  const updateCategory = useMutation({
    mutationFn: async ({ categoryId, newName }) => {
      console.log(categoryId, newName);
      if (!newName.trim()) throw new Error("Category name cannot be empty.");
      const response = await fetch(`/api/category/${categoryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ new_name: newName }),
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok)
        throw new Error(data.error || "Failed to update category");
      return { categoryId, newName };
    },
    onMutate: async ({ categoryId, newName }) => {
      await queryClient.cancelQueries(["categories", userId, type]);
      const previousCategories = queryClient.getQueryData([
        "categories",
        userId,
        type,
      ]);
      queryClient.setQueryData(["categories", userId, type], (old) =>
        old.map((cat) =>
          cat._id === categoryId ? { ...cat, name: newName } : cat
        )
      );
      return { previousCategories };
    },
    onError: (_, __, context) => {
      // Rollback if API fails
      queryClient.setQueryData(
        ["categories", userId, type],
        context.previousCategories
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(["categories", userId, type]);
    },
  });

  // ✅ Delete Category
  const deleteCategory = useMutation({
    mutationFn: async (categoryId) => {
      const response = await fetch(`/api/category/${categoryId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Failed to delete category");
      return categoryId;
    },
    onMutate: async (categoryId) => {
      await queryClient.cancelQueries(["categories", userId, type]);
      const previousCategories = queryClient.getQueryData([
        "categories",
        userId,
        type,
      ]);
      queryClient.setQueryData(["categories", userId, type], (old) =>
        old.filter((cat) => cat._id !== categoryId)
      );
      return { previousCategories };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        ["categories", userId, type],
        context.previousCategories
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(["categories", userId, type]);
    },
  });

  return {
    categories,
    loading,
    error,
    addCategory: addCategory.mutate,
    updateCategory: updateCategory.mutate,
    deleteCategory: deleteCategory.mutate,
  };
};

export default useCategories;
