"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { InstallModalProvider } from "@/components/SiteChrome/InstallModalContext";
import { SiteHeader } from "@/components/SiteChrome/SiteHeader";

type SupabaseConfig = {
  url: string;
  key: string;
};

function requireEnv(name: string, value: string | undefined): string {
  if (typeof value === "string" && value.trim().length > 0) return value;
  throw new Error(
    `[Saravafy] Missing required env var ${name}. Configure it (e.g. in .env) and restart the dev server.`
  );
}

function getSupabaseConfig(): SupabaseConfig {
  const url = requireEnv(
    "NEXT_PUBLIC_SARAVAFY_SUPABASE_URL",
    process.env.NEXT_PUBLIC_SARAVAFY_SUPABASE_URL
  );
  const key = requireEnv(
    "NEXT_PUBLIC_SARAVAFY_SUPABASE_ANON_KEY",
    process.env.NEXT_PUBLIC_SARAVAFY_SUPABASE_ANON_KEY
  );

  return { url, key };
}

async function fetchInstallUrlFresh(
  signal?: AbortSignal
): Promise<string | null> {
  const cfg = getSupabaseConfig();

  const endpoint =
    cfg.url.replace(/\/$/, "") + "/rest/v1/rpc/get_app_install_url";

  const res = await fetch(endpoint, {
    method: "POST",
    cache: "no-store",
    headers: {
      apikey: cfg.key,
      authorization: `Bearer ${cfg.key}`,
      "content-type": "application/json",
      "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
      pragma: "no-cache",
    },
    body: "{}",
    signal,
  });

  if (!res.ok) return null;

  const json = (await res.json()) as { value?: unknown };
  const url = json && typeof json.value === "string" ? String(json.value) : "";

  if (!url || url === "pending") return null;
  return url;
}

function triggerDownload(url: string) {
  if (!url) return;

  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = url;
  iframe.setAttribute("aria-hidden", "true");
  document.body.appendChild(iframe);

  window.setTimeout(() => {
    try {
      document.body.removeChild(iframe);
    } catch {
      // ignore
    }
  }, 2000);
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [installUrl, setInstallUrl] = useState<string | null>(null);

  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const inflightRef = useRef<Promise<string | null> | null>(null);

  const fetchAndSetInstallUrl = useCallback(async () => {
    if (inflightRef.current) return inflightRef.current;

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 8000);

    inflightRef.current = fetchInstallUrlFresh(controller.signal)
      .then((url) => {
        setInstallUrl(url);
        return url;
      })
      .catch(() => {
        setInstallUrl(null);
        return null;
      })
      .finally(() => {
        window.clearTimeout(timeoutId);
        inflightRef.current = null;
      });

    return inflightRef.current;
  }, []);

  const openInstallModal = useCallback(() => {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setIsModalOpen(true);

    void fetchAndSetInstallUrl().then((url) => {
      if (url) triggerDownload(url);
    });
  }, [fetchAndSetInstallUrl]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    window.setTimeout(() => lastFocusedRef.current?.focus?.(), 0);
  }, []);

  useEffect(() => {
    function onPageShow() {
      void fetchAndSetInstallUrl();
    }

    window.addEventListener("pageshow", onPageShow);
    void fetchAndSetInstallUrl();

    return () => {
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [fetchAndSetInstallUrl]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("modal-open");
      return;
    }
    document.body.classList.remove("modal-open");
  }, [isModalOpen]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!isModalOpen) return;
      if (e.key === "Escape") closeModal();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [closeModal, isModalOpen]);

  return (
    <InstallModalProvider value={{ openInstallModal }}>
      <SiteHeader onInstallClick={openInstallModal} />
      {children}

      <div
        className="fixed inset-0 z-30 flex items-center justify-center p-4"
        hidden={!isModalOpen}
        id="installModal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="installModalTitle"
        aria-describedby="installModalDesc"
      >
        <button
          type="button"
          className="absolute inset-0 bg-[color:color-mix(in_srgb,var(--saravafy-forest900)_42%,transparent)]"
          aria-label="Fechar"
          onClick={closeModal}
        />

        <div className="relative w-full max-w-[520px] rounded-[18px] border border-[color:color-mix(in_srgb,var(--saravafy-forest900)_12%,transparent)] bg-[color:var(--saravafy-paper50)] p-4 shadow-[0_16px_42px_color-mix(in_srgb,var(--saravafy-forest900)_14%,transparent)] min-[960px]:p-[18px]">
          <h2
            id="installModalTitle"
            className="m-0 text-[18px] font-black leading-[1.2] tracking-[0.1px] text-[color:var(--saravafy-textPrimaryOnLight)]"
          >
            Instalar app
          </h2>

          <div id="installModalDesc" className="mt-[10px]">
            <ul className="m-0 list-disc pl-5 text-[14px] leading-[1.45] text-[color:var(--saravafy-textSecondaryOnLight)]">
              <li>
                O Saravafy ainda não está disponível nas lojas oficiais porque é
                um projeto cultural independente, mantido pela própria
                comunidade.
              </li>
              <li>Por isso, o acesso acontece diretamente pelo aplicativo.</li>
              <li>
                O Android pode pedir uma confirmação extra na primeira
                instalação — isso é normal e acontece apenas uma vez.
              </li>
            </ul>
          </div>

          <div className="mt-[14px] flex flex-col gap-[10px]">
            <button
              type="button"
              data-close-modal
              onClick={closeModal}
              className="inline-flex w-full items-center justify-center rounded-[14px] border border-[color:color-mix(in_srgb,var(--saravafy-forest900)_12%,transparent)] bg-[color:var(--saravafy-forest600)] px-[14px] py-3 text-[14px] font-black tracking-[0.1px] text-[color:color-mix(in_srgb,var(--saravafy-paper50)_98%,transparent)] transition-[transform,opacity] duration-150 active:translate-y-[1px] focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_color-mix(in_srgb,var(--saravafy-forest400)_32%,transparent)]"
            >
              Entendi
            </button>

            {installUrl ? (
              <div className="text-center text-[12px] font-bold leading-[1.35] text-[color:var(--saravafy-textMutedOnLight)]">
                O download deve iniciar automaticamente.
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </InstallModalProvider>
  );
}
