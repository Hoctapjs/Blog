import Image from "next/image";
import Link from "next/link";

export default function AboutAuthorCard() {
  return (
    <div className="flex gap-4 rounded-2xl bg-sky/40 p-6">
      <span
        className="hidden shrink-0 self-stretch text-xs uppercase tracking-[0.3em] sm:[writing-mode:vertical-rl]"
      >
        About Author
      </span>
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full bg-primary/20">
            <Image src="/avatar.jpg" alt="Jess" fill className="object-cover" />
          </div>
          <p className="font-display text-lg">Hey, I&apos;m Jess</p>
        </div>
        <p className="text-sm text-ink/70">
          Welcome to my little corner of the internet — thoughts on beauty,
          scents, and the stories behind them.
        </p>
        <Link
          href="/about"
          className="text-xs font-semibold uppercase tracking-wide text-primary underline underline-offset-4"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}
