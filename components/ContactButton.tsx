"use client";

import { useState, type ReactNode } from "react";

const EMAIL = "jedaws@gmail.com";

// A mailto link silently does nothing when the visitor has no mail app set up
// (common in in-app browsers and for Gmail-only phones), so after a tap we also
// show a Gmail compose link, a copy button, and the address itself.
export function ContactButton({
  subject,
  body,
  className,
  children,
}: {
  subject: string;
  body?: string;
  className: string;
  children: ReactNode;
}) {
  const [shown, setShown] = useState(false);
  const [copied, setCopied] = useState(false);

  const query = new URLSearchParams({ subject, ...(body ? { body } : {}) })
    .toString()
    .replace(/\+/g, "%20");
  const mailto = `mailto:${EMAIL}?${query}`;
  const gmail =
    `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent(subject)}` +
    (body ? `&body=${encodeURIComponent(body)}` : "");

  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <>
      <a href={mailto} onClick={() => setShown(true)} className={className}>
        {children}
      </a>
      {shown ? (
        <div className="basis-full text-sm text-paper/75">
          Mail app didn&rsquo;t open?{" "}
          <a
            href={gmail}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-paper underline decoration-paper/40 underline-offset-4 transition hover:text-accent"
          >
            Open in Gmail
          </a>
          {" · "}
          <button
            type="button"
            onClick={copy}
            className="font-medium text-paper underline decoration-paper/40 underline-offset-4 transition hover:text-accent"
          >
            {copied ? "Copied!" : "Copy email address"}
          </button>
          {" · "}
          <span className="select-all">{EMAIL}</span>
        </div>
      ) : null}
    </>
  );
}
