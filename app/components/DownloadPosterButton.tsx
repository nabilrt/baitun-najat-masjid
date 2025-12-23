"use client";

import { useState } from "react";
import { toPng } from "html-to-image";

export default function DownloadPosterButton({
  targetId,
  fileName,
  label,
  loadingLabel
}: {
  targetId: string;
  fileName: string;
  label: string;
  loadingLabel: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    const node = document.getElementById(targetId);
    if (!node) return;
    setLoading(true);
    try {
      const width = node.scrollWidth;
      const height = node.scrollHeight;
      const dataUrl = await toPng(node, {
        cacheBust: true,
        pixelRatio: 2,
        width,
        height,
        backgroundColor: "#ffffff"
      });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = fileName;
      link.click();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-[#1a1a1a] shadow-soft"
    >
      {loading ? loadingLabel : label}
    </button>
  );
}
