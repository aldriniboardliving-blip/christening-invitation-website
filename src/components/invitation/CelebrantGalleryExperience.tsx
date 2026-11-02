"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, useReducedMotion } from "motion/react";
import type { InvitationConfig } from "@/types/invitation";
import type { Recipient } from "@/types/recipient";
import { EnvelopeCover } from "@/components/invitation/EnvelopeCover";
import { MusicPlayer } from "@/components/invitation/MusicPlayer";
import { CelebrantGallery } from "@/components/invitation/CelebrantGallery";
import { SiteFooter } from "@/components/invitation/SiteFooter";

interface CelebrantGalleryExperienceProps {
  invitation: InvitationConfig;
  recipient?: Recipient | null;
}

type GatePhase = "sealed" | "opening" | "gallery";

export function CelebrantGalleryExperience({
  invitation,
  recipient = null,
}: CelebrantGalleryExperienceProps) {
  const [phase, setPhase] = useState<GatePhase>("sealed");
  const [gateFinished, setGateFinished] = useState(false);
  const reduceMotion = useReducedMotion() ?? false;

  // Let the flap, seal, and letter play before transitioning to the gallery.
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

  // Failsafe: unlock scrolling when gallery phase is reached
  useEffect(() => {
    if (phase !== "gallery") return;

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

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence onExitComplete={handleGateExitComplete}>
        {phase !== "gallery" ? (
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
        inert={phase !== "gallery"}
        aria-hidden={phase !== "gallery"}
        className="relative"
      >
        <main id="main-content">
          <CelebrantGallery invitation={invitation} />
          <SiteFooter invitation={invitation} />
        </main>
      </div>

      <MusicPlayer
        music={invitation.music}
        visible={phase === "gallery"}
      />

      <span className="sr-only" role="status" aria-live="polite">
        {phase === "gallery" ? "Invitation opened. Showing celebrant gallery." : ""}
      </span>
    </MotionConfig>
  );
}
