import PostTable from "@/components/admin/PostTable";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const posts = await getAllPosts();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-3xl">Posts</h1>
      <PostTable posts={posts} />
    </div>
  );
}
