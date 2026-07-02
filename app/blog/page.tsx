import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof getAllPosts>> = [];
  try {
    posts = await getAllPosts();
  } catch {
    // DB not configured yet.
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 lg:px-12">
      <h1 className="mb-10 font-display text-4xl">Blog</h1>

      {posts.length === 0 ? (
        <p className="text-ink/60">No posts yet. Check back soon.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-3"
            >
              <div className="relative h-48 overflow-hidden rounded-2xl bg-ink/5">
                {post.coverImage && (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition group-hover:scale-105"
                  />
                )}
              </div>
              {post.category && (
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  {post.category}
                </p>
              )}
              <h2 className="font-display text-xl">{post.title}</h2>
              {post.excerpt && (
                <p className="text-sm text-ink/70">{post.excerpt}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
