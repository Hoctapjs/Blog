import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10 lg:px-12">
      <div className="mb-8 flex items-center justify-between rounded-2xl bg-ink px-6 py-4 text-cream">
        <nav className="flex items-center gap-6">
          <Link href="/admin" className="font-display text-lg">
            Dashboard
          </Link>
          <Link href="/admin/new" className="text-sm hover:underline">
            New Post
          </Link>
        </nav>
        <LogoutButton />
      </div>
      {children}
    </div>
  );
}
