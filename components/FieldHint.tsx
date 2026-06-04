"use client";

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
        className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-border bg-accent/30 text-[10px] font-bold leading-none text-text transition-colors hover:bg-accent"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((value) => !value)}
      >
        ?
      </button>
      {open ? (
        <span
          id={tooltipId}
          role="tooltip"
          className="absolute left-0 top-full z-30 mt-2 w-64 max-w-[calc(100vw-2rem)] rounded-xl border-2 border-text bg-white p-4 text-left text-xs font-normal leading-snug text-text shadow-brutal"
        >
          {hint}
        </span>
      ) : null}
    </span>
  );
}
