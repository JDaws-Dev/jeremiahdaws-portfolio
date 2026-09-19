import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Favicon: the site's wordmark reduced to its monogram and the red period.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fafaf7",
          color: "#0b0d10",
          fontFamily: "Georgia, serif",
          fontSize: 40,
          letterSpacing: "-0.04em",
        }}
      >
        JD<span style={{ color: "#b3312c" }}>.</span>
      </div>
    ),
    size,
  );
}
