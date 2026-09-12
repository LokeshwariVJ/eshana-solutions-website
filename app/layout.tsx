import type { Metadata } from "next";
import { headers } from "next/headers";
import { Footer, Header } from "@/components/site-shell";
import { siteConfig } from "@/lib/site";
import { brandSocialImage, socialDescription, socialTitle } from "@/lib/social";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Eshana Software Solutions | Quality Engineering & Test Automation",
    template: "%s | Eshana Software Solutions",
  },
  description: siteConfig.description,
  alternates: {
    canonical: `${siteConfig.url}/`,
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/`,
    siteName: siteConfig.name,
    title: socialTitle,
    description: socialDescription,
    images: [brandSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description: socialDescription,
    images: [brandSocialImage],
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <script
          nonce={nonce}
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
            }).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
