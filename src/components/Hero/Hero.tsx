import Image from "next/image";

import heroBg from "@/assets/images/bg-hero-saravafy.jpg";

const INSTALL_URL = process.env.NEXT_PUBLIC_INSTALL_URL ?? "#";

function isExternalUrl(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export function Hero() {
  const external = isExternalUrl(INSTALL_URL);

  return (
    <section
      aria-label="Hero"
      className="relative min-h-[80vh] overflow-hidden rounded-b-[40px]"
    >
      <Image
        src={heroBg}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[color:var(--saravafy-foreground)] opacity-45"
      />

      <div className="relative mx-auto flex min-h-[80vh] max-w-6xl flex-col items-center justify-end px-4 pb-10 pt-24 text-center md:items-start md:justify-center md:pb-20 md:pt-28 md:text-left">
        <h1 className="text-5xl font-semibold tracking-tight text-[color:var(--saravafy-textPrimaryOnDark)] md:text-7xl">
          Saravafy
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-[color:var(--saravafy-textSecondaryOnDark)] md:text-lg">
          Preservar, registrar e compartilhar pontos com respeito e
          responsabilidade.
        </p>

        <div className="mt-8 flex w-full flex-col items-center gap-3 md:w-auto md:flex-row md:items-start">
          <a
            href={INSTALL_URL}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            className="inline-flex w-full items-center justify-center rounded-full bg-[color:var(--saravafy-brass500)] px-5 py-3 text-base font-semibold text-[color:var(--saravafy-textPrimaryOnDark)] transition-colors hover:bg-[color:var(--saravafy-brass600)] active:bg-[color:var(--saravafy-brass700)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--saravafy-brass600)] md:w-auto"
          >
            Instalar app
          </a>
          <p className="text-sm leading-relaxed text-[color:var(--saravafy-textSecondaryOnDark)] opacity-90">
            Acesse o acervo vivo de pontos de Umbanda.
          </p>
        </div>
      </div>
    </section>
  );
}
