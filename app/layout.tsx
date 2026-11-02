import type { Metadata } from "next";
import "./globals.css";
import { MotionLayer } from "@/components/MotionLayer";

const SITE_URL = "https://jeremiahdaws.com";
const NAME = "Jeremiah Daws";
const TAGLINE = "Producer, director, editor";
const SHORT_DESC =
  "Jeremiah Daws is a producer, director and editor in Atlanta. Producer / Director at FORM, where he directs the comedy series Calendar Jockeys. Six years producing and editing marketing video at Disney (Marvel, Lucasfilm, ABC, Freeform); editor for National Geographic and Hallmark. He also makes short films with AI.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${NAME} — ${TAGLINE}`,
    template: `%s — ${NAME}`,
  },
  description: SHORT_DESC,
  authors: [{ name: NAME }],
  creator: NAME,
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: `${NAME} — ${TAGLINE}`,
    description: "Producer, director, editor. Producer / Director at FORM, Atlanta. Disney, National Geographic, Hallmark, and short films made with AI.",
    siteName: NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `${NAME} — ${TAGLINE}`,
    description: "Producer, director, editor. Disney, National Geographic, Hallmark, FORM.",
    creator: "@JeremiahDaws",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: NAME,
  url: SITE_URL,
  jobTitle: "Producer / Director at FORM",
  worksFor: { "@type": "Organization", name: "FORM", url: "https://www.formgreatstories.com/" },
  address: { "@type": "PostalAddress", addressLocality: "Atlanta", addressRegion: "GA", addressCountry: "US" },
  email: "jedaws@gmail.com",
  telephone: "+1-310-845-5702",
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Georgia State University" },
    { "@type": "EducationalOrganization", name: "Lanier Technical College" },
  ],
  sameAs: [
    "https://www.linkedin.com/in/jeremiah-daws-0376862a/",
    "https://www.imdb.com/name/nm1268177/",
    "https://www.youtube.com/c/JeremiahDaws",
    "https://www.instagram.com/jeremiahdaws/",
    "https://twitter.com/JeremiahDaws",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var r=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;r.classList.add('motion');setTimeout(function(){if(!r.hasAttribute('data-motion-ready'))r.classList.remove('motion')},3000)})()",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-paper"
        >
          Skip to content
        </a>
        {children}
        <MotionLayer />
      </body>
    </html>
  );
}
