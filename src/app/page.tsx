import { Header } from "@/components/Header/Header";
import { Hero } from "@/components/Hero/Hero";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saravafy — Acervo vivo de pontos de Umbanda",
  description:
    "Saravafy é um acervo vivo de pontos de Umbanda — preservar, registrar e compartilhar com respeito e responsabilidade.",
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
      </main>
    </>
  );
}
