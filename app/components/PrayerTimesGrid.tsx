"use client";

import { useEffect, useMemo, useState } from "react";
import IqamahCountdown from "./IqamahCountdown";

type PrayerTime = {
  id: number;
  name: string;
  name_bn?: string | null;
  azan_time: string;
  prayer_time: string;
};

type Copy = {
  prayerDisplay: {
    adhan: string;
    iqamah: string;
    timeLeft: string;
    next: string;
    friday: string;
    fridayOnly: string;
  };
};

function parseTimeToMinutes(value: string) {
  const match = value.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let hour = Number(match[1]);
  const minute = Number(match[2]);
  const meridiem = match[3].toUpperCase();
  if (meridiem === "PM" && hour < 12) hour += 12;
  if (meridiem === "AM" && hour === 12) hour = 0;
  return hour * 60 + minute;
}

function getNowInTimeZone(timeZone: string) {
  return new Date(new Date().toLocaleString("en-US", { timeZone }));
}

function isJumuahName(value: string, valueBn?: string | null) {
  const combined = `${value} ${valueBn ?? ""}`;
  return /jumu|jummah|jumu'ah|jumua/i.test(combined) || /জুম/.test(combined);
}

export default function PrayerTimesGrid({
  times,
  copy,
  timeZone = "Asia/Dhaka"
}: {
  times: PrayerTime[];
  copy: Copy;
  timeZone?: string;
}) {
  const entries = useMemo(
    () =>
      times
        .map((time) => ({ id: time.id, minutes: parseTimeToMinutes(time.prayer_time) }))
        .filter((entry) => entry.minutes !== null),
    [times]
  );
  const [nextId, setNextId] = useState<number | null>(null);
  const [isFriday, setIsFriday] = useState(false);

  useEffect(() => {
    const computeNext = () => {
      if (!entries.length) {
        setNextId(null);
        return;
      }

      const now = getNowInTimeZone(timeZone);
      const nowMinutes = now.getHours() * 60 + now.getMinutes();
      const friday = now.getDay() === 5;
      setIsFriday(friday);
      let nextEntry: { id: number; minutes: number; diff: number } | null = null;

      for (const entry of entries) {
        const time = times.find((item) => item.id === entry.id);
        if (time && isJumuahName(time.name, time.name_bn) && !friday) {
          continue;
        }
        const minutes = entry.minutes as number;
        const diff = minutes - nowMinutes;
        if (diff >= 0 && (!nextEntry || diff < nextEntry.diff)) {
          nextEntry = { id: entry.id, minutes, diff };
        }
      }

      if (!nextEntry) {
        const nextEntries = entries.filter((entry) => {
          const time = times.find((item) => item.id === entry.id);
          if (!time) return false;
          return !isJumuahName(time.name, time.name_bn) || friday;
        });
        if (nextEntries.length) {
          const earliest = nextEntries.reduce((current, entry) => {
            if (current.minutes === null) return entry;
            return (entry.minutes as number) < (current.minutes as number) ? entry : current;
          }, nextEntries[0]);
          nextEntry = { id: earliest.id, minutes: earliest.minutes as number, diff: 0 };
        }
      }

      setNextId(nextEntry ? nextEntry.id : null);
    };

    computeNext();
    const interval = window.setInterval(computeNext, 30000);
    return () => window.clearInterval(interval);
  }, [entries, timeZone, times]);

  return (
    <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {times.map((time) => {
        const isNext = time.id === nextId;
        const isJumuah = isJumuahName(time.name, time.name_bn);
        return (
          <div
            key={time.id}
            className={`rounded-[26px] p-5 shadow-soft sm:p-6 ${
              isNext ? "bg-[#1a3a2c] ring-2 ring-gold-300" : "bg-[#143025]"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-300">{time.name}</div>
                <div className="mt-2 text-2xl font-semibold">{time.name_bn ?? ""}</div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="rounded-full bg-[#1e3c2e] px-3 py-1 text-xs text-[#c7d8c9]">{copy.prayerDisplay.iqamah}</div>
                {isNext ? (
                  <div className="rounded-full bg-gold-300 px-3 py-1 text-xs font-semibold text-[#1a2a21]">
                    {copy.prayerDisplay.next}
                  </div>
                ) : null}
                {isJumuah ? (
                  <div className="rounded-full border border-gold-300/60 px-3 py-1 text-xs font-semibold text-gold-200">
                    {isFriday ? copy.prayerDisplay.friday : copy.prayerDisplay.fridayOnly}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between rounded-2xl bg-[#10281e] px-4 py-3">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-[#9ebaa4]">{copy.prayerDisplay.adhan}</div>
                <div className="mt-1 text-lg font-semibold text-[#f5f7f2]">{time.azan_time}</div>
              </div>
              <div className="h-10 w-px bg-[#2f4f3c]" />
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-[#9ebaa4]">{copy.prayerDisplay.iqamah}</div>
                <div className="mt-1 text-lg font-semibold text-[#f5f7f2]">{time.prayer_time}</div>
              </div>
            </div>
            <IqamahCountdown
              timeLabel={copy.prayerDisplay.timeLeft}
              timeValue={time.prayer_time}
              weekday={isJumuah ? 5 : undefined}
            />
          </div>
        );
      })}
    </section>
  );
}
