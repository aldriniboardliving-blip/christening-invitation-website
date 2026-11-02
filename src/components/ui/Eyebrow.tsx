import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function Eyebrow({ children, align = "center", className }: EyebrowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 text-gold-deep",
        align === "center" && "justify-center",
        className,
      )}
    >
      {align === "center" ? <Rule /> : null}
      <span className="text-[0.62rem] font-medium uppercase tracking-[0.32em] sm:text-[0.66rem]">
        {children}
      </span>
      <Rule />
    </div>
  );
}

function Rule() {
  return (
    <span
      aria-hidden="true"
      className="h-px w-7 bg-gradient-to-r from-transparent via-gold/60 to-gold/30 sm:w-9"
    />
  );
}
