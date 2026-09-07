import Link from "next/link";
import { navItems, siteConfig } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-ivory/95 backdrop-blur">
      <div className="container-grid flex min-h-20 items-center justify-between gap-6 py-4">
        <Link
          href="/"
          className="max-w-[13rem] text-base font-semibold leading-tight text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
          aria-label="Eshana Software Solutions home"
        >
          Eshana Software Solutions
        </Link>
        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-7 text-sm font-medium text-muted">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          href="/quality-audit"
          className="hidden border border-charcoal px-4 py-2 text-sm font-medium text-charcoal transition hover:bg-charcoal hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal sm:inline-flex"
        >
          Quality Audit
        </Link>
      </div>
      <nav
        aria-label="Mobile navigation"
        className="container-grid border-t border-line py-3 md:hidden"
      >
        <ul className="flex gap-4 overflow-x-auto text-sm font-medium text-muted">
          {navItems.map((item) => (
            <li key={item.href} className="shrink-0">
              <Link
                href={item.href}
                className="transition hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="container-grid grid gap-10 py-12 md:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="text-xl font-semibold text-ink">{siteConfig.name}</p>
          <p className="mt-3 max-w-xl text-base leading-7 text-muted">
            Founder-led Quality Engineering and automation consultancy for
            startups and modern product teams.
          </p>
        </div>
        <div className="grid gap-4 text-sm text-muted sm:grid-cols-2 md:justify-self-end">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="container-grid border-t border-line py-6 text-sm text-muted">
        <p>&copy; {new Date().getFullYear()} Eshana Software Solutions LLC.</p>
      </div>
    </footer>
  );
}
