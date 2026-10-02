import type { Metadata } from "next";
import { PolicyPage, YT_TERMS, GOOGLE_PRIVACY, CONTACT, POLICY_DATE } from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Mozart Studio",
  description: "A private, family-run music assistant that uses YouTube API Services to upload one creator's approved videos to his own channel.",
};

export default function MozartStudio() {
  return (
    <PolicyPage title="Mozart Studio" updated={POLICY_DATE}>
      <p>
        Mozart Studio is a private, family-run music assistant. It helps one composer and pianist, Andrew Trotter, make short
        music-education videos (ear-training quizzes, theory explainers, short films about composers) and put them on his own YouTube channel.
      </p>
      <p>
        It uses <strong>YouTube API Services</strong> to upload the videos he approves (always private first), set their titles and
        descriptions, and show him how his channel is doing. It has no other users and is not open to the public; the sign-in page is private
        to Andrew.
      </p>
      <p>
        <a href="/mozart-privacy">Privacy policy</a> · <a href="/mozart-terms">Terms of use</a> · <a href={YT_TERMS}>YouTube Terms of Service</a> ·{" "}
        <a href={GOOGLE_PRIVACY}>Google Privacy Policy</a>
      </p>
      <p>
        Contact: <a href={`mailto:${CONTACT}`}>{CONTACT}</a>
      </p>
    </PolicyPage>
  );
}
