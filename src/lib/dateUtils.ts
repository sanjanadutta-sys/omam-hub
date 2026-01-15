import { parse, isWithinInterval, isValid, startOfDay, endOfDay } from "date-fns";

// Helper to parse various date formats used in the app
export const parseDate = (dateString: string): Date | null => {
  if (!dateString) return null;

  // Try parsing "13th Jan 2026 at 08:32 AM CDT" format
  const textMatch = dateString.match(/(\d+)(?:st|nd|rd|th)\s+(\w+)\s+(\d{4})/);
  if (textMatch) {
    const [, day, month, year] = textMatch;
    const parsed = parse(`${day} ${month} ${year}`, "d MMM yyyy", new Date());
    if (isValid(parsed)) return parsed;
  }

  // Try parsing "08/01/2026 08:47:23" format (DD/MM/YYYY)
  const slashMatch = dateString.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  if (slashMatch) {
    const [, day, month, year] = slashMatch;
    const parsed = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    if (isValid(parsed)) return parsed;
  }

  // Try parsing "18/09/2025 14:09:43" format (DD/MM/YYYY)
  const euroMatch = dateString.match(/(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2}):(\d{2})/);
  if (euroMatch) {
    const [, day, month, year, hour, min, sec] = euroMatch;
    const parsed = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(min), parseInt(sec));
    if (isValid(parsed)) return parsed;
  }

  return null;
};

export const isDateInRange = (
  dateString: string,
  startDate: string,
  endDate: string
): boolean => {
  if (!startDate && !endDate) return true;

  const itemDate = parseDate(dateString);
  if (!itemDate) return true; // If we can't parse, include it

  const start = startDate ? startOfDay(new Date(startDate)) : null;
  const end = endDate ? endOfDay(new Date(endDate)) : null;

  if (start && end) {
    return isWithinInterval(itemDate, { start, end });
  }
  
  if (start) {
    return itemDate >= start;
  }
  
  if (end) {
    return itemDate <= end;
  }

  return true;
};
