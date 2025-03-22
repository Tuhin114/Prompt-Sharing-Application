import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@components/ui/dropdown-menu";

const DeleteName = ({
  deleteCategory,
  sidebarTab,
  activeTab,
  setSidebarTab,
  sidebarTabName,
  setSidebarTabName,
}) => {
  const [open, setOpen] = useState(false);
  // Custom function to delete category immediately
  const handleDeleteCategory = async () => {
    const categoryId = sidebarTab;
    await deleteCategory(categoryId);
    if (activeTab === "My Posts") {
      setSidebarTab("all_posts");
      setSidebarTabName("All Posts");
    }

    if (activeTab === "Saved Items") {
      setSidebarTab("all_saved");
      setSidebarTabName("All Saved");
    }

    if (activeTab === "Drafts") {
      setSidebarTab("all_drafts");
      setSidebarTabName("All Drafts");
    }
    setOpen(false);
  };
  return (
    <AlertDialog asChild open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Delete
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            <strong>{sidebarTabName}</strong>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-full px-5 py-1.5 text-sm font-semibold hover:bg-gray-200">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600 rounded-full px-5 py-1.5 text-sm font-semibold"
            onClick={handleDeleteCategory}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteName;
