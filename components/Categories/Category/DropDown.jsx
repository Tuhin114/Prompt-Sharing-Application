import React, { use, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreVertical } from "lucide-react";
import EditName from "./EditName";
import DeleteName from "./DeleteName";

const DropDown = ({ updateCategory, deleteCategory, tabProps }) => {
  const {
    sidebarTab,
    activeTab,
    sidebarTabName,
    setSidebarTabName,
    setSidebarTab,
  } = tabProps;
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="p-2 text-gray-600 hover:text-gray-900">
          <MoreVertical size={18} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-24">
        <EditName
          setOpen={setOpen}
          sidebarTab={sidebarTab}
          sidebarTabName={sidebarTabName}
          setSidebarTabName={setSidebarTabName}
          updateCategory={updateCategory}
        />
        <DeleteName
          sidebarTab={sidebarTab}
          activeTab={activeTab}
          setSidebarTab={setSidebarTab}
          sidebarTabName={sidebarTabName}
          setSidebarTabName={setSidebarTabName}
          deleteCategory={deleteCategory}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
