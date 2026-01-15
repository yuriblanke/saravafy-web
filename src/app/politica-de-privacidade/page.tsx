import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade - Saravafy",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Política de Privacidade - Saravafy</h1>
      <p className="mb-4">Última atualização: janeiro de 2026</p>
      
      <p className="mb-4">
        O <strong>Saravafy</strong> é um acervo digital cultural e beneficente dedicado à preservação e difusão de pontos de Umbanda, desenvolvido com respeito à tradição espiritual, à comunidade e à privacidade das pessoas usuárias.
      </p>
      
      <p className="mb-4">
        Esta Política de Privacidade descreve como coletamos, utilizamos, armazenamos e protegemos dados pessoais, em conformidade com a <strong>Lei Geral de Proteção de Dados (Lei n 13.709/2018 - LGPD)</strong>.
      </p>
    </main>
  );
}
