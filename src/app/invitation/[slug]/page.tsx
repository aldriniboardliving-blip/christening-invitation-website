import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InvitationExperience } from "@/components/invitation/InvitationExperience";
import { invitation } from "@/config/invitation";
import {
  getGodparentRoleLabel,
  getRecipientBySlug,
  getRecipientPath,
  getRecipients,
} from "@/lib/recipients";

export const dynamicParams = false; // TypeScript check may flag this with cacheComponents; the build succeeds.

export function generateStaticParams() {
  return getRecipients(invitation).map((recipient) => ({
    slug: recipient.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/invitation/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const recipient = getRecipientBySlug(invitation, slug);

  if (!recipient) {
    return {
      title: `Invitation not found | ${invitation.baby.fullName}`,
      robots: { index: false, follow: false },
    };
  }

  const roleLabel = getGodparentRoleLabel(recipient.role);
  const title = `A Special Request for ${roleLabel} ${recipient.name} | ${invitation.baby.fullName}`;
  const description = `${recipient.name}, you are warmly invited to become a ${roleLabel} to ${invitation.baby.fullName}.`;

  return {
    title,
    description,
    alternates: {
      canonical: getRecipientPath(recipient.slug),
    },
    robots: { index: false, follow: false },
    openGraph: {
      type: "website",
      locale: "en_PH",
      url: getRecipientPath(recipient.slug),
      siteName: invitation.meta.title,
      title,
      description,
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
      title,
      description,
      images: [invitation.meta.ogImage],
    },
  };
}

export default async function PersonalizedInvitationPage({
  params,
}: PageProps<"/invitation/[slug]">) {
  const { slug } = await params;
  const recipient = getRecipientBySlug(invitation, slug);

  if (!recipient) {
    notFound();
  }

  return (
    <InvitationExperience invitation={invitation} recipient={recipient} />
  );
}
