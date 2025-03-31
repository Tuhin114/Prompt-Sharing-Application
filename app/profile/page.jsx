"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);

  const [myPosts, setMyPosts] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setMyPosts(data);
      setLoading(false);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleView = (post) => {
    router.push(`/drafts?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return isClient ? (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={myPosts}
      loading={loading}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      handleView={handleView}
    />
  ) : null;
};

export default MyProfile;
