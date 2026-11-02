/**
 * Domain types for the invitation experience.
 *
 * Every piece of personal or event-specific content lives in
 * `src/config/invitation.ts`. Components must consume these types instead of
 * hardcoding names, dates, venues, or links.
 */

import type { InvitationStatus } from "@/types/recipient";

export interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface Venue {
  name: string;
  addressLines: readonly string[];
  mapsUrl: string;
  /** Optional photograph for the venue gallery. */
  image?: string;
  /** Optional ceremony or reception time. */
  time?: string;
  /** Optional description of the venue/church. */
  description?: string;
}

export interface Godparent {
  name: string;
  /** Optional URL slug; defaults to a slug generated from `name`. */
  slug?: string;
  /** Optional personal note shown on this godparent's invitation. */
  personalizedMessage?: string;
  /**
   * Owner-maintained status for reference only. The static website cannot
   * update or persist this value when a recipient responds.
   */
  invitationStatus?: InvitationStatus;
}

export interface InvitationMeta {
  title: string;
  description: string;
  ogImage: string;
  /** Search engines stay out of private family invitations by default. */
  indexable: boolean;
}

export interface InvitationBaby {
  fullName: string;
  firstName: string;
  /** Used for the large editorial treatment in the hero. */
  displayNameLines: readonly string[];
  monogram: string;
}

export interface InvitationParents {
  mother: string;
  father: string;
}

export interface InvitationEnvelope {
  eyebrow: string;
  title: string;
  subtitle: string;
  openLabel: string;
  note: string;
  sealMonogram: string;
}

export interface InvitationHero {
  eyebrow: string;
  announcement: string;
  parentsLabel: string;
  blessing: string;
  portraitCaption: string;
}

export interface InvitationEvent {
  /** ISO 8601 timestamp with an explicit offset. */
  startsAt: string;
  /** Optional ISO 8601 end timestamp, used by add-to-calendar. */
  endsAt?: string;
  /** IANA time zone used whenever the date is displayed or counted down. */
  timeZone: string;
  ceremonyTimeLabel: string;
  receptionTimeLabel: string;
  church: Venue;
  reception: Venue;
  /** Optional detailed ceremony information. */
  ceremony?: Venue;
  calendarTitle: string;
  calendarDescription: string;
}

export interface InvitationGodparents {
  intro: string;
  ninongs: readonly Godparent[];
  ninangs: readonly Godparent[];
}

export interface InvitationGodparentRequest {
  eyebrow: string;
  request: string;
  closing: string;
  response: {
    /**
     * Leave empty to hide the email response buttons. When set, the two
     * response actions open the guest's email app; nothing is stored here.
     */
    contactEmail: string;
    note: string;
    acceptLabel: string;
    declineLabel: string;
  };
}

export interface InvitationRsvp {
  googleFormUrl: string;
  /**
   * `embed` renders the Google Form inside the invitation.
   * `external` opens it in a new tab (the most reliable option).
   */
  mode: "embed" | "external";
  deadline: string;
  note: string;
}

export interface InvitationMusic {
  enabled: boolean;
  src: string;
  title: string;
  artist: string;
  /** Kept gentle by default; the guest always controls playback. */
  volume: number;
  license: {
    label: string;
    url: string;
  };
  sourceUrl: string;
}

export interface InvitationClosing {
  title: string;
  message: string;
  signature: string;
}

export interface InvitationShare {
  /** Replace with the final public URL before generating QR codes. */
  siteUrl: string;
  qrLabel: string;
}

export interface InvitationPhotos {
  portrait: Photo;
  gallery: readonly Photo[];
}

export interface InvitationTheme {
  name: string;
  colors: {
    background: string;
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    muted: string;
  };
}

export interface InvitationContent {
  eyebrow: string;
  headline: string;
  subtitle: string;
  closingMessage: string;
}

export interface InvitationConfig {
  meta: InvitationMeta;
  baby: InvitationBaby;
  parents: InvitationParents;
  envelope: InvitationEnvelope;
  hero: InvitationHero;
  event: InvitationEvent;
  invitationMessage: string;
  verse: {
    text: string;
    reference: string;
  };
  godparents: InvitationGodparents;
  godparentInvitation: InvitationGodparentRequest;
  theme: InvitationTheme;
  content: InvitationContent;
  photos: InvitationPhotos;
  rsvp: InvitationRsvp;
  music: InvitationMusic;
  closing: InvitationClosing;
  share: InvitationShare;
}
