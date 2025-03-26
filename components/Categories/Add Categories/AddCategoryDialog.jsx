import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import useCategories from "@/hooks/useCategories";
import CategoryInput from "../Add To/CategoryInput";
import { Button } from "@components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

const CategoriesDialog = ({ addCategory }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="p-4 w-full">
          <PlusCircle className="text-gray-600" />
          Add Categories
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[300px]">
        <div className="grid gap-4 py-4" onKeyDown={(e) => e.stopPropagation()}>
          <CategoryInput addCategory={addCategory} setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CategoriesDialog;
