"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import type { InvitationConfig } from "@/types/invitation";
import type { Recipient } from "@/types/recipient";
import { getGodparentRoleLabel } from "@/lib/recipients";
import { Sprig } from "@/components/ui/Botanical";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Monogram } from "@/components/ui/Monogram";
import { OrnamentDivider } from "@/components/ui/Ornament";

interface GodparentRequestProps {
  invitation: InvitationConfig;
  recipient: Recipient;
}

const silk = [0.22, 1, 0.36, 1] as const;

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("godparent-response-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("godparent-response-change", callback);
  };
}

function buildResponseMailto(
  email: string,
  recipient: Recipient,
  babyName: string,
  roleLabel: string,
  response: "accepted" | "declined",
): string {
  const subject = `Godparent response from ${recipient.name}`;
  const body =
    response === "accepted"
      ? `Dear family,\n\nYes, I would be honored to be a ${roleLabel} to ${babyName}.\n\nWith love,\n${recipient.name}`
      : `Dear family,\n\nThank you for thinking of me. I am sorry, but I cannot accept the role of ${roleLabel} to ${babyName}.\n\nWith love,\n${recipient.name}`;

  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function GodparentRequest({
  invitation,
  recipient,
}: GodparentRequestProps) {
  const { baby, closing, godparentInvitation } = invitation;
  const roleLabel = getGodparentRoleLabel(recipient.role);
  const contactEmail = godparentInvitation.response.contactEmail.trim();

  // Check localStorage for previous response safely with useSyncExternalStore
  const getSnapshot = useCallback(() => {
    try {
      return window.localStorage.getItem(`godparent-response-${recipient.id}`) !== null;
    } catch {
      return false;
    }
  }, [recipient.id]);

  const hasStoredResponse = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => false,
  );

  // Track response type for modal state
  const [responseType, setResponseType] = useState<"accepted" | "declined" | null>(null);

  // When response is stored, buttons should be hidden and modal shown
  const showButtons = !hasStoredResponse && responseType === null;

  // Handle button click - store in localStorage
  const handleResponse = (value: "accepted" | "declined") => {
    try {
      window.localStorage.setItem(`godparent-response-${recipient.id}`, value);
      window.dispatchEvent(new Event("godparent-response-change"));
      setResponseType(value);
    } catch {
      // Ignore write errors (e.g. quota or private mode)
    }
  };

  return (
    <section
      id="special-request"
      aria-labelledby="special-request-title"
      className="relative overflow-hidden border-y border-gold/15 bg-[linear-gradient(180deg,var(--color-ivory-deep)_0%,var(--color-ivory)_100%)] py-20 sm:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-1/2 h-[34rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-t-[15rem] border border-sage/15 sm:h-[40rem] sm:w-[34rem]" />
        <div className="absolute left-1/2 top-1/2 h-[31rem] w-[25rem] -translate-x-1/2 -translate-y-1/2 rounded-t-[14rem] border border-gold/10 sm:h-[37rem] sm:w-[31rem]" />
        <div className="absolute left-1/2 top-1/2 size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sage/10 blur-3xl" />
        <Sprig className="absolute -left-10 bottom-0 h-64 w-40 rotate-[22deg] text-sage/30 sm:left-4 sm:h-72 sm:w-44" />
        <Sprig
          mirrored
          className="absolute -right-10 top-0 h-64 w-40 -rotate-12 text-sage/25 sm:right-4 sm:h-72 sm:w-44"
        />
        <span className="absolute left-[18%] top-[24%] size-1 rounded-full bg-gold/40" />
        <span className="absolute bottom-[22%] right-[16%] size-1.5 rounded-full bg-sage/50" />
      </div>

      <Container className="relative">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: silk }}
        >
          <Monogram
            letters={baby.monogram}
            className="mx-auto size-14 text-xl"
          />

          <Eyebrow className="mt-7">{godparentInvitation.eyebrow}</Eyebrow>

          <h2
            id="special-request-title"
            className="mt-5 font-display text-[2.55rem] leading-[1.02] text-ink text-balance sm:text-5xl"
          >
            Dear {recipient.name},
          </h2>

          {recipient.personalizedMessage ? (
            <p className="mx-auto mt-6 max-w-lg rounded-2xl border border-sage/25 bg-sage-soft/45 px-5 py-4 font-display text-lg italic leading-relaxed text-sage-deep">
              {recipient.personalizedMessage}
            </p>
          ) : null}

          <p className="mx-auto mt-7 max-w-xl text-[0.95rem] leading-8 text-ink/75">
            {godparentInvitation.request}
          </p>

          <div className="relative mx-auto mt-9 max-w-xl overflow-hidden rounded-[2rem] border border-gold/25 bg-paper/80 px-6 py-8 shadow-soft sm:px-9 sm:py-10">
            <span
              aria-hidden="true"
              className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
            />

            <p className="font-display text-[2rem] leading-tight text-ink text-balance sm:text-4xl">
              Will you be my{" "}
              <span className="italic text-sage-deep">{roleLabel}</span>?
            </p>

            {showButtons ? (
              // Show interactive buttons only if no stored response
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                {/* Yes button - interactive with localStorage */}
                <button
                  type="button"
                  onClick={() => handleResponse("accepted")}
                  className="inline-flex items-center justify-center rounded-full border border-gold-deep/20 bg-gold px-6 py-3 text-[0.6rem] font-medium uppercase tracking-[0.22em] text-[#2f332e] shadow-[0_16px_30px_-16px_rgba(168,135,74,0.7)] transition-[background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:bg-gold-deep hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-2"
                  aria-label="Yes, I would be honored"
                >
                  <svg
                    aria-hidden="true"
                    className="size-3.5"
                    strokeWidth={1.8}
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 6L8.59 2.93a1 1 0 011.71 0l4.58 4.33a1 1 0 010 1.72l-4.58 4.33a1 1 0 01-1.71 0L14 10l-1.47-3.67Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Yes, I would be honored
                </button>

                {/* No button - interactive with localStorage */}
                <button
                  type="button"
                  onClick={() => handleResponse("declined")}
                  className="inline-flex items-center justify-center rounded-full border border-sage/30 bg-paper/60 px-6 py-3 text-[0.6rem] font-medium uppercase tracking-[0.22em] text-sage-deep transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-sage/50 hover:bg-sage-soft/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/50 focus-visible:ring-offset-2"
                  aria-label="Sorry, I cannot accept"
                >
                  <svg
                    aria-hidden="true"
                    className="size-3.5"
                    strokeWidth={1.8}
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 6L8.59 2.93a1 1 0 011.71 0l4.58 4.33a1 1 0 010 1.72l-4.58 4.33a1 1 0 01-1.71 0L14 10l-1.47-3.67Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Sorry, I cannot accept
                </button>
              </div>
            ) : responseType !== null ? (
              // Show modal after response - centered overlay
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <div className="relative bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl transform transition-opacity duration-300" role="dialog" aria-modal="true">
                  <button
                    type="button"
                    onClick={() => setResponseType(null)}
                    className="absolute top-4 right-4 text-sage/50 hover:text-sage Decrease"
                    aria-label="Close modal"
                  >
                    &times;
                  </button>

                  {responseType === "accepted" ? (
                    <>
                      <svg
                        className="w-16 h-16 mx-auto text-green-500 mb-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          d="M12 2L2 7l10 5 10-5-10-5z"
                        />
                        <path d="M2 7l10 5" />
                      </svg>

                      <p className="mt-6 text-2xl font-bold text-ink">
                        Thank you for accepting! You will be a wonderful ninong/ninang to Adreil.
                      </p>

                      <p className="mt-2 text-sage-deep">
                        Were so grateful youll be celebrating with us!
                      </p>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-16 h-16 mx-auto text-red-500 mb-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14l-4.58-4.33L12 4l4.58 4.33L12 16z"
                        />
                        <path d="M12 4l-4.58 4.33L6 8l6.92-3.46L12 4z" />
                      </svg>

                      <p className="mt-6 text-2xl font-bold text-ink">
                        We understand. Thank you for considering this special role.
                      </p>

                      <p className="mt-2 text-sage-deep">
                        We respect your decision and look forward to celebrating with you nonetheless.
                      </p>
                    </>
                  )}

                  {contactEmail ? (
                    <div className="mt-6">
                      <a
                        href={buildResponseMailto(
                          contactEmail,
                          recipient,
                          baby.firstName,
                          roleLabel,
                          responseType,
                        )}
                        className="inline-flex items-center justify-center rounded-full border border-gold-deep/20 bg-gold px-6 py-3 text-[0.6rem] font-medium uppercase tracking-[0.22em] text-[#2f332e] shadow-[0_16px_30px_-16px_rgba(168,135,74,0.7)] transition-[background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:bg-gold-deep hover:text-ivory"
                      >
                        Send Email Response
                      </a>
                    </div>
                  ) : (
                    <p className="mt-2 text-sage-deep">
                      No contact email configured. Your response has been recorded locally.
                    </p>
                  )}

                  <p className="mt-6 text-sm text-sage-deep">
                    With love, {closing.signature}
                  </p>
                </div>
              </div>
            ) : (
              // Show thank you message when response already stored
              <div>
                <p className="mt-4 text-[0.62rem] leading-relaxed text-sage-deep">
                  Thank you for considering this special role in Adreil Eiden&apos;s life.
                </p>
                <p className="mt-2 text-[0.55rem] uppercase tracking-[0.3em] text-muted">
                  Your response has been recorded.
                </p>
              </div>
            )}

            {contactEmail ? (
              // Show mailto response options
              <div>
                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                  <a
                    href={buildResponseMailto(
                      contactEmail,
                      recipient,
                      baby.firstName,
                      roleLabel,
                      "accepted",
                    )}
                    className="inline-flex items-center justify-center rounded-full border border-gold-deep/20 bg-gold px-6 py-3 text-[0.6rem] font-medium uppercase tracking-[0.22em] text-[#2f332e] shadow-[0_16px_30px_-16px_rgba(168,135,74,0.7)] transition-[background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:bg-gold-deep hover:text-ivory"
                  >
                    {godparentInvitation.response.acceptLabel}
                  </a>
                  <a
                    href={buildResponseMailto(
                      contactEmail,
                      recipient,
                      baby.firstName,
                      roleLabel,
                      "declined",
                    )}
                    className="inline-flex items-center justify-center rounded-full border border-sage/30 bg-paper/60 px-6 py-3 text-[0.6rem] font-medium uppercase tracking-[0.22em] text-sage-deep transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-sage/50 hover:bg-sage-soft/50"
                  >
                    {godparentInvitation.response.declineLabel}
                  </a>
                </div>

                <p className="mt-4 text-[0.62rem] leading-relaxed text-muted">
                  {godparentInvitation.response.note}
                </p>
              </div>
            ) : (
              <p className="mx-auto mt-6 max-w-sm text-[0.68rem] leading-relaxed text-muted">
              </p>
            )}
          </div>

          <OrnamentDivider className="my-8" />

          <p className="mx-auto max-w-lg font-display text-[1.2rem] italic leading-relaxed text-sage-deep sm:text-[1.35rem]">
            {godparentInvitation.closing}
          </p>

          <p className="mt-6 text-[0.55rem] uppercase tracking-[0.3em] text-muted">
            With love, {closing.signature}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}