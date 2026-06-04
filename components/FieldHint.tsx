"use client";

import { Info } from "lucide-react";
import { useId, useState } from "react";

type FieldHintProps = {
  hint: string;
};

export default function FieldHint({ hint }: FieldHintProps) {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();

  return (
    <span className="relative ml-1 inline-flex align-middle">
      <button
        type="button"
        aria-describedby={open ? tooltipId : undefined}
        aria-expanded={open}
        aria-label="Пояснение к полю"
        className="inline-flex h-4 w-4 items-center justify-center rounded-sm text-text-subtle transition-colors hover:bg-bg hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((value) => !value)}
      >
        <Info className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
      </button>
      {open ? (
        <span
          id={tooltipId}
          role="tooltip"
          className="absolute left-0 top-full z-30 mt-2 w-64 max-w-[calc(100vw-2rem)] rounded-md border border-border bg-surface p-3 text-left text-xs font-normal leading-snug text-text shadow-md"
        >
          {hint}
        </span>
      ) : null}
    </span>
  );
}
