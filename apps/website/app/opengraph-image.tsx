import { ImageResponse } from "next/og";
import { palette } from "@/lib/palette";

export const alt = "Rora — a cosy, calm dark theme";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const swatches = palette.flatMap((g) => g.swatches);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#12101c",
          color: "#eddeff",
          padding: 72,
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -160,
            left: 200,
            width: 700,
            height: 500,
            background:
              "radial-gradient(closest-side, #b59eff 0%, transparent 70%)",
            opacity: 0.35,
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -120,
            right: -80,
            width: 600,
            height: 400,
            background:
              "radial-gradient(closest-side, #72f0c8 0%, transparent 70%)",
            opacity: 0.25,
            filter: "blur(40px)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "8px 16px",
              border: "1px solid #2e2a45",
              background: "rgba(26, 23, 40, 0.6)",
              borderRadius: 999,
              color: "#a89cc8",
              fontSize: 22,
            }}
          >
            v1 · {swatches.length} colours
          </div>
          <div style={{ display: "flex", fontSize: 168, fontWeight: 700, letterSpacing: -6, lineHeight: 1 }}>
            <span style={{ color: "#b59eff" }}>R</span>
            <span>ora</span>
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "#a89cc8", maxWidth: 880 }}>
            A cosy, calm dark theme — vivid aurora accents against a deep
            arctic night.
          </div>
        </div>

        <div style={{ display: "flex", gap: 6 }}>
          {swatches.map((s) => (
            <div
              key={s.hex}
              style={{
                flex: 1,
                height: 40,
                background: s.hex,
                borderRadius: 6,
              }}
            />
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
