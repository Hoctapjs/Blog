import HeroImage from "@/components/home/HeroImage";
import BlogTitleBlock from "@/components/home/BlogTitleBlock";
import AboutAuthorCard from "@/components/home/AboutAuthorCard";
import FeaturedPostCard from "@/components/home/FeaturedPostCard";
import CategoryFeature from "@/components/home/CategoryFeature";
import { getFeaturedPosts, PostSummary } from "@/lib/posts";

const fallbackFeatured: PostSummary[] = [
  {
    _id: "placeholder-1",
    title: "Notes of Amber & Musk",
    slug: "notes-of-amber-and-musk",
    excerpt: "A journey through the perfumes that define the season.",
    coverImage: "",
    category: "Perfumes & Scents",
    featured: true,
    author: "Jess",
  },
  {
    _id: "placeholder-2",
    title: "The Clean Beauty Edit",
    slug: "the-clean-beauty-edit",
    excerpt: "Everything worth knowing about this season's skincare picks.",
    coverImage: "",
    category: "Cosmetics",
    featured: true,
    author: "Jess",
  },
];

export default async function Home() {
  let featured = fallbackFeatured;
  try {
    const posts = await getFeaturedPosts(2);
    if (posts.length > 0) featured = posts;
  } catch {
    // DB not configured yet — use placeholder content.
  }

  const [perfume, cosmetics] = featured;

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 lg:grid-cols-3 lg:px-12">
      <div className="lg:col-span-1">
        <HeroImage />
      </div>

      <div className="flex flex-col gap-6 lg:col-span-1">
        <BlogTitleBlock />
        <AboutAuthorCard />
        {perfume && (
          <FeaturedPostCard
            title={perfume.title}
            category={perfume.category ?? "Perfumes & Scents"}
            slug={perfume.slug}
            coverImage={perfume.coverImage}
          />
        )}
      </div>

      <div className="lg:col-span-1">
        {cosmetics && (
          <CategoryFeature
            label={cosmetics.category ?? "Cosmetics"}
            title={cosmetics.title}
            description={cosmetics.excerpt ?? ""}
            slug={cosmetics.slug}
            coverImage={cosmetics.coverImage}
          />
        )}
      </div>
    </div>
  );
}
