import React, { useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";

const Filter = ({ categoryId, activeTab, sortType, handleSortChange }) => {
  useEffect(() => {
    // Reset sortType when activeTab changes
    handleSortChange("default");
  }, [activeTab, categoryId]);
  return (
    <Select value={sortType} onValueChange={handleSortChange}>
      <SelectTrigger className="w-[150px] bg-white">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Filter</SelectLabel>
          <SelectItem value="default">Recents</SelectItem>
          <SelectItem value="likes">Most Liked</SelectItem>
          <SelectItem value="bookmarks">Most Saved</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default Filter;
