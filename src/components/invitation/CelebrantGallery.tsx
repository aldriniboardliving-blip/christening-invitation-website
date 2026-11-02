"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Play,
  Pause,
  ArrowRight,
  Sparkles,
  Heart,
  Calendar,
  MapPin,
} from "lucide-react";
import type { InvitationConfig } from "@/types/invitation";
import type { Recipient } from "@/types/recipient";
import { getGodparentRoleLabel } from "@/lib/recipients";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Monogram } from "@/components/ui/Monogram";
import { OrnamentDivider, LeafMark } from "@/components/ui/Ornament";
import { Sprig } from "@/components/ui/Botanical";
import { formatEventDate } from "@/lib/date";

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  image: string;
  width: number;
  height: number;
  quote?: string;
}

export const defaultCelebrantGallery: GalleryItem[] = [
  {
    id: "photo-1",
    title: "A Little Blessing",
    subtitle: "Welcome to the world, Adreil Eiden",
    description:
      "From the very first moment, you filled our hearts with a love we never knew existed. You are our answered prayer, our little blessing, and the beginning of a lifetime of grace.",
    tag: "Milestone",
    image: "/images/denden-1.jpg",
    width: 1200,
    height: 1500,
    quote: "“Every good and perfect gift is from above.” — James 1:17",
  },
  {
    id: "photo-2",
    title: "Gentle Slumber",
    subtitle: "Peaceful moments & quiet grace",
    description:
      "Wrapped in warmth and quiet wonder. In your peaceful rest lies a beauty so gentle and a reminder of God's tender care watching over your every breath.",
    tag: "Quiet Moments",
    image: "/images/denden-2.jpg",
    width: 1200,
    height: 1500,
    quote: "“He gives his beloved sleep.” — Psalm 127:2",
  },
  {
    id: "photo-3",
    title: "Purest Smile",
    subtitle: "A light that brightens every day",
    description:
      "A single sweet smile that instantly brightens our entire world. Your innocence and laughter bring joy to every member of our family.",
    tag: "Sweet Joy",
    image: "/images/denden-5.jpg",
    width: 1200,
    height: 1500,
    quote: "“A baby’s smile is a bit of starlight brought down from heaven.”",
  },
  {
    id: "photo-4",
    title: "Tiny Miracles",
    subtitle: "Growing each day in love",
    description:
      "Every tiny stretch, curious glance, and soft sigh is a miracle we hold close to our hearts. Watching you grow is our greatest privilege and joy.",
    tag: "Growing Grace",
    image: "/images/denden-4.jpg",
    width: 1200,
    height: 1500,
    quote: "“For this child I prayed, and the Lord has granted my petition.” — 1 Samuel 1:27",
  },
  {
    id: "photo-5",
    title: "Held in Endless Love",
    subtitle: "Surrounded by family and godparents",
    description:
      "Guided by parents who adore you, and blessed by godparents and family who promise to walk beside you in faith and love all the days of your life.",
    tag: "Family & Faith",
    image: "/images/denden-3.jpg",
    width: 1200,
    height: 1500,
    quote: "“Love never fails, and faith lights every path you will walk.”",
  },
  {
    id: "photo-6",
    title: "Ready for Holy Baptism",
    subtitle: "Welcomed into the Christian faith",
    description:
      "With joyful hearts, we eagerly await the sacred day when you will receive the sacrament of Holy Baptism and be welcomed into the loving arms of Christ's church.",
    tag: "The Christening",
    image: "/images/denden-6.jpg",
    width: 1200,
    height: 1500,
    quote: "“Let the little children come to me, for the kingdom of heaven belongs to such as these.” — Matthew 19:14",
  },
];

interface CelebrantGalleryProps {
  invitation: InvitationConfig;
  recipient?: Recipient | null;
  invitationUrl?: string;
  onSeeInvitation?: () => void;
  items?: GalleryItem[];
}

const silk = [0.22, 1, 0.36, 1] as const;

