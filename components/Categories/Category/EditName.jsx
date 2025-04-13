import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DropdownMenuItem } from "@components/ui/dropdown-menu";
import useCategories from "@hooks/useCategories";

const EditName = ({
  setOpen,
  updateCategory,
  sidebarTab,
  sidebarTabName,
  setSidebarTabName,
}) => {
  const [name, setName] = useState(sidebarTabName);
  const [openThis, setOpenThis] = useState(false);

  // Sync state if sidebarTabName changes
  useEffect(() => {
    setName(sidebarTabName);
  }, [sidebarTabName]);

  const handleSave = async () => {
    if (!name.trim()) return;
    const categoryId = sidebarTab;
    const newName = name;
    await updateCategory({ categoryId, newName });
    setSidebarTabName(name);
    setOpenThis(false);
    setOpen(false);
  };

  return (
    <Dialog open={openThis} onOpenChange={setOpenThis}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="cursor-pointer"
        >
          Edit
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>Edit the name of the category.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave} disabled={!name.trim()}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditName;
