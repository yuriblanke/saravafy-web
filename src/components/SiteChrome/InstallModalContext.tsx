"use client";

import { createContext, useContext } from "react";

type InstallModalApi = {
  openInstallModal: () => void;
};

const InstallModalContext = createContext<InstallModalApi | null>(null);

export function InstallModalProvider({
  value,
  children,
}: {
  value: InstallModalApi;
  children: React.ReactNode;
}) {
  return (
    <InstallModalContext.Provider value={value}>
      {children}
    </InstallModalContext.Provider>
  );
}

export function useInstallModal(): InstallModalApi {
  const ctx = useContext(InstallModalContext);
  if (!ctx) {
    throw new Error("useInstallModal must be used within InstallModalProvider");
  }
  return ctx;
}
