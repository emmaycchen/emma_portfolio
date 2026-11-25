/** Placeholder body for pages that are not designed yet. */
export default function ComingSoon({ title }: { title: string }) {
  return (
    <main className="flex min-h-[70svh] flex-col bg-cream px-6 pb-24 pt-36 text-navy md:px-10 lg:px-[66px] lg:pt-[180px]">
      <h1 className="text-5xl font-medium md:text-7xl">{title}</h1>
      <p className="mt-4 text-lg">This page is coming soon.</p>
    </main>
  );
}
