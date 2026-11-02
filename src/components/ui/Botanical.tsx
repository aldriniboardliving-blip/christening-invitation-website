import { cn } from "@/lib/utils";

interface BotanicalProps {
  className?: string;
  mirrored?: boolean;
}

/** A delicate eucalyptus-like sprig drawn with fine botanical line work. */
export function Sprig({ className, mirrored = false }: BotanicalProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 180 300"
      fill="none"
      className={cn(mirrored && "-scale-x-100", className)}
    >
      <path
        d="M104 290C110 240 94 200 102 154C108 118 96 82 108 28"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeOpacity=".7"
      />
      <g
        fill="currentColor"
        fillOpacity=".12"
        stroke="currentColor"
        strokeOpacity=".55"
        strokeWidth="1"
        strokeLinejoin="round"
      >
        <path d="M102 255C78 252 60 236 57 212C82 215 99 232 102 255Z" />
        <path d="M101 212C80 208 66 192 65 170C86 175 99 190 101 212Z" />
        <path d="M104 170C84 164 73 148 74 127C93 133 103 149 104 170Z" />
        <path d="M106 128C89 121 80 106 82 87C99 93 107 108 106 128Z" />
        <path d="M108 88C93 80 87 66 90 50C104 56 110 72 108 88Z" />
        <path d="M103 233C126 231 143 216 147 193C124 196 107 212 103 233Z" />
        <path d="M102 191C123 188 138 173 141 152C121 156 106 171 102 191Z" />
        <path d="M105 150C124 146 136 132 139 112C121 117 108 131 105 150Z" />
        <path d="M107 109C123 104 132 91 133 73C117 78 108 92 107 109Z" />
        <path d="M108 69C121 63 127 52 127 38C114 43 108 55 108 69Z" />
      </g>
      <circle cx="109" cy="27" r="2.2" fill="currentColor" fillOpacity=".55" />
      <circle cx="116" cy="17" r="1.3" fill="currentColor" fillOpacity=".35" />
    </svg>
  );
}

/** An L-shaped botanical corner for the invitation cover. */
export function CornerFlourish({ className }: BotanicalProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 170 170"
      fill="none"
      className={className}
    >
      <path
        d="M4 166V48C4 24 23 4 48 4H166"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity=".55"
      />
      <path
        d="M22 166V56C22 37 37 22 56 22H166"
        stroke="currentColor"
        strokeWidth=".6"
        strokeOpacity=".25"
      />
      <g
        fill="currentColor"
        fillOpacity=".1"
        stroke="currentColor"
        strokeOpacity=".45"
        strokeWidth=".9"
        strokeLinejoin="round"
      >
        <path d="M42 96C28 92 20 81 20 68C34 73 41 83 42 96Z" />
        <path d="M62 62C56 49 58 36 67 26C75 38 74 50 62 62Z" />
        <path d="M97 40C100 26 110 18 123 17C120 31 110 39 97 40Z" />
        <path d="M42 129C35 120 34 109 39 99C47 107 49 118 42 129Z" />
      </g>
      <circle cx="67" cy="25" r="1.7" fill="currentColor" fillOpacity=".45" />
    </svg>
  );
}

/** A symmetrical laurel that frames monograms and section marks. */
export function Laurel({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 80"
      fill="none"
      className={className}
    >
      <g
        fill="currentColor"
        fillOpacity=".12"
        stroke="currentColor"
        strokeOpacity=".55"
        strokeWidth="1"
        strokeLinejoin="round"
      >
        <path d="M60 74C42 68 27 55 24 36C37 37 49 46 55 58" />
        <path d="M55 58C41 55 31 45 28 32C40 34 49 42 53 52" />
        <path d="M52 51C40 47 33 38 32 27C42 30 49 37 51 46" />
        <path d="M60 74C78 68 93 55 96 36C83 37 71 46 65 58" />
        <path d="M65 58C79 55 89 45 92 32C80 34 71 42 67 52" />
        <path d="M68 51C80 47 87 38 88 27C78 30 71 37 69 46" />
      </g>
    </svg>
  );
}
