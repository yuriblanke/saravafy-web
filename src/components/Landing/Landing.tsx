"use client";

import { useEffect, useMemo } from "react";

import { LandingHero } from "@/components/Landing/Hero";

import { useInstallModal } from "@/components/SiteChrome/InstallModalContext";

export function Landing() {
  const { openInstallModal } = useInstallModal();

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

  useEffect(() => {
    if (typeof window === "undefined") return;
    const install = new URLSearchParams(window.location.search).get("install");
    if (install === "1") openInstallModal();
  }, [openInstallModal]);

  return (
    <div className="min-h-dvh text-[color:var(--saravafy-textPrimaryOnLight)]">
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 -z-10 ${backgroundLayer}`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 -z-10 ${vignetteLayer}`}
      />

      <main>
        <LandingHero onInstallClick={openInstallModal} />

        <div className="mx-auto max-w-[520px] px-4 pb-8 pt-[22px] min-[960px]:max-w-[980px] min-[960px]:px-6 min-[960px]:pb-14 min-[960px]:pt-[34px] min-[1200px]:max-w-[1100px] min-[1200px]:px-7">
          <section
            className="mt-4 rounded-[18px] border border-[color:color-mix(in_srgb,var(--saravafy-forest900)_12%,transparent)] bg-[color:color-mix(in_srgb,var(--saravafy-paper100)_86%,transparent)] p-4 shadow-[0_16px_42px_color-mix(in_srgb,var(--saravafy-forest900)_14%,transparent)] min-[960px]:mt-[22px] min-[960px]:p-5"
            aria-label="Manifesto"
          >
            <p className="m-0 text-[14px] leading-[1.45] text-[color:var(--saravafy-textSecondaryOnLight)] min-[960px]:text-[15px] min-[960px]:leading-[1.55]">
              O Saravafy é um projeto cultural e comunitário criado para
              preservar, registrar e compartilhar pontos de Umbanda com
              respeito, responsabilidade e acesso livre.
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
              O Saravafy nasceu do entendimento de que os pontos de Umbanda não
              são apenas cantos — são registros históricos, espirituais e
              culturais.
            </p>

            <p className="m-0 mt-2 text-[14px] leading-[1.45] text-[color:var(--saravafy-textSecondaryOnLight)] min-[960px]:text-[15px] min-[960px]:leading-[1.55]">
              Cada batida de atabaque carrega um caminho.
              <br />
              Cada letra guarda uma história.
              <br />
              Cada melodia mantém viva a tradição dos terreiros.
            </p>
            <p className="m-0 mt-2 text-[14px] leading-[1.45] text-[color:var(--saravafy-textSecondaryOnLight)] min-[960px]:text-[15px] min-[960px]:leading-[1.55]">
              O Saravafy existe para que esse conhecimento não se perca, não seja
              distorcido e não seja apropriado de forma irresponsável.
              <br />
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
                  Sem vaidade.{"\n"}
                  Sem hierarquia espiritual.{"\n"}
                  Sem exploração do sagrado.{"\n"}
                  {"\n"}
                  O Saravafy não cria autoridade — apenas abre espaço.
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

          <footer
            className="mt-[18px] text-center min-[960px]:mt-7"
            aria-label="Links legais"
          >
            <a
              className="inline-block rounded-[10px] px-3 py-[10px] text-[13px] text-[color:var(--saravafy-textMutedOnLight)] underline focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--saravafy-forest400)_32%,transparent)]"
              href="/politica-de-privacidade"
            >
              Política de Privacidade
            </a>
          </footer>
        </div>
      </main>
    </div>
  );
}
