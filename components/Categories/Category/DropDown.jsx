import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreVertical } from "lucide-react";
import EditName from "./EditName";
import DeleteName from "./DeleteName";

const DropDown = ({
  updateCategory,
  deleteCategory,
  activeTab,
  sidebarTab,
  setSidebarTab,
  sidebarTabName,
  setSidebarTabName,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 text-gray-600 hover:text-gray-900">
          <MoreVertical size={18} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-24">
        <EditName
          updateCategory={updateCategory}
          sidebarTab={sidebarTab}
          sidebarTabName={sidebarTabName}
          setSidebarTabName={setSidebarTabName}
        />
        <DeleteName
          deleteCategory={deleteCategory}
          sidebarTab={sidebarTab}
          activeTab={activeTab}
          setSidebarTab={setSidebarTab}
          sidebarTabName={sidebarTabName}
          setSidebarTabName={setSidebarTabName}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
