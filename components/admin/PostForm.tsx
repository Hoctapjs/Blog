"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IPost } from "@/models/Post";

type PostFormProps = {
  initialPost?: Partial<IPost>;
  mode: "create" | "edit";
};

export default function PostForm({ initialPost, mode }: PostFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: initialPost?.title ?? "",
    slug: initialPost?.slug ?? "",
    excerpt: initialPost?.excerpt ?? "",
    content: initialPost?.content ?? "",
    coverImage: initialPost?.coverImage ?? "",
    category: initialPost?.category ?? "",
    featured: initialPost?.featured ?? false,
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const url =
      mode === "create" ? "/api/posts" : `/api/posts/${initialPost?.slug}`;
    const method = mode === "create" ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Title</label>
        <input
          required
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          className="rounded-lg border border-ink/20 bg-cream px-4 py-2 focus:border-primary focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Slug</label>
        <input
          required
          value={form.slug}
          onChange={(e) => update("slug", e.target.value)}
          className="rounded-lg border border-ink/20 bg-cream px-4 py-2 focus:border-primary focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Excerpt</label>
        <textarea
          value={form.excerpt}
          onChange={(e) => update("excerpt", e.target.value)}
          rows={2}
          className="rounded-lg border border-ink/20 bg-cream px-4 py-2 focus:border-primary focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Content</label>
        <textarea
          required
          value={form.content}
          onChange={(e) => update("content", e.target.value)}
          rows={8}
          className="rounded-lg border border-ink/20 bg-cream px-4 py-2 focus:border-primary focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Cover Image URL</label>
        <input
          value={form.coverImage}
          onChange={(e) => update("coverImage", e.target.value)}
          className="rounded-lg border border-ink/20 bg-cream px-4 py-2 focus:border-primary focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Category</label>
        <input
          value={form.category}
          onChange={(e) => update("category", e.target.value)}
          className="rounded-lg border border-ink/20 bg-cream px-4 py-2 focus:border-primary focus:outline-none"
        />
      </div>
      <label className="flex items-center gap-2 text-sm font-medium">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => update("featured", e.target.checked)}
        />
        Featured on homepage
      </label>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={saving}
        className="w-fit rounded-lg bg-primary px-6 py-2 text-cream transition hover:opacity-90 disabled:opacity-50"
      >
        {saving ? "Saving..." : mode === "create" ? "Create Post" : "Save Changes"}
      </button>
    </form>
  );
}
