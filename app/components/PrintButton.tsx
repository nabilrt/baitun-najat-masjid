"use client";

export default function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-[#1a1a1a] shadow-soft print:hidden"
    >
      {label}
    </button>
  );
}
