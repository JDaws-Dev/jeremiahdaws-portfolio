import {
  IconArrowUpRight,
  IconDownload,
  IconFilm,
  IconImdb,
  IconInstagram,
  IconLinkedIn,
  IconMail,
  IconMapPin,
  IconPhone,
  IconSpark,
  IconWrench,
  IconX,
  IconYouTube,
} from "./icons";

const RESUMES = [
  { id: "video", label: "Video", href: "/resumes/resume-video.pdf", Icon: IconFilm },
  { id: "maker", label: "Maker", href: "/resumes/resume-maker.pdf", Icon: IconWrench },
  { id: "tech", label: "Apps & AI", href: "/resumes/resume-tech.pdf", Icon: IconSpark },
];

const SERVICES = [
  "AI consulting: find where AI fits",
  "AI training for your team",
  "Vibe-coded tools and apps",
  "Websites with AI built in",
];

const SOCIAL = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jeremiah-daws-0376862a/", Icon: IconLinkedIn },
  { label: "Instagram", href: "https://www.instagram.com/jeremiahdaws/", Icon: IconInstagram },
  { label: "YouTube", href: "https://www.youtube.com/c/JeremiahDaws", Icon: IconYouTube },
  { label: "IMDb", href: "https://www.imdb.com/name/nm1268177/", Icon: IconImdb },
  { label: "X", href: "https://twitter.com/JeremiahDaws", Icon: IconX },
];

export function HireSection() {
  return (
    <>
      {/* Accent rule that signals "new section ahead" */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-accent to-transparent" />

      <section
        id="hire"
        className="relative scroll-mt-14 bg-ink py-24 text-paper"
      >
        {/* Soft accent glows so the section reads as a "stage" not a footer */}
        <div className="pointer-events-none absolute inset-0 -z-0">
          <div className="absolute -left-32 top-12 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-accent-muted/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent">
            Hire me · AI &amp; web
          </p>
          <h2 className="mt-3 font-serif text-6xl leading-[0.95] tracking-[-0.025em] md:text-[7rem]">
            Let&rsquo;s put AI<br />to work.
          </h2>

          <div className="mt-10 grid gap-10 md:grid-cols-[1.2fr_1fr] md:gap-16">
            <div>
              <p className="text-base text-paper/80 md:text-lg">
                On the side, I help small businesses, schools, and teams put AI to
                work, not just talk about it. You work with me directly: I scope
                it, build it, and teach your people to use it.
              </p>
              <ul className="mt-5 grid gap-2 text-sm text-paper/85 sm:grid-cols-2">
                {SERVICES.map((svc) => (
                  <li key={svc} className="flex gap-2">
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{svc}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-paper/70">
                Recent client work:{" "}
                <a
                  href="https://readytote.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper underline decoration-paper/30 underline-offset-4 transition hover:text-accent"
                >
                  ReadyTote
                </a>
, a website with an AI assistant that books, answers customers,
                and briefs the owner; and{" "}
                <a
                  href="https://artioscafe.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper underline decoration-paper/30 underline-offset-4 transition hover:text-accent"
                >
                  Artios Cafe
                </a>
                , a fully automated cafe ordering system whose staff run it by
                talking to an AI assistant.
              </p>
              <p className="mt-3 text-sm text-paper/55">
                Need a brand film or series instead? That&rsquo;s my day job as
                Producer / Director at{" "}
                <a
                  href="https://www.formgreatstories.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper/80 underline decoration-paper/30 underline-offset-4 transition hover:text-accent"
                >
                  FORM
                </a>
                .
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="mailto:jedaws@gmail.com?subject=AI%20%2F%20web%20project&body=Hi%20Jeremiah%2C%20%0A%0AWe%27d%20like%20help%20with..."
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-paper shadow-xl shadow-accent/30 transition hover:-translate-y-0.5 hover:bg-accent-muted hover:shadow-2xl hover:shadow-accent/40"
                >
                  Start a conversation
                  <span aria-hidden="true">→</span>
                </a>
                <a
                  href="/apps"
                  className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-5 py-3 text-sm font-medium transition hover:border-accent hover:text-accent"
                >
                  See what I&rsquo;ve built
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-paper/55">
                  Résumés
                </p>
                <ul id="resumes" className="mt-3 flex flex-wrap gap-2 scroll-mt-20">
                  {RESUMES.map((r) => (
                    <li key={r.id}>
                      <a
                        href={r.href}
                        download
                        className="group inline-flex items-center gap-2 rounded-full border border-paper/25 bg-ink/40 px-4 py-2 text-sm font-medium transition hover:border-accent hover:bg-accent/10 hover:text-accent"
                      >
                        <r.Icon className="h-4 w-4 text-accent" />
                        <span>{r.label}</span>
                        <IconDownload className="h-3.5 w-3.5 text-paper/50 transition group-hover:text-accent" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-paper/55">
                  Find me elsewhere
                </p>
                <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {SOCIAL.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 rounded-full border border-paper/20 px-3 py-2 text-sm text-paper/85 transition hover:border-accent hover:text-accent"
                      >
                        <s.Icon className="h-4 w-4" />
                        <span>{s.label}</span>
                        <IconArrowUpRight className="ml-auto h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Hard divider before contact details so they read as a separate block */}
          <div className="mt-16 scroll-mt-20 border-t border-paper/15 pt-8" id="contact">
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
              <li>
                <a
                  href="mailto:jedaws@gmail.com"
                  className="group inline-flex items-center gap-2 transition hover:text-accent"
                >
                  <IconMail className="h-4 w-4 text-accent" />
                  jedaws@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+13108455702"
                  className="group inline-flex items-center gap-2 transition hover:text-accent"
                >
                  <IconPhone className="h-4 w-4 text-accent" />
                  (310) 845-5702
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-paper/70">
                <IconMapPin className="h-4 w-4 text-accent" />
                Buford, GA · Atlanta area
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Genuine footer — visually distinct from the hire-me section */}
      <footer className="bg-black/40 py-8 text-paper">
        <div className="mx-auto max-w-6xl px-6">
          {/* Off-the-clock line — discoverable but understated */}
          <p className="mb-3 text-center font-serif text-sm italic text-paper/70">
            Off the clock, I&apos;m{" "}
            <a
              href="/movies.html"
              className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper/60"
            >
              a movie-obsessed nerd with a collection
            </a>
            .
          </p>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-paper/40">
            <span>© {new Date().getFullYear()} Jeremiah Daws.</span>
            <span>Built by hand. Hosted on Vercel.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
