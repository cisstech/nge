export function epoch(): Date {
  return new Date('01/01/1970')
}

export function addDays(date: Date, days: number) {
  date = new Date(date.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}


/** Gets current value of unix timestamp */
export function timestamp(): number {
  return new Date().getTime() / 1000;
}

/**
 * Gets unix timestamp value of `date`
 * @param date the date.
 */
export function toTimestamp(date: Date): number {
  return date.getTime() / 1000;
}

/**
 * Converts an unix timestamp to a Date object
 * @param time an unix timestamp
 */
export function dateFromTimestamp(time: number): Date {
  return new Date(time * 1000);
}


/**
 * Converts an unix timestamp to a date in the format 'day month hours mins'
 * @param time an unix timestamp.
 * @param locale target language locale tag.
 * @returns string representation of the date.
 */
export function fullDate(time: number, locale?: string): string {
  const format: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };
  return convertDate(time, format, locale);
}

/**
 * Converts an unix timestamp to a date in the format 'day month'
 * @param time an unix timestamp.
 * @param locale target language locale tag.
 * @returns string representation of the date.
 */
export function shortDate(time: number, locale?: string): string {
  return convertDate(time, { month: 'short', day: 'numeric' }, locale);
}

/**
 * Converts an unix timestamp to a date in the format 'hours mins'
 * @param time an unix timestamp.
 * @returns string representation of the date.
 */
export function hours(time: number): string {
  const date = dateFromTimestamp(time);
  const minutes = date.getMinutes();
  const minutesFormat = minutes >= 10 ? minutes : `0${minutes}`;
  return `${date.getHours()}:${minutesFormat}`;
}

/**
 * Gets a value indicating whether the timestamp is today.
 * @param time an unix timestamp.
 */
export function isToday(time: number) {
  return (
    new Date().toLocaleDateString() ===
    dateFromTimestamp(time).toLocaleDateString()
  );
}

/**
 * Gets a value indicating whether the given dates representes the same year, month and day.
 * @param d1 the first date.
 * @param d2 the second date.
 */
export function compareDays(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export function convertDate(
  time: number,
  format: Intl.DateTimeFormatOptions,
  locale?: string
): string {
  const date = dateFromTimestamp(time);
  return date.toLocaleDateString(locale, format);
}

export function weeksDiff(d1: Date, d2: Date) {
  let diff = (d2.getTime() - d1.getTime()) / 1000;
  diff /= 60 * 60 * 24 * 7;
  return Math.abs(Math.round(diff));
}

export function dateRangeOverlaps(a_start: Date, a_end: Date, b_start: Date, b_end: Date): boolean {
  if (a_start < b_start && b_start < a_end) return true; // b starts in a
  if (a_start < b_end && b_end < a_end) return true; // b ends in a
  if (b_start < a_start && a_end < b_end) return true; // a in b
  return false;
}
