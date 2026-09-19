import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const SITE_URL = "https://jeremiahdaws.vercel.app";
const NAME = "Jeremiah Daws";
const TAGLINE = "Producer / Director at FORM — Atlanta";
const SHORT_DESC =
  "Producer / Director at FORM, an Atlanta story company, where he directs the comedy series Calendar Jockeys. Filmmaker, maker, and AI builder. Six years at Disney producing branded content (Marvel, Lucasfilm, ABC, Freeform). Broadcast editor on National Geographic, Hallmark, and Ricky Schroder. AI consultant (consulting, training, vibe-coding builds, and AI-powered websites). Founder of GetSafeFamily (kid-safe content suite with paying customers). SkillsUSA National Silver, former Tormach brand ambassador.";

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
    description: "Producer / Director at FORM. Filmmaker · Maker · AI Builder. Atlanta.",
    siteName: NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `${NAME} — ${TAGLINE}`,
    description: "Producer / Director at FORM. Filmmaker · Maker · AI Builder.",
    creator: "@JeremiahDaws",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: NAME,
  url: SITE_URL,
  jobTitle: "Producer / Director",
  worksFor: { "@type": "Organization", name: "FORM", url: "https://www.formgreatstories.com/" },
  address: { "@type": "PostalAddress", addressLocality: "Buford", addressRegion: "GA", addressCountry: "US" },
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
