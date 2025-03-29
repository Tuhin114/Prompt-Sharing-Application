import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@components/ui/alert-dialog";
import { Button } from "@components/ui/button";
import useCategoryActions from "@hooks/useCategoryActions";
import { useState } from "react";

const CategoryItem = ({
  removeBookmark,
  name,
  isAdded,
  categoryId,
  postId,
  setOpen,
}) => {
  const [added, setAdded] = useState(isAdded);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);

  const { useAddPostMutation, useRemovePostMutation } = useCategoryActions();

  // ✅ Use mutations correctly
  const addMutation = useAddPostMutation();
  const removeMutation = useRemovePostMutation();

  const handleToggle = async () => {
    if (added) {
      removeMutation.mutate(
        { categoryId, promptId: postId },
        {
          onSuccess: () => setAdded(false),
        }
      );
    } else {
      addMutation.mutate(
        { categoryId, promptId: postId },
        {
          onSuccess: () => setAdded(true),
        }
      );
    }
  };

  return (
    <div className="grid grid-cols-3 items-center gap-2">
      <div className="col-span-2 text-center font-semibold hover:bg-gray-200 py-2 rounded-lg border-[1px] border-gray-300">
        {name}
      </div>
      <Button
        className="col-span-1 py-5 text-center font-semibold"
        onClick={
          name === "All Saved" ? () => setOpenRemoveDialog(true) : handleToggle
        }
        disabled={addMutation.isLoading || removeMutation.isLoading}
        size="sm"
      >
        {added ? "Remove" : "Add"}
      </Button>

      {/* Alert Dialog for removing post */}
      <AlertDialog open={openRemoveDialog} onOpenChange={setOpenRemoveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the post from all categories.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="rounded-full px-5 py-1.5 text-sm font-semibold hover:bg-gray-200"
              onClick={() => setOpenRemoveDialog(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600 rounded-full px-5 py-1.5 text-sm font-semibold"
              onClick={() => {
                removeBookmark();
                setOpen(false);
                setOpenRemoveDialog(false);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CategoryItem;
