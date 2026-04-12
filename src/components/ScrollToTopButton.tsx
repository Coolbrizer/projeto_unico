"use client";

import { useEffect, useState } from "react";

const SCROLL_THRESHOLD_PX = 240;

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-[100] rounded-lg border border-[var(--card-border)] bg-[var(--card)]/95 px-3 py-2 text-sm font-medium text-[var(--foreground)] shadow-lg backdrop-blur-sm ring-sky-500/40 transition hover:bg-sky-500/15 hover:ring-2 focus:outline-none focus:ring-2"
    >
      Voltar ao topo
    </button>
  );
}
