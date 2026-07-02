import Image from "next/image";

export const metadata = {
  title: "About",
  description: "About the author of The Blog.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-16 text-center lg:px-12">
      <div className="relative h-32 w-32 overflow-hidden rounded-full bg-primary/20">
        <Image src="/avatar.jpg" alt="Jess" fill className="object-cover" />
      </div>
      <h1 className="font-display text-4xl">Hey, I&apos;m Jess</h1>
      <p className="text-ink/70">
        Welcome to my little corner of the internet. I write about beauty,
        scents, and the small rituals that make ordinary days feel special.
        This blog is where I share reviews, stories, and everything I&apos;ve
        learned along the way.
      </p>
    </div>
  );
}
