import fs from "node:fs";
import path from "node:path";

import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const metadata: Metadata = {
  title: "Política de Privacidade — Saravafy",
};

function extractLastUpdated(markdown: string): string | null {
  const lines = String(markdown || "").split(/\r?\n/);
  const line = lines.find((l) =>
    /\b(Última atualização|Ultima atualizacao)\b\s*:/i.test(l)
  );
  return line ? line.trim() : null;
}

function stripLeadingTitle(markdown: string): string {
  return String(markdown || "").replace(/^#\s+.*(?:\r?\n){1,2}/, "");
}

function readPolicyMarkdown(): string {
  const filePath = path.join(process.cwd(), "public", "politica-de-privacidade.md");
  return fs.readFileSync(filePath, "utf8");
}

export default function PrivacyPolicyPage() {
  const md = readPolicyMarkdown();
  const lastUpdated = extractLastUpdated(md);
  const bodyMd = stripLeadingTitle(md);

  return (
    <main className="min-h-dvh text-[color:var(--saravafy-textPrimaryOnLight)]">
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
          {lastUpdated ? (
            <p className="m-0 mt-3 text-[14px] leading-[1.5] text-[color:var(--saravafy-textMutedOnLight)]">
              {lastUpdated}
            </p>
          ) : null}
        </header>

        <div
          className="max-w-none text-[16px] leading-[1.7] text-[color:var(--saravafy-textSecondaryOnLight)]"
          aria-label="Conteúdo da política"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            skipHtml
            components={{
              a: ({ href, children, ...props }) => (
                <a
                  {...props}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline text-[color:var(--saravafy-textPrimaryOnLight)]"
                >
                  {children}
                </a>
              ),
              h1: ({ children, ...props }) => (
                <h2
                  {...props}
                  className="mt-6 mb-3 text-[22px] leading-[1.25] font-black text-[color:var(--saravafy-textPrimaryOnLight)]"
                >
                  {children}
                </h2>
              ),
              h2: ({ children, ...props }) => (
                <h3
                  {...props}
                  className="mt-5 mb-2.5 text-[18px] leading-[1.3] font-black text-[color:var(--saravafy-textPrimaryOnLight)]"
                >
                  {children}
                </h3>
              ),
              h3: ({ children, ...props }) => (
                <h4
                  {...props}
                  className="mt-4 mb-2 text-[16px] leading-[1.35] font-black text-[color:var(--saravafy-textPrimaryOnLight)]"
                >
                  {children}
                </h4>
              ),
              p: ({ children, ...props }) => (
                <p {...props} className="my-0 mb-[14px]">
                  {children}
                </p>
              ),
              hr: (props) => (
                <hr
                  {...props}
                  className="my-6 border-0 border-t border-t-[color:color-mix(in_srgb,var(--saravafy-forest900)_12%,transparent)]"
                />
              ),
              blockquote: ({ children, ...props }) => (
                <blockquote
                  {...props}
                  className="my-4 border-l-[3px] border-l-[color:color-mix(in_srgb,var(--saravafy-forest900)_12%,transparent)] pl-[14px]"
                >
                  {children}
                </blockquote>
              ),
              ul: ({ children, ...props }) => (
                <ul {...props} className="my-0 mb-[14px] list-disc pl-[22px]">
                  {children}
                </ul>
              ),
              ol: ({ children, ...props }) => (
                <ol {...props} className="my-0 mb-[14px] list-decimal pl-[22px]">
                  {children}
                </ol>
              ),
              li: ({ children, ...props }) => (
                <li {...props} className="my-[6px]">
                  {children}
                </li>
              ),
            }}
          >
            {bodyMd}
          </ReactMarkdown>
        </div>
      </div>
    </main>
  );
}
