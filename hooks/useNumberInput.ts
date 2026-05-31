"use client";

import { useEffect, useRef, useState } from "react";
import { formatInputThousands, formatWithSpaces, stripNumberFormatting } from "@/lib/formatNumber";

type UseNumberInputOptions = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  formatThousands?: boolean;
};

function clamp(num: number, min: number, max?: number) {
  let result = Math.max(min, num);
  if (max !== undefined) {
    result = Math.min(max, result);
  }
  return result;
}

function isPartialNumber(raw: string) {
  const normalized = stripNumberFormatting(raw);
  return normalized === "" || normalized === "-" || normalized === "." || normalized.endsWith(".");
}

const NUMERIC_PATTERN = /^-?\d[\d\s]*(?:[.,]\d*)?$|^-?[.,]\d*$/;

function toDisplayValue(value: number, formatThousands: boolean) {
  return formatThousands ? formatWithSpaces(value) : String(value);
}

export function useNumberInput({
  value,
  onChange,
  min = 0,
  max,
  formatThousands = false
}: UseNumberInputOptions) {
  const [text, setText] = useState(() => toDisplayValue(value, formatThousands));
  const focused = useRef(false);

  useEffect(() => {
    if (!focused.current) {
      setText(toDisplayValue(value, formatThousands));
    }
  }, [value, formatThousands]);

  const handleChange = (raw: string) => {
    const normalizedRaw = formatThousands ? formatInputThousands(raw) : raw;

    if (normalizedRaw !== "" && !NUMERIC_PATTERN.test(normalizedRaw)) {
      return;
    }

    setText(normalizedRaw);

    if (isPartialNumber(normalizedRaw)) {
      return;
    }

    const num = Number(stripNumberFormatting(normalizedRaw));
    if (Number.isNaN(num)) {
      return;
    }

    onChange(clamp(num, min, max));
  };

  const handleFocus = () => {
    focused.current = true;
  };

  const handleBlur = () => {
    focused.current = false;

    if (isPartialNumber(text) || Number.isNaN(Number(stripNumberFormatting(text)))) {
      setText(toDisplayValue(clamp(value, min, max), formatThousands));
      return;
    }

    const num = clamp(Number(stripNumberFormatting(text)), min, max);
    setText(toDisplayValue(num, formatThousands));
    onChange(num);
  };

  return {
    text,
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur
  };
}
