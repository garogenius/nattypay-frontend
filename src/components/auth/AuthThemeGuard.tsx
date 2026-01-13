"use client";

import React, { useEffect } from "react";

/**
 * Onboarding/Auth pages should not support theme switching.
 * We force a stable LIGHT theme for the /(auth) route segment, and restore the
 * user's previous theme when leaving.
 */
export default function AuthThemeGuard({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const html = document.documentElement;

    const hadDarkClass = html.classList.contains("dark");
    const prevDataMode = html.getAttribute("data-mode");

    // Keep auth/onboarding marker without forcing light mode
    html.setAttribute("data-auth-onboarding", "true");

    // Align with persisted user preference if available
    const storedTheme = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (storedTheme === "dark") {
      html.classList.add("dark");
      html.setAttribute("data-mode", "dark");
    } else if (storedTheme === "light") {
      html.classList.remove("dark");
      html.setAttribute("data-mode", "light");
    }

    return () => {
      html.removeAttribute("data-auth-onboarding");

      if (hadDarkClass) html.classList.add("dark");
      else html.classList.remove("dark");

      if (prevDataMode) html.setAttribute("data-mode", prevDataMode);
      else html.removeAttribute("data-mode");
    };
  }, []);

  return <>{children}</>;
}


