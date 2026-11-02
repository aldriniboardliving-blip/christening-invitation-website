"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import {
  formatEventDate,
  formatEventDay,
  formatEventMonth,
  formatEventYear,
} from "@/lib/date";
import { cn } from "@/lib/utils";
import { getGodparentRoleLabel } from "@/lib/recipients";
import type { InvitationConfig } from "@/types/invitation";
import type { Recipient } from "@/types/recipient";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Monogram } from "@/components/ui/Monogram";
import { LeafMark, OrnamentDivider } from "@/components/ui/Ornament";
import { Sprig } from "@/components/ui/Botanical";

interface HeroProps {
  invitation: InvitationConfig;
  opened: boolean;
  recipient?: Recipient | null;
}

const silk = [0.22, 1, 0.36, 1] as const;

export function Hero({ invitation, opened, recipient = null }: HeroProps) {
  const { baby, parents, hero, content, event, photos } = invitation;

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.08,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.85, ease: silk },
    },
  };

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pb-20 pt-14 sm:pb-28 sm:pt-20 lg:pb-32 lg:pt-24"
    >
      <HeroBackdrop />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 xl:gap-20">
          <motion.div
            variants={container}
            initial="hidden"
            animate={opened ? "visible" : "hidden"}
            className="order-2 text-center lg:order-1 lg:text-left"
          >
            {recipient ? (
              <motion.p
                variants={item}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-paper/70 px-4 py-2 text-[0.5rem] uppercase tracking-[0.26em] text-gold-deep"
              >
                <LeafMark className="size-3.5 text-sage" />
                Prepared for {getGodparentRoleLabel(recipient.role)}{" "}
                {recipient.name}
              </motion.p>
            ) : null}

            <motion.div variants={item}>
              <Eyebrow align="center" className="lg:justify-start">
                {content.eyebrow}
              </Eyebrow>
            </motion.div>

            <motion.h1
              id="hero-title"
              tabIndex={-1}
              variants={item}
              className="mt-6 font-display text-[clamp(3.2rem,14vw,6.6rem)] leading-[0.86] tracking-[-0.025em] text-ink text-balance outline-none sm:mt-7"
            >
              {baby.displayNameLines.map((line, index) => (
                <span
                  key={line}
                  className={cn(
                    "block",
                    index === baby.displayNameLines.length - 1 &&
                      "italic text-sage-deep",
                  )}
                >
                  {line}
                </span>
              ))}
            </motion.h1>

            <motion.p
              variants={item}
              className="mx-auto mt-6 max-w-sm font-display text-[1.35rem] italic leading-snug text-sage-deep sm:text-2xl lg:mx-0"
            >
              {hero.blessing}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-7 flex justify-center lg:justify-start"
            >
              <OrnamentDivider className="lg:justify-start" />
            </motion.div>

            <motion.p
              variants={item}
              className="mx-auto mt-6 max-w-md text-[0.9rem] leading-7 text-muted lg:mx-0"
            >
              {content.subtitle}
            </motion.p>

            <motion.div variants={item} className="mt-7">
              <p className="text-[0.56rem] uppercase tracking-[0.3em] text-muted">
                {hero.parentsLabel}
              </p>
              <p className="mt-2 font-display text-2xl text-ink sm:text-[1.7rem]">
                {parents.mother}
                <span className="mx-2.5 font-display text-lg italic text-gold">
                  &amp;
                </span>
                {parents.father}
              </p>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 lg:justify-start"
            >
              <span className="text-[0.56rem] uppercase tracking-[0.26em] text-sage-deep">
                {formatEventDate(event.startsAt, event.timeZone)}
              </span>
              <span
                aria-hidden="true"
                className="size-1 rounded-full bg-gold/60"
              />
              <span className="text-[0.56rem] uppercase tracking-[0.26em] text-muted">
                {event.church.name}
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative order-1 mx-auto w-full max-w-[21rem] sm:max-w-[24rem] lg:order-2 lg:max-w-[26rem]"
            initial={false}
            animate={
              opened
                ? { opacity: 1, y: 0, scale: 1 }
                : {
                    opacity: 0,
                    y: 26,
                    scale: 0.98,
                  }
            }
            transition={{
              duration: 1.05,
              delay: 0.18,
              ease: silk,
            }}
          >
            <div
              aria-hidden="true"
              className="absolute -inset-4 rotate-[2.5deg] rounded-t-[15rem] rounded-b-[2.5rem] border border-gold/25 sm:-inset-5"
            />
            <div
              aria-hidden="true"
              className="absolute -inset-2 -rotate-1 rounded-t-[15rem] rounded-b-[2rem] border border-sage/25"
            />
            <div
              aria-hidden="true"
              className="absolute inset-6 rounded-t-[14rem] rounded-b-[2rem] bg-sage/15 blur-2xl"
            />

            <figure className="relative overflow-hidden rounded-t-[15rem] rounded-b-[1.75rem] border border-paper/80 bg-ivory-deep shadow-lift">
              <Image
                src={photos.portrait.src}
                alt={photos.portrait.alt}
                width={photos.portrait.width}
                height={photos.portrait.height}
                preload
                sizes="(max-width: 640px) 84vw, (max-width: 1024px) 60vw, 26rem"
                className="aspect-[4/5] h-full w-full object-cover object-[50%_38%]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/5 to-transparent"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-t-[15rem] rounded-b-[1.75rem] ring-1 ring-inset ring-white/25"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                <div>
                  <p className="font-display text-2xl leading-none text-ivory">
                    {baby.firstName}
                  </p>
                  <p className="mt-1.5 text-[0.48rem] uppercase tracking-[0.3em] text-ivory/75">
                    {hero.portraitCaption}
                  </p>
                </div>
                <Monogram
                  letters={baby.monogram}
                  className="size-10 border-ivory/30 bg-ivory/10 text-ivory/90 shadow-none backdrop-blur-sm"
                />
              </figcaption>
            </figure>

            {/* Vertical date mark */}
            <div className="absolute -right-3 top-10 z-10 flex flex-col items-center rounded-full border border-gold/30 bg-paper/95 px-2.5 py-4 shadow-soft backdrop-blur-sm sm:-right-5 sm:px-3">
              <span className="text-[0.42rem] uppercase tracking-[0.22em] text-gold-deep">
                {formatEventMonth(event.startsAt, event.timeZone)}
              </span>
              <span className="mt-1 font-display text-[1.55rem] leading-none text-ink">
                {formatEventDay(event.startsAt, event.timeZone)}
              </span>
              <span className="mt-1.5 text-[0.4rem] uppercase tracking-[0.18em] text-muted">
                {formatEventYear(event.startsAt, event.timeZone)}
              </span>
            </div>

            <Sprig className="absolute -bottom-14 -left-12 h-44 w-28 -rotate-12 text-sage/50 sm:-left-16 sm:h-56 sm:w-36" />
            <Sprig
              mirrored
              className="absolute -right-12 bottom-20 h-32 w-20 rotate-12 text-sage/30 sm:-right-16 sm:h-40 sm:w-24"
            />

            <span
              aria-hidden="true"
              className="absolute -left-5 top-24 size-1.5 rounded-full bg-gold/60 sm:-left-7"
            />
            <span
              aria-hidden="true"
              className="absolute -right-7 top-1/3 size-1 rounded-full bg-sage/60"
            />
          </motion.div>
        </div>

        <motion.a
          href="#story"
          aria-label="Continue to the invitation message"
          className="mx-auto mt-16 flex w-fit flex-col items-center gap-3 text-muted transition-colors hover:text-sage-deep sm:mt-20 lg:mt-24"
          animate={{ opacity: opened ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <span className="text-[0.5rem] uppercase tracking-[0.35em]">
            A note from our hearts
          </span>
          <span className="relative grid size-9 place-items-center rounded-full border border-gold/30">
            <motion.span
              animate={{ y: [-2, 2, -2], opacity: [0.55, 1, 0.55] }}
              transition={{
                duration: 2.6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <ChevronDown
                aria-hidden="true"
                className="size-3.5"
                strokeWidth={1.4}
              />
            </motion.span>
          </span>
        </motion.a>
      </Container>
    </section>
  );
}

function HeroBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_0%,rgba(223,230,218,0.5),transparent_72%)]" />
      <div className="absolute left-1/2 top-0 h-[38rem] w-[44rem] -translate-x-1/2 rounded-full bg-sage/10 blur-3xl" />
      <div className="absolute right-[-9rem] top-1/3 size-[24rem] rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute bottom-[-8rem] left-[-6rem] size-[20rem] rounded-full bg-sage/10 blur-3xl" />

      <div className="absolute left-1/2 top-14 hidden h-[40rem] w-[32rem] -translate-x-1/2 rounded-t-[16rem] border border-sage/15 lg:block" />
      <div className="absolute left-1/2 top-20 hidden h-[38rem] w-[30rem] -translate-x-1/2 rounded-t-[15rem] border border-gold/10 lg:block" />

      <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </div>
  );
}
