import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@src/components/ui/select";

const Sortdown = ({ onSortChange }) => {
  const [selectedOption, setSelectedOption] = useState("Default");
  console.log(onSortChange);

  // Sorting options
  const options = [
    { label: "Default", value: "default" },
    { label: "Most Liked", value: "likes" },
    { label: "Most Saved", value: "bookmarks" },
  ];

  // Handle sorting change
  const handleOptionClick = (option) => {
    setSelectedOption(option.label);
    onSortChange({ target: { value: option.value } });
  };

  return (
    <div className="w-32">
      <Select onValueChange={setSelectedOption} defaultValue="default">
        <SelectTrigger className="w-full px-4 py-3 h-12 rounded-lg bg-white/70 backdrop-blur-lg shadow-md border border-gray-300 text-gray-600 ">
          <SelectValue placeholder="Default" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort By</SelectLabel>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Sortdown;
