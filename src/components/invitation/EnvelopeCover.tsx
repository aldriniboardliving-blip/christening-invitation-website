"use client";

import type { KeyboardEvent } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { InvitationConfig } from "@/types/invitation";
import type { Recipient } from "@/types/recipient";
import { cn } from "@/lib/utils";
import { getGodparentRoleLabel } from "@/lib/recipients";
import { CornerFlourish, Sprig } from "@/components/ui/Botanical";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LeafMark } from "@/components/ui/Ornament";
import { Envelope } from "@/components/invitation/Envelope";

interface EnvelopeCoverProps {
  invitation: InvitationConfig;
  recipient?: Recipient | null;
  opening: boolean;
  reducedMotion: boolean;
  onOpen: () => void;
}

const silk = [0.22, 1, 0.36, 1] as const;

export function EnvelopeCover({
  invitation,
  recipient = null,
  opening,
  reducedMotion,
  onOpen,
}: EnvelopeCoverProps) {
  const { envelope, baby } = invitation;

  /** Only one action exists inside the gate, so keep Tab on it. */
  function trapFocus(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") return;

    const openButton = event.currentTarget.querySelector<HTMLButtonElement>(
      "[data-open-invitation]",
    );

    if (openButton) {
      event.preventDefault();
      openButton.focus();
    }
  }

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="gate-title"
      aria-describedby="gate-note"
      onKeyDown={trapFocus}
      className="fixed inset-0 z-50 overflow-hidden bg-ivory"
      exit={{
        opacity: 0,
        transition: { duration: reducedMotion ? 0.15 : 0.6, ease: silk },
      }}
    >
      <CoverBotanicals />

      <div className="relative z-10 flex h-svh overflow-y-auto overscroll-contain">
        <motion.div
          className="my-auto w-full px-6 py-10 sm:py-14 sm:[@media(max-height:760px)]:py-8"
          animate={
            opening
              ? {
                  opacity: 0,
                  transition: {
                    duration: reducedMotion ? 0.1 : 0.45,
                    delay: reducedMotion ? 0 : 0.68,
                    ease: silk,
                  },
                }
              : { opacity: 1 }
          }
          initial={false}
        >
          <div className="mx-auto w-full max-w-md text-center">
            <div className="cover-rise cover-rise-1">
              <motion.div
                initial={false}
                animate={{ opacity: opening ? 0 : 1 }}
                transition={{
                  duration: reducedMotion ? 0.12 : 0.32,
                  ease: silk,
                }}
              >
                <Eyebrow align="center" className="text-gold-deep">
                  {envelope.eyebrow}
                </Eyebrow>

                <p
                  id="gate-title"
                  className="mt-6 font-display text-[2.8rem] leading-[0.92] tracking-[-0.02em] text-ink text-balance sm:text-5xl sm:[@media(max-height:760px)]:text-[2.7rem]"
                >
                  {envelope.title}
                </p>

                <p className="mx-auto mt-5 max-w-[19rem] text-[0.58rem] uppercase leading-relaxed tracking-[0.28em] text-muted sm:text-[0.62rem]">
                  {envelope.subtitle}
                </p>

                <p className="mt-3 font-display text-[1.7rem] italic leading-tight text-sage-deep sm:text-3xl">
                  {baby.fullName}
                </p>

                {recipient ? (
                  <p className="mt-4 text-[0.52rem] uppercase tracking-[0.28em] text-gold-deep">
                    Prepared for {getGodparentRoleLabel(recipient.role)}{" "}
                    {recipient.name}
                  </p>
                ) : null}
              </motion.div>
            </div>

            <div className="cover-rise cover-rise-2 mx-auto mt-9 w-full max-w-[20.5rem] sm:mt-11 sm:max-w-[24rem] sm:[@media(max-height:760px)]:mt-7 sm:[@media(max-height:760px)]:max-w-[20rem]">
              <Envelope
                invitation={invitation}
                opening={opening}
                reducedMotion={reducedMotion}
              />
            </div>

            <div className="cover-rise cover-rise-3 mt-11 sm:mt-12 sm:[@media(max-height:760px)]:mt-7">
              <button
                type="button"
                onClick={onOpen}
                disabled={opening}
                autoFocus
                data-open-invitation
                aria-busy={opening}
                className={cn(
                  "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full border border-gold-deep/20 bg-gold px-8 py-3.5 text-[0.62rem] font-medium uppercase tracking-[0.28em] text-[#2f332e] shadow-[0_16px_30px_-16px_rgba(168,135,74,0.7)] transition-[background-color,color,box-shadow,transform] duration-300",
                  "hover:-translate-y-0.5 hover:bg-gold-deep hover:text-ivory hover:shadow-[0_20px_38px_-16px_rgba(168,135,74,0.65)]",
                  "focus-visible:-translate-y-0.5 disabled:cursor-wait disabled:opacity-90",
                )}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,.35)_50%,transparent_75%)] transition-transform duration-700 group-hover:translate-x-full"
                />
                <span className="relative">
                  {opening ? "Opening\u2026" : envelope.openLabel}
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="relative size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.8}
                />
              </button>

              <p
                id="gate-note"
                className="mt-5 text-[0.55rem] uppercase tracking-[0.35em] text-muted"
              >
                {envelope.note}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function CoverBotanicals() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 wash-sage" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ivory-deep/75 to-transparent" />
      <div className="absolute inset-2 rounded-[1.8rem] border border-gold/20 sm:inset-4 sm:rounded-[2.4rem]" />

      <div className="absolute left-1/2 top-1/2 h-[33rem] w-[25rem] -translate-x-1/2 -translate-y-1/2 rounded-t-[14rem] border border-sage/15 sm:h-[38rem] sm:w-[29rem]" />
      <div className="absolute left-1/2 top-1/2 h-[35rem] w-[27rem] -translate-x-1/2 -translate-y-1/2 rounded-t-[15rem] border border-gold/10 sm:h-[40rem] sm:w-[31rem]" />

      <CornerFlourish className="absolute left-2 top-2 size-24 text-sage/35 sm:left-4 sm:top-4 sm:size-32" />
      <CornerFlourish className="absolute right-2 top-2 size-24 rotate-90 text-sage/30 sm:right-4 sm:top-4 sm:size-32" />
      <CornerFlourish className="absolute bottom-2 right-2 size-24 rotate-180 text-gold/25 sm:bottom-4 sm:right-4 sm:size-32" />
      <CornerFlourish className="absolute bottom-2 left-2 size-24 -rotate-90 text-gold/20 sm:bottom-4 sm:left-4 sm:size-32" />

      <Sprig className="absolute -left-8 bottom-8 h-56 w-36 rotate-[18deg] text-sage/35 sm:-left-5 sm:bottom-10 sm:h-72 sm:w-44" />
      <Sprig
        mirrored
        className="absolute -right-10 top-16 h-60 w-40 -rotate-12 text-sage/25 sm:-right-6 sm:top-24 sm:h-80 sm:w-48"
      />

      <LeafMark className="absolute left-[14%] top-[18%] size-4 animate-drift text-gold/45 [animation-delay:1.5s]" />
      <LeafMark className="absolute right-[18%] top-[62%] size-3 animate-drift-slow text-sage/50 [animation-delay:3s]" />
      <LeafMark className="absolute bottom-[16%] left-[22%] size-3.5 animate-drift text-gold/30 [animation-delay:2.2s]" />
      <span className="absolute right-[22%] top-[28%] size-1 rounded-full bg-gold/40" />
      <span className="absolute bottom-[28%] left-[16%] size-1 rounded-full bg-sage/50" />
    </div>
  );
}
