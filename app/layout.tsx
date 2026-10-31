import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://jeremiahdaws.com";
const NAME = "Jeremiah Daws";
const TAGLINE = "AI films, AI builds, AI training";
const SHORT_DESC =
  "Jeremiah Daws makes films with AI, builds AI-powered websites and tools, and trains teams to use AI. Producer / Director at FORM, an Atlanta story company, where he directs the comedy series Calendar Jockeys. Six years producing branded content at Disney (Marvel, Lucasfilm, ABC, Freeform); editor for National Geographic and Hallmark.";

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
    description: "I make films with AI, build tools with AI, and teach people to do both. Producer / Director at FORM, Atlanta.",
    siteName: NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `${NAME} — ${TAGLINE}`,
    description: "I make films with AI, build tools with AI, and teach people to do both.",
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
  jobTitle: "Producer / Director",
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
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
