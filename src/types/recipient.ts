/**
 * Personalized godparent invitation types.
 *
 * Recipients are derived from the godparent lists in
 * `src/config/invitation.ts`, keeping the family's names and roles in one
 * place. A recipient never needs an account or a login.
 */

export type GodparentRole = "ninong" | "ninang";

export type InvitationStatus = "pending" | "accepted" | "declined";

export interface Recipient {
  /** Stable identifier, for example `ninong-antonio-reyes`. */
  id: string;
  /** Readable URL segment, for example `antonio-reyes`. */
  slug: string;
  name: string;
  role: GodparentRole;
  /** Optional note from the family, shown inside the personalized request. */
  personalizedMessage?: string;
  /**
   * Owner-maintained reference value. The static website does not write or
   * persist this when a recipient responds.
   */
  invitationStatus?: InvitationStatus;
}
