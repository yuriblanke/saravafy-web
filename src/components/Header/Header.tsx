import Image from "next/image";

import logoMarkDark from "@/assets/images/saravafy-logo-mark-dark.png";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-10">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-20">
        <div className="flex items-center gap-3">
          <Image
            src={logoMarkDark}
            alt="Saravafy"
            priority
            className="h-9 w-9 md:h-10 md:w-10"
          />
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full bg-[color:var(--saravafy-brass500)] px-4 py-2 text-sm font-semibold text-[color:var(--saravafy-textPrimaryOnDark)] transition-colors hover:bg-[color:var(--saravafy-brass600)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--saravafy-brass600)] md:px-5 md:py-2.5 md:text-base"
        >
          Instalar app
        </button>
      </div>
    </header>
  );
}
