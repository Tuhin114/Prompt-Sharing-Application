"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PromptSuggestions from "./PromptSuggestions";
import TagSuggestions from "./TagSuggestions";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@components/ui/button";
import { useSession } from "@node_modules/next-auth/react";
import ScheduleOptions from "@components/PromptForm/SchedulePost/ScheduleOptions";

const Form = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
  handleSaveDraft,
}) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [suggesting, setSuggesting] = useState(false);
  const [tagSuggesting, setTagSuggesting] = useState(false);
  const [queries, setQueries] = useState([]);
  const [suggestedTags, setSuggestedTags] = useState([]);
  const [tags, setTags] = useState(post?.tag || []);
  const [error, setError] = useState(null);
  const [tagError, setTagError] = useState(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDraftClick = async (e) => {
    e.preventDefault();
    await handleSaveDraft();
  };

  const handleCreatePrompt = async () => {
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

      const data = await response.json();
      console.log("Prompt created successfully:", data);
      return data;
    } catch (error) {
      console.error("Error creating prompt:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/");
  };

  useEffect(() => {
    const isPromptValid = post?.prompt?.trim().length > 0;
    const isTagValid = tags.length > 0;
    setIsSubmitDisabled(!(isPromptValid && isTagValid));
  }, [post.prompt, tags]);

  return (
    <div className="flex flex-col items-start w-full">
      {/* Header */}
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>

      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
        className="mt-10 w-full"
      >
        {/* Prompt Input */}
        <PromptSuggestions
          post={post}
          setPost={setPost}
          queries={queries}
          setQueries={setQueries}
          suggesting={suggesting}
          setSuggesting={setSuggesting}
          setError={setError}
        />

        {/* Tag Input */}
        <TagSuggestions
          post={post}
          setPost={setPost}
          tags={tags}
          setTags={setTags}
          suggestedTags={suggestedTags}
          setSuggestedTags={setSuggestedTags}
          tagSuggesting={tagSuggesting}
          setTagSuggesting={setTagSuggesting}
          setTagError={setTagError}
        />

        {/* Buttons */}
        <div className="flex gap-3 justify-center p-4 mt-5">
          <button
            type="button"
            onClick={handleCancel}
            className="text-gray-500 text-sm"
          >
            Cancel
          </button>

          {handleSaveDraft && (
            <button
              type="button"
              onClick={handleDraftClick}
              className="px-5 py-1.5 text-sm bg-orange-400 hover:bg-orange-500 rounded-full text-white"
            >
              Save as Draft
            </button>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button className="bg-black hover:bg-gray-800 text-white">
                Select
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:w-[400px]">
              <ScheduleOptions
                handleCreatePrompt={handleCreatePrompt}
                post={post}
              />
            </SheetContent>
          </Sheet>
          {/* <button
            type="submit"
            disabled={submitting || isSubmitDisabled}
            className={`px-5 py-1.5 text-sm rounded-full text-white ${
              submitting || isSubmitDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary-orange hover:bg-orange-500"
            }`}
          >
            {submitting ? `${type}ing...` : type}
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default Form;
