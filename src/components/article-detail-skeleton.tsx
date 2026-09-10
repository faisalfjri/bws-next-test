export function ArticleDetailSkeleton() {
  return (
    <main className="min-h-screen bg-white">
      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-6 sm:py-12 animate-pulse">
        <div className="w-10 h-10 rounded-full border border-gray-200 mb-6 sm:mb-10" />

        <header className="space-y-3 sm:space-y-4">
          <div className="h-3 sm:h-4 w-32 rounded-lg bg-gray-100" />
          <div className="h-7 sm:h-10 w-full rounded-lg bg-gray-100" />
          <div className="h-7 sm:h-10 w-3/4 rounded-lg bg-gray-100" />
          <div className="h-4 sm:h-5 w-full rounded-lg bg-gray-100" />
          <div className="h-4 sm:h-5 w-5/6 rounded-lg bg-gray-100" />
        </header>

        <div className="mt-6 sm:mt-8 aspect-[16/9] rounded-xl sm:rounded-2xl bg-gray-100" />

        <div className="mt-8 sm:mt-10 space-y-4">
          <div className="h-4 w-full rounded-lg bg-gray-100" />
          <div className="h-4 w-full rounded-lg bg-gray-100" />
          <div className="h-4 w-5/6 rounded-lg bg-gray-100" />
          <div className="h-4 w-full rounded-lg bg-gray-100" />
          <div className="h-4 w-3/4 rounded-lg bg-gray-100" />
          <div className="h-4 w-full rounded-lg bg-gray-100" />
          <div className="h-4 w-2/3 rounded-lg bg-gray-100" />
        </div>
      </article>
    </main>
  );
}
