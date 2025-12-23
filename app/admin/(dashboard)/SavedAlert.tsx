"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SavedAlert({ message }: { message: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("saved");
      const next = params.toString();
      router.replace(next ? `${pathname}?${next}` : pathname);
    }, 2000);

    return () => clearTimeout(timer);
  }, [pathname, router, searchParams]);

  return (
    <div className="rounded-2xl border border-moss-200 bg-moss-50 px-4 py-3 text-sm font-semibold text-moss-700">
      {message}
    </div>
  );
}
