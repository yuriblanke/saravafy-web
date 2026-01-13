"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { LandingHeader } from "@/components/Landing/Header";
import { LandingHero } from "@/components/Landing/Hero";

type SupabaseConfig = {
  url: string;
  key: string;
};

const DEFAULT_SUPABASE_URL = "https://ocwpcezhabgncshgsxqc.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jd3BjZXpoYWJnbmNzaGdzeHFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5MTU5MTEsImV4cCI6MjA3NzQ5MTkxMX0.HMsmeTAlEPTTW7dOM46VJ95xpUjbUZI0zVN6lkJopFc";

function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.NEXT_PUBLIC_SARAVAFY_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SARAVAFY_SUPABASE_ANON_KEY;
  return {
    url: String(url || DEFAULT_SUPABASE_URL),
    key: String(key || DEFAULT_SUPABASE_ANON_KEY),
  };
}

async function fetchInstallUrlFresh(signal?: AbortSignal): Promise<string | null> {
  const cfg = getSupabaseConfig();
  if (!cfg) return null;

  const endpoint = cfg.url.replace(/\/$/, "") + "/rest/v1/rpc/get_app_install_url";

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

export function Landing() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [installUrl, setInstallUrl] = useState<string | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const inflightRef = useRef<Promise<string | null> | null>(null);

  const backgroundLayer = useMemo(
    () =>
      "bg-[radial-gradient(circle_at_88%_-10%,color-mix(in_srgb,var(--saravafy-brass600)_6%,transparent)_0%,transparent_62%),radial-gradient(circle_at_-10%_-10%,color-mix(in_srgb,var(--saravafy-paper200)_45%,transparent)_0%,transparent_60%),radial-gradient(circle_at_-18%_-18%,color-mix(in_srgb,var(--saravafy-forest600)_24%,transparent)_0%,transparent_54%),radial-gradient(circle_at_95%_120%,color-mix(in_srgb,var(--saravafy-earth600)_8%,transparent)_0%,transparent_55%),linear-gradient(140deg,var(--saravafy-paper50)_0%,var(--saravafy-paper100)_100%)]",
    []
  );

  const vignetteLayer = useMemo(
    () =>
      "bg-[radial-gradient(circle_at_50%_35%,transparent_0%,color-mix(in_srgb,var(--saravafy-forest900)_10%,transparent)_72%)]",
    []
  );

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

  const openModal = useCallback(() => {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setIsModalOpen(true);

    // Always try to fetch a fresh URL when opening (no-cache/no-store).
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
    <div className="min-h-dvh text-[color:var(--saravafy-textPrimaryOnLight)]">
      <div aria-hidden="true" className={`pointer-events-none fixed inset-0 -z-10 ${backgroundLayer}`} />
      <div aria-hidden="true" className={`pointer-events-none fixed inset-0 -z-10 ${vignetteLayer}`} />

      <LandingHeader onInstallClick={openModal} />

      <main>
        <LandingHero onInstallClick={openModal} />

        <div className="mx-auto max-w-[520px] px-4 pb-8 pt-[22px] min-[960px]:max-w-[980px] min-[960px]:px-6 min-[960px]:pb-14 min-[960px]:pt-[34px] min-[1200px]:max-w-[1100px] min-[1200px]:px-7">
          <section
            className="mt-4 rounded-[18px] border border-[color:color-mix(in_srgb,var(--saravafy-forest900)_12%,transparent)] bg-[color:color-mix(in_srgb,var(--saravafy-paper100)_86%,transparent)] p-4 shadow-[0_16px_42px_color-mix(in_srgb,var(--saravafy-forest900)_14%,transparent)] min-[960px]:mt-[22px] min-[960px]:p-5"
            aria-label="Manifesto"
          >
            <p className="m-0 text-[14px] leading-[1.45] text-[color:var(--saravafy-textSecondaryOnLight)] min-[960px]:text-[15px] min-[960px]:leading-[1.55]">
              O Saravafy é um projeto cultural e comunitário criado para preservar,
              registrar e compartilhar pontos de Umbanda com respeito,
              responsabilidade e acesso livre.
            </p>
          </section>

          <section
            className="mt-4 rounded-[18px] border border-[color:color-mix(in_srgb,var(--saravafy-forest900)_12%,transparent)] bg-[color:color-mix(in_srgb,var(--saravafy-paper100)_86%,transparent)] p-4 shadow-[0_16px_42px_color-mix(in_srgb,var(--saravafy-forest900)_14%,transparent)] min-[960px]:mt-[22px] min-[960px]:p-5"
            aria-labelledby="o-que-e"
          >
            <h2
              id="o-que-e"
              className="m-0 mb-2 text-[16px] font-black leading-[1.2] tracking-[0.1px] text-[color:var(--saravafy-textPrimaryOnLight)] min-[960px]:mb-[10px] min-[960px]:text-[18px]"
            >
              O que é o Saravafy
            </h2>

            <p className="m-0 mt-2 text-[14px] leading-[1.45] text-[color:var(--saravafy-textSecondaryOnLight)] min-[960px]:text-[15px] min-[960px]:leading-[1.55]">
              O Saravafy nasceu do entendimento de que os pontos de Umbanda não são
              apenas cantos — são registros históricos, espirituais e culturais.
            </p>

            <p className="m-0 mt-2 text-[14px] leading-[1.45] text-[color:var(--saravafy-textSecondaryOnLight)] min-[960px]:text-[15px] min-[960px]:leading-[1.55]">
              Cada batida de atabaque carrega um caminho.<br />
              Cada letra guarda uma história.<br />
              Cada melodia mantém viva a tradição dos terreiros.
            </p>

            <p className="m-0 mt-2 text-[14px] leading-[1.45] text-[color:var(--saravafy-textSecondaryOnLight)] min-[960px]:text-[15px] min-[960px]:leading-[1.55]">
              O Saravafy existe para que esse conhecimento não se perca, não seja
              distorcido e não seja apropriado de forma irresponsável.<br />
              É uma casa digital construída pela comunidade, para a comunidade.
            </p>
          </section>

          <section
            className="mt-4 rounded-[18px] border border-[color:color-mix(in_srgb,var(--saravafy-forest900)_12%,transparent)] bg-[color:color-mix(in_srgb,var(--saravafy-paper100)_86%,transparent)] p-4 shadow-[0_16px_42px_color-mix(in_srgb,var(--saravafy-forest900)_14%,transparent)] min-[960px]:mt-[22px] min-[960px]:p-5"
            aria-labelledby="o-que-acreditamos"
          >
            <h2
              id="o-que-acreditamos"
              className="m-0 mb-2 text-[16px] font-black leading-[1.2] tracking-[0.1px] text-[color:var(--saravafy-textPrimaryOnLight)] min-[960px]:mb-[10px] min-[960px]:text-[18px]"
            >
              O que acreditamos
            </h2>

            <div
              className="mt-3 grid grid-cols-1 gap-[10px] min-[960px]:grid-cols-2 min-[960px]:gap-3 min-[1200px]:grid-cols-3"
              aria-label="Princípios do Saravafy"
            >
              <div className="h-full rounded-[16px] border border-[color:color-mix(in_srgb,var(--saravafy-forest900)_12%,transparent)] bg-[color:color-mix(in_srgb,var(--saravafy-paper50)_55%,transparent)] p-3">
                <div className="text-[15px] font-black leading-[1.25] tracking-[0.1px] text-[color:var(--saravafy-textPrimaryOnLight)]">
                  O sagrado é coletivo
                </div>
                <div className="mt-2 whitespace-pre-line text-[13px] leading-[1.45] text-[color:var(--saravafy-textSecondaryOnLight)]">
                  O conhecimento espiritual não pertence a indivíduos, marcas ou
                  plataformas. Ele pertence ao povo, à ancestralidade e à vivência
                  nos terreiros.
                </div>
              </div>

              <div className="h-full rounded-[16px] border border-[color:color-mix(in_srgb,var(--saravafy-forest900)_12%,transparent)] bg-[color:color-mix(in_srgb,var(--saravafy-paper50)_55%,transparent)] p-3">
                <div className="text-[15px] font-black leading-[1.25] tracking-[0.1px] text-[color:var(--saravafy-textPrimaryOnLight)]">
                  Memória viva
                </div>
                <div className="mt-2 whitespace-pre-line text-[13px] leading-[1.45] text-[color:var(--saravafy-textSecondaryOnLight)]">
                  Preservar não é engessar. É manter vivo, acessível e respeitado
                  aquilo que foi transmitido pela oralidade e pela prática.
                </div>
              </div>

              <div className="h-full rounded-[16px] border border-[color:color-mix(in_srgb,var(--saravafy-forest900)_12%,transparent)] bg-[color:color-mix(in_srgb,var(--saravafy-paper50)_55%,transparent)] p-3">
                <div className="text-[15px] font-black leading-[1.25] tracking-[0.1px] text-[color:var(--saravafy-textPrimaryOnLight)]">
                  Respeito acima de tudo
                </div>
                <div className="mt-2 whitespace-pre-line text-[13px] leading-[1.45] text-[color:var(--saravafy-textSecondaryOnLight)]">
                  Sem vaidade.\nSem hierarquia espiritual.\nSem exploração do sagrado.\n\nO Saravafy não cria autoridade — apenas abre espaço.
                </div>
              </div>
            </div>
          </section>

          <section
            className="mt-4 rounded-[18px] border border-[color:color-mix(in_srgb,var(--saravafy-forest900)_12%,transparent)] bg-[color:color-mix(in_srgb,var(--saravafy-paper100)_86%,transparent)] p-4 shadow-[0_16px_42px_color-mix(in_srgb,var(--saravafy-forest900)_14%,transparent)] min-[960px]:mt-[22px] min-[960px]:p-5"
            aria-labelledby="o-que-nao-e"
          >
            <h2
              id="o-que-nao-e"
              className="m-0 mb-2 text-[16px] font-black leading-[1.2] tracking-[0.1px] text-[color:var(--saravafy-textPrimaryOnLight)] min-[960px]:mb-[10px] min-[960px]:text-[18px]"
            >
              O que o Saravafy não é
            </h2>

            <p className="m-0 mt-2 text-[14px] leading-[1.45] text-[color:var(--saravafy-textSecondaryOnLight)] min-[960px]:text-[15px] min-[960px]:leading-[1.55]">
              Para deixar claro desde o início:
            </p>

            <ul className="m-0 mt-2 list-disc pl-5 text-[14px] leading-[1.45] text-[color:var(--saravafy-textSecondaryOnLight)] min-[960px]:text-[15px] min-[960px]:leading-[1.55]">
              <li>Não é comércio da fé</li>
              <li>Não monetiza o sagrado</li>
              <li>Não transforma tradição em produto</li>
              <li>Não substitui o terreiro, a gira ou a vivência espiritual</li>
            </ul>

            <p className="m-0 mt-2 text-[14px] leading-[1.45] text-[color:var(--saravafy-textSecondaryOnLight)] min-[960px]:text-[15px] min-[960px]:leading-[1.55]">
              O Saravafy é complemento, registro e memória — nunca substituição.
            </p>
          </section>

          <section
            className="mt-4 rounded-[18px] border border-[color:color-mix(in_srgb,var(--saravafy-forest900)_12%,transparent)] bg-[color:color-mix(in_srgb,var(--saravafy-paper100)_86%,transparent)] p-4 shadow-[0_16px_42px_color-mix(in_srgb,var(--saravafy-forest900)_14%,transparent)] min-[960px]:mt-[22px] min-[960px]:p-5"
            aria-labelledby="como-funciona"
          >
            <h2
              id="como-funciona"
              className="m-0 mb-2 text-[16px] font-black leading-[1.2] tracking-[0.1px] text-[color:var(--saravafy-textPrimaryOnLight)] min-[960px]:mb-[10px] min-[960px]:text-[18px]"
            >
              Como funciona
            </h2>

            <p className="m-0 mt-2 text-[14px] leading-[1.45] text-[color:var(--saravafy-textSecondaryOnLight)] min-[960px]:text-[15px] min-[960px]:leading-[1.55]">
              O Saravafy funciona como um acervo digital acessível por aplicativo.
            </p>

            <p className="m-0 mt-2 text-[14px] leading-[1.45] text-[color:var(--saravafy-textSecondaryOnLight)] min-[960px]:text-[15px] min-[960px]:leading-[1.55]">
              Tudo isso de forma gratuita, comunitária e respeitosa.
            </p>
          </section>

          <footer className="mt-[18px] text-center min-[960px]:mt-7" aria-label="Links legais">
            <a
              className="inline-block rounded-[10px] px-3 py-[10px] text-[13px] text-[color:var(--saravafy-textMutedOnLight)] underline focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--saravafy-forest400)_32%,transparent)]"
              href="/politica-de-privacidade"
            >
              Política de Privacidade
            </a>
          </footer>
        </div>
      </main>

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
                um projeto cultural independente, mantido pela própria comunidade.
              </li>
              <li>Por isso, o acesso acontece diretamente pelo aplicativo.</li>
              <li>
                O Android pode pedir uma confirmação extra na primeira instalação
                — isso é normal e acontece apenas uma vez.
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
    </div>
  );
}
