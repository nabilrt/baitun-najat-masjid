"use client";

import { useEffect, useState } from "react";

export default function ShareLink({
  path,
  title,
  buttonLabel,
  copiedLabel
}: {
  path: string;
  title: string;
  buttonLabel: string;
  copiedLabel: string;
}) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setUrl(`${window.location.origin}${path}`);
  }, [path]);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    if (!url) return;
    await navigator.clipboard.writeText(url);
    setCopied(true);
  };

  return (
    <div className="rounded-3xl bg-white p-5 shadow-soft sm:p-6">
      <h3 className="text-base font-semibold text-moss-900">{title}</h3>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          className="w-full rounded-2xl border border-moss-100 bg-moss-50 px-4 py-3 text-sm text-moss-700"
          readOnly
          value={url}
        />
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-full bg-moss-600 px-6 py-3 text-sm font-semibold text-white"
        >
          {copied ? copiedLabel : buttonLabel}
        </button>
      </div>
    </div>
  );
}
