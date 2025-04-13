import { Input } from "@components/ui/input";

const Searchbar = ({ searchText, handleSearchChange, handleClearSearch }) => {
  return (
    <form className="relative flex-1">
      <Input
        type="text"
        placeholder="Search for a tag or a username"
        value={searchText}
        onChange={handleSearchChange}
        required
        className="w-full bg-white"
      />
      {searchText && (
        <button
          type="button"
          onClick={handleClearSearch}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          ✖️
        </button>
      )}
    </form>
  );
};

export default Searchbar;
