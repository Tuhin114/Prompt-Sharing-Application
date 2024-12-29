import { useState } from "react";

const TagSuggestions = ({
  post,
  setPost,
  tags,
  setTags,
  suggestedTags,
  setSuggestedTags,
  tagSuggesting,
  setTagSuggesting,
  setTagError,
}) => {
  const [newTag, setNewTag] = useState("");

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
      setSuggestedTags(data.tags || []);
    } catch (error) {
      setTagError(error.message);
    } finally {
      setTagSuggesting(false);
    }
  };
  // console.log(tags);
  const handleTagClick = (tag) => {
    setTags([...tags, tag]);
    setSuggestedTags(suggestedTags.filter((t) => t !== tag));
    setPost({ ...post, tag: [...post.tag, tag] });
  };

  const handleAddTag = () => {
    const trimmedTag = newTag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setPost({ ...post, tag: [...post.tag, trimmedTag] });
      setNewTag("");
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
    setPost({
      ...post,
      tag: post.tag.filter((_, index) => index !== indexToRemove),
    });
  };

  const handleInputChange = (e) => {
    setNewTag(e.target.value);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <div className="basis-7/12 glassmorphism p-4 mt-2">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Field of Prompt{" "}
            <span className="font-normal">
              (e.g., #product, #webdevelopment)
            </span>
          </span>
          <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center bg-blue-700 text-white px-3 py-1 rounded-lg text-sm"
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(index)}
                  className="ml-2 text-white hover:text-gray-300"
                >
                  &times;
                </button>
              </div>
            ))}
            <input
              type="text"
              value={newTag}
              onChange={handleInputChange}
              placeholder="#Tag"
              className="p-2 border-none outline-none text-sm text-gray-700"
            />
            {newTag.trim() && (
              <button
                onClick={handleAddTag}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                +
              </button>
            )}
          </div>
        </div>
        {suggestedTags.length > 0 && (
          <div className="basis-5/12 glassmorphism p-4 mt-2">
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Tag Suggestions
            </span>
            <div className="flex flex-wrap gap-2 mt-2 p-2 overflow-y-auto bg-white rounded-md shadow-lg">
              {suggestedTags.slice(0, 5).map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center px-3 py-1 text-gray-700 cursor-pointer hover:bg-gray-100 transition rounded-md mb-1 last:mb-0 border-2 border-gray-200 text-center"
                  onClick={() => handleTagClick(tag)}
                >
                  #{tag}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="basis-7/12">
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
            onClick={() => {
              setTags([]);
              setPost({ ...post, tag: [] });
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default TagSuggestions;
