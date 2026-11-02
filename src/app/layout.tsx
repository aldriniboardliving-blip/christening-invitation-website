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

export const metadata: Metadata = {
  metadataBase: new URL(invitation.share.siteUrl),
  title: invitation.meta.title,
  description: invitation.meta.description,
  applicationName: invitation.baby.fullName,
  authors: [{ name: invitation.closing.signature }],
  robots: invitation.meta.indexable
    ? { index: true, follow: true }
    : { index: false, follow: false },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: "/",
    siteName: invitation.meta.title,
    title: invitation.meta.title,
    description: invitation.meta.description,
    images: [
      {
        url: invitation.meta.ogImage,
        width: invitation.photos.portrait.width,
        height: invitation.photos.portrait.height,
        alt: invitation.photos.portrait.alt,
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
