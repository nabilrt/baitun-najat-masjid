import type { PrayerTime } from "./types";

function minutesFromTime(value: string) {
  const match = value.trim().match(/^(\d{1,2}):(\d{2})\s*([AP]M)$/i);
  if (!match) return 0;
  let hours = Number(match[1]) % 12;
  const minutes = Number(match[2]);
  if (match[3].toUpperCase() === "PM") {
    hours += 12;
  }
  return hours * 60 + minutes;
}

export function getNextPrayer(times: PrayerTime[]) {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const next = times.find((item) => minutesFromTime(item.prayer_time) >= currentMinutes) ?? times[0];
  return next;
}
