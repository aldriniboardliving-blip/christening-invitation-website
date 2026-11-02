"use client";

import { useState, useEffect } from "react";
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

  // Check localStorage for previous response on mount
  const [hasStoredResponse, setHasStoredResponse] = useState(() => {
    const stored = localStorage.getItem(`godparent-response-${recipient.id}`);
    return stored !== null;
  });

  // When response is stored, buttons should be hidden
  const showButtons = !hasStoredResponse;

  // Handle button click - store in localStorage
  const handleResponse = (value: "accepted" | "declined") => {
    localStorage.setItem(`godparent-response-${recipient.id}`, value);
    setHasStoredResponse(true);
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
            ) : (
              // Show thank you message after response
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