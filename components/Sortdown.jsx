import Image from "@node_modules/next/image";
import { useState } from "react";

const Sortdown = ({ onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Default");

  const options = [
    { label: "Default", value: "" },
    { label: "Most Liked", value: "likes" },
    { label: "Most Saved", value: "bookmarks" },
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option.label);
    setIsOpen(false);
    onSortChange({ target: { value: option.value } });
  };

  return (
    <div className="relative inline-block text-left basis-2/12 shadow-lg">
      {/* Dropdown Toggle */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-2 border rounded-md cursor-pointer bg-white"
      >
        <Image
          src="/assets/icons/dropdown.svg"
          alt="dropdown"
          width={32}
          height={32}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sortdown;
