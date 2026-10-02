import type { Metadata } from "next";
import { PolicyPage, YT_TERMS, GOOGLE_PRIVACY, GOOGLE_PERMISSIONS, GOOGLE_SECURITY, CONTACT, POLICY_DATE } from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Mozart Studio privacy policy",
  description: "How Mozart Studio uses YouTube API Services and the data it accesses.",
};

export default function MozartPrivacy() {
  return (
    <PolicyPage title="Privacy policy" updated={POLICY_DATE}>
      <p>
        Mozart Studio is a private assistant run by one family. It helps one creator, Andrew Trotter, make videos and put them on
        his own YouTube channel. It is not a public service and has no other users.
      </p>

      <h2>YouTube API Services</h2>
      <p>
        Mozart Studio uses <strong>YouTube API Services</strong> to work with Andrew&apos;s channel. By using its YouTube features you agree to
        the <a href={YT_TERMS}>YouTube Terms of Service</a>. Google&apos;s handling of data is covered by the{" "}
        <a href={GOOGLE_PRIVACY}>Google Privacy Policy</a>.
      </p>

      <h2>What it can access</h2>
      <p>When Andrew connects his channel he grants exactly three permissions, and nothing else (no Gmail, no Drive, no contacts):</p>
      <ul>
        <li><strong>youtube.upload</strong>: upload the videos he approves and set their thumbnails.</li>
        <li><strong>youtube.readonly</strong>: read his channel&apos;s name, his list of videos, and their public statistics (views, likes, comments).</li>
        <li><strong>youtube.force-ssl</strong>: change the title, description, tags and privacy of his videos, add them to his playlists, and remove an old upload when he asks.</li>
      </ul>

      <h2>Why</h2>
      <p>
        To do what Andrew asks: upload a video after he approves it (nothing goes up without his yes, and every upload starts private),
        fill in its title, description and tags, check whether a video is private or public before saying so, show him how his channel is
        doing, and suggest video ideas. That is the only use.
      </p>

      <h2>What is stored, and where</h2>
      <ul>
        <li>
          <strong>The sign-in token</strong> Google issues, plus his channel&apos;s name and ID. It is kept in one file on the family&apos;s Mac
          mini at home, in a folder only that computer&apos;s owner account can open (file permissions 600, folder 700). It is never copied to
          another server.
        </li>
        <li>
          <strong>A record of each video uploaded through Mozart Studio</strong>: its YouTube video ID, link, privacy setting at upload, and
          when. Kept in the assistant&apos;s database on the same Mac mini, so it knows what is on the channel.
        </li>
        <li>
          <strong>Channel statistics</strong> are fetched when needed, not stored as a separate copy. When the assistant tells Andrew a
          number in a message, that message is part of his chat history on the same Mac mini.
        </li>
        <li>
          <strong>A separate test sign-in</strong>, used only by the developer to demonstrate the app for Google&apos;s review, is kept in its
          own file on the same Mac mini. It is used only for private test uploads, never for Andrew&apos;s channel or videos, and disconnecting
          it revokes it and deletes it and its upload records.
        </li>
      </ul>

      <h2>Who else sees it</h2>
      <p>
        Nobody buys or receives this data. Mozart Studio does not sell, rent or share it, shows no ads and uses no analytics or tracking.
        Two services are involved only in carrying the assistant&apos;s conversation with Andrew:
      </p>
      <ul>
        <li>
          The assistant&apos;s replies are written with <strong>Anthropic&apos;s Claude</strong>. If Andrew asks about his channel, the figures can
          be part of the conversation sent to Anthropic to produce the reply.
        </li>
        <li>
          The assistant talks to Andrew in <strong>Telegram</strong>, so anything in its messages (for example a view count or a video link)
          passes through Telegram.
        </li>
      </ul>
      <p>The private connect page on the Mac mini sets one cookie that keeps it unlocked. It holds a hashed access key and nothing about YouTube.</p>

      <h2>How long it is kept</h2>
      <ul>
        <li>While the channel is connected, the token and upload records are kept so the assistant can keep working.</li>
        <li>
          <strong>Disconnecting</strong> (the &quot;Disconnect YouTube&quot; button on Andrew&apos;s connect page, or telling the assistant
          &quot;disconnect YouTube&quot;) revokes the token with Google and deletes the token and every stored upload record immediately.
        </li>
        <li>If access is revoked from Google&apos;s side instead, the assistant notices at its next check (every six hours) and deletes the same data then, always within 30 days.</li>
        <li>Chat history is deleted on request (email below).</li>
      </ul>

      <h2>How to revoke access</h2>
      <ul>
        <li>In Mozart Studio: &quot;Disconnect YouTube&quot; on the connect page, or say &quot;disconnect YouTube&quot; to the assistant.</li>
        <li>
          In Google: <a href={GOOGLE_PERMISSIONS}>{GOOGLE_PERMISSIONS}</a> (Third-party connections), or Google&apos;s security settings at{" "}
          <a href={GOOGLE_SECURITY}>{GOOGLE_SECURITY}</a>.
        </li>
      </ul>

      <h2>Contact</h2>
      <p>
        Questions or requests: <a href={`mailto:${CONTACT}`}>{CONTACT}</a>
      </p>

      <h2>Changes</h2>
      <p>If this policy changes, the date at the top changes with it.</p>
    </PolicyPage>
  );
}
