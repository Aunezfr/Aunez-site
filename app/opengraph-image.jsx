import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Aunez — Trouve ton profil de parfum";
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
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 50% 35%, #2a1f1a 0%, #08070c 65%)",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: "50%",
            border: "3px solid #c9932f",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "4px solid #c9932f",
            }}
          />
        </div>
        <div style={{ fontSize: 72, color: "#f5f0e6", display: "flex" }}>
          Aunez
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#c9932f",
            marginTop: 16,
            display: "flex",
          }}
        >
          Trouve ton profil de parfum
        </div>
      </div>
    ),
    { ...size }
  );
}
