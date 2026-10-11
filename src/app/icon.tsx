import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "transparent" }}>
        <svg width="64" height="64" viewBox="0 0 40 40">
          <path d="M0 0h32l8 8v32H8l-8-8z" fill="#c8f531" />
          <g transform="skewX(-10) translate(5 0)" fill="none" stroke="#0a0c0a" strokeWidth="4.2" strokeLinecap="square">
            <path d="M8 31V18c0-4.5 3.2-6.4 5-6.4" />
            <path d="M32 31V18c0-4.5-3.2-6.4-5-6.4" />
            <path d="M13 11.6 20 22l7-10.4" />
          </g>
        </svg>
      </div>
    ),
    { ...size },
  );
}
