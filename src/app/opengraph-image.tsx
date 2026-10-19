import { ImageResponse } from "next/og";

export const alt = "Syntique Technologies — Software, crafted with technique.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0b0b0f",
          color: "#f3f0e8",
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(61,59,255,.55), transparent 45%), radial-gradient(rgba(243,240,232,.14) 1.5px, transparent 1.5px)",
          backgroundSize: "100% 100%, 28px 28px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="64" height="64" viewBox="0 0 48 48">
            <path
              d="M35 10 H19 a7 7 0 0 0 -7 7 a7 7 0 0 0 7 7 h10 a7 7 0 0 1 7 7 a7 7 0 0 1 -7 7 H13"
              stroke="#f3f0e8"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <circle cx="36" cy="10" r="4.2" fill="#d7ff3a" />
            <circle cx="12" cy="38" r="4.2" fill="#d7ff3a" />
          </svg>
          <span style={{ fontSize: 44, fontWeight: 700, letterSpacing: -2 }}>syntique</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 104, fontWeight: 800, letterSpacing: -5, lineHeight: 0.95 }}>Software, crafted</span>
          <span style={{ fontSize: 104, fontWeight: 800, letterSpacing: -5, lineHeight: 1.05, color: "#9b99ff" }}>with technique.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#9a9aa6" }}>
          <span>Websites · Platforms · Modernisation · Content automation</span>
          <span style={{ color: "#d7ff3a" }}>Start a project →</span>
        </div>
      </div>
    ),
    size,
  );
}
