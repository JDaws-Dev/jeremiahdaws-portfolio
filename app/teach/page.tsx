import { redirect } from "next/navigation";

// Teacher lane is hidden. TeachHero, ProgramsBuilt, and EmergingTracks are
// kept in components/ so the page can be restored from git history.
export default function TeachPage() {
  redirect("/");
}
