"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function TopbarProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setVisible(true);
    setProgress(30);

    const mid = window.setTimeout(() => setProgress(70), 120);
    const end = window.setTimeout(() => setProgress(100), 320);
    timerRef.current = window.setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 520);

    return () => {
      window.clearTimeout(mid);
      window.clearTimeout(end);
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [pathname, searchParams]);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-transparent">
      <div
        className="h-full bg-gold-400 transition-all duration-200"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
