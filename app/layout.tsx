import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const SITE_URL = "https://jeremiahdaws.vercel.app";
const NAME = "Jeremiah Daws";
const TAGLINE = "Filmmaker · Maker · AI Builder · Teacher — Atlanta";
const SHORT_DESC =
  "Atlanta-based filmmaker, machinist, AI builder, and teacher. Six years at Disney producing branded content (Marvel, Lucasfilm, ABC, Freeform). Broadcast editor on National Geographic, Hallmark, and Ricky Schroder. Founder of AnswerAxis (AI consulting and custom builds for small business) and GetSafeFamily (kid-safe content suite). SkillsUSA National Silver, Tormach brand ambassador. Department Head running the film and creative-tech programs at a private classical school.";

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
    description: "Filmmaker · Maker · AI Builder · Teacher. Buford, GA.",
    siteName: NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `${NAME} — ${TAGLINE}`,
    description: "Filmmaker · Maker · AI Builder · Teacher.",
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
  jobTitle: "Video Producer, AI Builder, Maker, Teacher",
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
    "https://www.answeraxis.com/",
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
