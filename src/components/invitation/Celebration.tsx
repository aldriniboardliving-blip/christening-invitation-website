"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Monogram } from "@/components/ui/Monogram";
import { OrnamentDivider } from "@/components/ui/Ornament";
import { Sprig } from "@/components/ui/Botanical";
import { LeafMark } from "@/components/ui/Ornament";

export function Celebration({ invitation }: { invitation: import("@/types/invitation").InvitationConfig }) {
  const [tab, setTab] = useState<'ceremony' | 'reception'>('ceremony');
  const reducedMotion = useReducedMotion() ?? false;

  const { event } = invitation;

  const handleTabClick = (newTab: 'ceremony' | 'reception') => {
    setTab(newTab);
  };

  // Helper to format address from addressLines
  const formatAddress = (addressLines: readonly string[] | undefined) => {
    if (!addressLines || addressLines.length === 0) return "Address to Be Announced";
    return addressLines.join(" · ");
  };

  const ceremonyAddressLines = event.church?.addressLines;
  const receptionAddressLines = event.reception?.addressLines;

  // iCal dates
  const startDate = new Date("2027-01-03T14:00:00+08:00");
  const endDate = new Date("2027-01-03T17:00:00+08:00");

  const buildICal = (title: string, location: string) => {
    const ical = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Adreil Christening//EN",
      "CALSCALE:PUBLIC",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:adreil-christening-${Date.now()}`,
      `DTSTAMP:${new Date().toISOString()}`,
      `DTSTART:${startDate.toISOString().replace(/[-:]/g, "").split(".")[0]}`,
      `DTEND:${endDate.toISOString().replace(/[-:]/g, "").split(".")[0]}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${invitation.event.calendarDescription}`,
      `LOCATION:${location}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ];
    return ical.join("\n");
  };

  return (
    <section
      id="celebration"
      aria-labelledby="celebration-title"
      className="relative overflow-hidden py-24 sm:py-28 lg:py-32 bg-[color:var(--color-ivory)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 wash-sage" />
        <div className="absolute inset-0 top-0 left-0 bottom-0 right-0 wash-sage" />
        <div className="absolute left-1/2 top-0 h-[34rem] w-[28rem] -translate-x-1/2 rounded-t-[15rem] border border-sage/15 sm:h-[40rem] sm:w-[34rem]" />
        <div className="absolute left-1/2 top-1/2 h-[31rem] w-[25rem] -translate-x-1/2 -translate-y-1/2 rounded-t-[14rem] border border-gold/10 sm:h-[37rem] sm:w-[31rem]" />
        <div className="absolute left-1/2 top-1/2 size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sage/10 blur-3xl" />
        <LeafMark className="absolute -left-10 bottom-0 h-64 w-40 rotate-[22deg] text-sage/30 sm:left-4 sm:h-72 sm:w-44" />
        <LeafMark
          className="absolute -right-10 top-0 h-64 w-40 -rotate-12 text-sage/25 sm:right-4 sm:h-72 sm:w-44"
        />
      </div>

      <Container className="relative">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0.01 : 0.9, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4 }}
          whileTap={{ y: 2 }}
        >
          <Eyebrow className="mt-7">The Celebration</Eyebrow>

          <h1
            id="celebration-title"
            className="mt-4 font-display text-[2.8rem] leading-[1.08] text-ink text-balance sm:text-4xl"
          >
            The Celebration
          </h1>

          <OrnamentDivider className="my-8" />

          {/* <div className="mx-auto flex gap-2 sm:w-full sm:justify-center">
            <button
              type="button"
              onClick={() => setTab("ceremony")}
              className={cn(
                "inline-flex items-center justify-center rounded-full border border-transparent bg-gold px-4 py-2.5 text-[0.6rem] font-medium uppercase tracking-[0.22em] text-[#2f332e] shadow-[0_16px_30px_-16px_rgba(168,135,74,0.7)] transition-[background-color,color,box-shadow] duration-300 hover:bg-gold-deep hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-2",
                tab === "ceremony"
                  ? "border-sage/40 bg-sage-soft/60 text-sage-deep"
                  : "border-gold-deep/20 bg-gold/90 text-[#2f332e]",
              )}
            >
              The Holy Ceremony
            </button>
            <button
              type="button"
              onClick={() => setTab("reception")}
              className={cn(
                "inline-flex items-center justify-center rounded-full border border-transparent bg-gold px-4 py-2.5 text-[0.6rem] font-medium uppercase tracking-[0.22em] text-[#2f332e] shadow-[0_16px_30px_-16px_rgba(168,135,74,0.7)] transition-[background-color,color,box-shadow] duration-300 hover:bg-gold-deep hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-2",
                tab === "reception"
                  ? "border-sage/40 bg-sage-soft/60 text-sage-deep"
                  : "border-gold-deep/20 bg-gold/90 text-[#2f332e]",
              )}
            >
              The Celebration
            </button>
          </div> */}

          <p className="mx-auto mt-4 text-sm leading-relaxed text-gold-deep">
            {" ".padEnd(1)}{" ".repeat(10)}
          </p>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">

            {/* Ceremony Card */}
            <article
              key="ceremony"
              className={cn(
                "group rounded-[1.75rem] border border-gold/20 bg-paper/80 p-5 shadow-soft transition-all duration-300 hover:border-gold/30 hover:bg-paper/90",
                reducedMotion ? "transition-none" : "",
              )}
            >
              <div className="relative h-48 sm:h-56 overflow-hidden rounded-[1.25rem] mb-4">
                <Image
                  src={event.church?.image as string ?? "/images/church-placeholder.jpg"}
                  alt={event.church?.name as string ?? "Church Name to Be Announced"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  width={800}
                  height={600}
                />
                {event.church?.mapsUrl ? (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-[1.25rem] opacity-30 bg-gradient-to-t from-black/40 via-black/30 to-transparent"
                  />
                ) : (
                  <p className="absolute inset-0 flex items-center justify-center text-[0.5rem] uppercase text-sage/50 text-center opacity-50">
                    Map unavailable
                  </p>
                )}
              </div>

              <h2 className="font-display text-[1.5rem] leading-[1.1] text-ink text-balance">
                {event.church?.name as string ?? "Church Name to Be Announced"}
              </h2>

              <p className="mt-2 text-[0.62rem] leading-relaxed text-sage-deep">
                {event.church?.time as string ?? "2:00 pm in the afternoon"}
              </p>

              <p className="mt-3 text-[0.55rem] uppercase tracking-[0.28em] text-gold-deep">
                The Holy Ceremony
              </p>

              {event.church?.mapsUrl ? (
                <button
                  type="button"
                  onClick={() => window.open(event.church.mapsUrl as string, "_blank")}
                  className="mt-3 inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-[0.55rem] font-medium uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-gold-deep hover:text-ivory disabled:opacity-50 disabled:pointer-events-none">
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
                    Get Directions
                  </button>
              ) : (
                <p className="mt-3 text-[0.55rem] text-sage/60">
                  Get Directions — maps URL not configured
                </p>
              )}

              <OrnamentDivider className="my-4" />

              <p className="text-[0.62rem] leading-relaxed text-sage-deep">
                With grateful hearts, we would be honored if you would join us
              </p>
            </article>

            {/* Reception Card */}
            <article
              key="reception"
              className={cn(
                "group rounded-[1.75rem] border border-gold/20 bg-paper/80 p-5 shadow-soft transition-all duration-300 hover:border-gold/30 hover:bg-paper/90",
                reducedMotion ? "transition-none" : "",
              )}
            >
              <div className="relative h-48 sm:h-56 overflow-hidden rounded-[1.25rem] mb-4">
                <Image
                  src={event.reception?.image as string ?? "/images/venue-placeholder.jpg"}
                  alt={event.reception?.name as string ?? "Reception Venue to Be Announced"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  width={800}
                  height={600}
                />
                {event.reception?.mapsUrl ? (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-[1.25rem] opacity-30 bg-gradient-to-t from-black/40 via-black/30 to-transparent"
                  />
                ) : (
                  <p className="absolute inset-0 flex items-center justify-center text-[0.5rem] uppercase text-sage/50 text-center opacity-50">
                    Map unavailable
                  </p>
                )}
              </div>

              <h2 className="font-display text-[1.5rem] leading-[1.1] text-ink text-balance">
                {event.reception?.name as string ?? "Reception Venue to Be Announced"}
              </h2>

              <p className="mt-2 text-[0.62rem] leading-relaxed text-sage-deep">
                {event.reception?.time as string ?? "17:00 afternoon"}
              </p>

              <p className="mt-3 text-[0.55rem] uppercase tracking-[0.28em] text-gold-deep">
                The Celebration
              </p>

              {event.reception?.mapsUrl ? (
                <button
                  type="button"
                  onClick={() => window.open(event.reception.mapsUrl as string, "_blank")}
                  className="mt-3 inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-[0.55rem] font-medium uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-gold-deep hover:text-ivory disabled:opacity-50 disabled:pointer-events-none">
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
                    Get Directions
                  </button>
              ) : (
                <p className="mt-3 text-[0.55rem] text-sage/60">
                  Get Directions — maps URL not configured
                </p>
              )}

              <OrnamentDivider className="my-4" />

              <p className="text-[0.62rem] leading-relaxed text-sage-deep">
                Your presence, guidance, and love would mean more to our family
              </p>
            </article>
          </div>

          {/* Add to Calendar button */}
          <div className="mt-10 sm:mt-12 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                const location =
                  `${event.church?.name as string}${
                    event.church?.mapsUrl
                      ? " - " + event.church.mapsUrl
                      : ""
                  }`;
                const ical = buildICal("Christening of Adreil Eiden", location);
                const blob = new Blob([ical], { type: "text/calendar" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "christening.ics";
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="inline-flex items-center justify-center rounded-full border px-6 py-3 text-[0.6rem] font-medium uppercase tracking-[0.22em] transition-colors duration-300 hover:bg-gold-deep hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-2"
            >
              <svg
                aria-hidden="true"
                className="size-4 mr-2"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.25 2.25a2 2 0 110-4H8l1.726 5.367-.856 1.82a.5.5 0 01-.123.337l-.685 1.555a.5.5 0 01-.318.21l-.036.065a.5.5 0 01-.4 0l-.695-1.555a.5.5 0 01-.123-.336l.856-1.82H8a2 2 0 110 4h.734l.545-2.265.859 1.82a.5.5 0 01.123.337l.685 1.555a.5.5 0 01.318.21l.036.065a.5.5 0 01.4 0l.694 1.555Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>Add to Calendar</span>
            </button>
          </div>

          <OrnamentDivider className="my-10 sm:my-12" />

          {/* Botanical decorations */}
          <div className="mx-auto max-w-7xl overflow-hidden">
            <Sprig className="absolute -left-12 top-1/2 h-32 w-24 -rotate-12 text-sage/30 sm:-left-16 sm:h-40 sm:w-36" />
            <Sprig
              mirrored
              className="absolute -right-12 bottom-1/2 h-32 w-24 rotate-12 text-sage/20 sm:-right-16 sm:h-40 sm:w-32"
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}