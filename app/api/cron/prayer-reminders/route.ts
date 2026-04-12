import { apiError, apiOk } from "../../../../lib/mobile-api";
import {
  listPrayerTimes,
  listReminderRecipientsForPrayer,
  markPrayerReminderSent,
  wasPrayerReminderSent
} from "../../../../lib/db";
import { sendExpoPushNotifications } from "../../../../lib/push";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getDhakaNow() {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
  const parts = Object.fromEntries(formatter.formatToParts(new Date()).map((part) => [part.type, part.value]));
  return {
    dateKey: `${parts.year}-${parts.month}-${parts.day}`,
    hour: Number(parts.hour),
    minute: Number(parts.minute)
  };
}

function getReminderSlot(time: string) {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*([AP]M)$/i);
  if (!match) return null;
  let hour = Number(match[1]) % 12;
  if (match[3].toUpperCase() === "PM") hour += 12;
  let minute = Number(match[2]) - 5;
  if (minute < 0) {
    minute += 60;
    hour = (hour + 23) % 24;
  }
  return { hour, minute };
}

export async function GET(request: Request) {
  const expected = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");
  if (expected && auth !== `Bearer ${expected}`) {
    return apiError("Unauthorized", 401);
  }

  const now = getDhakaNow();
  const prayerTimes = await listPrayerTimes();
  let sent = 0;

  for (const prayer of prayerTimes) {
    const slot = getReminderSlot(prayer.prayer_time);
    if (!slot || slot.hour !== now.hour || slot.minute !== now.minute) continue;

    const recipients = await listReminderRecipientsForPrayer(prayer.id);
    const pending = [];
    for (const device of recipients) {
      const alreadySent = await wasPrayerReminderSent(device.expo_push_token, prayer.id, now.dateKey);
      if (alreadySent) continue;

      const prayerName = device.lang === "bn" ? prayer.name_bn || prayer.name : prayer.name;
      pending.push({
        to: device.expo_push_token,
        title: device.lang === "bn" ? `${prayerName} এর ইকামাহ ৫ মিনিট পর` : `${prayerName} iqamah in 5 minutes`,
        body:
          device.lang === "bn"
            ? `ইকামাহের সময় ${prayer.prayer_time}। প্রস্তুত হোন।`
            : `Iqamah is at ${prayer.prayer_time}. Prepare for prayer.`,
        data: { url: "/prayer", type: "prayer-reminder", prayerId: prayer.id }
      });
    }

    if (!pending.length) continue;

    await sendExpoPushNotifications(pending);
    for (const message of pending) {
      await markPrayerReminderSent(message.to, prayer.id, now.dateKey);
      sent += 1;
    }
  }

  return apiOk({ ok: true, sent, time: now });
}
