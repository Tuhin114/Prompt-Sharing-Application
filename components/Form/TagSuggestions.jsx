import { useState } from "react";

const TagSuggestions = ({
  post,
  setPost,
  setTags,
  tags,
  tagSuggesting,
  setTagSuggesting,
  setTagError,
}) => {
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

  const handleTagClick = (tag) => {
    console.log(tag);
    setPost({ ...post, tag: tag });
  };

  return (
    <div className="glassmorphism p-4 mt-2">
      <span className="font-satoshi font-semibold text-base text-gray-700">
        Field of Prompt{" "}
        <span className="font-normal">(e.g., #product, #webdevelopment)</span>
      </span>
      <input
        value={post.tag}
        onChange={(e) => setPost({ ...post, tag: e.target.value })}
        type="text"
        placeholder="#Tag"
        className="form_input"
      />

      <div className="flex justify-start items-center gap-4 my-2">
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
    </div>
  );
};

export default TagSuggestions;
