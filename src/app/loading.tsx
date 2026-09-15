import { ArticleGridSkeleton } from "@/components/article-card-skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 pt-6 sm:pt-10">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="min-h-[320px] sm:min-h-[420px] animate-pulse rounded-3xl bg-gray-100 lg:col-span-2" />
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-28 animate-pulse rounded-2xl bg-gray-100" />
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-8xl px-4 sm:px-6 py-10">
        <ArticleGridSkeleton />
      </div>
    </main>
  );
}
