import type { Metadata } from "next";
import { InvitationExperience } from "@/components/invitation/InvitationExperience";
import { invitation } from "@/config/invitation";

export const metadata: Metadata = {
  title: invitation.meta.title,
  description: invitation.meta.description,
  alternates: {
    canonical: "/invitation/",
  },
  robots: invitation.meta.indexable
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export default function InvitationPage() {
  return <InvitationExperience invitation={invitation} />;
}
