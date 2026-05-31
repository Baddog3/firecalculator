export function formatWithSpaces(value: number, decimals = false): string {
  return new Intl.NumberFormat("ru-RU", {
    maximumFractionDigits: decimals ? 10 : 0,
    minimumFractionDigits: 0
  })
    .format(value)
    .replace(/\u00A0/g, " ");
}

export function stripNumberFormatting(raw: string): string {
  return raw.replace(/\s/g, "").replace(",", ".");
}

export function formatInputThousands(raw: string): string {
  const normalized = stripNumberFormatting(raw);

  if (normalized === "" || normalized === "-") {
    return normalized;
  }

  if (normalized.endsWith(".")) {
    const integerPart = normalized.slice(0, -1);
    if (integerPart === "" || integerPart === "-") {
      return normalized;
    }
    const num = Number(integerPart);
    return Number.isNaN(num) ? raw : `${formatWithSpaces(num)}.`;
  }

  const parts = normalized.split(".");
  const integerDigits = parts[0]?.replace(/\D/g, "") ?? "";
  const decimalPart = parts[1];

  if (integerDigits === "") {
    return decimalPart !== undefined ? `.${decimalPart}` : "";
  }

  const integerValue = Number(integerDigits);
  if (Number.isNaN(integerValue)) {
    return raw;
  }

  const formattedInteger = formatWithSpaces(integerValue);

  if (decimalPart !== undefined) {
    return `${formattedInteger}.${decimalPart}`;
  }

  return formattedInteger;
}
