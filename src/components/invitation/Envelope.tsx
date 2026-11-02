"use client";

import { motion } from "motion/react";
import { formatEventDateNumeric } from "@/lib/date";
import type { InvitationConfig } from "@/types/invitation";
import { Laurel } from "@/components/ui/Botanical";
import { WaxSeal } from "@/components/ui/WaxSeal";

interface EnvelopeProps {
  invitation: InvitationConfig;
  opening: boolean;
  reducedMotion: boolean;
}

const silk = [0.22, 1, 0.36, 1] as const;

export function Envelope({ invitation, opening, reducedMotion }: EnvelopeProps) {
  const { baby, event, envelope } = invitation;
  const dateLabel = formatEventDateNumeric(event.startsAt, event.timeZone);

  return (
    <div className="relative w-full [perspective:1600px]">
      {/* Soft grounded shadow */}
      <div
        aria-hidden="true"
        className="absolute inset-x-4 -bottom-7 h-10 rounded-full bg-ink/15 blur-2xl"
      />

      <div className="relative aspect-[1.52/1] w-full">
        {/* Envelope back and paper texture */}
        <div className="absolute inset-0 rounded-xl border border-gold/30 bg-[linear-gradient(135deg,#f8f2e6_0%,#efe6d3_48%,#e9dec9_100%)] shadow-lift shadow-inset">
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_24%_16%,rgba(255,255,255,.72),transparent_52%)]"
          />
        </div>

        {/* Letter tucked inside — warm cream so it never reads as a white slip */}
        <motion.div
          className="absolute left-[7%] top-[8%] z-10 h-[86%] w-[86%] rounded-sm border border-gold/20 bg-[linear-gradient(180deg,#fdf8ed_0%,#f7efdd_100%)] px-4 py-3"
          initial={false}
          animate={
            opening
              ? {
                  y: reducedMotion ? "-28%" : "-62%",
                  rotate: reducedMotion ? 0 : -1.5,
                }
              : { y: "0%", rotate: 0 }
          }
          transition={{
            duration: reducedMotion ? 0.2 : 1,
            ease: silk,
            delay: reducedMotion ? 0 : 0.12,
          }}
        >
          <motion.div
            data-letter-text
            className="flex h-full flex-col items-center justify-center text-center"
            initial={false}
            animate={{ opacity: opening ? 1 : 0 }}
            transition={{
              duration: reducedMotion ? 0.15 : 0.5,
              delay: opening && !reducedMotion ? 0.42 : 0,
              ease: silk,
            }}
          >
            <Laurel className="h-5 w-9 text-gold/55" />
            <p className="mt-1.5 text-[0.42rem] uppercase tracking-[0.36em] text-muted">
              The Christening of
            </p>
            <p className="mt-1 font-display text-lg leading-tight text-ink sm:text-xl">
              {baby.displayNameLines.join(" ")}
            </p>
            <span className="my-1.5 h-px w-7 bg-gold/45" />
            <p className="text-[0.45rem] uppercase tracking-[0.3em] text-sage-deep">
              {dateLabel}
            </p>
          </motion.div>
        </motion.div>

        {/* Front pocket */}
        <svg
          aria-hidden="true"
          viewBox="0 0 500 330"
          preserveAspectRatio="none"
          className="absolute inset-0 z-20 h-full w-full overflow-hidden rounded-b-xl"
        >
          <defs>
            <linearGradient id="envelope-front" x1="0" y1="0" x2="0.8" y2="1">
              <stop offset="0%" stopColor="#f7f1e5" />
              <stop offset="55%" stopColor="#f0e7d5" />
              <stop offset="100%" stopColor="#e7dbc5" />
            </linearGradient>
            <linearGradient id="envelope-side" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity=".18" />
              <stop offset="100%" stopColor="#9d8a65" stopOpacity=".08" />
            </linearGradient>
          </defs>
          <path
            d="M0 104L250 205L500 104L500 318Q500 330 488 330H12Q0 330 0 318Z"
            fill="url(#envelope-front)"
          />
          <path
            d="M0 104L250 205L500 104"
            fill="none"
            stroke="#C6A76A"
            strokeOpacity=".4"
            strokeWidth="1"
          />
          <path
            d="M0 104L0 318Q0 330 12 330H250V205Z"
            fill="url(#envelope-side)"
          />
          <path
            d="M500 104L500 318Q500 330 488 330H250V205Z"
            fill="url(#envelope-side)"
          />
        </svg>

        <p className="absolute bottom-[8%] left-1/2 z-[21] -translate-x-1/2 font-display text-[0.72rem] italic tracking-[0.16em] text-gold-deep/70">
          with love
        </p>

        {/* Postage stamp — fades with the envelope back as the flap opens */}
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{ opacity: opening ? 0 : 1 }}
          transition={{ duration: reducedMotion ? 0.01 : 0.35, ease: silk }}
          className="absolute right-[6.5%] top-[7%] z-[22] rotate-2 border border-dashed border-sage/45 bg-paper/90 p-[3px] shadow-sm"
        >
          <div className="grid size-9 place-items-center border border-sage/20 bg-sage/10 text-sage-deep/80">
            <svg viewBox="0 0 24 24" fill="none" className="size-5">
              <path
                d="M12 20V8M12 13C8.5 13 6 10.5 6 7c3.5 0 6 2.5 6 6ZM12 10c3.2 0 5.5-2.2 5.5-5.5C14.3 4.5 12 6.7 12 10Z"
                stroke="currentColor"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.div>

        {/* Opening flap */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[62%] origin-top"
          style={{
            transformStyle: "preserve-3d",
            zIndex: opening ? 5 : 30,
          }}
          initial={false}
          animate={
            opening
              ? reducedMotion
                ? { opacity: 0 }
                : { rotateX: -172, opacity: 1 }
              : { rotateX: 0, opacity: 1 }
          }
          transition={{ duration: reducedMotion ? 0.15 : 0.95, ease: silk }}
        >
          <svg
            viewBox="0 0 500 205"
            preserveAspectRatio="none"
            className="h-full w-full drop-shadow-[0_10px_12px_rgba(90,70,40,0.12)]"
          >
            <defs>
              <linearGradient id="envelope-flap" x1="0" y1="0" x2="0.9" y2="1">
                <stop offset="0%" stopColor="#f9f3e7" />
                <stop offset="60%" stopColor="#efe5d1" />
                <stop offset="100%" stopColor="#e6d9c1" />
              </linearGradient>
            </defs>
            <path d="M0 0H500L250 205Z" fill="url(#envelope-flap)" />
            <path
              d="M0 0L250 205L500 0"
              fill="none"
              stroke="#C6A76A"
              strokeOpacity=".42"
              strokeWidth="1"
            />
            <path
              d="M18 0L250 181L482 0"
              fill="none"
              stroke="#FFFFFF"
              strokeOpacity=".4"
              strokeWidth=".6"
            />
          </svg>
        </motion.div>

        {/* Wax seal */}
        <div className="absolute left-1/2 top-[58%] z-40 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            initial={false}
            animate={
              opening
                ? { opacity: 0, scale: 0.65, rotate: -22, y: 18 }
                : { opacity: 1, scale: 1, rotate: 0, y: 0 }
            }
            transition={{
              duration: reducedMotion ? 0.15 : 0.45,
              ease: silk,
            }}
          >
            <WaxSeal
              monogram={envelope.sealMonogram}
              className="size-[4.4rem] sm:size-20"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
