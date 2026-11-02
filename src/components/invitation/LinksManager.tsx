"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeft, Check, Copy, ExternalLink } from "lucide-react";
import type { InvitationConfig } from "@/types/invitation";
import type { Recipient } from "@/types/recipient";
import { getGodparentRoleLabel } from "@/lib/recipients";
import { cn } from "@/lib/utils";
import { Sprig } from "@/components/ui/Botanical";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Monogram } from "@/components/ui/Monogram";
import { OrnamentDivider } from "@/components/ui/Ornament";

export interface RecipientLink {
  recipient: Recipient;
  url: string;
}

interface LinksManagerProps {
  invitation: InvitationConfig;
  links: readonly RecipientLink[];
}

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall through to the legacy path below.
  }

  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "0";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(textarea);
    return copied;
  } catch {
    return false;
  }
}

export function LinksManager({ invitation, links }: LinksManagerProps) {
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!copiedSlug && !status) return;

    const timer = window.setTimeout(() => {
      setCopiedSlug(null);
      setStatus("");
    }, 2600);

    return () => window.clearTimeout(timer);
  }, [copiedSlug, status]);

  async function handleCopyLink(recipient: Recipient, url: string) {
    const copied = await copyToClipboard(url);
    setCopiedSlug(copied ? recipient.slug : null);
    setStatus(
      copied
        ? `Invitation link for ${recipient.name} copied.`
        : "Could not copy automatically. Select the URL and copy it manually.",
    );
  }

  async function handleCopyAll() {
    const text = links
      .map(
        ({ recipient, url }) =>
          `${getGodparentRoleLabel(recipient.role)} ${recipient.name}\n${url}`,
      )
      .join("\n\n");

    const copied = await copyToClipboard(text);
    setCopiedSlug(null);
    setStatus(
      copied
        ? `All ${links.length} personalized links copied.`
        : "Could not copy automatically. Open each invitation and copy its URL.",
    );
  }

  return (
    <main className="relative min-h-svh overflow-hidden bg-ivory py-14 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 wash-sage" />
        <div className="absolute left-1/2 top-0 h-[34rem] w-[28rem] -translate-x-1/2 rounded-full bg-sage/10 blur-3xl" />
        <Sprig className="absolute -left-12 top-24 h-72 w-44 rotate-[18deg] text-sage/25 sm:left-0" />
        <Sprig
          mirrored
          className="absolute -right-12 bottom-10 h-72 w-44 -rotate-12 text-sage/20 sm:right-0"
        />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <Monogram
            letters={invitation.baby.monogram}
            className="mx-auto size-14 text-xl"
          />

          <Eyebrow className="mt-7">Owner tools</Eyebrow>

          <h1 className="mt-5 font-display text-[2.55rem] leading-[1.02] text-ink text-balance sm:text-5xl">
            Godparent invitation links
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted">
            Copy a personalized link, scan its QR code, or share the whole set.
            This page is available in development only and is not published in
            production.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleCopyAll}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gold-deep/20 bg-gold px-6 py-3 text-[0.6rem] font-medium uppercase tracking-[0.22em] text-[#2f332e] shadow-[0_16px_30px_-16px_rgba(168,135,74,0.7)] transition-[background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:bg-gold-deep hover:text-ivory"
            >
              <Copy aria-hidden="true" className="size-3.5" strokeWidth={1.7} />
              Copy all links
            </button>

            <Link
              href="/invitation/"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-sage/30 bg-paper/60 px-6 py-3 text-[0.6rem] font-medium uppercase tracking-[0.22em] text-sage-deep transition-colors duration-300 hover:border-sage/50 hover:bg-sage-soft/50"
            >
              <ArrowLeft
                aria-hidden="true"
                className="size-3.5"
                strokeWidth={1.7}
              />
              General invitation
            </Link>
          </div>

          <p
            role="status"
            aria-live="polite"
            className={cn(
              "mt-4 min-h-4 text-[0.65rem] leading-relaxed text-sage-deep",
              status ? "opacity-100" : "opacity-0",
            )}
          >
            {status || "Copy status"}
          </p>
        </div>

        <OrnamentDivider className="my-10 sm:my-12" />

        <div className="grid gap-6 sm:grid-cols-2">
          {links.map(({ recipient, url }) => {
            const roleLabel = getGodparentRoleLabel(recipient.role);
            const copied = copiedSlug === recipient.slug;

            return (
              <article
                key={recipient.id}
                className="relative overflow-hidden rounded-[1.75rem] border border-gold/20 bg-paper/80 p-6 shadow-soft"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
                />

                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[0.52rem] uppercase tracking-[0.28em] text-gold-deep">
                      {roleLabel}
                    </p>
                    <h2 className="mt-2 font-display text-2xl leading-tight text-ink">
                      {recipient.name}
                    </h2>
                    {recipient.personalizedMessage ? (
                      <p className="mt-2 line-clamp-2 font-display text-sm italic leading-relaxed text-sage-deep">
                        {recipient.personalizedMessage}
                      </p>
                    ) : null}
                  </div>

                  <div className="shrink-0 rounded-2xl border border-sage/20 bg-paper p-2">
                    <QRCodeSVG
                      value={url}
                      size={104}
                      level="M"
                      marginSize={2}
                      bgColor="#FFFDF8"
                      fgColor="#343832"
                      title={`QR code for ${recipient.name}'s invitation`}
                    />
                  </div>
                </div>

                <p className="mt-4 break-all rounded-xl border border-ink/10 bg-ivory-deep/50 px-3 py-2 font-mono text-[0.66rem] leading-relaxed text-muted">
                  {url}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleCopyLink(recipient, url)}
                    aria-label={`Copy invitation link for ${recipient.name}`}
                    className={cn(
                      "inline-flex items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-[0.58rem] font-medium uppercase tracking-[0.2em] transition-[background-color,border-color,color,transform] duration-300 hover:-translate-y-0.5",
                      copied
                        ? "border-sage/40 bg-sage-soft/60 text-sage-deep"
                        : "border-gold-deep/20 bg-gold/90 text-[#2f332e] hover:bg-gold-deep hover:text-ivory",
                    )}
                  >
                    {copied ? (
                      <Check
                        aria-hidden="true"
                        className="size-3.5"
                        strokeWidth={2}
                      />
                    ) : (
                      <Copy
                        aria-hidden="true"
                        className="size-3.5"
                        strokeWidth={1.7}
                      />
                    )}
                    {copied ? "Copied" : "Copy link"}
                  </button>

                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-sage/30 bg-paper/60 px-5 py-2.5 text-[0.58rem] font-medium uppercase tracking-[0.2em] text-sage-deep transition-colors duration-300 hover:border-sage/50 hover:bg-sage-soft/50"
                  >
                    Open
                    <ExternalLink
                      aria-hidden="true"
                      className="size-3.5"
                      strokeWidth={1.7}
                    />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mx-auto mt-12 max-w-2xl rounded-[1.5rem] border border-gold/20 bg-paper/60 px-6 py-5 text-center">
          <p className="text-[0.55rem] uppercase tracking-[0.28em] text-gold-deep">
            Privacy note
          </p>
          <p className="mt-3 text-[0.68rem] leading-relaxed text-muted">
            This is a static website. Recipient names and slugs are embedded in
            the exported files, so anyone with access to the site can inspect
            them. Readable slugs are convenient, not secret. For stronger
            privacy, use a server-side lookup with opaque tokens.
          </p>
        </div>
      </Container>
    </main>
  );
}
