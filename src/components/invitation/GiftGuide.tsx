"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Monogram } from "@/components/ui/Monogram";
import { OrnamentDivider } from "@/components/ui/Ornament";
import { Sprig } from "@/components/ui/Botanical";
import { LeafMark } from "@/components/ui/Ornament";

interface GiftCategory {
  title: string;
  description: string;
  items: string[];
}

interface GiftGuideProps {
  invitation: import("@/types/invitation").InvitationConfig;
}

const giftCategories: GiftCategory[] = [
  {
    title: "Baby Essentials",
    description:
      "Practical items for the baby's first days and weeks.",
    items: [
      "Diapers (various sizes)",
      "Baby wipes (unscented)",
      "Baby toilet set (brush, comb, nail clippers)",
      "Feeding essentials (bottles, burp cloths)",
    ],
  },
  {
    title: "Baby Clothing",
    description:
      "Comfortable clothing for the baby now and in the future.",
    items: [
      "Onesies (cotton, easy-dress style)",
      "Socks and mittens (to keep baby warm)",
      "Soft baby pants or leggings",
      "Clothing in larger sizes for future use",
    ],
  },
  {
    title: "Baby Care",
    description:
      "Items for the baby's daily care and comfort.",
    items: [
      "Soft baby towels",
      "Blankets (receiving blankets, swaddle blankets)",
      "Baby bath essentials",
      "Gentle baby-care products (fragrance-free)",
    ],
  },
  {
    title: "Books and Keepsakes",
    description:
      "Meaningful items to cherish and remember this special milestone.",
    items: [
      "Baby storybooks",
      "Personalized keepsakes",
      "Memory books for first years",
      "Christening mementos and frames",
    ],
  },
  {
    title: "Other Thoughtful Gifts",
    description:
      "Practical items that support the baby's growth and everyday needs.",
    items: [
      "Baby carrier or wrap",
      "Sterilizer or bottle warmer",
      "Travel system (car seat + stroller)",
      "Educational toys for later stages",
    ],
  },
];

const silk = [0.22, 1, 0.36, 1] as const;

export function GiftGuide({ invitation }: GiftGuideProps) {
  const reducedMotion = useReducedMotion() ?? false;

  const [showGuide, setShowGuide] = useState(true);

  // Guide is shown by default; no mount effect needed

  const handleViewMoreClick = () => {
    const section = document.getElementById("gift-guide-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="gift-guide-section"
      aria-labelledby="gift-guide-title"
      className="relative py-24 sm:py-28 lg:py-32 bg-[color:var(--color-ivory)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 wash-gold" />
        <div className="absolute inset-0 top-0 left-0 bottom-0 right-0 wash-gold" />
        <div className="absolute left-1/2 top-0 h-[34rem] w-[28rem] -translate-x-1/2 rounded-t-[15rem] border border-gold/15 sm:h-[40rem] sm:w-[34rem]" />
        <div className="absolute left-1/2 top-1/2 h-[31rem] w-[25rem] -translate-x-1/2 -translate-y-1/2 rounded-t-[14rem] border border-gold/10 sm:h-[37rem] sm:w-[31rem]" />
        <div className="absolute left-1/2 top-1/2 size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />
        <LeafMark className="absolute -left-10 bottom-0 h-64 w-40 rotate-[22deg] text-gold/30 sm:left-4 sm:h-72 sm:w-44" />
        <LeafMark
          mirrored
          className="absolute -right-10 top-0 h-64 w-40 -rotate-12 text-gold/25 sm:right-4 sm:h-72 sm:w-44"
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
          <Eyebrow className="mb-2">A Little Gift Guide</Eyebrow>

          <h1
            id="gift-guide-title"
            className="mt-4 font-display text-[2.8rem] leading-[1.1] text-ink text-balance sm:text-4xl"
          >
            A Little Gift Guide
          </h1>

          <OrnamentDivider className="my-8" />

          {/* Optional Gift Note */}
          <div className="mb-10">
            <p className="text-[0.75rem] leading-relaxed text-gold-500 text-center max-w-2xl mx-auto">
              {" "}
              Your presence at Adreil Eiden’s christening is already the greatest
              gift to our family. Please know that bringing a gift is absolutely not
              required. We created this little gift guide only as a helpful
              reference for anyone who wishes to give something, so that the items
              our little one receives can be useful and enjoyed as he grows. Your
              love, prayers, and presence mean more to us than anything.
            </p>
            <p className="mt-3 text-[0.55rem] uppercase tracking-[0.3em] text-gold-400 text-center">
              Please do’t feel any pressure to bring a gift. We are simply grateful
              to celebrate this beautiful milestone with you.
            </p>
          </div>

          {/* Gift Categories Grid */}
          <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {giftCategories.map((category, index) => (
              <article
                key={index}
                className="group rounded-2xl border border-gold/20 bg-paper/80 p-5 shadow-soft transition-all duration-300 hover:border-gold-500 hover:bg-gold-soft/50 cursor-help reduced-motion:transition-none"
              >
                <div className="relative h-24 mb-4">
                  <div
                    className="relative flex items-center justify-center h-24 sm:h-32 rounded-[1.25rem] bg-gold-50/50 mb-3"
                  >
                    <span className="text-[1.5rem] text-gold-300">•</span>
                  </div>
                </div>

                <h3 className="font-display text-[1.25rem] leading-[1.3] text-ink text-balance mb-2">
                  {category.title}
                </h3>

                <p className="text-[0.62rem] leading-relaxed text-gold-500 mb-3 line-clamp-2">
                  {category.description}
                </p>

                <ul className="text-[0.58rem] leading-relaxed text-gold-600 line-clamp-3">
                  {category.items.map((item, i) => (
                    <li key={i} className="mb-1">
                      {'•'} {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}

          </div>

          {/* View More button */}
          {reducedMotion ? null : (
            <button
              type="button"
              onClick={handleViewMoreClick}
              className="mt-8 inline-flex items-center justify-center rounded-full border px-6 py-2.5 text-[0.58rem] font-medium uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-gold-500 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
            >
              <svg
                aria-hidden="true"
                className="size-3.5 mr-2"
                strokeWidth={1.8}
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 6L8.59 2.93a1 1 0 011.71 0l4.58 4.33a1 1 0 010 1.72l-4.58 4.33a1 1 0 01-1.71 0L14 10l-1.47-3.67Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>View more gift ideas</span>
            </button>
          )}

          {/* Small closing note */}
          <p className="mt-10 text-[0.55rem] uppercase tracking-[0.3em] text-gold-400 text-center">
            Your presence is already a precious gift.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}