import { notFound } from "next/navigation";
import PostForm from "@/components/admin/PostForm";
import { getPostBySlug } from "@/lib/posts";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-3xl">Edit Post</h1>
      <PostForm mode="edit" initialPost={post} />
    </div>
  );
}
