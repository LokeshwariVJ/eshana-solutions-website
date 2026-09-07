import type { Metadata } from "next";
import { Footer, Header } from "@/components/site-shell";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Eshana Software Solutions | Quality Engineering & Test Automation",
    template: "%s | Eshana Software Solutions",
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Eshana Software Solutions | Quality Engineering & Test Automation",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary",
    title: "Eshana Software Solutions | Quality Engineering & Test Automation",
    description: siteConfig.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
              description: siteConfig.description,
              address: {
                "@type": "PostalAddress",
                addressRegion: "AZ",
                addressCountry: "US",
              },
              founder: {
                "@type": "Person",
                name: "Lokeshwari Padmanabhan",
                jobTitle: "Founder & Quality Engineering Consultant",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
