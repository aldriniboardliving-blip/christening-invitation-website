import { cn } from "@/lib/utils";

interface WaxSealProps {
  monogram: string;
  className?: string;
}

/** A hand-pressed sage-green wax seal with a soft botanical, uneven edge. */
export function WaxSeal({ monogram, className }: WaxSealProps) {
  return (
    <div className={cn("relative size-24", className)} aria-hidden="true">
      <svg
        viewBox="0 0 120 120"
        className="h-full w-full drop-shadow-[0_14px_20px_rgba(48,64,46,0.4)]"
      >
        <defs>
          <radialGradient id="wax-seal-sage" cx="34%" cy="26%" r="80%">
            <stop offset="0%" stopColor="var(--color-sage-soft)" />
            <stop offset="34%" stopColor="var(--color-sage)" />
            <stop offset="70%" stopColor="var(--color-sage-deep)" />
            <stop offset="100%" stopColor="#4E634D" />
          </radialGradient>
          <linearGradient id="wax-seal-sage-rim" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F2F6EC" stopOpacity=".62" />
            <stop offset="45%" stopColor="#3F523D" stopOpacity=".28" />
            <stop offset="100%" stopColor="#2B3A2A" stopOpacity=".55" />
          </linearGradient>
          <linearGradient id="wax-seal-sage-sheen" x1="0" y1="0" x2="0.7" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity=".3" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path
          d="M60 5C70 3 78 10 87 13C96 16 104 21 106 30C108 39 113 47 110 56C107 65 109 74 102 81C95 88 89 97 80 99C71 101 63 108 54 105C45 102 36 104 29 97C22 90 13 86 12 77C11 68 4 60 7 51C10 42 9 33 16 26C23 19 30 9 39 7C46 5 51 7 60 5Z"
          fill="url(#wax-seal-sage)"
          stroke="#3C503B"
          strokeWidth="1.2"
        />
        <path
          d="M60 10C68 8.5 76 14 84 17C92 20 99 24 101 32C103 40 107 47 105 55C103 63 105 71 99 77C93 83 88 91 80 93C72 95 65 101 57 99C49 97 41 98 35 92C29 86 21 83 20 75C19 67 13 60 15 52C17 44 16 36 22 30C28 24 34 15 42 13C49 11 53 11 60 10Z"
          fill="none"
          stroke="url(#wax-seal-sage-rim)"
          strokeWidth="3.5"
          strokeOpacity=".6"
        />
        <path
          d="M60 5C70 3 78 10 87 13C96 16 104 21 106 30C108 39 113 47 110 56C107 65 109 74 102 81C95 88 89 97 80 99C71 101 63 108 54 105C45 102 36 104 29 97C22 90 13 86 12 77C11 68 4 60 7 51C10 42 9 33 16 26C23 19 30 9 39 7C46 5 51 7 60 5Z"
          fill="url(#wax-seal-sage-sheen)"
        />
        <circle
          cx="60"
          cy="60"
          r="37"
          fill="none"
          stroke="#F1F5EB"
          strokeOpacity=".24"
          strokeWidth="1"
        />
        <circle
          cx="60"
          cy="60"
          r="33.5"
          fill="none"
          stroke="#354733"
          strokeOpacity=".28"
          strokeWidth=".8"
          strokeDasharray="1 4"
        />
        <text
          x="60"
          y="69.5"
          textAnchor="middle"
          fill="#FAF8F2"
          fillOpacity=".92"
          fontFamily="var(--font-display), Georgia, serif"
          fontSize="27"
          fontWeight="500"
          letterSpacing="1.4"
        >
          {monogram}
        </text>
        <path
          d="M28 38C35 26 46 20 59 18"
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity=".36"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
