import { Header } from "@/components/Header/Header";
import { Hero } from "@/components/Hero/Hero";

export default function HomePage() {
  return (
    <main>
      <div className="relative">
        <Hero />
        <Header />
      </div>
    </main>
  );
}
