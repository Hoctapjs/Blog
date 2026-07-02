export const metadata = {
  title: "Contact",
  description: "Get in touch.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 lg:px-12">
      <h1 className="mb-8 font-display text-4xl">Contact</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="rounded-lg border border-ink/20 bg-cream px-4 py-2 focus:border-primary focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="rounded-lg border border-ink/20 bg-cream px-4 py-2 focus:border-primary focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="message" className="text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="rounded-lg border border-ink/20 bg-cream px-4 py-2 focus:border-primary focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-fit rounded-lg bg-primary px-6 py-2 text-cream transition hover:opacity-90"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
