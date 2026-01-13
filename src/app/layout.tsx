import "./globals.css";
import type { Metadata } from "next";
import { buildThemeCssVars } from "@/theme/cssVars";
import { SiteChrome } from "@/components/SiteChrome/SiteChrome";

export const metadata: Metadata = {
  title: "Saravafy",
  description:
    "Preservar, registrar e compartilhar pontos com respeito e responsabilidade.",
  icons: {
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
