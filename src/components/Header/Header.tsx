import Image from "next/image";

import logoFullLight from "@/assets/images/saravafy-logo-full-light.png";

const INSTALL_URL = process.env.NEXT_PUBLIC_INSTALL_URL ?? "#";

function isExternalUrl(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export function Header() {
  const external = isExternalUrl(INSTALL_URL);

  return (
    <header className="sticky inset-x-0 top-0 z-20 backdrop-blur-md">
      <div className="border-b border-[color:color-mix(in_srgb,var(--saravafy-foreground)_12%,transparent)] bg-[color:color-mix(in_srgb,var(--saravafy-background)_72%,transparent)]">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-20">
        <div className="flex items-center gap-3">
          <Image
            src={logoFullLight}
            alt="Saravafy"
            priority
            className="h-7 w-auto md:h-8"
          />
        </div>

        <a
          href={INSTALL_URL}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          className="inline-flex items-center justify-center rounded-full bg-[color:var(--saravafy-brass500)] px-4 py-2 text-sm font-semibold text-[color:var(--saravafy-textPrimaryOnDark)] transition-colors hover:bg-[color:var(--saravafy-brass600)] active:bg-[color:var(--saravafy-brass700)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--saravafy-brass600)] md:px-5 md:py-2.5 md:text-base"
        >
          Instalar app
        </a>
        </div>
      </div>
    </header>
  );
}
