"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type InstallUrlResponse = { value: string | null; error?: string };

type Listener = (url: string | null) => void;

let sharedInstallUrl: string | null = null;
let sharedInflight: Promise<string | null> | null = null;
const listeners = new Set<Listener>();

function notify(url: string | null) {
  for (const listener of listeners) listener(url);
}

function normalizeValue(value: unknown): string | null {
  if (typeof value !== "string") return null;
  if (!value) return null;
  if (value === "pending") return null;
  return value;
}

async function fetchInstallUrlViaApi(signal?: AbortSignal): Promise<string | null> {
  const res = await fetch("/api/install-url", {
    method: "GET",
    cache: "no-store",
    headers: {
      "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
      pragma: "no-cache",
    },
    signal,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `[Saravafy] Failed to fetch /api/install-url (${res.status}). ${text}`
    );
  }

  const json = (await res.json()) as InstallUrlResponse;
  return normalizeValue(json?.value);
}

export type FreshInstallUrlState = {
  installUrl: string | null;
  isLoading: boolean;
  refetch: () => Promise<string | null>;
};

export function useFreshInstallUrl(): FreshInstallUrlState {
  const [installUrl, setInstallUrl] = useState<string | null>(sharedInstallUrl);
  const [isLoading, setIsLoading] = useState(false);

  const mountedRef = useRef(true);

  const refetch = useCallback(async () => {
    if (sharedInflight) return sharedInflight;

    setIsLoading(true);

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 8000);

    sharedInflight = fetchInstallUrlViaApi(controller.signal)
      .then((value) => {
        sharedInstallUrl = value;
        notify(sharedInstallUrl);
        return sharedInstallUrl;
      })
      .catch((err) => {
        sharedInstallUrl = null;
        notify(sharedInstallUrl);
        console.error(err);
        return null;
      })
      .finally(() => {
        window.clearTimeout(timeoutId);
        sharedInflight = null;
        if (mountedRef.current) setIsLoading(false);
      });

    return sharedInflight;
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    const listener: Listener = (url) => setInstallUrl(url);
    listeners.add(listener);

    if (typeof queueMicrotask === "function") {
      queueMicrotask(() => void refetch());
    } else {
      Promise.resolve().then(() => void refetch());
    }

    function onPageShow() {
      void refetch();
    }

    window.addEventListener("pageshow", onPageShow);

    return () => {
      mountedRef.current = false;
      listeners.delete(listener);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [refetch]);

  return { installUrl, isLoading, refetch };
}

export function triggerIframeDownload(url: string) {
  if (!url) return;

  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = url;
  iframe.setAttribute("aria-hidden", "true");
  document.body.appendChild(iframe);

  window.setTimeout(() => {
    try {
      document.body.removeChild(iframe);
    } catch {
      // ignore
    }
  }, 2000);
}
