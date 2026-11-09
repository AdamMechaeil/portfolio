import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000",
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.45) 0%, rgba(0, 0, 0, 0) 60%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 130,
            fontWeight: 800,
            letterSpacing: -2,
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          <span style={{ color: "#ffffff" }}>Adam&nbsp;</span>
          <span style={{ color: "#3b82f6" }}>Mechaeil</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
