"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  onInstallClick: () => void;
};

export function SiteHeader({ onInstallClick }: Props) {
  return (
    <header
      className="sticky top-0 z-20 backdrop-blur-[10px]"
      style={{ "--landing-header-height": "64px" } as React.CSSProperties}
      aria-label="Saravafy"
    >
      <div className="border-b border-[color:color-mix(in_srgb,var(--saravafy-forest900)_12%,transparent)] bg-[color:color-mix(in_srgb,var(--saravafy-paper50)_92%,transparent)] shadow-[0_14px_34px_color-mix(in_srgb,var(--saravafy-forest900)_10%,transparent)]">
        <div className="mx-auto flex min-h-[var(--landing-header-height)] max-w-[1100px] items-center justify-between gap-3 px-4 py-[10px] max-[420px]:px-3 min-[960px]:px-6 min-[1200px]:px-7">
          <Link
            href="/"
            className="inline-flex min-w-0 items-center rounded-[10px] focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_color-mix(in_srgb,var(--saravafy-forest400)_32%,transparent)]"
            aria-label="Ir para a página inicial"
          >
            <Image
              src="/images/saravafy-logo-full-dark.png"
              alt="Saravafy"
              width={240}
              height={28}
              priority
              className="block h-7 w-auto max-w-[min(240px,60vw)] object-contain [@media(max-width:420px)]:h-[26px] [@media(max-width:420px)]:max-w-[min(220px,52vw)] [@media(prefers-color-scheme:dark)]:hidden"
            />
            <Image
              src="/images/saravafy-logo-full-light.png"
              alt="Saravafy"
              width={240}
              height={28}
              priority
              className="hidden h-7 w-auto max-w-[min(240px,60vw)] object-contain [@media(max-width:420px)]:h-[26px] [@media(max-width:420px)]:max-w-[min(220px,52vw)] [@media(prefers-color-scheme:dark)]:block"
            />
          </Link>

          <div className="inline-flex items-center" aria-label="Ações">
            <button
              type="button"
              onClick={onInstallClick}
              aria-haspopup="dialog"
              aria-controls="installModal"
              className="inline-flex items-center justify-center rounded-[14px] border border-[color:color-mix(in_srgb,var(--saravafy-forest900)_12%,transparent)] bg-[color:var(--saravafy-forest600)] px-3 py-2 text-[13px] font-black tracking-[0.1px] text-[color:color-mix(in_srgb,var(--saravafy-paper50)_98%,transparent)] transition-[transform,opacity] duration-150 active:translate-y-[1px] focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_color-mix(in_srgb,var(--saravafy-forest400)_32%,transparent)] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:translate-y-0"
            >
              Instalar app
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
