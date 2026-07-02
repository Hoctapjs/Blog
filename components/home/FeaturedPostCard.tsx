import Image from "next/image";
import Link from "next/link";

type FeaturedPostCardProps = {
  title: string;
  category: string;
  slug: string;
  coverImage?: string;
};

export default function FeaturedPostCard({
  title,
  category,
  slug,
  coverImage,
}: FeaturedPostCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group relative block h-56 overflow-hidden rounded-2xl bg-ink/5"
    >
      {coverImage && (
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover transition group-hover:scale-105"
        />
      )}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-4 text-cream">
        <p className="text-xs uppercase tracking-widest opacity-80">
          {category}
        </p>
        <p className="font-display text-lg">{title}</p>
      </div>
    </Link>
  );
}
