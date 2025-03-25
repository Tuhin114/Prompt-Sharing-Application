import React, { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";
import useSortPosts from "@hooks/useSortPosts";

const Filter = ({ activeTab, sidebarTab, postsData, setPostsData }) => {
  const [sortType, setSortType] = useState("default");
  const { sortedPosts, handleSortChange } = useSortPosts(postsData);

  // console.log(sidebarTab);
  console.log(postsData);

  useEffect(() => {
    setSortType("default");
    handleSortChange("default");
  }, [sidebarTab, activeTab]);

  useEffect(() => {
    if (JSON.stringify(sortedPosts) !== JSON.stringify(postsData)) {
      setPostsData(sortedPosts);
    }
  }, [sortedPosts]);

  const handleSort = (selectedSort) => {
    setSortType(selectedSort);
    handleSortChange(selectedSort);
  };

  return (
    <Select value={sortType} onValueChange={handleSort}>
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
