import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";

const ProfileSidebar = () => {
  return (
    <div className="min-w-[220px] border-r-[1px] border-gray-300">
      <div className="flex flex-col gap-2 p-4">
        <div className="px-3 py-2.5 text-sm font-medium cursor-pointer hover:bg-gray-200 text-center">
          All Posts
        </div>
        <div className="px-3 py-2.5 text-sm font-medium cursor-pointer hover:bg-gray-200 text-center">
          MLOps
        </div>
        <Button variant="outline" className="p-4">
          <PlusCircle className="text-gray-600" />
          Add Categories
        </Button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
