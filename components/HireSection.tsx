import {
  IconArrowUpRight,
  IconImdb,
  IconInstagram,
  IconLinkedIn,
  IconMail,
  IconMapPin,
  IconPhone,
  IconX,
  IconYouTube,
} from "./icons";
import { ContactForm } from "./ContactForm";
import { SiteFooter } from "./SiteFooter";

const SERVICES = [
  "Notes on a cut or a script",
  "Characters and looks that stay consistent",
  "Shot lists built for generation",
  "AI voices and sound",
  "Edit, grade and finish in DaVinci Resolve",
  "One-on-one AI training, $100 an hour",
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
      <div className="h-1 w-full bg-gradient-to-r from-accent via-accent-muted to-blue" />

      <section
        id="hire"
        className="relative scroll-mt-14 bg-ink py-24 text-paper"
      >
        {/* Soft accent glows so the section reads as a "stage" not a footer */}
        <div className="pointer-events-none absolute inset-0 -z-0">
          <div className="absolute -left-32 top-12 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-blue/25 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent">
            Work with me · AI film consulting
          </p>
          <h2 className="mt-3 font-serif text-6xl leading-[0.95] tracking-[-0.025em] md:text-[7rem]">
            Work with me.
          </h2>

          <div className="mt-10 grid gap-10 md:grid-cols-[1.2fr_1fr] md:gap-16">
            <div>
              <p className="text-base text-paper/80 md:text-lg">
                Outside FORM, I consult on other people&rsquo;s AI films: story,
                look, shots, sound and the finish. Tell me what you&rsquo;re making
                and where it&rsquo;s stuck.
              </p>
              <ul className="mt-5 grid gap-2 text-sm text-paper/85 sm:grid-cols-2">
                {SERVICES.map((svc) => (
                  <li key={svc} className="flex gap-2">
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{svc}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-paper/55">
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

              <div className="mt-8">
                <ContactForm
                  topic="AI film project"
                  placeholder="What are you making, and where are you stuck?"
                />
              </div>
              <a
                href="/apps"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-paper/75 transition hover:text-accent"
              >
                I also build AI-powered websites and tools
                <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className="space-y-8">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-paper/55">
                  What happens next
                </p>
                <ol className="mt-3 space-y-3 text-sm text-paper/85">
                  <li className="flex gap-3"><span className="font-serif text-lg leading-none text-accent">1</span>You tell me what you have in mind, in a sentence or a page.</li>
                  <li className="flex gap-3"><span className="font-serif text-lg leading-none text-accent">2</span>I reply personally, with questions, then a short call.</li>
                  <li className="flex gap-3"><span className="font-serif text-lg leading-none text-accent">3</span>You get a written plan with scope and price before anything starts.</li>
                </ol>
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
                Atlanta area
              </li>
            </ul>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
