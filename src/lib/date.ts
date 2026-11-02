import { format } from "date-fns";
import { TZDate } from "@date-fns/tz";
import type { InvitationEvent } from "@/types/invitation";

/** Convert an ISO timestamp into a Date that calculates in the event's zone. */
export function toZonedDate(isoDate: string, timeZone: string) {
  return new TZDate(isoDate, timeZone);
}

export function formatEventDate(isoDate: string, timeZone: string) {
  return format(toZonedDate(isoDate, timeZone), "EEEE, MMMM d, yyyy");
}

export function formatEventDateCompact(isoDate: string, timeZone: string) {
  return format(toZonedDate(isoDate, timeZone), "MMMM d, yyyy");
}

export function formatEventDateNumeric(isoDate: string, timeZone: string) {
  return format(toZonedDate(isoDate, timeZone), "dd · MM · yyyy");
}

export function formatEventMonth(isoDate: string, timeZone: string) {
  return format(toZonedDate(isoDate, timeZone), "MMMM");
}

export function formatEventDay(isoDate: string, timeZone: string) {
  return format(toZonedDate(isoDate, timeZone), "d");
}

export function formatEventYear(isoDate: string, timeZone: string) {
  return format(toZonedDate(isoDate, timeZone), "yyyy");
}

export function formatEventTime(isoDate: string, timeZone: string) {
  return format(toZonedDate(isoDate, timeZone), "h:mm a");
}

export function formatDeadline(isoDate: string, timeZone: string) {
  return format(toZonedDate(isoDate, timeZone), "MMMM d, yyyy");
}

export interface CountdownValue {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  isPast: boolean;
}

/** Timezone-independent countdown to an absolute instant. */
export function getCountdown(targetIso: string, now: Date = new Date()): CountdownValue {
  const totalSeconds = Math.max(
    0,
    Math.floor((new Date(targetIso).getTime() - now.getTime()) / 1000),
  );

  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
    totalSeconds,
    isPast: totalSeconds === 0,
  };
}

function toUtcCalendarStamp(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/** Google Calendar's "add event" template link. */
export function buildGoogleCalendarUrl(event: InvitationEvent) {
  const start = new Date(event.startsAt);
  const end = event.endsAt
    ? new Date(event.endsAt)
    : new Date(start.getTime() + 2 * 60 * 60 * 1000);
  const location = [event.church.name, ...event.church.addressLines].join(", ");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.calendarTitle,
    dates: `${toUtcCalendarStamp(start)}/${toUtcCalendarStamp(end)}`,
    details: event.calendarDescription,
    location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Keep RSVP actions disabled until a real Google Form URL is supplied. */
export function isRsvpConfigured(url: string) {
  return (
    /^https:\/\//i.test(url) &&
    !/REPLACE|PLACEHOLDER|YOUR-FORM-ID/i.test(url)
  );
}
