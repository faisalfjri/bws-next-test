export function ArticleCardSkeleton() {
  return (
    <div className="rounded-3xl bg-gray-50 p-2.5 sm:p-3 animate-pulse">
      <div className="aspect-[16/10] rounded-2xl bg-gray-100" />
      <div className="px-1 pt-2.5 sm:pt-3 pb-1.5 sm:pb-2 space-y-2">
        <div className="h-3 w-24 rounded bg-gray-100" />
        <div className="h-5 w-full rounded bg-gray-100" />
        <div className="h-5 w-3/4 rounded bg-gray-100" />
        <div className="h-3 w-full rounded bg-gray-100" />
        <div className="h-3 w-2/3 rounded bg-gray-100" />
      </div>
    </div>
  );
}

export function ArticleGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:gap-x-8 sm:gap-y-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <ArticleCardSkeleton key={i} />
      ))}
    </div>
  );
}
