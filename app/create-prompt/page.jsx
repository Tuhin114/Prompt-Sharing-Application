"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form/Form";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: [] });

  // Create Prompt
  const createPrompt = async (e) => {
    e.preventDefault();
    if (!session?.user.id) return console.error("User is not authenticated.");

    setIsSubmitting(true);

    if (!post.prompt || !post.tag) {
      alert("Please enter a prompt and tag");
      return;
    }

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session.user.id,
          tag: post.tag,
        }),
      });

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

  // Save Draft
  const handleSaveDraft = async () => {
    if (!session?.user.id) return console.error("User is not authenticated.");

    try {
      const response = await fetch("/api/prompt/draft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session.user.id,
          tag: post.tag,
          isDraft: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save draft");
      }

      router.push("/");
      console.log("Draft saved successfully");
    } catch (error) {
      console.error("Failed to save draft:", error);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
      handleSaveDraft={handleSaveDraft}
    />
  );
};

export default CreatePrompt;
