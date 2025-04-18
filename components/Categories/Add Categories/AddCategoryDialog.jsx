import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import CategoryInput from "../Add To/CategoryInput";
import { Button } from "@components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

const CategoriesDialog = ({ addCategory }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full font-semibold px-4 py-2 flex items-center gap-2  bg-white text-black hover:bg-gray-100 border border-gray-300 rounded-md"
        >
          Add Categories
          <PlusCircle className="w-4 h-4 mt-0.5 font-semibold" />
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