export function CelebrantGallery({
  invitation,
  recipient = null,
  invitationUrl,
  onSeeInvitation,
  items = defaultCelebrantGallery,
}: CelebrantGalleryProps) {
  const targetInvitationUrl =
    invitationUrl ||
    (recipient ? `/invitation/${recipient.slug}/` : "/invitation/");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const reducedMotion = useReducedMotion() ?? false;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeItem = items[currentIndex];

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const goToIndex = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Autoplay functionality
  useEffect(() => {
    if (!isPlaying || isLightboxOpen) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      goToNext();
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isLightboxOpen, goToNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "ArrowLeft") {
        goToPrev();
      } else if (e.key === "Escape" && isLightboxOpen) {
        setIsLightboxOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev, isLightboxOpen]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: reducedMotion ? 0 : dir > 0 ? 80 : -80,
      opacity: 0,
      scale: reducedMotion ? 1 : 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: reducedMotion ? 0.2 : 0.65,
        ease: silk,
      },
    },
    exit: (dir: number) => ({
      x: reducedMotion ? 0 : dir > 0 ? -80 : 80,
      opacity: 0,
      scale: reducedMotion ? 1 : 0.96,
      transition: {
        duration: reducedMotion ? 0.2 : 0.5,
        ease: silk,
      },
    }),
  };

  return (
    <section
      id="celebrant-gallery"
      aria-labelledby="gallery-title"
      className="relative min-h-screen overflow-hidden bg-[color:var(--color-ivory)] py-14 sm:py-20 lg:py-24"
    >
      {/* Background Ambience */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 wash-sage opacity-70" />
        <div className="absolute inset-0 wash-gold opacity-50" />
        <div className="absolute left-1/2 top-0 h-[42rem] w-[36rem] -translate-x-1/2 rounded-full bg-sage/10 blur-3xl" />
        <div className="absolute right-[-10rem] top-1/3 size-[28rem] rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute bottom-[-10rem] left-[-8rem] size-[28rem] rounded-full bg-sage/15 blur-3xl" />

        <div className="absolute left-1/2 top-10 h-[46rem] w-[34rem] -translate-x-1/2 rounded-t-[18rem] border border-gold/15" />
        <div className="absolute left-1/2 top-16 h-[44rem] w-[32rem] -translate-x-1/2 rounded-t-[17rem] border border-sage/15" />

        <Sprig className="absolute -left-12 top-1/4 h-56 w-36 -rotate-12 text-sage/35 sm:-left-8 sm:h-72 sm:w-48" />
        <Sprig
          mirrored
          className="absolute -right-12 bottom-1/4 h-56 w-36 rotate-12 text-sage/30 sm:-right-8 sm:h-72 sm:w-48"
        />

        <LeafMark className="absolute left-[12%] top-[20%] size-4 text-gold/40 animate-drift" />
        <LeafMark className="absolute right-[14%] top-[45%] size-3.5 text-sage/40 animate-drift-slow" />
      </div>

      <Container className="relative z-10">
        {/* Gallery Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: silk }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="flex items-center justify-center gap-3">
            <Monogram
              letters={invitation.baby.monogram}
              className="size-12 border-gold/30 bg-paper/80 text-lg text-ink shadow-soft"
            />
          </div>

          <Eyebrow className="mt-5" align="center">
            Memories of Grace · Little Blessing
          </Eyebrow>

          <h1
            id="gallery-title"
            className="mt-3 font-display text-[2.75rem] leading-[1.05] tracking-[-0.02em] text-ink text-balance sm:text-5xl lg:text-[3.5rem]"
          >
            Adreil Eiden&apos;s Gallery
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-[0.85rem] leading-relaxed text-muted sm:text-[0.95rem]">
            A cherished glimpse into the smiles, quiet blessings, and tender milestones of our beloved son as we prepare to welcome him into the Christian faith.
          </p>

          <div className="mt-5 flex justify-center">
            <OrnamentDivider />
          </div>

          {recipient ? (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-paper/90 px-4 py-1.5 text-[0.52rem] uppercase tracking-[0.26em] text-gold-deep shadow-soft">
              <LeafMark className="size-3.5 text-sage" />
              Prepared for {getGodparentRoleLabel(recipient.role)}{" "}
              {recipient.name}
            </div>
          ) : null}

          {/* Quick link button to invitation */}
          <div className="mt-5 flex justify-center">
            <Link
              href={targetInvitationUrl}
              onClick={(e) => {
                if (onSeeInvitation) {
                  e.preventDefault();
                  onSeeInvitation();
                }
              }}
              className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-paper/90 px-5 py-2 text-[0.58rem] font-medium uppercase tracking-[0.24em] text-gold-deep shadow-soft backdrop-blur-xs transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ivory hover:shadow-lift"
            >
              <span>
                {recipient ? "Skip to Your Invitation" : "Skip to Invitation"}
              </span>
              <ArrowRight className="size-3" strokeWidth={2} />
            </Link>
          </div>
        </motion.div>

        {/* Featured Interactive Showcase */}
        <div className="mt-12 lg:mt-16 grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          {/* Main Visual Display */}
          <div className="relative mx-auto w-full max-w-[24rem] sm:max-w-[28rem] lg:max-w-none">
            {/* Arched Decorative Frames */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 rotate-[1.5deg] rounded-t-[16rem] rounded-b-[2.5rem] border border-gold/30 sm:-inset-5"
            />
            <div
              aria-hidden="true"
              className="absolute -inset-2 -rotate-[1deg] rounded-t-[15.5rem] rounded-b-[2.2rem] border border-sage/30"
            />
            <div
              aria-hidden="true"
              className="absolute inset-4 rounded-t-[15rem] rounded-b-[2rem] bg-sage/15 blur-2xl"
            />

            {/* Photo Container */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[15rem] rounded-b-[2rem] border border-paper/90 bg-ivory-deep shadow-lift">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={activeItem.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag={reducedMotion ? false : "x"}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -40) {
                      goToNext();
                    } else if (info.offset.x > 40) {
                      goToPrev();
                    }
                  }}
                  className="relative h-full w-full cursor-grab active:cursor-grabbing"
                >
                  <Image
                    src={activeItem.image}
                    alt={activeItem.title}
                    fill
                    priority
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 32rem"
                    className="object-cover object-[50%_35%] transition-transform duration-700 hover:scale-105"
                  />

                  {/* Gradient vignettes */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent opacity-90"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-t-[15rem] rounded-b-[2rem] ring-1 ring-inset ring-white/25"
                  />

                  {/* Floating Top Badge */}
                  <div className="absolute left-6 top-7 z-20 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-ivory/30 bg-ink/40 px-3 py-1 text-[0.48rem] font-medium uppercase tracking-[0.24em] text-ivory/90 backdrop-blur-md">
                      <Sparkles className="size-2.5 text-gold" />
                      {activeItem.tag}
                    </span>
                  </div>

                  {/* Expand Lightbox Button */}
                  <button
                    type="button"
                    onClick={() => setIsLightboxOpen(true)}
                    aria-label="View photo in fullscreen"
                    className="absolute right-6 top-7 z-20 grid size-8 place-items-center rounded-full border border-ivory/30 bg-ink/40 text-ivory/90 backdrop-blur-md transition-all duration-300 hover:bg-gold hover:text-ivory hover:border-gold"
                  >
                    <Maximize2 className="size-3.5" strokeWidth={1.8} />
                  </button>

                  {/* Bottom Caption Overlay */}
                  <div className="absolute inset-x-0 bottom-0 z-20 p-6 sm:p-8 text-ivory">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[0.52rem] font-medium uppercase tracking-[0.3em] text-gold-soft">
                          Photo {currentIndex + 1} of {items.length}
                        </p>
                        <h2 className="mt-1 font-display text-2xl font-normal leading-tight text-ivory sm:text-3xl">
                          {activeItem.title}
                        </h2>
                      </div>
                      <Monogram
                        letters={invitation.baby.monogram}
                        className="size-9 border-ivory/30 bg-ivory/15 text-xs text-ivory shadow-none backdrop-blur-sm"
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next floating overlay controls */}
              <div className="absolute inset-y-0 left-3 z-30 flex items-center">
                <button
                  type="button"
                  onClick={goToPrev}
                  aria-label="Previous photo"
                  className="grid size-9 place-items-center rounded-full border border-ivory/35 bg-ink/35 text-ivory/90 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-gold hover:border-gold hover:text-ivory"
                >
                  <ChevronLeft className="size-4" strokeWidth={2} />
                </button>
              </div>

              <div className="absolute inset-y-0 right-3 z-30 flex items-center">
                <button
                  type="button"
                  onClick={goToNext}
                  aria-label="Next photo"
                  className="grid size-9 place-items-center rounded-full border border-ivory/35 bg-ink/35 text-ivory/90 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-gold hover:border-gold hover:text-ivory"
                >
                  <ChevronRight className="size-4" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Description & Controls Side */}
          <div className="flex flex-col justify-center text-center lg:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.5, ease: silk }}
                className="space-y-5"
              >
                {/* Tag & Counter */}
                <div className="flex items-center justify-center gap-3 lg:justify-start">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-paper/80 px-3.5 py-1 text-[0.52rem] font-medium uppercase tracking-[0.24em] text-gold-deep shadow-soft">
                    <Heart className="size-3 fill-gold text-gold" />
                    {activeItem.tag}
                  </span>
                  <span className="text-[0.54rem] uppercase tracking-[0.22em] text-muted">
                    Moment {currentIndex + 1} of {items.length}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h2 className="font-display text-3xl text-ink sm:text-4xl lg:text-5xl">
                    {activeItem.title}
                  </h2>
                  <p className="mt-1 font-display text-lg italic text-gold-deep sm:text-xl">
                    {activeItem.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-[0.92rem] leading-7 text-ink/80 sm:text-[0.98rem]">
                  {activeItem.description}
                </p>

                {/* Quote Card */}
                {activeItem.quote ? (
                  <div className="rounded-2xl border border-sage/25 bg-sage-soft/40 p-4 font-display text-sm italic text-sage-deep sm:text-base">
                    {activeItem.quote}
                  </div>
                ) : null}
              </motion.div>
            </AnimatePresence>

            {/* Slideshow & Navigation Toolbar */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              {/* Previous button */}
              <button
                type="button"
                onClick={goToPrev}
                aria-label="Previous photo"
                className="inline-flex size-11 items-center justify-center rounded-full border border-gold/30 bg-paper/90 text-gold-deep shadow-soft transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ivory hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-2"
              >
                <ChevronLeft className="size-5" strokeWidth={1.8} />
              </button>

              {/* Autoplay Play/Pause */}
              <button
                type="button"
                onClick={() => setIsPlaying((prev) => !prev)}
                aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[0.56rem] font-medium uppercase tracking-[0.22em] transition-all duration-300",
                  isPlaying
                    ? "border-sage/40 bg-sage-soft/60 text-sage-deep shadow-soft"
                    : "border-gold/30 bg-paper/90 text-gold-deep shadow-soft hover:bg-gold hover:text-ivory",
                )}
              >
                {isPlaying ? (
                  <>
                    <Pause className="size-3.5 fill-current" />
                    <span>Autoplay On</span>
                  </>
                ) : (
                  <>
                    <Play className="size-3.5 fill-current" />
                    <span>Autoplay Paused</span>
                  </>
                )}
              </button>

              {/* Next button */}
              <button
                type="button"
                onClick={goToNext}
                aria-label="Next photo"
                className="inline-flex size-11 items-center justify-center rounded-full border border-gold/30 bg-paper/90 text-gold-deep shadow-soft transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ivory hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-2"
              >
                <ChevronRight className="size-5" strokeWidth={1.8} />
              </button>
            </div>

            {/* Slide Dots */}
            <div className="mt-6 flex items-center justify-center gap-2 lg:justify-start">
              {items.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goToIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    idx === currentIndex
                      ? "w-8 bg-gold-deep shadow-sm"
                      : "w-2 bg-gold/25 hover:bg-gold/50",
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Thumbnail Selector Strip */}
        <div className="mt-14 sm:mt-18">
          <p className="text-center font-display text-lg italic text-gold-deep">
            Moments with Adreil Eiden
          </p>

          <div className="mt-5 flex gap-3 overflow-x-auto pb-4 pt-2 scrollbar-none sm:justify-center">
            {items.map((item, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={`thumb-${item.id}`}
                  type="button"
                  onClick={() => goToIndex(idx)}
                  className={cn(
                    "group relative flex shrink-0 items-center gap-3 rounded-2xl border p-2 text-left transition-all duration-300",
                    isActive
                      ? "border-gold bg-paper/95 shadow-lift ring-2 ring-gold/40 scale-102"
                      : "border-gold/20 bg-paper/60 opacity-75 hover:opacity-100 hover:border-gold/40 hover:bg-paper/85",
                  )}
                >
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-xl border border-gold/25">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="56px"
                      className="object-cover object-[50%_35%] transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  <div className="hidden pr-3 sm:block">
                    <p className="text-[0.48rem] uppercase tracking-[0.2em] text-muted">
                      Photo {idx + 1}
                    </p>
                    <p className="font-display text-sm font-normal text-ink line-clamp-1">
                      {item.title}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Primary Call to Action Section: "See Invitation" */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease: silk }}
          className="mx-auto mt-16 sm:mt-20 max-w-2xl text-center"
        >
          <div className="relative overflow-hidden rounded-[2.5rem] border border-gold/30 bg-paper/90 p-8 sm:p-12 shadow-lift backdrop-blur-md">
            {/* Background flourish inside CTA */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 wash-gold opacity-60"
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
            />

            <div className="relative z-10 space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-paper px-4 py-1.5 text-[0.52rem] font-medium uppercase tracking-[0.28em] text-gold-deep shadow-soft">
                <Sparkles className="size-3 text-gold" />
                The Holy Ceremony &amp; Reception
              </span>

              <h2 className="font-display text-3xl text-ink text-balance sm:text-4xl">
                You Are Warmly Invited
              </h2>

              <p className="mx-auto max-w-lg text-[0.85rem] leading-relaxed text-muted">
                Join our family as we celebrate the Holy Christening of Adreil Eiden. View complete ceremony timings, church directions, reception details, and gift guide.
              </p>

              {/* Event Quick Details */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-[0.58rem] uppercase tracking-[0.22em] text-sage-deep">
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-3.5 text-gold-deep" />
                  {formatEventDate(invitation.event.startsAt, invitation.event.timeZone)}
                </span>
                <span aria-hidden="true" className="size-1 rounded-full bg-gold/60" />
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-gold-deep" />
                  {invitation.event.church.name}
                </span>
              </div>

              {/* Big "See Invitation" Button */}
              <div className="pt-4">
                <Link
                  href={targetInvitationUrl}
                  onClick={(e) => {
                    if (onSeeInvitation) {
                      e.preventDefault();
                      onSeeInvitation();
                    }
                  }}
                  className={cn(
                    "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full",
                    "border border-gold-deep/20 bg-gold px-9 py-4 text-[0.66rem] font-medium uppercase tracking-[0.28em] text-[#2f332e]",
                    "shadow-[0_16px_30px_-14px_rgba(168,135,74,0.7)] transition-all duration-300",
                    "hover:-translate-y-1 hover:bg-gold-deep hover:text-ivory hover:shadow-[0_22px_40px_-14px_rgba(168,135,74,0.65)]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-4 focus-visible:ring-offset-[color:var(--color-ivory)]",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,.35)_50%,transparent_75%)] transition-transform duration-700 group-hover:translate-x-full"
                  />
                  <span className="relative">
                    {recipient ? "Continue to Your Invitation" : "See Invitation"}
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="relative size-4 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={2}
                  />
                </Link>
              </div>

              <p className="text-[0.52rem] uppercase tracking-[0.3em] text-muted">
                {recipient
                  ? `Proceed to your personalized godparent invitation for ${getGodparentRoleLabel(recipient.role)} ${recipient.name}`
                  : "Tap to view full invitation & RSVP details"}
              </p>
            </div>
          </div>
        </motion.div>
      </Container>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Photo Lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close lightbox"
              className="absolute right-4 top-4 z-50 grid size-11 place-items-center rounded-full border border-white/20 bg-black/40 text-white transition-all duration-300 hover:bg-white hover:text-black"
            >
              <X className="size-5" />
            </button>

            {/* Left Nav */}
            <button
              type="button"
              onClick={goToPrev}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 z-50 -translate-y-1/2 grid size-11 place-items-center rounded-full border border-white/20 bg-black/40 text-white transition-all duration-300 hover:bg-gold hover:border-gold hover:text-ivory"
            >
              <ChevronLeft className="size-6" />
            </button>

            {/* Right Nav */}
            <button
              type="button"
              onClick={goToNext}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 z-50 -translate-y-1/2 grid size-11 place-items-center rounded-full border border-white/20 bg-black/40 text-white transition-all duration-300 hover:bg-gold hover:border-gold hover:text-ivory"
            >
              <ChevronRight className="size-6" />
            </button>

            {/* Lightbox Content */}
            <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col items-center">
              <div className="relative aspect-[4/5] max-h-[70vh] w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={activeItem.image}
                  alt={activeItem.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              {/* Caption in lightbox */}
              <div className="mt-4 text-center text-white">
                <p className="text-[0.55rem] uppercase tracking-[0.26em] text-gold-soft">
                  {activeItem.tag} · Photo {currentIndex + 1} of {items.length}
                </p>
                <h3 className="mt-1 font-display text-2xl text-ivory">
                  {activeItem.title}
                </h3>
                <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-white/80">
                  {activeItem.description}
                </p>

                <div className="mt-4">
                  <Link
                    href={targetInvitationUrl}
                    onClick={(e) => {
                      setIsLightboxOpen(false);
                      if (onSeeInvitation) {
                        e.preventDefault();
                        onSeeInvitation();
                      }
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-gold bg-gold px-6 py-2.5 text-[0.6rem] font-medium uppercase tracking-[0.24em] text-[#2f332e] shadow-soft transition-all duration-300 hover:bg-gold-deep hover:text-ivory"
                  >
                    <span>
                      {recipient
                        ? "Continue to Your Invitation"
                        : "See Invitation"}
                    </span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
