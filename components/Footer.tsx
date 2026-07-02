export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-6 py-10 text-center text-sm lg:px-12">
        <p className="font-display text-lg">Jess.</p>
        <p className="opacity-70">
          &copy; {new Date().getFullYear()} The Blog. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
