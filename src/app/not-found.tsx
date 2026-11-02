import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { invitation } from "@/config/invitation";
import { Sprig } from "@/components/ui/Botanical";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Monogram } from "@/components/ui/Monogram";
import { OrnamentDivider } from "@/components/ui/Ornament";

export const metadata: Metadata = {
  title: `Invitation not found | ${invitation.baby.fullName}`,
  description:
    "The personalized invitation link could not be found. Open the general invitation instead.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-svh items-center overflow-hidden bg-ivory py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 wash-sage" />
        <div className="absolute left-1/2 top-1/2 h-[34rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-t-[15rem] border border-sage/15 sm:h-[40rem] sm:w-[34rem]" />
        <div className="absolute left-1/2 top-1/2 h-[31rem] w-[25rem] -translate-x-1/2 -translate-y-1/2 rounded-t-[14rem] border border-gold/10 sm:h-[37rem] sm:w-[31rem]" />
        <div className="absolute left-1/2 top-1/2 size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sage/10 blur-3xl" />
        <Sprig className="absolute -left-10 bottom-0 h-64 w-40 rotate-[22deg] text-sage/30 sm:left-4 sm:h-72 sm:w-44" />
        <Sprig
          mirrored
          className="absolute -right-10 top-0 h-64 w-40 -rotate-12 text-sage/25 sm:right-4 sm:h-72 sm:w-44"
        />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <Monogram
            letters={invitation.baby.monogram}
            className="mx-auto size-14 text-xl"
          />

          <Eyebrow className="mt-7">Invitation not found</Eyebrow>

          <h1 className="mt-5 font-display text-[2.8rem] leading-[1.02] text-ink text-balance sm:text-6xl">
            This link has wandered off the path.
          </h1>

          <p className="mx-auto mt-7 max-w-lg text-sm leading-7 text-muted">
            The personalized invitation you are looking for may be incomplete,
            or the link may have changed. The general invitation is still here
            for you.
          </p>

          <OrnamentDivider className="my-8" />

          <Link
            href="/invitation/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-gold-deep/20 bg-gold px-7 py-3.5 text-[0.6rem] font-medium uppercase tracking-[0.24em] text-[#2f332e] shadow-[0_16px_30px_-16px_rgba(168,135,74,0.7)] transition-[background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:bg-gold-deep hover:text-ivory"
          >
            <ArrowLeft
              aria-hidden="true"
              className="size-3.5"
              strokeWidth={1.7}
            />
            Open the general invitation
          </Link>

          <p className="mt-6 text-[0.55rem] uppercase tracking-[0.32em] text-muted">
            If you believe this is a mistake, please reach out to the family.
          </p>
        </div>
      </Container>
    </main>
  );
}
