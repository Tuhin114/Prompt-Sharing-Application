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
    if (!post.tag.includes(tag)) {
      setPost({ ...post, tag: [...post.tag, tag] });
    }
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      setTags([...tags, e.target.value.trim()]);
      e.target.value = ""; // Clear the input
    }
  };

  // Remove tag
  const handleRemoveTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
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
              onKeyDown={handleAddTag}
              placeholder="#Tag"
              className="flex-grow p-2 border-none outline-none text-sm text-gray-700"
            />
          </div>
        </div>
        {tags.length > 0 && (
          <div className="basis-5/12 glassmorphism p-4 mt-2">
            <div className="">
              <span className="font-satoshi font-semibold text-base text-gray-700">
                Tag Suggestions
              </span>
              <div className="flex flex-row h-[44px] mt-2 p-2 overflow-x-auto gap-2 justify-center bg-white rounded-md">
                {tags.slice(0, 5).map((tag, index) => (
                  <div className="border border-gray-300 rounded-md ">
                    <div
                      key={index}
                      className="text-gray-700 cursor-pointer px-2"
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag}
                    </div>
                  </div>
                ))}
              </div>
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
