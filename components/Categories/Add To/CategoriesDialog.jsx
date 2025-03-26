import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CategoryInput from "./CategoryInput";
import CategoryList from "./CategoryList";
import useCategories from "@/hooks/useCategories";

const CategoriesDialog = ({ type, post, open, setOpen }) => {
  const userId = "66c2ea75d5be47e78d405f67";

  // Using custom hook
  const { categories, loading, addCategory } = useCategories(userId, type);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[300px]">
        <div className="grid gap-4 py-4" onKeyDown={(e) => e.stopPropagation()}>
          <CategoryInput addCategory={addCategory} />
          <CategoryList categories={categories} post={post} loading={loading} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CategoriesDialog;
