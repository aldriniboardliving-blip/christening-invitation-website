import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LinksManager } from "@/components/invitation/LinksManager";
import { invitation } from "@/config/invitation";
import { getRecipientUrl, getRecipients } from "@/lib/recipients";

export const metadata: Metadata = {
  title: `Godparent links | ${invitation.baby.fullName}`,
  robots: { index: false, follow: false },
};

export default function LinksPage() {
  // The recipient directory must never be published with the static site.
  // Run `npm run dev` to use this owner tool locally.
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const links = getRecipients(invitation).map((recipient) => ({
    recipient,
    url: getRecipientUrl(invitation, recipient.slug),
  }));

  return <LinksManager invitation={invitation} links={links} />;
}
