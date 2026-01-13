import Image from "next/image";

type Props = {
  onInstallClick: () => void;
};

export function LandingHero({ onInstallClick }: Props) {
  return (
    <section
      className="relative overflow-hidden rounded-b-[18px] bg-[color:var(--saravafy-forest900)] min-h-[92vh] min-[960px]:min-h-[78vh] max-[640px]:min-h-[calc(100dvh-var(--landing-header-height,64px))]"
      aria-label="Saravafy"
    >
      <Image
        src="/images/bg-hero-saravafy.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(color-mix(in_srgb,var(--saravafy-forest900)_40%,transparent)_0%,color-mix(in_srgb,var(--saravafy-forest900)_70%,transparent)_100%)]"
      />

      <div className="relative z-10 mx-auto flex min-h-[inherit] max-w-[1100px] items-end px-4 pb-7 pt-8 max-[640px]:items-center max-[640px]:pb-[calc(22px+env(safe-area-inset-bottom,0px))] max-[640px]:pt-[22px] min-[960px]:px-6 min-[960px]:pb-[34px] min-[1200px]:px-7">
        <div className="w-full max-w-[560px] text-center min-[960px]:text-left">
          <h1 className="m-0 text-[34px] leading-[1.08] font-black tracking-[0.2px] text-[color:color-mix(in_srgb,var(--saravafy-paper50)_98%,transparent)] min-[960px]:text-[40px]">
            Saravafy
          </h1>
          <p className="m-0 mt-[10px] text-[15px] leading-[1.35] font-extrabold text-[color:color-mix(in_srgb,var(--saravafy-paper50)_88%,transparent)] min-[960px]:text-[16px]">
            Um acervo digital vivo de pontos de Umbanda.
          </p>

          <p className="m-0 mt-[14px] text-[14px] leading-[1.5] text-[color:color-mix(in_srgb,var(--saravafy-paper50)_82%,transparent)] min-[960px]:text-[15px]">
            Aqui, o som é memória.<br />
            A palavra é ensinamento.<br />
            E cada ponto é parte de uma herança viva que atravessa gerações.
          </p>

          <button
            type="button"
            onClick={onInstallClick}
            aria-haspopup="dialog"
            aria-controls="installModal"
            className="mt-4 inline-flex w-full items-center justify-center rounded-[14px] border border-[color:color-mix(in_srgb,var(--saravafy-forest900)_12%,transparent)] bg-[color:color-mix(in_srgb,var(--saravafy-paper50)_75%,transparent)] px-[14px] py-3 text-[14px] font-black tracking-[0.1px] text-[color:var(--saravafy-forest900)] transition-[transform,opacity] duration-150 active:translate-y-[1px] focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_color-mix(in_srgb,var(--saravafy-forest400)_32%,transparent)] min-[960px]:w-auto min-[960px]:min-w-[180px]"
          >
            Instalar App
          </button>

          <div
            className="mt-2 text-[12px] font-bold leading-[1.35] text-[color:color-mix(in_srgb,var(--saravafy-paper50)_74%,transparent)]"
            aria-label="Disponibilidade"
          >
            Disponível apenas para Android no momento
          </div>
        </div>
      </div>
    </section>
  );
}
