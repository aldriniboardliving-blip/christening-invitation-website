"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { OrnamentDivider, LeafMark } from "@/components/ui/Ornament";

interface ChurchReceptionData {
  name: string;
  addressLines: readonly string[];
  mapsUrl: string;
  image: string;
  time: string;
  description: string;
  label: string;
}

interface LocationGuideProps {
  invitation: import("@/types/invitation").InvitationConfig;
}

const silk = [0.22, 1, 0.36, 1] as const;

function formatAddress(addressLines: readonly string[] | undefined) {
  if (!addressLines || addressLines.length === 0) return "Address to Be Announced";
  return addressLines.join(" · ");
}

export function LocationGuide({ invitation }: LocationGuideProps) {
  const receptionRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion() ?? false;
  const { event } = invitation;

  const churchData: ChurchReceptionData = {
    name: event.church?.name ?? "Church Name to Be Announced",
    addressLines: event.church?.addressLines,
    mapsUrl: event.church?.mapsUrl ?? "",
    image: event.church?.image ?? "/images/church-placeholder.jpg",
    time: event.church?.time ?? "10:00 in the morning",
    description: event.church?.description ?? "",
    label: "The Holy Ceremony",
  };

  const receptionData: ChurchReceptionData = {
    name: event.reception?.name ?? "Reception Venue to Be Announced",
    addressLines: event.reception?.addressLines,
    mapsUrl: event.reception?.mapsUrl ?? "",
    image: event.reception?.image ?? "/images/venue-placeholder.jpg",
    time: event.reception?.time ?? "12:00 noon",
    description: event.reception?.description ?? "",
    label: "The Celebration",
  };

  const scrollToReception = () => {
    const target =
      receptionRef.current ?? document.getElementById("reception-section");
    if (!target) return;

    target.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="location-guide"
      aria-labelledby="location-guide-title"
      className="relative py-24 sm:py-28 lg:py-32 bg-[color:var(--color-ivory)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 wash-pink" />
        <div className="absolute inset-0 top-0 left-0 bottom-0 right-0 wash-pink" />
        <div className="absolute left-1/2 top-0 h-[34rem] w-[28rem] -translate-x-1/2 rounded-t-[15rem] border border-pink/15 sm:h-[40rem] sm:w-[34rem]" />
        <div className="absolute left-1/2 top-1/2 h-[31rem] w-[25rem] -translate-x-1/2 -translate-y-1/2 rounded-t-[14rem] border border-pink/10 sm:h-[37rem] sm:w-[31rem]" />
        <div className="absolute left-1/2 top-1/2 size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink/10 blur-3xl" />
        <LeafMark className="absolute -left-10 bottom-0 h-64 w-40 rotate-[22deg] text-pink/30 sm:left-4 sm:h-72 sm:w-44" />
        <LeafMark
          mirrored
          className="absolute -right-10 top-0 h-64 w-40 -rotate-12 text-pink/25 sm:right-4 sm:h-72 sm:w-44"
        />
      </div>

      <Container className="relative">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0.01 : 0.9, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -2 }}
          whileTap={{ y: 2 }}
        >
          <Eyebrow className="mb-2">Location Guide</Eyebrow>

          <h1
            id="location-guide-title"
            className="mt-4 font-display text-[2.8rem] leading-[1.1] text-ink text-balance sm:text-4xl"
          >
            Location Guide
          </h1>

          <OrnamentDivider className="my-8" />

          {/* Church Section */}
          <article
            id="church-section"
            key="church"
            className={cn(
              "group rounded-2xl border border-pink/20 bg-paper/80 p-6 md:p-8 shadow-soft transition-all duration-500 hover:border-pink/30 hover:bg-pink-soft/50",
              reducedMotion ? "transition-none" : "",
            )}
          >
            <div className="relative h-64 md:h-[400px] overflow-hidden rounded-[1.5rem] mb-6">
              <Image
                src={churchData.image}
                alt={churchData.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                width={800}
                height={600}
              />
              {churchData.mapsUrl ? (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-[1.5rem] opacity-30 bg-gradient-to-t from-black/40 via-black/30 to-transparent"
                />
              ) : (
                <p className="absolute inset-0 flex items-center justify-center text-[0.5rem] uppercase text-pink/50 text-center opacity-50">
                  Map unavailable
                </p>
              )}
            </div>

            <h2 className="font-display text-[1.75rem] leading-[1.2] text-ink text-balance mb-3">
              {churchData.label}
            </h2>

            <p className="text-[0.68rem] leading-relaxed text-pink-600 mb-2">
              {churchData.name}
            </p>

            <p className="text-[0.62rem] leading-relaxed text-pink-500 mb-4">
              {formatAddress(churchData.addressLines)}
            </p>

            <p className="text-[0.58rem] uppercase tracking-[0.3em] text-pink-400 mb-3">
              {churchData.time}
            </p>

            <p className="text-[0.62rem] leading-relaxed text-pink-600">
              {churchData.description}
            </p>

            {churchData.mapsUrl ? (
              <Link
                href={churchData.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center justify-center rounded-full border px-6 py-2.5 text-[0.58rem] font-medium uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-pink-500 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
              >
                <svg
                  aria-hidden="true"
                  className="size-4"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 6L8.59 2.93a1 1 0 011.71 0l4.58 4.33a1 1 0 010 1.72l-4.58 4.33a1 1 0 01-1.71 0L14 10l-1.47-3.67Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span>Get Directions</span>
              </Link>
            ) : (
              <p className="mt-4 text-[0.55rem] text-pink-400">
                Get Directions — maps URL not configured
              </p>
            )}

            <OrnamentDivider className="my-4" />

            <p className="text-[0.62rem] leading-relaxed text-pink-500">
              With grateful hearts, we would be honored if you would join us
            </p>
          </article>

          {/* Animated Downward Transition — Church to Reception */}
          <div
            className="my-10 sm:my-14 flex flex-col items-center justify-center"
            aria-hidden="false"
          >
            <button
              type="button"
              onClick={scrollToReception}
              aria-label="Scroll to reception venue"
              className={cn(
                "group relative flex flex-col items-center gap-3 rounded-2xl px-6 py-3 transition-all duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-4 focus-visible:ring-offset-[color:var(--color-ivory)]",
                "cursor-pointer hover:opacity-95"
              )}
            >
              {/* Subtle decorative stem leading from Church card */}
              <div
                aria-hidden="true"
                className="h-6 w-px bg-gradient-to-b from-transparent via-gold/30 to-gold/60"
              />

              {/* Text Label */}
              <span className="font-sans text-[0.62rem] sm:text-[0.68rem] font-medium uppercase tracking-[0.28em] text-gold-deep transition-colors duration-300 group-hover:text-gold-deep/80">
                Continue to the Celebration
              </span>

              {/* Animated Downward Arrow */}
              <div className="relative flex items-center justify-center pt-0.5 pb-1">
                {/* Subtle champagne gold glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute size-14 rounded-full bg-gold/15 blur-md transition-opacity duration-300 group-hover:bg-gold/25"
                />

                <motion.div
                  animate={
                    reducedMotion
                      ? { y: 0 }
                      : {
                          y: [0, 10, 0],
                        }
                  }
                  transition={
                    reducedMotion
                      ? { duration: 0 }
                      : {
                          duration: 1.3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }
                  }
                  className={cn(
                    "relative flex size-11 sm:size-12 items-center justify-center rounded-full",
                    "border border-gold/35 bg-paper/95 text-gold-deep shadow-soft backdrop-blur-xs",
                    "transition-[border-color,background-color,box-shadow,color] duration-300",
                    "group-hover:border-gold group-hover:bg-gold-soft/40 group-hover:shadow-[0_8px_25px_-6px_rgba(198,167,106,0.4)] group-hover:text-gold-deep"
                  )}
                >
                  <ArrowDown
                    className="size-4.5 sm:size-5 transition-transform duration-300 group-hover:translate-y-0.5"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </motion.div>
              </div>

              {/* Subtle decorative stem leading toward Reception card */}
              <div
                aria-hidden="true"
                className="h-6 w-px bg-gradient-to-b from-gold/60 via-gold/30 to-transparent"
              />
            </button>
          </div>

          {/* Reception Section */}
          <motion.article
            ref={receptionRef}
            id="reception-section"
            key="reception"
            initial={reducedMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.85,
              ease: silk,
            }}
            className={cn(
              "group rounded-2xl border border-pink/20 bg-paper/80 p-6 md:p-8 shadow-soft transition-all duration-500 hover:border-pink/30 hover:bg-pink-soft/50 scroll-mt-12 sm:scroll-mt-16",
              reducedMotion ? "transition-none" : "",
            )}
          >
            <div className="relative h-64 md:h-[400px] overflow-hidden rounded-[1.5rem] mb-6">
              <Image
                src={receptionData.image}
                alt={receptionData.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                width={800}
                height={600}
              />
              {receptionData.mapsUrl ? (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-[1.5rem] opacity-30 bg-gradient-to-t from-black/40 via-black/30 to-transparent"
                />
              ) : (
                <p className="absolute inset-0 flex items-center justify-center text-[0.5rem] uppercase text-pink/50 text-center opacity-50">
                  Map unavailable
                </p>
              )}
            </div>

            <h2 className="font-display text-[1.75rem] leading-[1.2] text-ink text-balance mb-3">
              {receptionData.label}
            </h2>

            <p className="text-[0.68rem] leading-relaxed text-pink-600 mb-2">
              {receptionData.name}
            </p>

            <p className="text-[0.62rem] leading-relaxed text-pink-500 mb-4">
              {formatAddress(receptionData.addressLines)}
            </p>

            <p className="text-[0.58rem] uppercase tracking-[0.3em] text-pink-400 mb-3">
              {receptionData.time}
            </p>

            <p className="text-[0.62rem] leading-relaxed text-pink-600">
              {receptionData.description}
            </p>

            {receptionData.mapsUrl ? (
              <Link
                href={receptionData.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center justify-center rounded-full border px-6 py-2.5 text-[0.58rem] font-medium uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-pink-500 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
              >
                <svg
                  aria-hidden="true"
                  className="size-4"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 6L8.59 2.93a1 1 0 011.71 0l4.58 4.33a1 1 0 010 1.72l-4.58 4.33a1 1 0 01-1.71 0L14 10l-1.47-3.67Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span>Get Directions</span>
              </Link>
            ) : (
              <p className="mt-4 text-[0.55rem] text-pink-400">
                Get Directions — maps URL not configured
              </p>
            )}

            <OrnamentDivider className="my-4" />

            <p className="text-[0.62rem] leading-relaxed text-pink-500">
              Your presence, guidance, and love would mean more to our family
            </p>
          </motion.article>

          {/* Dotted path decoration */}
          <div className="mx-auto max-w-7xl overflow-hidden mt-16">
            <LeafMark
              className="absolute -left-6 top-1/2 h-10 w-1 -rotate-12 text-pink/30"
            />
            <LeafMark
              mirrored
              className="absolute -right-6 bottom-1/2 h-10 w-1 rotate-12 text-pink/20"
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}