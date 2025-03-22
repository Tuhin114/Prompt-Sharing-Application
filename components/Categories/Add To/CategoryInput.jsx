import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const CategoryInput = ({ addCategory, setOpen }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateCategory = async () => {
    if (!name.trim()) return;

    setLoading(true);
    await addCategory(name);
    setName("");
    setLoading(false);
    setOpen?.(false);
  };

  return (
    <div className="grid grid-cols-3 items-center gap-2">
      <Input
        id="name"
        type="text"
        placeholder="Add a new category"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="col-span-2"
        disabled={loading}
        autoFocus={false}
      />
      <Button
        className="col-span-1"
        onClick={handleCreateCategory}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create"}
      </Button>
    </div>
  );
};

export default CategoryInput;
