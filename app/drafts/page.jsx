"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form/Form";
import { useSession } from "@node_modules/next-auth/react";

export const dynamic = "force-dynamic";

const DraftPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [loading, setLoading] = useState(true);
  const [submitting, setIsSubmitting] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    const getPromptDetails = async () => {
      if (!promptId) return;

      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();
        console.log(data);

        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch prompt details:", error);
        setLoading(false);
      }
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const postPrompt = async (e) => {
    e.preventDefault();
    if (!session?.user.id) return console.error("User is not authenticated.");

    setIsSubmitting(true);

    if (!post.prompt || !post.tag) {
      alert("Please enter a prompt and tag");
      return;
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session.user.id,
          tag: post.tag,
          isDraft: false,
        }),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to create prompt");
      }

      router.push("/");
    } catch (error) {
      console.error("Error creating prompt:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSubmitting(true);

    if (!promptId) return alert("Missing PromptId!");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          isDraft: true,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Form
      type="Post"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={postPrompt}
      handleSaveDraft={handleSaveDraft}
    />
  );
};

const SuspenseWrapper = () => (
  <Suspense fallback={<div>Loading component...</div>}>
    <DraftPrompt />
  </Suspense>
);

export default SuspenseWrapper;
