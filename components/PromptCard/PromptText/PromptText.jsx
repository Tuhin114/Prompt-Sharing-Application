const PromptText = ({ post, handleTagClick }) => {
  return (
    <div className="flex-grow p-2 px-2">
      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
        {post.title ||
          "What strategies are effective for migrating JavaScript to TypeScript?"}
      </h3>

      {/* Prompt Content */}
      <p className="text-sm text-gray-700 line-clamp-3">
        {post.prompt.length > 140
          ? `${post.prompt.slice(0, 140)}...`
          : post.prompt}
        {post.prompt.length > 140 && (
          <span className="text-gray-500 text-sm mt-1 cursor-pointer hover:underline hover:text-blue-500">
            more
          </span>
        )}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-2">
        {post.tag.map((eachTag, index) => (
          <p
            key={index}
            className="text-xs px-3 py-1 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200"
            onClick={() => handleTagClick && handleTagClick(eachTag)}
          >
            #{eachTag}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PromptText;
