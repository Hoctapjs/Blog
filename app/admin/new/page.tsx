import PostForm from "@/components/admin/PostForm";

export default function NewPostPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-3xl">New Post</h1>
      <PostForm mode="create" />
    </div>
  );
}
