import type { CSSProperties } from "react";
import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { invitation } from "@/config/invitation";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
  fallback: ["Iowan Old Style", "Palatino Linotype", "Georgia", "serif"],
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
  fallback: ["Avenir Next", "Segoe UI", "sans-serif"],
});

/** Expose the configured Elegant Botanical palette to the CSS design tokens. */
const themeStyle = {
  "--invitation-background": invitation.theme.colors.background,
  "--invitation-primary": invitation.theme.colors.primary,
  "--invitation-secondary": invitation.theme.colors.secondary,
  "--invitation-accent": invitation.theme.colors.accent,
  "--invitation-text": invitation.theme.colors.text,
  "--invitation-muted": invitation.theme.colors.muted,
} as CSSProperties;

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : null) ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
  invitation.share.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: invitation.meta.title,
    template: `%s | ${invitation.baby.fullName}`,
  },
  description: invitation.meta.description,
  applicationName: invitation.baby.fullName,
  authors: [{ name: invitation.closing.signature }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: "/",
    siteName: `${invitation.baby.fullName} Christening`,
    title: invitation.meta.title,
    description: invitation.meta.description,
    images: [
      {
        url: invitation.meta.ogImage,
        width: 702,
        height: 539,
        type: "image/png",
        alt: `Christening of ${invitation.baby.fullName}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: invitation.meta.title,
    description: invitation.meta.description,
    images: [invitation.meta.ogImage],
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: invitation.theme.colors.background,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      style={themeStyle}
      className={`${cormorant.variable} ${jost.variable} h-full`}
    >
      <body className="min-h-svh bg-ivory font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
