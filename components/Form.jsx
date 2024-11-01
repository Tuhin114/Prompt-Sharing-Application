"use client";

import { useState } from "react";
import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const [suggesting, setSuggesting] = useState(false);
  const [queries, setQueries] = useState([]);
  const [error, setError] = useState(null);

  const handleGeneratePrompts = async () => {
    setSuggesting(true);
    setError(null);

    try {
      const requestBody = { gptPrompt: post.prompt };
      const response = await fetch("/api/generate-prompts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setQueries(data.prompts || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setSuggesting(false);
    }
  };

  console.log(queries);

  const handleBoxClick = (query) => {
    setPost({ ...post, prompt: query });
  };

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
        <div className="">
          {/* Prompt Input */}
          <div className="flex gap-3">
            {/* Left Side - Prompt and Buttons */}
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

              <div className="flex justify-start items-center gap-4 my-2">
                {/* Suggest Button */}
                <button
                  type="button"
                  className="px-5 py-1.5 text-sm bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white"
                  onClick={handleGeneratePrompts}
                  disabled={suggesting}
                >
                  {suggesting ? "Generating..." : "Suggest"}
                </button>

                {/* Clear Suggestions Button */}
                <button
                  type="button"
                  className="text-gray-500 text-sm"
                  onClick={() => setQueries([])}
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Right Side - Suggestions */}
            {queries.length > 0 && (
              <div className="basis-5/12">
                <label className="glassmorphism">
                  <span className="font-satoshi font-semibold text-base text-gray-700">
                    Suggestions
                  </span>
                  {suggesting ? (
                    <div className="text-black">Suggesting</div>
                  ) : (
                    <div className="mt-2 flex flex-col max-h-[200px] overflow-y-auto p-2 bg-white rounded-md shadow-lg">
                      {queries.slice(0, 5).map((query, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100 transition rounded-md mb-1 last:mb-0 border-2 border-gray-200 text-center"
                          onClick={() => handleBoxClick(query)}
                        >
                          {query}
                        </div>
                      ))}
                    </div>
                  )}
                </label>
              </div>
            )}
          </div>

          {/* Tag Input */}
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
        </div>

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
