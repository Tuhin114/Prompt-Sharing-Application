"use client";

import { useState } from "react";
import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const [suggesting, setSuggesting] = useState(false);
  const [tagSuggesting, setTagSuggesting] = useState(false);
  const [queries, setQueries] = useState([]);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);
  const [tagError, setTagError] = useState(null);

  const handleGenerateTags = async () => {
    setTagSuggesting(true);
    setTagError(null);
    try {
      const response = await fetch("/api/generate-tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gptPrompt: post.prompt }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setTags(data.tags || []);
    } catch (error) {
      setTagError(error.message);
    } finally {
      setTagSuggesting(false);
    }
  };

  const handleGeneratePrompts = async () => {
    setSuggesting(true);
    setError(null);
    try {
      const response = await fetch("/api/generate-prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gptPrompt: post.prompt }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setQueries(data.prompts || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setSuggesting(false);
    }
  };

  const handlePromptClick = (query) => setPost({ ...post, prompt: query });
  const handleTagClick = (tag) => setPost({ ...post, tag });

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
        <div className="flex gap-3">
          <div className="basis-7/12">
            <label className="glassmorphism p-4">
              <span className="font-satoshi font-semibold text-base text-gray-700">
                Your AI Prompt
              </span>
              <textarea
                value={post.prompt}
                onChange={(e) => setPost({ ...post, prompt: e.target.value })}
                placeholder="Write your post here"
                className="form_textarea"
              />
            </label>
            <div className="flex gap-4 my-2">
              <button
                type="button"
                className="px-5 py-1.5 text-sm bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white"
                onClick={handleGeneratePrompts}
                disabled={suggesting}
              >
                {suggesting ? "Generating..." : "Suggest"}
              </button>
              <button
                type="button"
                className="text-gray-500 text-sm"
                onClick={() => setQueries([])}
              >
                Clear
              </button>
            </div>
          </div>

          {queries.length > 0 && (
            <div className="basis-5/12">
              <label className="glassmorphism">
                <span className="font-satoshi font-semibold text-base text-gray-700">
                  Suggestions
                </span>
                <div className="mt-2 flex flex-col max-h-[200px] overflow-y-auto p-2 bg-white rounded-md shadow-lg">
                  {queries.slice(0, 5).map((query, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100 transition rounded-md border border-gray-200 text-center"
                      onClick={() => handlePromptClick(query)}
                    >
                      {query}
                    </div>
                  ))}
                </div>
              </label>
            </div>
          )}
        </div>

        <div className="glassmorphism p-4 mt-2">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Field of Prompt{" "}
            <span className="font-normal">
              (e.g., #product, #webdevelopment)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type="text"
            placeholder="#Tag"
            className="form_input"
          />
        </div>

        <div className="flex gap-4 my-2">
          <button
            type="button"
            className="px-5 py-1.5 text-sm bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white"
            onClick={handleGenerateTags}
            disabled={tagSuggesting}
          >
            {tagSuggesting ? "Generating..." : "Suggest"}
          </button>
          <button
            type="button"
            className="text-gray-500 text-sm"
            onClick={() => setTags([])}
          >
            Clear
          </button>
        </div>

        {tags.length > 0 && (
          <div className="basis-5/12">
            <label className="glassmorphism">
              <span className="font-satoshi font-semibold text-base text-gray-700">
                Tag Suggestions
              </span>
              <div className="mt-2 flex flex-col max-h-[200px] overflow-y-auto p-2 bg-white rounded-md shadow-lg">
                {tags.slice(0, 5).map((tag, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100 transition rounded-md border border-gray-200 text-center"
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </label>
          </div>
        )}

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
