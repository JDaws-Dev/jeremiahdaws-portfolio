import Image from "next/image";
import { IconArrowRight } from "./icons";

const FORM_URL = "https://www.formgreatstories.com/";

const WORK = [
  {
    title: "Calendar Jockeys",
    kind: "Animated comedy series",
    role: "Director",
    body: "Gus and Wendell co-founded a production agency, and they'd make great things all the time if the meetings ever stopped.",
    href: "https://calendarjockeys.com/",
    linkLabel: "calendarjockeys.com",
    img: "/portfolio/calendar-jockeys.jpg",
  },
  {
    title: "Teeth Brushed?",
    kind: "Brand-style test",
    role: "",
    body: "A dad, his daughter, and a very familiar bedtime question. FORM's first exploration of Absurd.",
    href: "https://www.youtube.com/watch?v=I7cHxHLN1r4",
    linkLabel: "Watch on YouTube",
    img: "/portfolio/stills/ai-teeth-brushed.jpg",
  },
];

export function FormWork() {
  return (
    <section id="form" className="scroll-mt-14 border-t border-ink/10 bg-paper py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue">At FORM</p>
            <h2 className="mt-2 text-balance font-serif text-3xl leading-tight tracking-[-0.01em] md:text-[2.6rem]">
              Producer / Director at FORM.
            </h2>
          </div>
          <p className="text-base text-ink/75">
            FORM is an Atlanta story company making brand films, series and
            podcasts. This is work I directed there. For a
            brand film, spot or series,{" "}
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="underline decoration-ink/30 underline-offset-4 transition hover:text-accent">
              reach out to FORM
            </a>
            .
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {WORK.map((w) => (
            <article key={w.title}>
              <a href={w.href} target="_blank" rel="noopener noreferrer" className="group block">
                <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
                  <Image src={w.img} alt={w.title} fill sizes="(min-width: 768px) 36rem, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.02]" />
                  <span className="absolute left-3 top-3 rounded-full bg-paper/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink">
                    Made at FORM
                  </span>
                </div>
              </a>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                {w.role ? `${w.kind} · ${w.role}` : w.kind}
              </p>
              <h3 className="mt-1 font-serif text-2xl leading-tight">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">{w.body}</p>
              <a href={w.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium transition hover:text-accent">
                {w.linkLabel} <IconArrowRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-[1.7fr_1fr] md:items-center">
          <div className="relative">
            <video
              controls
              playsInline
              preload="none"
              poster="/portfolio/stills/previz-to-picture.jpg"
              className="aspect-video w-full rounded-xl bg-black"
            >
              <source src="/portfolio/previz-to-picture.mp4" type="video/mp4" />
            </video>
            <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-paper/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink">
              Made at FORM
            </span>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">Previz to picture · Test</p>
            <h3 className="mt-2 text-balance font-serif text-2xl leading-tight">
              Blocked first, then generated to match.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/75">
              A 30-second test made at FORM: a kid sky-surfing behind a
              seaplane, a girl in a submarine racing a sailfish. Every shot was
              blocked in a rough previz in Blender first, shown in the corner,
              so the camera, staging and timing were decided before anything
              was generated.
            </p>
          </div>
        </div>

        <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm font-medium transition hover:border-accent hover:text-accent">
          Work with FORM: formgreatstories.com <IconArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
