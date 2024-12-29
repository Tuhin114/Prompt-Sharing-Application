// components/Form/Form.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import PromptSuggestions from "./PromptSuggestions";
import TagSuggestions from "./TagSuggestions";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const [suggesting, setSuggesting] = useState(false);
  const [tagSuggesting, setTagSuggesting] = useState(false);
  const [queries, setQueries] = useState([]);
  const [suggestedTags, setSuggestedTags] = useState([]);
  const [tags, setTags] = useState(post.tag);
  const [error, setError] = useState(null);
  const [tagError, setTagError] = useState(null);

  return (
    <div className="flex-col flex-start w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 w-full">
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

        {/* Submit and Cancel Buttons */}
        <div className="flex justify-end gap-4 mt-5">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
