"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { Swiper as SwiperInstance } from "swiper";
import { Autoplay } from "swiper/modules";
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

  const swiperRef = useRef<SwiperInstance | null>(null);
  const inactivityTimeoutRef = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem =
    items[Math.min(Math.max(activeIndex, 0), items.length - 1)];

  const clearInactivityTimeout = useCallback(() => {
    if (inactivityTimeoutRef.current == null) return;
    window.clearTimeout(inactivityTimeoutRef.current);
    inactivityTimeoutRef.current = null;
  }, []);

  const resetInactivityTimeout = useCallback(() => {
    clearInactivityTimeout();
    if (isPlaying) return;

    inactivityTimeoutRef.current = window.setTimeout(() => {
      setIsPlaying((current) => (current ? current : true));
    }, 60_000);
  }, [clearInactivityTimeout, isPlaying]);

  const registerInteraction = useCallback(() => {
    resetInactivityTimeout();
  }, [resetInactivityTimeout]);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper?.autoplay) return;

    if (isPlaying) {
      clearInactivityTimeout();
      swiper.autoplay.start();
      return;
    }

    swiper.autoplay.stop();
    resetInactivityTimeout();
  }, [clearInactivityTimeout, isPlaying, resetInactivityTimeout]);

  useEffect(() => clearInactivityTimeout, [clearInactivityTimeout]);

  return (
    <section
      aria-label="Demonstração do app"
      className="mt-4 min-[960px]:mt-[22px]"
    >
      <div
        className={`${styles.layout} grid grid-cols-1 gap-4 min-[960px]:grid-cols-[1fr_minmax(420px,520px)] min-[960px]:items-center min-[960px]:gap-6`}
      >
        <div className={styles.text}>
          <h2 className="m-0 mt-2 text-[20px] font-black leading-[1.12] tracking-[0.1px] text-[color:var(--saravafy-textPrimaryOnLight)] min-[960px]:text-[22px]">
            {activeItem.title}
          </h2>

          <p className="m-0 mt-2 max-w-[54ch] text-[14px] leading-[1.5] text-[color:var(--saravafy-textSecondaryOnLight)] min-[960px]:text-[15px]">
            {activeItem.copy}
          </p>

          <div className={styles.controls} aria-label="Controles do carousel">
            <div className={styles.dots} aria-label="Paginação">
              {items.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={item.key}
                    type="button"
                    className={`${styles.dot} ${isActive ? styles.dotActive : ""}`}
                    aria-label={`Ir para slide ${index + 1}`}
                    aria-current={isActive}
                    onClick={() => {
                      registerInteraction();
                      swiperRef.current?.slideToLoop(index);
                    }}
                  />
                );
              })}
            </div>

            <button
              type="button"
              className={styles.playPause}
              aria-label={isPlaying ? "Pausar autoplay" : "Ativar autoplay"}
              onClick={() => {
                registerInteraction();
                setIsPlaying((current) => !current);
              }}
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
          </div>
        </div>

        <div className={styles.carouselWrap}>
          <Swiper
            modules={[Autoplay]}
            loop
            slidesPerView="auto"
            centeredSlides
            spaceBetween={18}
            grabCursor
            resistanceRatio={0.72}
            threshold={10}
            speed={420}
            autoplay={{ delay: 10_000, disableOnInteraction: false }}
            onClick={registerInteraction}
            onTouchStart={registerInteraction}
            onSliderFirstMove={registerInteraction}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setActiveIndex(swiper.realIndex);
              if (!isPlaying) swiper.autoplay?.stop();
            }}
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
