"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Music2, Pause, VolumeX } from "lucide-react";
import type { InvitationMusic } from "@/types/invitation";
import { cn } from "@/lib/utils";

interface MusicPlayerProps {
  music: InvitationMusic;
  visible: boolean;
}

export function MusicPlayer({ music, visible }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = Math.min(1, Math.max(0, music.volume));
    }
  }, [music.volume]);

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      audio?.pause();
    };
  }, []);

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;

    setInteracted(true);

    if (playing) {
      audio.pause();
      return;
    }

    setUnavailable(false);
    try {
      await audio.play();
    } catch {
      setUnavailable(true);
      setPlaying(false);
    }
  }

  if (!music.enabled) return null;

  const accessibleLabel = unavailable
    ? "Background music is unavailable. Try again."
    : playing
      ? `Pause background music: ${music.title} by ${music.artist}`
      : `Play background music: ${music.title} by ${music.artist}`;

  return (
    <>
      <audio
        ref={audioRef}
        src={music.src}
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setUnavailable(true)}
        aria-hidden="true"
      />

      <AnimatePresence>
        {visible ? (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6"
          >
            <button
              type="button"
              onClick={togglePlayback}
              aria-pressed={playing}
              aria-label={accessibleLabel}
              title={`${music.title} — ${music.artist}`}
              className={cn(
                "group flex min-h-11 items-center gap-2.5 rounded-full border border-gold/30 bg-paper/90 p-1.5 pr-1.5 shadow-soft backdrop-blur-md transition-all duration-300 sm:pr-4",
                "hover:-translate-y-0.5 hover:border-gold/55 hover:shadow-lift",
                "focus-visible:-translate-y-0.5",
              )}
            >
              <span
                className={cn(
                  "grid size-9 shrink-0 place-items-center rounded-full transition-colors duration-300",
                  playing
                    ? "bg-sage-deep text-ivory"
                    : "bg-sage text-ivory group-hover:bg-sage-deep",
                )}
              >
                {unavailable ? (
                  <VolumeX
                    aria-hidden="true"
                    className="size-3.5"
                    strokeWidth={1.8}
                  />
                ) : playing ? (
                  <Pause
                    aria-hidden="true"
                    className="size-3.5"
                    fill="currentColor"
                    strokeWidth={0}
                  />
                ) : (
                  <Music2
                    aria-hidden="true"
                    className="size-3.5"
                    strokeWidth={1.6}
                  />
                )}
              </span>

              <span className="hidden min-w-0 text-left sm:block">
                <span className="flex items-center gap-1.5 text-[0.48rem] uppercase tracking-[0.22em] text-muted">
                  {playing ? (
                    <>
                      <Equalizer />
                      <span>Now playing</span>
                    </>
                  ) : unavailable ? (
                    <span>Music unavailable</span>
                  ) : (
                    <span>Background music</span>
                  )}
                </span>
                <span className="mt-0.5 block max-w-[9.5rem] truncate text-[0.68rem] leading-tight text-ink">
                  {unavailable ? "Tap to try again" : music.title}
                </span>
              </span>
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <span className="sr-only" role="status" aria-live="polite">
        {unavailable
          ? "Background music could not be played."
          : playing
            ? "Background music is playing."
            : interacted
              ? "Background music is paused."
              : ""}
      </span>
    </>
  );
}

function Equalizer() {
  return (
    <span aria-hidden="true" className="flex h-3 items-end gap-[2px]">
      {[0, 1, 2].map((bar) => (
        <span
          key={bar}
          className="h-full w-[2px] origin-bottom animate-equalize rounded-full bg-gold-deep/70"
          style={{
            animationDelay: `${bar * 130}ms`,
            animationDuration: `${760 + bar * 120}ms`,
          }}
        />
      ))}
    </span>
  );
}
