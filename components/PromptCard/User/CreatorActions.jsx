import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { MoreVertical } from "lucide-react";
import CategoriesDialog from "@components/Categories/Add To/CategoriesDialog";
import { useState } from "react";

const CreatorActions = ({ post, type, handleEdit, handleDelete }) => {
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreVertical className="h-5 w-5 text-gray-600 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
        {/* <DropdownMenuItem onClick={handleView}>View</DropdownMenuItem> */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete your post.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <CategoriesDialog
            post={post}
            type={type}
            open={open}
            setOpen={setOpen}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CreatorActions;
