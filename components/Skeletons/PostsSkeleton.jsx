import { Skeleton } from "./Skeleton";

export default function PostsSkeleton() {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm w-full max-w-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <Skeleton className="h-4 w-4" />
      </div>

      {/* Title */}
      <Skeleton className="h-4 w-5/6 mb-2" />
      <Skeleton className="h-4 w-4/6 mb-3" />

      {/* Description */}
      <Skeleton className="h-3 w-full mb-1" />
      <Skeleton className="h-3 w-5/6 mb-4" />

      {/* Tags */}
      <div className="flex gap-2 mb-4">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>

      {/* Footer - Icons */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-sm" />
          <Skeleton className="h-4 w-6" />
        </div>
        <Skeleton className="h-4 w-4 rounded-sm" />
      </div>
    </div>
  );
}
