import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import React from "react";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const { origin } = new URL(request.url);

  const heroImageUrl = `${origin}/images/bg-hero-saravafy.webp`;

  // WhatsApp/Telegram cache previews aggressively. Keep the URL stable, and bump
  // the querystring version in metadata when you need to force refresh.
  const width = 1200;
  const height = 1200;

  const root = React.createElement(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        backgroundImage: `linear-gradient(180deg, rgba(11, 42, 33, 0.35) 0%, rgba(11, 42, 33, 0.72) 100%), url(${heroImageUrl})`,
        backgroundSize: "cover",
        // Square crop: with cover, this effectively trims left/right first
        // for a landscape photo.
        backgroundPosition: "center 62%",
        padding: 72,
        color: "#f7f4ef",
      },
    },
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 12,
          maxWidth: 980,
        },
      },
      React.createElement(
        "div",
        {
          style: {
            fontSize: 84,
            fontWeight: 900,
            letterSpacing: -1,
            lineHeight: 1.05,
            textShadow: "0 10px 24px rgba(0,0,0,0.35)",
          },
        },
        "Saravafy"
      ),
      React.createElement(
        "div",
        {
          style: {
            fontSize: 34,
            fontWeight: 800,
            lineHeight: 1.2,
            color: "rgba(247, 244, 239, 0.92)",
            textShadow: "0 8px 18px rgba(0,0,0,0.28)",
          },
        },
        "Um acervo digital vivo de pontos de Umbanda."
      )
    )
  );

  return new ImageResponse(root, {
    width,
    height,
    headers: {
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
