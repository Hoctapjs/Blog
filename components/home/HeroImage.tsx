import Image from "next/image";

export default function HeroImage() {
  return (
    <div className="relative h-[420px] overflow-hidden rounded-2xl bg-sky lg:h-full lg:min-h-[720px]">
      <Image
        src="/hero.jpg"
        alt="Featured product"
        fill
        className="object-cover"
        priority
      />
      <a
        href="/blog"
        aria-label="Browse the blog"
        className="absolute bottom-6 left-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-cream shadow-lg transition hover:scale-105"
      >
        <span className="text-xl">&rarr;</span>
      </a>
    </div>
  );
}
