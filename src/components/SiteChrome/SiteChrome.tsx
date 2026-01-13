"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { InstallModalProvider } from "@/components/SiteChrome/InstallModalContext";
import { SiteHeader } from "@/components/SiteChrome/SiteHeader";
import { useFreshInstallUrl } from "@/lib/useFreshInstallUrl";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { installUrl } = useFreshInstallUrl();

  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const openInstallModal = useCallback(() => {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    window.setTimeout(() => lastFocusedRef.current?.focus?.(), 0);
  }, []);

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
