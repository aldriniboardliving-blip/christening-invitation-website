import type { Metadata } from "next";
import { CelebrantGallery } from "@/components/invitation/CelebrantGallery";
import { SiteFooter } from "@/components/invitation/SiteFooter";
import { MusicPlayer } from "@/components/invitation/MusicPlayer";
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
    <div className="relative min-h-screen bg-[color:var(--color-ivory)]">
      <main id="main-content">
        <CelebrantGallery invitation={invitation} />
        <SiteFooter invitation={invitation} />
      </main>

      <MusicPlayer music={invitation.music} visible={true} />
    </div>
  );
}
