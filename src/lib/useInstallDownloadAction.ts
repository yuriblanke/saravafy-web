"use client";

import { useCallback } from "react";

import { triggerIframeDownload, useFreshInstallUrl } from "@/lib/useFreshInstallUrl";

export function useInstallDownloadAction() {
  const { installUrl, isLoading, refetch } = useFreshInstallUrl();

  const handleInstallClick = useCallback(async () => {
    const fallbackFromSession = installUrl;

    let fresh: string | null = null;
    try {
      fresh = await refetch();
    } catch (err) {
      console.error(err);
      fresh = null;
    }

    const urlToUse = fresh ?? fallbackFromSession;

    if (!urlToUse) {
      console.warn(
        "[Saravafy] Install URL unavailable (fresh fetch returned null and no session fallback)."
      );
      return;
    }

    triggerIframeDownload(urlToUse);
  }, [installUrl, refetch]);

  return { handleInstallClick, isLoading, installUrl };
}
