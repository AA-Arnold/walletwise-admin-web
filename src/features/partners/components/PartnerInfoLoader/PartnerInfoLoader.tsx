import { Skeleton } from "@/components/ui/skeleton";

const PartnerInfoLoader = () => (
  <div className="space-y-6" aria-label="Loading partner information">
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="space-y-2">
        <Skeleton className="h-9 w-56 bg-gray-300 dark:bg-gray-700" />
        <Skeleton className="h-4 w-80 max-w-full bg-gray-300 dark:bg-gray-700" />
      </div>
      <div className="flex gap-3">
        <Skeleton className="h-11 w-28 bg-gray-300 dark:bg-gray-700" />
        <Skeleton className="h-11 w-28 bg-gray-300 dark:bg-gray-700" />
      </div>
    </div>

    <Skeleton className="h-6 w-72 bg-gray-300 dark:bg-gray-700" />

    <div className="rounded-2xl border p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-col gap-6 sm:flex-row">
        <Skeleton className="h-24 w-24 rounded-2xl bg-gray-300 dark:bg-gray-700" />
        <div className="flex-1 space-y-5">
          <Skeleton className="h-7 w-64 bg-gray-300 dark:bg-gray-700" />
          <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-5 w-full max-w-xs bg-gray-300 dark:bg-gray-700"
              />
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="space-y-4 rounded-xl border p-5 dark:border-gray-800 dark:bg-gray-900">
      <Skeleton className="h-7 w-48 bg-gray-300 dark:bg-gray-700" />
      <Skeleton className="h-11 w-full bg-gray-300 dark:bg-gray-700" />
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton
          key={index}
          className="h-12 w-full bg-gray-300 dark:bg-gray-700"
        />
      ))}
    </div>
  </div>
);

export default PartnerInfoLoader;
