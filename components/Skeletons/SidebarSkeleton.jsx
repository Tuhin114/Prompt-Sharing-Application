import { Skeleton } from "./Skeleton";

export default function SidebarSkeleton() {
  return (
    <div className="w-full space-y-4 p-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-6 w-40 rounded-md" />
      ))}
    </div>
  );
}
