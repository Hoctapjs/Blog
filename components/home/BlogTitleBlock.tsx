export default function BlogTitleBlock() {
  return (
    <div className="flex flex-col justify-center gap-4 rounded-2xl bg-primary px-8 py-10 text-cream">
      <div className="flex items-center gap-4">
        <span className="font-display text-2xl">01</span>
        <span className="h-px flex-1 bg-cream/50" />
      </div>
      <h1 className="font-display text-6xl leading-none">BLOG</h1>
    </div>
  );
}
