"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { IconMail, IconMoon, IconSun } from "./icons";

const LINKS = [
  { href: "/work", label: "Filmmaker" },
  { href: "/maker", label: "Maker" },
  { href: "/apps", label: "AI Builder" },
  { href: "/teach", label: "Teacher" },
  { href: "/#hire", label: "Hire" },
];

export function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-40 transition-all",
        scrolled || menuOpen
          ? "border-b border-ink/10 bg-paper/85 backdrop-blur-md dark:border-paper/10 dark:bg-ink/85"
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
        <nav className="hidden flex-1 items-center justify-center gap-6 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink-muted transition hover:text-ink dark:text-paper-muted dark:hover:text-paper"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <a
            href="mailto:jedaws@gmail.com"
            className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-3 py-1.5 text-xs font-medium transition hover:border-accent hover:text-accent dark:border-paper/30 dark:hover:border-accent dark:hover:text-accent"
          >
            <IconMail className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">jedaws@gmail.com</span>
            <span className="sm:hidden">Email</span>
          </a>
          <button
            type="button"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-ink/15 transition hover:border-accent hover:text-accent dark:border-paper/20 dark:hover:border-accent dark:hover:text-accent"
            aria-label="Toggle dark mode"
            suppressHydrationWarning
          >
            {!mounted ? (
              <span aria-hidden="true">·</span>
            ) : resolvedTheme === "dark" ? (
              <IconSun className="h-3.5 w-3.5" />
            ) : (
              <IconMoon className="h-3.5 w-3.5" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-ink/15 transition hover:border-accent hover:text-accent dark:border-paper/20 md:hidden"
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

      {menuOpen ? (
        <nav
          id="mobile-nav"
          className="border-t border-ink/10 bg-paper px-4 py-3 dark:border-paper/10 dark:bg-ink md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-md px-3 py-2 text-base font-medium text-ink transition hover:bg-paper-muted hover:text-accent dark:text-paper dark:hover:bg-ink/60"
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
