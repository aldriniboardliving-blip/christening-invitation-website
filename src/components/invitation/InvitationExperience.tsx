"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";
import type { InvitationConfig } from "@/types/invitation";
import type { Recipient } from "@/types/recipient";
import { cn } from "@/lib/utils";
import { EnvelopeCover } from "@/components/invitation/EnvelopeCover";
import { CelebrantGallery } from "@/components/invitation/CelebrantGallery";
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
  initialOpened?: boolean;
}

type GatePhase = "sealed" | "opening" | "gallery" | "opened";

const silk = [0.22, 1, 0.36, 1] as const;

export function InvitationExperience({
  invitation,
  recipient = null,
  initialOpened = false,
}: InvitationExperienceProps) {
  const [phase, setPhase] = useState<GatePhase>(
    initialOpened ? "opened" : "sealed"
  );
  const [gateFinished, setGateFinished] = useState(initialOpened);
  const reduceMotion = useReducedMotion() ?? false;

  // Let the flap, seal, and letter play before transitioning to the celebrant gallery.
  useEffect(() => {
    if (phase !== "opening") return;

    const timer = window.setTimeout(
      () => setPhase("gallery"),
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

  // Failsafe: unlock scrolling when gallery or opened phase is reached
  useEffect(() => {
    if (phase !== "gallery" && phase !== "opened") return;

    const safetyTimer = window.setTimeout(() => {
      setGateFinished(true);
    }, 600);

    return () => window.clearTimeout(safetyTimer);
  }, [phase]);

  function handleOpen() {
    setPhase((current) => (current === "sealed" ? "opening" : current));
  }

  function handleGateExitComplete() {
    setGateFinished(true);
    window.setTimeout(() => {
      document
        .getElementById("gallery-title")
        ?.focus({ preventScroll: true });
    }, reduceMotion ? 0 : 60);
  }

  function handleSeeInvitation() {
    setPhase("opened");
    window.setTimeout(() => {
      document
        .getElementById("hero-title")
        ?.focus({ preventScroll: true });
    }, reduceMotion ? 0 : 60);
  }

  function handleViewGallery() {
    setPhase("gallery");
    window.setTimeout(() => {
      document
        .getElementById("gallery-title")
        ?.focus({ preventScroll: true });
    }, reduceMotion ? 0 : 60);
  }

  const isEnvelopeVisible = phase === "sealed" || phase === "opening";
  const isGalleryVisible = phase === "gallery";
  const isInvitationVisible = phase === "opened";

  const targetInvitationUrl = recipient
    ? `/invitation/${recipient.slug}/`
    : "/invitation/";

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence onExitComplete={handleGateExitComplete}>
        {isEnvelopeVisible ? (
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

      {/* Celebrant Gallery View */}
      {isGalleryVisible ? (
        <motion.div
          key="gallery-view"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: silk }}
          className="relative"
        >
          <main id="main-content">
            <CelebrantGallery
              invitation={invitation}
              recipient={recipient}
              invitationUrl={targetInvitationUrl}
              onSeeInvitation={handleSeeInvitation}
            />
            <SiteFooter
              invitation={invitation}
              recipient={recipient}
              onViewGallery={handleViewGallery}
            />
          </main>
        </motion.div>
      ) : null}

      {/* Full Invitation Experience */}
      <div
        inert={!isInvitationVisible}
        aria-hidden={!isInvitationVisible}
        className={cn("relative", !isInvitationVisible && "hidden")}
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
            opened={isInvitationVisible}
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
          <SiteFooter
            invitation={invitation}
            recipient={recipient}
            onViewGallery={handleViewGallery}
          />
        </main>
      </div>

      <MusicPlayer
        music={invitation.music}
        visible={phase === "gallery" || phase === "opened"}
      />

      <span className="sr-only" role="status" aria-live="polite">
        {phase === "gallery"
          ? "Envelope opened. Showing celebrant gallery."
          : phase === "opened"
            ? "Invitation opened."
            : ""}
      </span>
    </MotionConfig>
  );
}