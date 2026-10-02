import type { Metadata } from "next";
import { PolicyPage, YT_TERMS, GOOGLE_PRIVACY, GOOGLE_PERMISSIONS, CONTACT, POLICY_DATE } from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Mozart Studio terms of use",
  description: "Terms of use for Mozart Studio, a private assistant that uses YouTube API Services.",
};

export default function MozartTerms() {
  return (
    <PolicyPage title="Terms of use" updated={POLICY_DATE}>
      <p>Mozart Studio is a private, family-run assistant for one creator, Andrew Trotter, and his own YouTube channel. It is not offered to the public.</p>

      <h2>YouTube</h2>
      <p>
        Mozart Studio uses YouTube API Services.{" "}
        <strong>
          By using Mozart Studio&apos;s YouTube features you agree to be bound by the <a href={YT_TERMS}>YouTube Terms of Service</a>.
        </strong>{" "}
        See also the <a href={GOOGLE_PRIVACY}>Google Privacy Policy</a> and the <a href="/mozart-privacy">Mozart Studio privacy policy</a>.
      </p>

      <h2>How uploads work</h2>
      <ul>
        <li>Nothing is uploaded without Andrew&apos;s explicit yes for that one video (a button, or his own words). A yes never covers future videos.</li>
        <li>Uploads start private. He decides in YouTube Studio when a video becomes public.</li>
        <li>
          He is responsible for having the rights to what he uploads. Mozart Studio only uses music, footage and images that are his own, in
          the public domain, openly licensed, or made for him, and credits public-domain and licensed sources in each video&apos;s description.
        </li>
      </ul>

      <h2>Disconnecting</h2>
      <p>
        He can disconnect at any time: &quot;Disconnect YouTube&quot; on the connect page, telling the assistant, or{" "}
        <a href={GOOGLE_PERMISSIONS}>{GOOGLE_PERMISSIONS}</a>. See the privacy policy for what is deleted.
      </p>

      <h2>No warranty</h2>
      <p>Mozart Studio is provided as is, for personal use, without any warranty.</p>

      <h2>Contact</h2>
      <p>
        <a href={`mailto:${CONTACT}`}>{CONTACT}</a>
      </p>
    </PolicyPage>
  );
}
