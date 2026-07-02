"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PostSummary } from "@/lib/posts";

export default function PostTable({ posts }: { posts: PostSummary[] }) {
  const router = useRouter();

  async function handleDelete(slug: string) {
    if (!confirm("Delete this post?")) return;
    const res = await fetch(`/api/posts/${slug}`, { method: "DELETE" });
    if (res.ok) router.refresh();
  }

  if (posts.length === 0) {
    return <p className="text-ink/60">No posts yet.</p>;
  }

  return (
    <table className="w-full border-collapse text-left text-sm">
      <thead>
        <tr className="border-b border-ink/10">
          <th className="py-3">Title</th>
          <th className="py-3">Category</th>
          <th className="py-3">Featured</th>
          <th className="py-3 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr key={post._id} className="border-b border-ink/5">
            <td className="py-3">{post.title}</td>
            <td className="py-3">{post.category ?? "—"}</td>
            <td className="py-3">{post.featured ? "Yes" : "No"}</td>
            <td className="py-3 text-right">
              <Link
                href={`/admin/edit/${post.slug}`}
                className="mr-4 text-primary hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(post.slug)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
