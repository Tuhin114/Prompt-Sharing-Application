import { useState } from "react";

const useFollow = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const followUser = async (userId, targetId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, targetId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to follow user");
      }

      return { success: true, message: data.message };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const unfollowUser = async (userId, targetId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/unfollow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, targetId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to unfollow user");
      }

      return { success: true, message: data.message };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  return { followUser, unfollowUser, isLoading, error };
};

export default useFollow;
