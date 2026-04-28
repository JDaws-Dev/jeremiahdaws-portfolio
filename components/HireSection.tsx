import {
  IconArrowUpRight,
  IconBook,
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
  { id: "education", label: "Education", href: "/resumes/resume-education.pdf", Icon: IconBook },
  { id: "maker", label: "Maker", href: "/resumes/resume-maker.pdf", Icon: IconWrench },
  { id: "tech", label: "Apps & AI", href: "/resumes/resume-tech.pdf", Icon: IconSpark },
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
        className="relative bg-ink py-24 text-paper"
      >
        {/* Soft accent glows so the section reads as a "stage" not a footer */}
        <div className="pointer-events-none absolute inset-0 -z-0">
          <div className="absolute -left-32 top-12 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-accent-muted/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent">
            Hire me
          </p>
          <h2 className="mt-3 font-serif text-6xl leading-[0.95] tracking-[-0.025em] md:text-[7rem]">
            Let&rsquo;s make<br />something.
          </h2>

          <div className="mt-10 grid gap-10 md:grid-cols-[1.2fr_1fr] md:gap-16">
            <div>
              <p className="text-base text-paper/80 md:text-lg">
                Full-time, contract, or one-off. Atlanta or remote. I&rsquo;m most
                useful on projects that need a creative eye, a technical brain, a
                teacher&rsquo;s patience, and a maker&rsquo;s willingness to figure
                it out — the kind of messy, undefined work where the answer
                isn&rsquo;t obvious yet.
              </p>
              <p className="mt-4 text-sm text-paper/55">
                I&rsquo;m probably interested if it&rsquo;s a film/edit role at a
                studio that respects craft, a school building a film or creative-tech
                program, a shop or product team that needs design + fabrication +
                content under one roof, or a small team shipping AI tools for real
                people.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="mailto:jedaws@gmail.com?subject=Hiring%20Jeremiah%20Daws&body=Hi%20Jeremiah%2C%20%0A%0AI%20saw%20your%20site%20and%20wanted%20to%20talk%20about..."
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-paper shadow-xl shadow-accent/30 transition hover:-translate-y-0.5 hover:bg-accent-muted hover:shadow-2xl hover:shadow-accent/40"
                >
                  Start a conversation
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-paper/55">
                  Or grab a résumé
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
          <div className="mt-16 border-t border-paper/15 pt-8" id="contact">
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
      <footer className="bg-black/40 py-6 text-paper">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-6 text-xs text-paper/40">
          <span>© {new Date().getFullYear()} Jeremiah Daws.</span>
          <span>Built by hand. Hosted on Vercel.</span>
        </div>
      </footer>
    </>
  );
}
