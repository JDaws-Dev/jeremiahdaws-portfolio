import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };
export const alt = "Jeremiah Daws — Filmmaker, Maker, AI Builder, Teacher.";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0b0d10",
          color: "#fafaf7",
          padding: "72px",
          position: "relative",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        {/* Accent gradient blobs */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(184,67,31,0.4) 0%, rgba(184,67,31,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-120px",
            left: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(217,119,87,0.35) 0%, rgba(217,119,87,0) 70%)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "18px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#b8431f",
            fontWeight: 600,
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#b8431f",
            }}
          />
          Available · Buford, GA
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "120px",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.0,
            marginTop: "32px",
            fontFamily: "Georgia, serif",
          }}
        >
          Jeremiah Daws
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "36px",
            lineHeight: 1.2,
            marginTop: "32px",
            color: "rgba(250,250,247,0.85)",
            maxWidth: "900px",
          }}
        >
          I left the Walt Disney Company to make stuff, teach stuff, and film stuff.
          Sometimes in the same week.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "auto",
            paddingTop: "32px",
            gap: "24px",
            color: "rgba(250,250,247,0.6)",
            fontSize: "20px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <span>Filmmaker</span>
          <span style={{ color: "#b8431f" }}>·</span>
          <span>Maker</span>
          <span style={{ color: "#b8431f" }}>·</span>
          <span>AI Builder</span>
          <span style={{ color: "#b8431f" }}>·</span>
          <span>Teacher</span>
        </div>

        <div
          style={{
            display: "flex",
            position: "absolute",
            top: "72px",
            right: "72px",
            fontSize: "16px",
            color: "rgba(250,250,247,0.5)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Disney · Nat Geo · Hallmark · Tormach · AnswerAxis
        </div>
      </div>
    ),
    { ...size }
  );
}
