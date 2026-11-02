import type { Godparent, InvitationConfig } from "@/types/invitation";
import type { GodparentRole, Recipient } from "@/types/recipient";

const ROLE_LABELS: Record<GodparentRole, string> = {
  ninong: "Ninong",
  ninang: "Ninang",
};

/** Slugs that would collide with a real route under `/invitation/`. */
const RESERVED_SLUGS = new Set(["links"]);

/** Convert a display name into a readable, URL-safe slug. */
export function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "")
    .replace(/&/g, " and ")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getGodparentRoleLabel(role: GodparentRole): string {
  return ROLE_LABELS[role];
}

function toRecipient(
  godparent: Godparent,
  role: GodparentRole,
): Recipient {
  const requestedSlug = godparent.slug?.trim();
  const slug = slugify(requestedSlug || godparent.name);

  if (!slug) {
    throw new Error(
      `Could not create a URL slug for godparent "${godparent.name}". Add an explicit "slug" in src/config/invitation.ts.`,
    );
  }

  if (RESERVED_SLUGS.has(slug)) {
    throw new Error(
      `The godparent slug "${slug}" is reserved by another route. Choose another "slug" in src/config/invitation.ts.`,
    );
  }

  return {
    id: `${role}-${slug}`,
    slug,
    name: godparent.name,
    role,
    ...(godparent.personalizedMessage
      ? { personalizedMessage: godparent.personalizedMessage }
      : {}),
    ...(godparent.invitationStatus
      ? { invitationStatus: godparent.invitationStatus }
      : {}),
  };
}

/**
 * Derive every personalized recipient from the two godparent lists.
 *
 * Duplicate or reserved slugs are treated as configuration errors so a broken
 * personalized link can never be published silently.
 */
export function getRecipients(
  invitation: InvitationConfig,
): readonly Recipient[] {
  const recipients = [
    ...invitation.godparents.ninongs.map((godparent) =>
      toRecipient(godparent, "ninong"),
    ),
    ...invitation.godparents.ninangs.map((godparent) =>
      toRecipient(godparent, "ninang"),
    ),
  ];

  const seen = new Map<string, Recipient>();

  for (const recipient of recipients) {
    const existing = seen.get(recipient.slug);

    if (existing) {
      throw new Error(
        `Duplicate godparent URL slug "${recipient.slug}" for "${existing.name}" and "${recipient.name}". Set a unique "slug" on one of them in src/config/invitation.ts.`,
      );
    }

    seen.set(recipient.slug, recipient);
  }

  return recipients;
}

export function getRecipientBySlug(
  invitation: InvitationConfig,
  slug: string,
): Recipient | undefined {
  return getRecipients(invitation).find(
    (recipient) => recipient.slug === slug,
  );
}

export function getInvitationPath(): string {
  return "/invitation/";
}

export function getRecipientPath(slug: string): string {
  return `/invitation/${slug}/`;
}

function toAbsoluteUrl(siteUrl: string, path: string): string {
  const base = siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`;
  return new URL(path.replace(/^\/+/, ""), base).toString();
}

export function getInvitationUrl(invitation: InvitationConfig): string {
  return toAbsoluteUrl(invitation.share.siteUrl, getInvitationPath());
}

export function getRecipientUrl(
  invitation: InvitationConfig,
  slug: string,
): string {
  return toAbsoluteUrl(invitation.share.siteUrl, getRecipientPath(slug));
}
