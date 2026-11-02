import { cn } from "@/lib/utils";

interface MonogramProps {
  letters: string;
  className?: string;
}

/** A quiet, circular monogram used as an editorial signature mark. */
export function Monogram({ letters, className }: MonogramProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-grid size-12 place-items-center rounded-full border border-gold/35 bg-paper/40 font-display text-lg tracking-[0.12em] text-gold-deep shadow-[inset_0_0_0_3px_rgba(250,248,242,0.75)]",
        className,
      )}
    >
      {letters}
    </span>
  );
}
