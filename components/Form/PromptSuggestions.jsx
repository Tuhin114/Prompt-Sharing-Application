// components/Form/PromptSuggestions.jsx
import { useState } from "react";

const PromptSuggestions = ({
  post,
  setPost,
  queries,
  setQueries,
  suggesting,
  setSuggesting,
  setError,
}) => {
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

  return (
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

        <div className="flex justify-start items-center gap-4 my-2">
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
                  className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100 transition rounded-md mb-1 last:mb-0 border-2 border-gray-200 text-center"
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
  );
};

export default PromptSuggestions;
