import Link from "next/link";
import { navItems } from "@/lib/site";

export function MobileMenu() {
  return (
    <details className="group lg:hidden" suppressHydrationWarning>
      <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center border border-line text-ink transition marker:hidden hover:border-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal [&::-webkit-details-marker]:hidden">
        <span className="sr-only">Toggle navigation</span>
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 group-open:hidden"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M5 8h14M5 16h14"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.7"
          />
        </svg>
        <svg
          viewBox="0 0 24 24"
          className="hidden h-5 w-5 group-open:block"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M6 6l12 12M18 6L6 18"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.7"
          />
        </svg>
      </summary>
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className="absolute inset-x-0 top-full border-b border-line bg-ivory"
      >
        <ul className="container-grid grid gap-px bg-line py-px">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block bg-ivory px-1 py-4 text-sm font-medium text-muted transition hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-teal"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
