import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatEventDate } from "@/lib/date";
import type { InvitationConfig } from "@/types/invitation";
import { Container } from "@/components/ui/Container";
import { Monogram } from "@/components/ui/Monogram";

interface SiteFooterProps {
  invitation: InvitationConfig;
}

export function SiteFooter({ invitation }: SiteFooterProps) {
  return (
    <footer className="relative overflow-hidden border-t border-ink/10 bg-ivory py-10 sm:py-12">
      <Container className="flex flex-col items-center text-center">
        <Monogram
          letters={invitation.baby.monogram}
          className="size-11 text-base"
        />

        <p className="mt-5 font-display text-xl leading-none text-ink">
          {invitation.baby.fullName}
        </p>
        <p className="mt-2.5 text-[0.52rem] uppercase tracking-[0.3em] text-muted">
          {formatEventDate(invitation.event.startsAt, invitation.event.timeZone)}
        </p>

        <span className="my-6 h-px w-16 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        {invitation.music.enabled ? (
          <p className="max-w-sm text-[0.6rem] leading-relaxed text-muted">
            Music:{" "}
            <a
              href={invitation.music.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-gold/40 underline-offset-2 transition-colors hover:text-sage-deep"
            >
              {invitation.music.title}
            </a>{" "}
            by {invitation.music.artist} ·{" "}
            <a
              href={invitation.music.license.url}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-gold/40 underline-offset-2 transition-colors hover:text-sage-deep"
            >
              {invitation.music.license.label}
            </a>
          </p>
        ) : null}

        <p className="mt-5 max-w-md font-display text-lg italic leading-relaxed text-sage-deep">
          {invitation.content.closingMessage}
        </p>

        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-paper/80 px-4 py-1.5 text-[0.52rem] font-medium uppercase tracking-[0.24em] text-gold-deep shadow-soft transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ivory hover:shadow-lift"
          >
            <span>Celebrant Gallery</span>
            <ArrowRight className="size-3" />
          </Link>
        </div>
      </Container>
    </footer>
  );
}
