import dbConnect from "@/lib/mongodb";
import Post, { IPost } from "@/models/Post";

export type PostSummary = Pick<
  IPost,
  "title" | "slug" | "excerpt" | "coverImage" | "category" | "featured" | "author"
> & { _id: string };

export async function getAllPosts(): Promise<PostSummary[]> {
  await dbConnect();
  const posts = await Post.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(posts));
}

export async function getFeaturedPosts(limit = 2): Promise<PostSummary[]> {
  await dbConnect();
  const posts = await Post.find({ featured: true })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
  return JSON.parse(JSON.stringify(posts));
}

export async function getPostBySlug(slug: string) {
  await dbConnect();
  const post = await Post.findOne({ slug }).lean();
  return post ? JSON.parse(JSON.stringify(post)) : null;
}
