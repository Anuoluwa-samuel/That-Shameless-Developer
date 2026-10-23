import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

type Card = { eyebrow: string; title: string; subtitle: string; footer?: string };

/** 1200x630 share card in the site's dark palette. Inline styles only (Satori subset of CSS). */
export function ogCard({ eyebrow, title, subtitle, footer }: Card): ImageResponse {
  const long = title.length > 40;
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0a0a0b",
        color: "#f3f2ee",
        padding: 72,
        borderLeft: "12px solid #5a8dff",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 26,
          letterSpacing: 4,
          color: "#5a8dff",
          textTransform: "uppercase",
        }}
      >
        {eyebrow}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: long ? 64 : 84,
            lineHeight: 1.05,
            fontWeight: 700,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            lineHeight: 1.4,
            color: "#a3a3ab",
            marginTop: 28,
            maxWidth: 960,
          }}
        >
          {subtitle}
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 24, color: "#a3a3ab" }}>
        {footer ?? ""}
      </div>
    </div>,
    ogSize,
  );
}
