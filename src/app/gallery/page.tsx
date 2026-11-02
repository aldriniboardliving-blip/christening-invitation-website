import { Suspense } from "react";
import type { Metadata } from "next";
import { GalleryView } from "@/components/invitation/GalleryView";
import { invitation } from "@/config/invitation";

export const metadata: Metadata = {
  title: `Celebrant Gallery | ${invitation.baby.fullName}`,
  description: `Interactive photo gallery of ${invitation.baby.fullName}`,
  alternates: {
    canonical: "/gallery/",
  },
  robots: { index: false, follow: false },
};

export default function GalleryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[color:var(--color-ivory)]" />
      }
    >
      <GalleryView invitation={invitation} />
    </Suspense>
  );
}
