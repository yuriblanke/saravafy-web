"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useInstallDownloadAction } from "@/lib/useInstallDownloadAction";

type Props = {
  onInstallClick: () => void;
};

export function SiteHeader({ onInstallClick }: Props) {
  const pathname = usePathname();

  const { handleInstallClick, isLoading } = useInstallDownloadAction();

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (typeof queueMicrotask === "function") {
      queueMicrotask(() => setHasMounted(true));
    } else {
      Promise.resolve().then(() => setHasMounted(true));
    }
  }, []);

  const showDevThemeToggle = useMemo(() => {
    if (!hasMounted) return false;
    const host = window.location.hostname;
    return host === "localhost" || host === "127.0.0.1" || host === "::1";
  }, [hasMounted]);

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (!showDevThemeToggle) return;

    const stored = window.localStorage.getItem("saravafy-theme");
    const prefersDark =
      window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;

    const initial =
      stored === "dark" || stored === "light"
        ? stored
        : prefersDark
        ? "dark"
        : "light";

    document.documentElement.dataset.theme = initial;
    const nextIsDark = initial === "dark";
    if (typeof queueMicrotask === "function") {
      queueMicrotask(() => setIsDarkMode(nextIsDark));
    } else {
      Promise.resolve().then(() => setIsDarkMode(nextIsDark));
    }
  }, [showDevThemeToggle]);

  function toggleTheme() {
    const next = isDarkMode ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("saravafy-theme", next);
    setIsDarkMode(next === "dark");
  }

  function onLogoClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (pathname !== "/") return;

    e.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    window.setTimeout(() => window.location.reload(), 0);
  }

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
            onClick={onLogoClick}
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
            {showDevThemeToggle ? (
              <button
                type="button"
                role="switch"
                aria-checked={isDarkMode}
                aria-label={
                  isDarkMode
                    ? "Dark mode ligado (desligar)"
                    : "Dark mode desligado (ligar)"
                }
                onClick={toggleTheme}
                className="mr-2 inline-flex h-9 items-center rounded-[14px] border border-[color:color-mix(in_srgb,var(--saravafy-forest900)_12%,transparent)] bg-[color:color-mix(in_srgb,var(--saravafy-paper50)_82%,transparent)] px-2 focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_color-mix(in_srgb,var(--saravafy-forest400)_32%,transparent)]"
              >
                <span className="sr-only">Alternar tema</span>
                <span
                  aria-hidden="true"
                  className={`relative h-5 w-9 rounded-full border border-[color:color-mix(in_srgb,var(--saravafy-forest900)_14%,transparent)] bg-[color:color-mix(in_srgb,var(--saravafy-paper100)_80%,transparent)] transition-colors ${
                    isDarkMode
                      ? "bg-[color:color-mix(in_srgb,var(--saravafy-forest700)_55%,transparent)]"
                      : "bg-[color:color-mix(in_srgb,var(--saravafy-paper100)_85%,transparent)]"
                  }`}
                >
                  <span
                    className={`absolute left-[2px] top-[2px] h-4 w-4 rounded-full bg-[color:var(--saravafy-paper50)] shadow-[0_6px_16px_color-mix(in_srgb,var(--saravafy-forest900)_18%,transparent)] transition-transform ${
                      isDarkMode ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </span>
              </button>
            ) : null}

            <button
              type="button"
              onClick={async () => {
                onInstallClick();
                await handleInstallClick();
              }}
              aria-haspopup="dialog"
              aria-controls="installModal"
              disabled={isLoading}
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
