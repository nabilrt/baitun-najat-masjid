"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  timeLabel: string;
  timeValue: string;
  timeZone?: string;
};

function parseTime(value: string) {
  const match = value.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let hour = Number(match[1]);
  const minute = Number(match[2]);
  const meridiem = match[3].toUpperCase();
  if (meridiem === "PM" && hour < 12) hour += 12;
  if (meridiem === "AM" && hour === 12) hour = 0;
  return { hour, minute };
}

function getNowInTimeZone(timeZone: string) {
  return new Date(new Date().toLocaleString("en-US", { timeZone }));
}

export default function IqamahCountdown({ timeLabel, timeValue, timeZone = "Asia/Dhaka" }: Props) {
  const parsed = useMemo(() => parseTime(timeValue), [timeValue]);
  const [display, setDisplay] = useState("--");

  useEffect(() => {
    if (!parsed) {
      setDisplay("--");
      return;
    }

    const update = () => {
      const now = getNowInTimeZone(timeZone);
      const target = new Date(now);
      target.setHours(parsed.hour, parsed.minute, 0, 0);
      if (target.getTime() < now.getTime()) {
        target.setDate(target.getDate() + 1);
      }
      const diffMs = target.getTime() - now.getTime();
      const totalMinutes = Math.max(0, Math.floor(diffMs / 60000));
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      if (totalMinutes === 0) {
        setDisplay("Now");
        return;
      }
      if (hours > 0) {
        setDisplay(`${hours}h ${minutes}m`);
      } else {
        setDisplay(`${minutes}m`);
      }
    };

    update();
    const interval = window.setInterval(update, 30000);
    return () => window.clearInterval(interval);
  }, [parsed, timeZone]);

  return (
    <div className="mt-4 flex items-center justify-between rounded-2xl border border-[#1e3c2e] bg-[#112c21] px-4 py-2 text-xs text-[#c7d8c9]">
      <span>{timeLabel}</span>
      <span className="font-semibold text-gold-300">{display}</span>
    </div>
  );
}
