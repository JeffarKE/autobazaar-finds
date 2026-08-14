import { ImageResponse } from "next/og";

export const alt = "Auto Bazaar Finds — vehicle brokerage and sourcing in Kenya";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "linear-gradient(135deg, #07130d 0%, #0f3d25 60%, #16a34a 100%)",
        color: "white",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        padding: "72px",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", maxWidth: "1000px" }}>
        <div style={{ color: "#86efac", display: "flex", fontSize: 26, fontWeight: 700, letterSpacing: 5 }}>
          VEHICLE BROKERAGE &amp; SOURCING · KENYA
        </div>
        <div style={{ display: "flex", fontSize: 82, fontWeight: 900, lineHeight: 1.05, marginTop: 28 }}>
          Auto Bazaar Finds
        </div>
        <div style={{ color: "#dcfce7", display: "flex", fontSize: 34, marginTop: 30 }}>
          Find your next car. Sell yours with confidence.
        </div>
      </div>
    </div>,
    size
  );
}
