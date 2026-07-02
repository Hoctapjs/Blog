import { config } from "dotenv";
config({ path: ".env.local" });
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";

const samplePosts = [
  {
    title: "Notes of Amber & Musk",
    slug: "notes-of-amber-and-musk",
    excerpt: "A journey through the perfumes that define the season.",
    content: "Full story coming soon...",
    category: "Perfumes & Scents",
    featured: true,
    tags: ["perfume", "seasonal"],
  },
  {
    title: "The Clean Beauty Edit",
    slug: "the-clean-beauty-edit",
    excerpt: "Everything worth knowing about this season's skincare picks.",
    content: "Full story coming soon...",
    category: "Cosmetics",
    featured: true,
    tags: ["skincare", "beauty"],
  },
  {
    title: "Five Minute Morning Ritual",
    slug: "five-minute-morning-ritual",
    excerpt: "A quick routine to start the day feeling put together.",
    content: "Full story coming soon...",
    category: "Lifestyle",
    featured: false,
    tags: ["routine"],
  },
];

async function main() {
  await dbConnect();

  for (const post of samplePosts) {
    await Post.findOneAndUpdate({ slug: post.slug }, post, {
      upsert: true,
      returnDocument: "after",
    });
  }

  console.log(`Seeded ${samplePosts.length} posts.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
