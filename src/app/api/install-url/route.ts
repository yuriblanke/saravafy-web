import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function antiCacheHeaders(): Record<string, string> {
  return {
    "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
    Pragma: "no-cache",
    Expires: "0",
  };
}

function requireEnv(name: string, value: string | undefined): string {
  if (typeof value === "string" && value.trim().length > 0) return value;
  throw new Error(
    `[Saravafy] Missing required env var ${name}. Configure it and redeploy/restart.`
  );
}

export async function GET() {
  try {
    const supabaseUrl = requireEnv(
      "NEXT_PUBLIC_SARAVAFY_SUPABASE_URL",
      process.env.NEXT_PUBLIC_SARAVAFY_SUPABASE_URL
    );
    const supabaseAnonKey = requireEnv(
      "NEXT_PUBLIC_SARAVAFY_SUPABASE_ANON_KEY",
      process.env.NEXT_PUBLIC_SARAVAFY_SUPABASE_ANON_KEY
    );

    const endpoint =
      supabaseUrl.replace(/\/$/, "") + "/rest/v1/rpc/get_app_install_url";

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(endpoint, {
      method: "POST",
      cache: "no-store",
      headers: {
        apikey: supabaseAnonKey,
        authorization: `Bearer ${supabaseAnonKey}`,
        "content-type": "application/json",
        "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
        pragma: "no-cache",
      },
      body: "{}",
      signal: controller.signal,
    }).finally(() => clearTimeout(timeoutId));

    if (!res.ok) {
      return NextResponse.json(
        { value: null },
        { status: 502, headers: antiCacheHeaders() }
      );
    }

    const json = (await res.json()) as { value?: unknown };
    const value = typeof json?.value === "string" ? json.value : null;

    if (!value || value === "pending") {
      return NextResponse.json(
        { value: null },
        { status: 200, headers: antiCacheHeaders() }
      );
    }

    return NextResponse.json(
      { value },
      {
        status: 200,
        headers: {
          ...antiCacheHeaders(),
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { value: null, error: message },
      { status: 500, headers: antiCacheHeaders() }
    );
  }
}
