import { useEffect, useState } from "react";

const useCategories = (userId, type) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("Fetching type:", type);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/catagory?user_id=${userId}&type=${type}`
      ); // ✅ Fixed path

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to fetch");

      setCategories(data.categories || []); // Always set an array, even if empty
    } catch (error) {
      console.error("Failed to fetch categories:", error.message);
      setCategories([]); // Set categories to an empty array in case of an error
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId && type) fetchCategories();
  }, [userId, type]);

  const updateCategories = () => {
    fetchCategories();
  };

  // ✅ Add Category
  const addCategory = async (name) => {
    if (!name.trim()) return;

    try {
      const response = await fetch("/api/catagory/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creator_id: userId, type, name }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to create");

      fetchCategories();
    } catch (error) {
      console.error("Failed to create category:", error.message);
      setError(error.message);
    }
  };

  // ✅ Update Category Name
  const updateCategory = async (categoryId, newName) => {
    if (!newName.trim()) return;

    console.log("Updating category:", categoryId, newName);

    try {
      const response = await fetch(`/api/catagory/${categoryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ new_name: newName }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to update");

      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category._id === categoryId
            ? { ...category, name: newName }
            : category
        )
      );
    } catch (error) {
      console.error("Failed to update category:", error.message);
      setError(error.message);
    }
  };

  // ✅ Delete Category
  const deleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`/api/catagory/${categoryId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to delete");

      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== categoryId)
      );
    } catch (error) {
      console.error("Failed to delete category:", error.message);
      setError(error.message);
    }
  };

  return {
    categories,
    loading,
    error,
    addCategory,
    updateCategory,
    deleteCategory,
    updateCategories,
  };
};

export default useCategories;
