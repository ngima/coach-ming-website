import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.brand} — Female Personal Trainer in ${site.city}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          background: "linear-gradient(135deg, #0a0c0a 0%, #121a0c 100%)",
          color: "#f4f7ee",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, letterSpacing: 6, color: "#a5ad9b" }}>
          <div style={{ width: 14, height: 14, background: "#c8f531", borderRadius: 999 }} />
          {`${site.role.toUpperCase()} · ${site.gym.toUpperCase()} · ${site.city.toUpperCase()}`}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 108, fontWeight: 800, lineHeight: 0.95, fontStyle: "italic", textTransform: "uppercase" }}>
          <span>Your strongest self,</span>
          <span style={{ color: "#c8f531" }}>engineered.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 30 }}>
          <span style={{ fontWeight: 700 }}>{site.brand}</span>
          <span style={{ color: "#a5ad9b" }}>{site.url.replace("https://", "")}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
