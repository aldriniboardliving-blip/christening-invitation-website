import type { Metadata } from "next";
import { InvitationExperience } from "@/components/invitation/InvitationExperience";
import { invitation } from "@/config/invitation";

export const metadata: Metadata = {
  title: invitation.meta.title,
  description: invitation.meta.description,
  alternates: {
    canonical: "/invitation/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: "/invitation/",
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
};

export default function InvitationPage() {
  return <InvitationExperience invitation={invitation} initialOpened={true} />;
}
