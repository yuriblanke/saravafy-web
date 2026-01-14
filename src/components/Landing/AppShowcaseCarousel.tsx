"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import styles from "./AppShowcaseCarousel.module.css";

type ShowcaseItem = {
  key: "pontos" | "terreiros" | "colecoes" | "player";
  title: "Pontos" | "Terreiros" | "Coleções" | "Player";
  copy: string;
  imageSrc: string;
};

export function AppShowcaseCarousel() {
  const items = useMemo<ShowcaseItem[]>(
    () => [
      {
        key: "pontos",
        title: "Pontos",
        copy: "Acesse e organize pontos cantados com clareza, respeitando linhas, entidades e tradições.",
        imageSrc: "/images/app-showcase/app-pontos.webp",
      },
      {
        key: "terreiros",
        title: "Terreiros",
        copy: "Conheça terreiros, suas identidades e os pontos compartilhados por cada comunidade.",
        imageSrc: "/images/app-showcase/app-terreiros.webp",
      },
      {
        key: "colecoes",
        title: "Coleções",
        copy: "Crie e gerencie coleções de pontos para estudo, gira ou organização pessoal.",
        imageSrc: "/images/app-showcase/app-colecoes.webp",
      },
      {
        key: "player",
        title: "Player",
        copy: "Utilize o player para acompanhar os pontos com foco, ritmo e presença no momento certo.",
        imageSrc: "/images/app-showcase/app-player.webp",
      },
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[Math.min(Math.max(activeIndex, 0), items.length - 1)];

  return (
    <section
      aria-label="Demonstração do app"
      className="mt-4 rounded-[18px] border border-[color:color-mix(in_srgb,var(--saravafy-forest900)_12%,transparent)] bg-[color:color-mix(in_srgb,var(--saravafy-paper100)_86%,transparent)] p-4 shadow-[0_16px_42px_color-mix(in_srgb,var(--saravafy-forest900)_14%,transparent)] min-[960px]:mt-[22px] min-[960px]:p-5"
    >
      <div className="grid grid-cols-1 gap-4 min-[960px]:grid-cols-[1fr_minmax(420px,520px)] min-[960px]:items-center min-[960px]:gap-6">
        <div>
          <div className="text-[12px] font-black tracking-[0.12em] text-[color:color-mix(in_srgb,var(--saravafy-textMutedOnLight)_88%,transparent)]">
            APP SHOWCASE
          </div>

          <h2 className="m-0 mt-2 text-[20px] font-black leading-[1.12] tracking-[0.1px] text-[color:var(--saravafy-textPrimaryOnLight)] min-[960px]:text-[22px]">
            {activeItem.title}
          </h2>

          <p className="m-0 mt-2 max-w-[54ch] text-[14px] leading-[1.5] text-[color:var(--saravafy-textSecondaryOnLight)] min-[960px]:text-[15px]">
            {activeItem.copy}
          </p>
        </div>

        <div className={styles.carouselWrap}>
          <Swiper
            slidesPerView="auto"
            centeredSlides
            spaceBetween={18}
            grabCursor
            resistanceRatio={0.72}
            threshold={10}
            speed={420}
            onSwiper={(swiper) => setActiveIndex(swiper.realIndex)}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className={styles.swiper}
          >
            {items.map((item) => (
              <SwiperSlide key={item.key} className={styles.slide}>
                <div className={styles.phone}>
                  <div className={styles.screen}>
                    <div aria-hidden="true" className={styles.notch} />
                    <div className={styles.screenInner}>
                      <Image
                        src={item.imageSrc}
                        alt=""
                        fill
                        sizes="(max-width: 959px) 70vw, 320px"
                        className={styles.screenImage}
                        priority={item.key === "pontos"}
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
