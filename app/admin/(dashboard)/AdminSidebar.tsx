"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { getLang, translations, withLang } from "../../../lib/i18n";

export default function AdminSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lang = getLang(searchParams.get("lang") ?? undefined);
  const copy = translations[lang];
  const links = [
    { href: "/admin/prayer", label: copy.admin.nav.prayer },
    { href: "/admin/donations", label: copy.admin.nav.donations },
    { href: "/admin/campaigns", label: copy.admin.nav.campaigns },
    { href: "/admin/hadiths", label: copy.admin.nav.hadiths },
    { href: "/admin/announcements", label: copy.admin.nav.announcements },
    { href: "/admin/displays", label: copy.admin.nav.displays }
  ];

  return (
    <nav className="flex flex-col gap-2 text-sm text-moss-200">
      {links.map((link) => {
        const isActive = pathname === link.href;
        const baseClass = "block rounded-2xl px-4 py-3 transition";
        const activeClass = isActive ? "bg-moss-700/70 text-moss-50" : "hover:bg-moss-700/40";
        return (
          <a key={link.href} href={withLang(link.href, lang)} className={`${baseClass} ${activeClass} whitespace-nowrap`}>
            {link.label}
          </a>
        );
      })}
    </nav>
  );
}
