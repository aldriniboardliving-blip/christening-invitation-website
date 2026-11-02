"use client";

import { useSearchParams } from "next/navigation";
import { CelebrantGallery } from "@/components/invitation/CelebrantGallery";
import { SiteFooter } from "@/components/invitation/SiteFooter";
import { MusicPlayer } from "@/components/invitation/MusicPlayer";
import { getRecipientBySlug, getRecipientPath } from "@/lib/recipients";
import type { InvitationConfig } from "@/types/invitation";

interface GalleryViewProps {
  invitation: InvitationConfig;
}

export function GalleryView({ invitation }: GalleryViewProps) {
  const searchParams = useSearchParams();
  const slug = searchParams.get("for") || searchParams.get("recipient") || "";
  const recipient = slug ? getRecipientBySlug(invitation, slug) || null : null;
  const targetInvitationUrl = recipient
    ? getRecipientPath(recipient.slug)
    : "/invitation/";

  return (
    <div className="relative min-h-screen bg-[color:var(--color-ivory)]">
      <main id="main-content">
        <CelebrantGallery
          invitation={invitation}
          recipient={recipient}
          invitationUrl={targetInvitationUrl}
        />
        <SiteFooter invitation={invitation} recipient={recipient} />
      </main>

      <MusicPlayer music={invitation.music} visible={true} />
    </div>
  );
}
