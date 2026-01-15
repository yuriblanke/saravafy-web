import "./globals.css";
import type { Metadata } from "next";
import { buildThemeCssVars } from "@/theme/cssVars";
import { SiteChrome } from "@/components/SiteChrome/SiteChrome";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  "http://localhost:3000";

const OG_IMAGE_URL = "/api/og?v=1";

export const metadata: Metadata = {
  title: "Saravafy",
  description:
    "Preservar, registrar e compartilhar pontos com respeito e responsabilidade.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Saravafy",
    description:
      "Preservar, registrar e compartilhar pontos com respeito e responsabilidade.",
    url: "/",
    siteName: "Saravafy",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 1200,
        alt: "Saravafy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saravafy",
    description:
      "Preservar, registrar e compartilhar pontos com respeito e responsabilidade.",
    images: [OG_IMAGE_URL],
  },
  icons: {
    shortcut: "/icons/favicon-light-mode.png",
    apple: [
      {
        url: "/icons/apple-icon-for-light-mode.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        url: "/icons/apple-icon-for-dark-mode.png",
        sizes: "180x180",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    icon: [
      {
        url: "/icons/favicon-light-mode.png",
        type: "image/png",
      },
      {
        url: "/icons/favicon-light-mode.png",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icons/favicon-dark-mode.png",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

const lightVars = buildThemeCssVars("light");
const darkVars = buildThemeCssVars("dark");

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" data-theme="light">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
:root {
${lightVars}
}
html[data-theme="dark"] {
${darkVars}
}
`,
          }}
        />
      </head>
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
