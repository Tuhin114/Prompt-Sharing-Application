import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import CategoryInput from "./CategoryInput";
import CategoryList from "./CategoryList";
import useCategories from "@/hooks/useCategories";
import CategoryItem from "./CategoryItem";

const CategoriesDialog = ({
  isSaveBtn = false,
  isBookmarked,
  removeBookmark,

  type,
  post,
  open,
  setOpen,
}) => {
  const userId = "66c2ea75d5be47e78d405f67";

  const categoryType = isSaveBtn ? "saved_items" : type;

  // console.log(categoryType);

  // Using custom hook
  const { categories, loading, addCategory } = useCategories(
    userId,
    categoryType
  );

  // console.log(categories);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!isSaveBtn && (
        <DialogTrigger asChild>
          <span className="w-full cursor-pointer">Add To</span>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[300px]">
        <div className="grid gap-4 py-4" onKeyDown={(e) => e.stopPropagation()}>
          <CategoryInput addCategory={addCategory} />
          {isBookmarked && (
            <CategoryItem
              name="All Saved"
              postId={post._id}
              isAdded={true}
              removeBookmark={removeBookmark}
              setOpen={setOpen}
            />
          )}
          <CategoryList categories={categories} post={post} loading={loading} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CategoriesDialog;
