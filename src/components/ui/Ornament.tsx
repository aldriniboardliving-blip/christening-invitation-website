import { cn } from "@/lib/utils";

export interface LeafMarkProps {
  className?: string;
  mirrored?: boolean;
}

export function LeafMark({ className, mirrored = false }: LeafMarkProps) {
  const mirrorTransform = mirrored ? "scaleX(-1)" : "";
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={cn(className, mirrored && "transform-[scaleX(-1)]")}
    >
      <path
        d="M12 21V9"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M12 14C7.5 14 4.5 10.8 4.5 6.6C9 6.6 12 9.8 12 14Z"
        fill="currentColor"
        fillOpacity=".16"
        stroke="currentColor"
        strokeWidth=".9"
      />
      <path
        d="M12 10.5C16.2 10.5 19 7.6 19 3.8C14.8 3.8 12 6.7 12 10.5Z"
        fill="currentColor"
        fillOpacity=".1"
        stroke="currentColor"
        strokeWidth=".9"
      />
    </svg>
  );
}

export function OrnamentDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex items-center justify-center gap-3", className)}
    >
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/45 sm:w-16" />
      <LeafMark className="size-4 text-gold/75" />
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/45 sm:w-16" />
    </div>
  );
}
