import Link from "next/link";

const links = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/forum", label: "Forum" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="border-b border-ink/10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
        <Link href="/" className="font-display text-xl tracking-wide">
          Jess.
        </Link>
        <ul className="flex items-center gap-8 text-sm uppercase tracking-wide">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={
                  link.label === "Blog"
                    ? "border-b-2 border-primary pb-1"
                    : "pb-1 hover:border-b-2 hover:border-primary/50"
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
