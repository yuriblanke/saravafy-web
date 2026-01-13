import type { Metadata } from "next";

import { Landing } from "@/components/Landing/Landing";

export const metadata: Metadata = {
  title: "Saravafy",
  description: "Um acervo digital vivo de pontos de Umbanda",
};

export default function HomePage() {
  return (
    <Landing />
  );
}
