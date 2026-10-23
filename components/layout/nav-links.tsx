"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ContactTrigger } from "@/components/contact/contact-dialog";
import { nav } from "@/lib/site";

const linkClass = (active: boolean) =>
  `text-sm transition-colors ${active ? "text-fg" : "text-muted hover:text-fg"}`;

export function NavLinks() {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-3 sm:gap-6">
      {nav.map(({ href, label }) => {
        const active = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <li key={href}>
            {href === "/contact" ? (
              <ContactTrigger
                aria-current={active ? "page" : undefined}
                className={linkClass(active)}
              >
                {label}
              </ContactTrigger>
            ) : (
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={linkClass(active)}
              >
                {label}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
