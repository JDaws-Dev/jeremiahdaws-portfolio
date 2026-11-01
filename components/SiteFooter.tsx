const LINKS = [
  { href: "/#films", label: "AI films" },
  { href: "/#process", label: "Process" },
  { href: "/#form", label: "FORM" },
  { href: "/work", label: "Film work" },
  { href: "/#hire", label: "Contact" },
  { href: "/apps", label: "AI builds" },
  { href: "/maker", label: "Maker archive" },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#07080a] py-8 text-paper">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-paper/70">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition hover:text-accent-muted">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {/* Off-the-clock line — discoverable but understated */}
        <p className="mt-5 text-center font-serif text-sm italic text-paper/70">
          Off the clock, I&apos;m{" "}
          <a
            href="/movies.html"
            className="text-accent-muted underline decoration-accent/40 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper/60"
          >
            a movie-obsessed nerd with a collection
          </a>
          .
        </p>
        <p className="mt-3 text-center text-xs text-paper/55">
          © {new Date().getFullYear()} Jeremiah Daws
        </p>
      </div>
    </footer>
  );
}
