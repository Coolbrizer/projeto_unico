"use client";

import { useEffect, useState } from "react";

/** Evita diferença servidor/cliente na primeira pintura (hidratação). */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}
