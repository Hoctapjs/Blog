import Image from "next/image";
import Link from "next/link";

type CategoryFeatureProps = {
  label: string;
  title: string;
  description: string;
  slug: string;
  coverImage?: string;
};

export default function CategoryFeature({
  label,
  title,
  description,
  slug,
  coverImage,
}: CategoryFeatureProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative h-56 overflow-hidden rounded-2xl bg-ink/5">
        {coverImage && (
          <Image src={coverImage} alt={title} fill className="object-cover" />
        )}
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
        {label}
      </p>
      <div className="flex flex-col gap-3 rounded-2xl bg-primary p-6 text-cream">
        <p className="font-display text-xl">{title}</p>
        <p className="text-sm opacity-90">{description}</p>
        <Link
          href={`/blog/${slug}`}
          className="text-xs font-semibold uppercase tracking-wide underline underline-offset-4"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}
