import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade — Saravafy",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-[100vh] min-h-[100svh] text-[color:var(--saravafy-textPrimaryOnLight)]">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_88%_-10%,color-mix(in_srgb,var(--saravafy-brass600)_6%,transparent)_0%,transparent_62%),radial-gradient(circle_at_-10%_-10%,color-mix(in_srgb,var(--saravafy-paper200)_45%,transparent)_0%,transparent_60%),radial-gradient(circle_at_-18%_-18%,color-mix(in_srgb,var(--saravafy-forest600)_24%,transparent)_0%,transparent_54%),radial-gradient(circle_at_95%_120%,color-mix(in_srgb,var(--saravafy-earth600)_8%,transparent)_0%,transparent_55%),linear-gradient(140deg,var(--saravafy-paper50)_0%,var(--saravafy-paper100)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_35%,transparent_0%,color-mix(in_srgb,var(--saravafy-forest900)_10%,transparent)_72%)]"
      />

      <div className="mx-auto max-w-[900px] px-4 pb-14 pt-7 max-[480px]:px-[14px] max-[480px]:pb-12 max-[480px]:pt-[22px]">
        <header className="my-2 mb-6">
          <h1 className="m-0 text-[28px] font-black leading-[1.2] text-[color:var(--saravafy-textPrimaryOnLight)] max-[480px]:text-[24px]">
            Política de Privacidade — Saravafy
          </h1>
          <p className="m-0 mt-3 text-[14px] leading-[1.5] text-[color:var(--saravafy-textMutedOnLight)]">
            Última atualização: janeiro de 2026
          </p>
        </header>

        <div className="max-w-none text-[16px] leading-[1.7] text-[color:var(--saravafy-textSecondaryOnLight)]">
          <p className="mb-[14px]">
            O <strong>Saravafy</strong> é um acervo digital cultural e
            beneficente dedicado à preservação e difusão de pontos de Umbanda,
            desenvolvido com respeito à tradição espiritual, à comunidade e à
            privacidade das pessoas usuárias.
          </p>

          <p className="mb-[14px]">
            Esta Política de Privacidade descreve como coletamos, utilizamos,
            armazenamos e protegemos dados pessoais, em conformidade com a{" "}
            <strong>
              Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD)
            </strong>
            .
          </p>

          <p className="mb-[14px]">
            Ao utilizar o Saravafy, você concorda com as práticas descritas
            nesta política.
          </p>

          <hr className="my-6 border-0 border-t border-t-[color:color-mix(in_srgb,var(--saravafy-forest900)_12%,transparent)]" />

          <h2 className="mt-6 mb-3 text-[22px] leading-[1.25] font-black text-[color:var(--saravafy-textPrimaryOnLight)]">
            1. Princípios
          </h2>

          <p className="mb-[14px]">
            O Saravafy se orienta pelos seguintes princípios no tratamento de
            dados:
          </p>

          <ul className="mb-[14px] list-disc pl-[22px]">
            <li className="my-[6px]">Coleta mínima e necessária</li>
            <li className="my-[6px]">Finalidade clara e transparente</li>
            <li className="my-[6px]">
              Ausência de exploração comercial de dados
            </li>
            <li className="my-[6px]">
              Respeito à privacidade e à autonomia das pessoas
            </li>
            <li className="my-[6px]">Segurança técnica e organizacional</li>
            <li className="my-[6px]">
              Responsabilidade cultural e comunitária
            </li>
          </ul>

          <p className="mb-[14px]">
            O Saravafy{" "}
            <strong>não vende, não aluga e não monetiza dados pessoais</strong>.
          </p>

          <hr className="my-6 border-0 border-t border-t-[color:color-mix(in_srgb,var(--saravafy-forest900)_12%,transparent)]" />

          <h2 className="mt-6 mb-3 text-[22px] leading-[1.25] font-black text-[color:var(--saravafy-textPrimaryOnLight)]">
            2. Quais dados coletamos
          </h2>

          <h3 className="mt-5 mb-2.5 text-[18px] leading-[1.3] font-black text-[color:var(--saravafy-textPrimaryOnLight)]">
            2.1 Dados fornecidos diretamente pela pessoa usuária
          </h3>

          <p className="mb-[14px]">
            Podemos coletar os seguintes dados quando você interage com
            funcionalidades específicas do app:
          </p>

          <ul className="mb-[14px] list-disc pl-[22px]">
            <li className="my-[6px]">
              Endereço de e-mail, quando aplicável (por exemplo, convites,
              acesso administrativo ou contato)
            </li>
            <li className="my-[6px]">
              Nome ou apelido, quando informado voluntariamente
            </li>
            <li className="my-[6px]">
              Conteúdo enviado por meio de formulários de contato ou feedback
              (ex.: &quot;Tem algo errado aqui?&quot;)
            </li>
          </ul>

          <p className="mb-[14px]">
            O uso do Saravafy para{" "}
            <strong>
              leitura e acesso ao acervo público não exige cadastro obrigatório
            </strong>{" "}
            no MVP.
          </p>

          <hr className="my-6 border-0 border-t border-t-[color:color-mix(in_srgb,var(--saravafy-forest900)_12%,transparent)]" />

          <h3 className="mt-5 mb-2.5 text-[18px] leading-[1.3] font-black text-[color:var(--saravafy-textPrimaryOnLight)]">
            2.2 Dados coletados automaticamente
          </h3>

          <p className="mb-[14px]">
            De forma limitada e técnica, podem ser coletados:
          </p>

          <ul className="mb-[14px] list-disc pl-[22px]">
            <li className="my-[6px]">
              Informações básicas de dispositivo (tipo de navegador ou sistema
              operacional)
            </li>
            <li className="my-[6px]">
              Logs técnicos de acesso necessários para segurança e funcionamento
              do serviço
            </li>
            <li className="my-[6px]">
              Endereço IP, de forma transitória e protegida
            </li>
          </ul>

          <p className="mb-[14px]">
            Esses dados{" "}
            <strong>
              não são utilizados para fins publicitários, profiling ou
              rastreamento comportamental
            </strong>
            .
          </p>

          <hr className="my-6 border-0 border-t border-t-[color:color-mix(in_srgb,var(--saravafy-forest900)_12%,transparent)]" />

          <h2 className="mt-6 mb-3 text-[22px] leading-[1.25] font-black text-[color:var(--saravafy-textPrimaryOnLight)]">
            3. Para que utilizamos os dados
          </h2>

          <p className="mb-[14px]">
            Os dados coletados são utilizados exclusivamente para:
          </p>

          <ul className="mb-[14px] list-disc pl-[22px]">
            <li className="my-[6px]">
              Garantir o funcionamento técnico e a segurança do aplicativo
            </li>
            <li className="my-[6px]">
              Controlar acessos administrativos e editoriais autorizados
            </li>
            <li className="my-[6px]">
              Responder a solicitações, dúvidas ou pedidos de correção
            </li>
            <li className="my-[6px]">
              Melhorar a estabilidade e a qualidade do serviço
            </li>
            <li className="my-[6px]">
              Cumprir obrigações legais, quando aplicável
            </li>
          </ul>

          <p className="mb-[14px]">
            Não utilizamos dados para publicidade, marketing direcionado ou
            venda de produtos.
          </p>

          <hr className="my-6 border-0 border-t border-t-[color:color-mix(in_srgb,var(--saravafy-forest900)_12%,transparent)]" />

          <h2 className="mt-6 mb-3 text-[22px] leading-[1.25] font-black text-[color:var(--saravafy-textPrimaryOnLight)]">
            4. Conteúdo cultural e espiritual
          </h2>

          <p className="mb-[14px]">
            Os pontos, letras, áudios, tags e informações de terreiros
            disponíveis no Saravafy:
          </p>

          <ul className="mb-[14px] list-disc pl-[22px]">
            <li className="my-[6px]">
              São tratados como <strong>patrimônio cultural coletivo</strong>
            </li>
            <li className="my-[6px]">
              São disponibilizados para{" "}
              <strong>leitura e escuta pública</strong>
            </li>
            <li className="my-[6px]">Não têm finalidade comercial</li>
            <li className="my-[6px]">
              Podem ser corrigidos ou removidos mediante solicitação
              fundamentada
            </li>
          </ul>

          <p className="mb-[14px]">
            Caso você identifique algum conteúdo incorreto, sensível ou que não
            deva estar publicado, disponibilizamos um canal específico para
            contato e análise.
          </p>

          <hr className="my-6 border-0 border-t border-t-[color:color-mix(in_srgb,var(--saravafy-forest900)_12%,transparent)]" />

          <h2 className="mt-6 mb-3 text-[22px] leading-[1.25] font-black text-[color:var(--saravafy-textPrimaryOnLight)]">
            5. Compartilhamento de dados
          </h2>

          <p className="mb-[14px]">
            O Saravafy{" "}
            <strong>não compartilha dados pessoais com terceiros</strong>,
            exceto:
          </p>

          <ul className="mb-[14px] list-disc pl-[22px]">
            <li className="my-[6px]">
              Quando necessário para o funcionamento da infraestrutura técnica
              (ex.: serviços de backend e hospedagem)
            </li>
            <li className="my-[6px]">
              Quando exigido por obrigação legal ou ordem judicial
            </li>
          </ul>

          <p className="mb-[14px]">
            Mesmo nesses casos, o compartilhamento é limitado ao estritamente
            necessário.
          </p>

          <hr className="my-6 border-0 border-t border-t-[color:color-mix(in_srgb,var(--saravafy-forest900)_12%,transparent)]" />

          <h2 className="mt-6 mb-3 text-[22px] leading-[1.25] font-black text-[color:var(--saravafy-textPrimaryOnLight)]">
            6. Armazenamento e segurança
          </h2>

          <p className="mb-[14px]">
            Os dados são armazenados em infraestrutura segura, com as seguintes
            medidas:
          </p>

          <ul className="mb-[14px] list-disc pl-[22px]">
            <li className="my-[6px]">
              Uso de controle de acesso e autenticação
            </li>
            <li className="my-[6px]">
              Regras de segurança em nível de banco de dados (Row Level
              Security)
            </li>
            <li className="my-[6px]">
              Separação entre dados públicos e dados restritos
            </li>
            <li className="my-[6px]">
              Monitoramento e boas práticas de segurança da informação
            </li>
          </ul>

          <p className="mb-[14px]">
            Adotamos medidas técnicas e organizacionais para proteger os dados
            contra acessos não autorizados, vazamentos ou uso indevido.
          </p>

          <hr className="my-6 border-0 border-t border-t-[color:color-mix(in_srgb,var(--saravafy-forest900)_12%,transparent)]" />

          <h2 className="mt-6 mb-3 text-[22px] leading-[1.25] font-black text-[color:var(--saravafy-textPrimaryOnLight)]">
            7. Retenção de dados
          </h2>

          <p className="mb-[14px]">
            Os dados pessoais são mantidos apenas pelo tempo necessário para
            cumprir suas finalidades, respeitando:
          </p>

          <ul className="mb-[14px] list-disc pl-[22px]">
            <li className="my-[6px]">Necessidade operacional</li>
            <li className="my-[6px]">Obrigações legais</li>
            <li className="my-[6px]">Solicitações de exclusão ou correção</li>
          </ul>

          <p className="mb-[14px]">
            Dados desnecessários ou obsoletos são excluídos ou anonimizados.
          </p>

          <hr className="my-6 border-0 border-t border-t-[color:color-mix(in_srgb,var(--saravafy-forest900)_12%,transparent)]" />

          <h2 className="mt-6 mb-3 text-[22px] leading-[1.25] font-black text-[color:var(--saravafy-textPrimaryOnLight)]">
            8. Direitos da pessoa titular
          </h2>

          <p className="mb-[14px]">Nos termos da LGPD, você tem direito a:</p>

          <ul className="mb-[14px] list-disc pl-[22px]">
            <li className="my-[6px]">Confirmar se tratamos seus dados</li>
            <li className="my-[6px]">Acessar seus dados</li>
            <li className="my-[6px]">
              Solicitar correção de dados incompletos ou incorretos
            </li>
            <li className="my-[6px]">
              Solicitar a exclusão de dados, quando aplicável
            </li>
            <li className="my-[6px]">
              Solicitar informações sobre o uso dos dados
            </li>
          </ul>

          <p className="mb-[14px]">
            As solicitações podem ser feitas por meio dos canais oficiais do
            Saravafy.
          </p>

          <hr className="my-6 border-0 border-t border-t-[color:color-mix(in_srgb,var(--saravafy-forest900)_12%,transparent)]" />

          <h2 className="mt-6 mb-3 text-[22px] leading-[1.25] font-black text-[color:var(--saravafy-textPrimaryOnLight)]">
            9. Crianças e adolescentes
          </h2>

          <p className="mb-[14px]">
            O Saravafy não é direcionado especificamente a crianças, mas também{" "}
            <strong>não contém conteúdo impróprio ou comercial</strong>.
            <br />
            Não coletamos intencionalmente dados pessoais de menores de idade
            sem consentimento legal adequado.
          </p>

          <hr className="my-6 border-0 border-t border-t-[color:color-mix(in_srgb,var(--saravafy-forest900)_12%,transparent)]" />

          <h2 className="mt-6 mb-3 text-[22px] leading-[1.25] font-black text-[color:var(--saravafy-textPrimaryOnLight)]">
            10. Alterações nesta política
          </h2>

          <p className="mb-[14px]">
            Esta Política de Privacidade pode ser atualizada para refletir
            melhorias no produto, mudanças legais ou evoluções do projeto.
          </p>

          <p className="mb-[14px]">
            Sempre que houver alterações relevantes, a data de atualização será
            ajustada e a versão mais recente estará disponível no app e nos
            canais oficiais.
          </p>

          <hr className="my-6 border-0 border-t border-t-[color:color-mix(in_srgb,var(--saravafy-forest900)_12%,transparent)]" />

          <h2 className="mt-6 mb-3 text-[22px] leading-[1.25] font-black text-[color:var(--saravafy-textPrimaryOnLight)]">
            11. Contato
          </h2>

          <p className="mb-[14px]">
            Para dúvidas, solicitações ou questões relacionadas à privacidade e
            proteção de dados, entre em contato pelo canal indicado no
            aplicativo ou na página oficial do projeto.
          </p>

          <hr className="my-6 border-0 border-t border-t-[color:color-mix(in_srgb,var(--saravafy-forest900)_12%,transparent)]" />

          <p className="mb-[14px]">
            <strong>Saravafy</strong>
            <br />
            Um acervo vivo, respeitoso e coletivo.
            <br />
            Tecnologia a serviço da cultura, da memória e do cuidado.
          </p>
        </div>
      </div>
    </main>
  );
}
