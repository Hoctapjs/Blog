import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug } from "@/lib/posts";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-10 lg:px-12">
      {post.category && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
          {post.category}
        </p>
      )}
      <h1 className="mb-4 font-display text-4xl">{post.title}</h1>
      <p className="mb-8 text-sm text-ink/60">By {post.author}</p>

      {post.coverImage && (
        <div className="relative mb-8 h-80 overflow-hidden rounded-2xl">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="prose max-w-none whitespace-pre-wrap text-ink/90">
        {post.content}
      </div>
    </article>
  );
}
