"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, useReducedMotion } from "motion/react";
import type { InvitationConfig } from "@/types/invitation";
import type { Recipient } from "@/types/recipient";
import { EnvelopeCover } from "@/components/invitation/EnvelopeCover";
import { GodparentRequest } from "@/components/invitation/GodparentRequest";
import { Hero } from "@/components/invitation/Hero";
import { MusicPlayer } from "@/components/invitation/MusicPlayer";
import { SiteFooter } from "@/components/invitation/SiteFooter";
import { StoryTeaser } from "@/components/invitation/StoryTeaser";
import { Celebration } from "@/components/invitation/Celebration";
import { LocationGuide } from "@/components/invitation/LocationGuide";
import { GiftGuide } from "@/components/invitation/GiftGuide";

interface InvitationExperienceProps {
  invitation: InvitationConfig;
  recipient?: Recipient | null;
}

type GatePhase = "sealed" | "opening" | "opened";

export function InvitationExperience({
  invitation,
  recipient = null,
}: InvitationExperienceProps) {
  const [phase, setPhase] = useState<GatePhase>("sealed");
  const [gateFinished, setGateFinished] = useState(false);
  const reduceMotion = useReducedMotion() ?? false;

  // Let the flap, seal, and letter play before revealing the invitation.
  useEffect(() => {
    if (phase !== "opening") return;

    const timer = window.setTimeout(
      () => setPhase("opened"),
      reduceMotion ? 120 : 1150,
    );

    return () => window.clearTimeout(timer);
  }, [phase, reduceMotion]);

  // Keep the page perfectly still until the envelope has left the screen.
  useEffect(() => {
    if (gateFinished) return;

    const root = document.documentElement;
    root.classList.add("invitation-locked");

    return () => root.classList.remove("invitation-locked");
  }, [gateFinished]);

  function handleOpen() {
    setPhase((current) => (current === "sealed" ? "opening" : current));
  }

  function handleGateExitComplete() {
    setGateFinished(true);
    window.setTimeout(() => {
      document
        .getElementById("hero-title")
        ?.focus({ preventScroll: true });
    }, reduceMotion ? 0 : 60);
  }

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence onExitComplete={handleGateExitComplete}>
        {phase !== "opened" ? (
          <EnvelopeCover
            key="envelope-cover"
            invitation={invitation}
            recipient={recipient}
            opening={phase === "opening"}
            reducedMotion={reduceMotion}
            onOpen={handleOpen}
          />
        ) : null}
      </AnimatePresence>

      <div
        inert={phase !== "opened"}
        aria-hidden={phase !== "opened"}
        className="relative"
      >
        <a
          href="#story"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-ivory focus:shadow-lift"
        >
          Skip to invitation message
        </a>

        <main id="main-content">
          <Hero
            invitation={invitation}
            opened={phase === "opened"}
            recipient={recipient}
          />
          {recipient ? (
            <GodparentRequest
              invitation={invitation}
              recipient={recipient}
            />
          ) : null}
          <StoryTeaser invitation={invitation} />
          <Celebration invitation={invitation} />
          <LocationGuide invitation={invitation} />
          <GiftGuide invitation={invitation} />
          <SiteFooter invitation={invitation} />
        </main>
      </div>

      <MusicPlayer
        music={invitation.music}
        visible={phase === "opened"}
      />

      <span className="sr-only" role="status" aria-live="polite">
        {phase === "opened" ? "Invitation opened." : ""}
      </span>
    </MotionConfig>
  );
}