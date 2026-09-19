# jeremiahdaws.com

Personal portfolio for Jeremiah Daws, Producer / Director at FORM (Atlanta). Live at
https://jeremiahdaws.com (also jeremiahdaws.vercel.app). This repo is **public**: keep
secrets, client fees, and private notes out of it.

## Stack and deploy

- Next.js 16 (App Router) + TypeScript + Tailwind 3 + MDX. Hosted on Vercel.
- Pushing to `main` deploys to production through the Vercel GitHub integration.
  A daily "Movies: auto-sync" job also commits to `main`, so `git pull` before you work.
- Vercel project: `family-planner/jeremiahdaws-portfolio` (the CLI is linked).
  DNS for jeremiahdaws.com lives in the `jeremiahdaws` Vercel team.
- `npm run dev` for local work, `npm run build` before pushing.

## Pages

| Route | What it is |
|---|---|
| `/` | Hero → ChoosePath (3 lane cards) → Featured (pinned entries) → About → HireSection |
| `/work` | Filmmaker lane: WorkHero, NetworkCredits (FORM + Disney + broadcast), LaneArchive, PageCta |
| `/maker` | Maker lane: past-tense shop story (Bullfrog Machining 2021–2026), builds, archive |
| `/apps` | AI Builder lane: ProductBuilds (GetSafeFamily, Artios Cafe, FORM site, ReadyTote), AgentStack, AlsoShipped |
| `/teach` | Hidden. Redirects to `/`. TeachHero / ProgramsBuilt / EmergingTracks are kept for later. |
| `/admin`, `/jarvis`, `/mozart` | Private tools, not linked from the site |

Every lane page ends with `PageCta`, which holds the contact form.

## Content model

- One MDX file per portfolio entry in `content/portfolio/`. Frontmatter: `title`, `role`,
  `year`, `lane` (`video` | `making` | `building`), `org`, `externalUrl`, `thumbnail`,
  `pinned`, `tags`, plus optional embeds/links.
- `pinned: true` puts an entry in the home page Featured strip (max 6, balanced by lane).
- `org` feeds the Client filter in LaneArchive. Keep it short and brand-shaped.
- `content/_archive/` holds entries that are off the site (retired or not ready yet).
  Nothing in it is served. Move a file back into `content/portfolio/` to publish it.
- Card images are 16:10. Screenshot sites at 1280×800 (2× scale) so cards don't crop.

## Contact form

`components/ContactForm.tsx` posts to `app/api/contact/route.ts`, which sends a branded
HTML email through Resend to jedaws@gmail.com, from `contact@jeremiahdaws.com`, with
reply-to set to the visitor. Needs `RESEND_API_KEY` (in `.env.local` and Vercel
production). The key is sending-only and scoped to the jeremiahdaws.com domain.
The form has a honeypot field (`company`).

## Design

- Light theme only (dark mode was removed on purpose). Don't reintroduce `dark:` styling.
- Palette in `tailwind.config.ts`: `ink`, `paper`, `accent` (brick red `#b3312c`),
  `blue` (denim `#2f5b96`, plus `blue-soft` and `blue-wash`).
- Pattern: small uppercase section labels in blue, headline highlights and buttons in red.
- Serif headlines (Georgia stack), system sans body.

## Copy rules

- He works full-time at FORM. The site is a portfolio, not a job hunt: no "open to
  full-time", "available", or "hire me" for employment. "Hire" is only for his side AI
  work (consulting, training, vibe coding, AI-powered websites, DaVinci Resolve automation).
- Name only FORM work he did himself (Calendar Jockeys, the website, an internal AI
  assistant described only in general terms). Don't list FORM's clients as his.
- Teaching is past (2022–2026) and hidden. Bullfrog Machining is closed; maker copy is past tense.
- Don't put "Artios" in headlines or section frames (the product name "Artios Cafe" is fine).
- Don't state what clients pay.
- Plain, specific language. Only claim what's true and checkable.
