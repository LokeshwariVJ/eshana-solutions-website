import Link from "next/link";
import { BrandLockup } from "@/components/brand";
import { MobileMenu } from "@/components/mobile-menu";
import { navItems, siteConfig } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-ivory/95 backdrop-blur">
      <div className="container-grid relative flex min-h-16 items-center justify-between gap-6 py-3">
        <Link
          href="/"
          className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
          aria-label="Eshana Software Solutions home"
        >
          <BrandLockup compact />
        </Link>
        <nav aria-label="Main navigation" className="hidden lg:block">
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
          className="hidden border border-charcoal px-4 py-2 text-sm font-medium text-charcoal transition hover:bg-charcoal hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal lg:inline-flex"
        >
          Quality Audit
        </Link>
        <MobileMenu />
      </div>
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
