"use client";

import { motion } from "motion/react";
import type { InvitationConfig } from "@/types/invitation";
import { Container } from "@/components/ui/Container";
import { Monogram } from "@/components/ui/Monogram";
import { OrnamentDivider } from "@/components/ui/Ornament";
import { Sprig } from "@/components/ui/Botanical";

interface StoryTeaserProps {
  invitation: InvitationConfig;
}

/**
 * Temporary Phase 2 scaffold: an elegant resting place after the hero.
 * It will be replaced by the countdown, event details, gallery, and RSVP
 * sections in later phases.
 */
export function StoryTeaser({ invitation }: StoryTeaserProps) {
  return (
    <section
      id="story"
      aria-labelledby="story-title"
      className="relative overflow-hidden border-y border-ink/5 bg-[linear-gradient(180deg,#f6f1e7_0%,#faf8f2_100%)] py-24 sm:py-28 lg:py-32"
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
          viewport={{ once: true, margin: "-90px" }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Monogram
            letters={invitation.baby.monogram}
            className="mx-auto size-14 text-xl"
          />

          <p className="mt-7 text-[0.58rem] font-medium uppercase tracking-[0.34em] text-gold-deep">
            A blessing for our son
          </p>

          <h2
            id="story-title"
            className="mt-5 font-display text-[2.55rem] leading-[1.02] text-ink text-balance sm:text-5xl"
          >
            With joyful hearts
          </h2>

          <p className="mx-auto mt-7 max-w-xl font-display text-[1.45rem] italic leading-relaxed text-ink/80 sm:text-2xl">
            &ldquo;{invitation.invitationMessage}&rdquo;
          </p>

          <OrnamentDivider className="my-8" />

          <p className="mx-auto max-w-md font-display text-lg leading-relaxed text-sage-deep">
            &ldquo;{invitation.verse.text}&rdquo;
            <span className="mt-2 block font-sans text-[0.55rem] uppercase not-italic tracking-[0.3em] text-muted">
              {invitation.verse.reference}
            </span>
          </p>

          <p className="mt-10 text-[0.55rem] uppercase tracking-[0.34em] text-muted">
            Event details, photographs &amp; RSVP to follow
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
