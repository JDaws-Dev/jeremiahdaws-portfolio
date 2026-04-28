import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const base = (extra?: string) =>
  `inline-block ${extra ?? ""}`.trim();

export function IconFilm(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props} className={base(props.className)}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 8h18M3 16h18M8 3v18M16 3v18" />
    </svg>
  );
}

export function IconBook(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props} className={base(props.className)}>
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" />
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    </svg>
  );
}

export function IconWrench(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props} className={base(props.className)}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-3 3-2.7-.7-.7-2.7z" />
    </svg>
  );
}

export function IconSpark(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props} className={base(props.className)}>
      <path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M5 19l4-4M15 9l4-4" />
    </svg>
  );
}

export function IconAll(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props} className={base(props.className)}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

export function IconArrowRight(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props} className={base(props.className)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconArrowUpRight(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props} className={base(props.className)}>
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

export function IconDownload(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props} className={base(props.className)}>
      <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
    </svg>
  );
}

export function IconMail(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props} className={base(props.className)}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function IconPhone(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props} className={base(props.className)}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  );
}

export function IconMapPin(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props} className={base(props.className)}>
      <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

export function IconLinkedIn(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props} className={base(props.className)}>
      <path d="M4.98 3.5a2.5 2.5 0 11.02 5 2.5 2.5 0 01-.02-5zM3 9.5h4v11H3v-11zM10 9.5h3.7v1.5h.05c.5-1 1.8-2 3.7-2 4 0 4.55 2.6 4.55 6v5.5h-4v-4.9c0-1.2-.02-2.7-1.65-2.7-1.65 0-1.9 1.3-1.9 2.6v5h-4v-11z" />
    </svg>
  );
}

export function IconYouTube(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props} className={base(props.className)}>
      <path d="M23 7.4a3 3 0 00-2-2C19 5 12 5 12 5s-7 0-9 .4a3 3 0 00-2 2A30 30 0 001 12a30 30 0 000 4.6 3 3 0 002 2c2 .4 9 .4 9 .4s7 0 9-.4a3 3 0 002-2A30 30 0 0023 12a30 30 0 000-4.6zM10 15.5v-7l6 3.5z" />
    </svg>
  );
}

export function IconImdb(props: Props) {
  // Card-shaped icon — the adjacent label carries the brand name to avoid duplication.
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props} className={base(props.className)}>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M7 10v4M10.5 14V10M10.5 10l1.5 4 1.5-4v4M16 10v4h2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconX(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props} className={base(props.className)}>
      <path d="M18.244 2H21l-6.52 7.45L22 22h-6.27l-4.93-6.45L5 22H2.24l6.97-7.96L2 2h6.42l4.46 5.9L18.24 2zm-1.1 18.13h1.85L7.94 3.78H6L17.14 20.13z" />
    </svg>
  );
}

export function IconGithub(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props} className={base(props.className)}>
      <path d="M12 1.5A10.5 10.5 0 001.5 12c0 4.65 3.02 8.6 7.2 10 .53.1.72-.23.72-.5v-1.8c-2.94.64-3.56-1.42-3.56-1.42-.48-1.22-1.18-1.55-1.18-1.55-.96-.66.07-.65.07-.65 1.07.07 1.63 1.1 1.63 1.1.95 1.62 2.5 1.15 3.1.88.1-.7.37-1.16.67-1.43-2.35-.27-4.82-1.18-4.82-5.23 0-1.16.4-2.1 1.1-2.85-.1-.27-.48-1.35.1-2.83 0 0 .9-.3 2.95 1.1A10.2 10.2 0 0112 6.6c.92 0 1.85.13 2.72.37 2.05-1.4 2.95-1.1 2.95-1.1.6 1.48.22 2.56.1 2.83.7.75 1.1 1.7 1.1 2.85 0 4.06-2.47 4.96-4.83 5.22.38.33.72.97.72 1.96v2.9c0 .28.2.6.73.5A10.5 10.5 0 0022.5 12 10.5 10.5 0 0012 1.5z" />
    </svg>
  );
}

export function IconSun(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props} className={base(props.className)}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

export function IconMoon(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props} className={base(props.className)}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function IconInstagram(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props} className={base(props.className)}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconPlay(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props} className={base(props.className)}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
