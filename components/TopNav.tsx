"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { IconMail } from "./icons";

const LINKS = [
  { href: "/#films", label: "AI films" },
  { href: "/#process", label: "Process" },
  { href: "/#form", label: "FORM" },
  { href: "/work", label: "Film work" },
  { href: "/#hire", label: "Contact" },
];

export function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const bar = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const home = pathname === "/";

  // On home, highlight the section in view. Elsewhere the route is the highlight.
  useEffect(() => {
    setActive(null);
    if (!home) return;
    const ids = LINKS.map((l) => l.href.split("#")[1]).filter(Boolean) as string[];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [home]);

  // One frame per scroll burst; page height is re-measured only when it changes.
  useEffect(() => {
    let max = 0;
    let tick = 0;
    const measure = () => {
      max = document.documentElement.scrollHeight - window.innerHeight;
    };
    const paint = () => {
      tick = 0;
      const y = window.scrollY;
      setScrolled(y > 80);
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    };
    const onScroll = () => {
      if (!tick) tick = requestAnimationFrame(paint);
    };
    const ro = new ResizeObserver(() => {
      measure();
      onScroll();
    });
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    measure();
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ro.disconnect();
      cancelAnimationFrame(tick);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled || menuOpen
          ? "border-b border-ink/10 bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:gap-6 sm:px-6">
        <a
          href="/"
          onClick={() => setMenuOpen(false)}
          className="font-serif text-base font-medium tracking-tight"
        >
          Jeremiah Daws<span className="text-accent">.</span>
        </a>
        <nav aria-label="Main" className="hidden flex-1 items-center justify-center gap-6 md:flex">
          {LINKS.map((l) => {
            const on = home
              ? active !== null && l.href.endsWith(`#${active}`)
              : !l.href.includes("#") && pathname.startsWith(l.href);
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={on ? "true" : undefined}
                className={[
                  "relative py-1 text-sm font-medium transition-colors hover:text-ink",
                  "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-accent after:transition-transform after:duration-300",
                  on ? "text-ink after:scale-x-100" : "text-ink-muted after:scale-x-0 hover:after:scale-x-100",
                ].join(" ")}
              >
                {l.label}
              </a>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <a
            href="mailto:jedaws@gmail.com"
            className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-3 py-1.5 text-xs font-medium transition hover:border-accent hover:text-accent"
          >
            <IconMail className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">jedaws@gmail.com</span>
            <span className="sm:hidden">Email</span>
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-ink/15 transition hover:border-accent hover:text-accent md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              {menuOpen ? (
                <>
                  <path d="M5 5l14 14" />
                  <path d="M19 5L5 19" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={bar}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-accent/70"
        style={{ transform: "scaleX(0)" }}
      />

      {menuOpen ? (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-t border-ink/10 bg-paper px-4 py-3 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-md px-3 py-2 text-base font-medium text-ink transition hover:bg-paper-muted hover:text-accent"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
