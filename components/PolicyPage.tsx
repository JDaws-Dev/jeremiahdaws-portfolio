import Link from "next/link";
import type { ReactNode } from "react";

/** Plain page shell for Mozart Studio's policy pages (public, outside the /mozart gate). */
export function PolicyPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <main className="min-h-screen bg-paper">
      <article className="mx-auto max-w-2xl px-6 py-16 text-[15px] leading-7 text-ink">
        <p className="text-xs uppercase tracking-[0.22em] text-blue">Mozart Studio</p>
        <h1 className="mt-3 font-serif text-4xl leading-tight">{title}</h1>
        <p className="mt-2 text-sm text-ink-muted">Last updated {updated}</p>
        <div className="mt-8 space-y-4 [&_a]:text-accent [&_a]:underline [&_h2]:mt-8 [&_h2]:font-serif [&_h2]:text-xl [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
          {children}
        </div>
        <p className="mt-12 text-sm text-ink-muted">
          <Link href="/mozart-studio">Mozart Studio</Link> · <Link href="/mozart-privacy">Privacy policy</Link> ·{" "}
          <Link href="/mozart-terms">Terms of use</Link>
        </p>
      </article>
    </main>
  );
}

export const YT_TERMS = "https://www.youtube.com/t/terms";
export const GOOGLE_PRIVACY = "http://www.google.com/policies/privacy";
export const GOOGLE_PERMISSIONS = "https://myaccount.google.com/permissions";
export const GOOGLE_SECURITY = "https://security.google.com/settings/security/permissions";
export const CONTACT = "jedaws@gmail.com";
export const POLICY_DATE = "2 October 2026";
