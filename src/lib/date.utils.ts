export interface ShortDateParts {
  day: string;
  month: string;
}

export function formatShortDate(value?: string, locale = "vi-VN"): ShortDateParts {
  if (!value) return { day: "--", month: "---" };

  const date = new Date(value);
  return {
    day: new Intl.DateTimeFormat(locale, { day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat(locale, { month: "short" })
      .format(date)
      .replace("thg", "THG")
      .toUpperCase(),
  };
}
