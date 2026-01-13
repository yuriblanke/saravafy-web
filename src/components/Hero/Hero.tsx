import Image from "next/image";

import heroBg from "@/assets/images/bg-hero-saravafy.jpg";

export function Hero() {
  return (
    <section
      aria-label="Hero"
      className="relative min-h-[80vh] overflow-hidden rounded-b-[48px]"
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

      <div className="relative mx-auto flex min-h-[80vh] max-w-6xl flex-col justify-center px-4 pb-16 pt-28 md:pb-20 md:pt-32">
        <h1 className="text-5xl font-semibold tracking-tight text-[color:var(--saravafy-textPrimaryOnDark)] md:text-7xl">
          Saravafy
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-[color:var(--saravafy-textSecondaryOnDark)] md:text-lg">
          Preservar, registrar e compartilhar pontos com respeito e responsabilidade.
        </p>
      </div>
    </section>
  );
}
