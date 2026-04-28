import { IconArrowRight, IconDownload, IconMail } from "./icons";

export type PageCtaProps = {
  eyebrow: string;
  title: string;
  body: string;
  emailSubject: string;
  emailBody?: string;
  resume: { href: string; label: string };
};

export function PageCta({
  eyebrow,
  title,
  body,
  emailSubject,
  emailBody,
  resume,
}: PageCtaProps) {
  const mail =
    `mailto:jedaws@gmail.com?subject=${encodeURIComponent(emailSubject)}` +
    (emailBody ? `&body=${encodeURIComponent(emailBody)}` : "");
  return (
    <>
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-accent to-transparent" />
      <section className="relative overflow-hidden bg-ink py-20 text-paper">
        <div className="pointer-events-none absolute inset-0 -z-0">
          <div className="absolute -left-32 top-12 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-accent-muted/15 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent">
            {eyebrow}
          </p>
          <h2
            className="mt-3 max-w-3xl font-serif leading-[1.02] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2rem, 5.5vw, 3.5rem)" }}
          >
            {title}
          </h2>
          <p className="mt-5 max-w-2xl text-base text-paper/80 md:text-lg">
            {body}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={mail}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-semibold text-paper shadow-xl shadow-accent/30 transition hover:-translate-y-0.5 hover:bg-accent-muted hover:shadow-2xl hover:shadow-accent/40"
            >
              <IconMail className="h-4 w-4" />
              Start a conversation
              <IconArrowRight className="h-4 w-4" />
            </a>
            <a
              href={resume.href}
              download
              className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-5 py-2.5 text-sm font-medium text-paper transition hover:border-accent hover:text-accent"
            >
              <IconDownload className="h-4 w-4" />
              {resume.label}
            </a>
            <a
              href="tel:+13108455702"
              className="text-sm font-medium text-paper/70 transition hover:text-accent"
            >
              or call (310) 845-5702
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
