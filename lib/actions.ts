"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  addCampaign,
  addConfirmedDonation,
  addDonation,
  addAnnouncement,
  addHadith,
  addMobileNotification,
  archiveAnnouncement,
  archiveCampaign,
  confirmDonation,
  deleteDonation,
  deleteAnnouncement,
  deleteHadith,
  getPrayerTime,
  listMobileDevices,
  restoreCampaign,
  restoreAnnouncement,
  updatePrayerTime
} from "./db";
import { clearAdminSession, isValidAdmin, setAdminSession } from "./auth";
import { sendExpoPushNotifications } from "./push";

function toNumber(value: FormDataEntryValue | null) {
  if (!value) return NaN;
  return Number(value.toString());
}

function normalizePrayerTime(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const twelveMatch = trimmed.match(/^(\d{1,2}):(\d{2})\s*([AP]M)$/i);
  if (twelveMatch) {
    const hours = Number(twelveMatch[1]);
    const minutes = twelveMatch[2];
    const meridiem = twelveMatch[3].toUpperCase();
    if (Number.isNaN(hours) || hours < 1 || hours > 12) return null;
    return `${hours}:${minutes} ${meridiem}`;
  }
  const twentyFourMatch = trimmed.match(/^(\d{1,2}):(\d{2})$/);
  if (twentyFourMatch) {
    const hours = Number(twentyFourMatch[1]);
    const minutes = twentyFourMatch[2];
    if (Number.isNaN(hours) || hours < 0 || hours > 23) return null;
    const meridiem = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${displayHours}:${minutes} ${meridiem}`;
  }
  return null;
}

export async function submitDonationAction(formData: FormData) {
  const name = formData.get("name")?.toString().trim();
  const amount = toNumber(formData.get("amount"));
  const bkashNumber = formData.get("bkashNumber")?.toString().trim();
  const transactionId = formData.get("transactionId")?.toString().trim();
  const note = formData.get("note")?.toString().trim();
  const campaignIdValue = toNumber(formData.get("campaignId"));
  const campaignId = Number.isNaN(campaignIdValue) ? null : campaignIdValue;

  if (!name || !bkashNumber || !transactionId || Number.isNaN(amount) || amount <= 0) {
    return;
  }

  await addDonation({ name, amount, bkashNumber, transactionId, note: note || undefined, campaignId });
  revalidatePath("/");
  revalidatePath("/campaigns");
  revalidatePath("/campaigns/[slug]", "page");
}

export async function loginAdminAction(formData: FormData) {
  const username = formData.get("username")?.toString().trim();
  const password = formData.get("password")?.toString().trim();
  const lang = formData.get("lang")?.toString().trim();
  if (!username || !password || !isValidAdmin(username, password)) {
    const langParam = lang === "bn" ? "lang=bn&" : "";
    redirect(`/admin?${langParam}error=1`);
  }
  setAdminSession();
  redirect("/admin/prayer");
}

export async function logoutAdminAction() {
  clearAdminSession();
  redirect("/admin");
}

export async function updatePrayerTimeAction(formData: FormData) {
  const id = toNumber(formData.get("id"));
  const nameBn = formData.get("nameBn")?.toString().trim();
  const azanTime = formData.get("azanTime")?.toString().trim();
  const prayerTime = formData.get("prayerTime")?.toString().trim();
  const lang = formData.get("lang")?.toString().trim();
  const normalizedAzan = azanTime ? normalizePrayerTime(azanTime) : null;
  const normalizedPrayer = prayerTime ? normalizePrayerTime(prayerTime) : null;
  if (!id || !normalizedAzan || !normalizedPrayer) return;
  const before = await getPrayerTime(id);
  await updatePrayerTime(id, nameBn || "", normalizedAzan, normalizedPrayer);
  if (before && (before.azan_time !== normalizedAzan || before.prayer_time !== normalizedPrayer || (nameBn || "") !== (before.name_bn || ""))) {
    const prayerNameBn = nameBn || before.name_bn || before.name;
    await addMobileNotification({
      kind: "prayer-time-change",
      title: `${before.name} prayer time updated`,
      titleBn: `${prayerNameBn} এর সময় আপডেট হয়েছে`,
      body: `Iqamah changed from ${before.prayer_time} to ${normalizedPrayer}.`,
      bodyBn: `ইকামাহ ${before.prayer_time} থেকে ${normalizedPrayer} করা হয়েছে।`,
      dataUrl: "/prayer"
    });
    const devices = await listMobileDevices();
    await sendExpoPushNotifications(
      devices.map((device) => {
        const prayerName = device.lang === "bn" ? prayerNameBn : before.name;
        const previousTime = before.prayer_time;
        const nextTime = normalizedPrayer;
        return {
          to: device.expo_push_token,
          title: device.lang === "bn" ? `${prayerName} এর সময় আপডেট হয়েছে` : `${prayerName} prayer time updated`,
          body:
            device.lang === "bn"
              ? `ইকামাহ ${previousTime} থেকে ${nextTime} করা হয়েছে।`
              : `Iqamah changed from ${previousTime} to ${nextTime}.`,
          data: { url: "/prayer", type: "prayer-time-change", prayerId: id }
        };
      })
    );
  }
  revalidatePath("/admin/prayer");
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/prayer", "page");
  revalidatePath("/display/prayer/[token]", "page");
  const langParam = lang === "bn" ? "lang=bn&" : "";
  redirect(`/admin/prayer?${langParam}saved=1`);
}

export async function addHadithAction(formData: FormData) {
  const text = formData.get("text")?.toString().trim();
  const textBn = formData.get("textBn")?.toString().trim();
  const source = formData.get("source")?.toString().trim();
  const sourceBn = formData.get("sourceBn")?.toString().trim();
  if (!text || !textBn || !source || !sourceBn) return;
  await addHadith(text, textBn, source, sourceBn);
  revalidatePath("/admin/hadiths");
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/hadiths");
}

export async function deleteHadithAction(formData: FormData) {
  const id = toNumber(formData.get("id"));
  if (!id) return;
  await deleteHadith(id);
  revalidatePath("/admin/hadiths");
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/hadiths");
}

export async function confirmDonationAction(formData: FormData) {
  const id = toNumber(formData.get("id"));
  if (!id) return;
  await confirmDonation(id);
  revalidatePath("/admin/donations");
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/campaigns");
  revalidatePath("/campaigns/[slug]", "page");
}

export async function deleteDonationAction(formData: FormData) {
  const id = toNumber(formData.get("id"));
  if (!id) return;
  await deleteDonation(id);
  revalidatePath("/admin/donations");
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/campaigns");
  revalidatePath("/campaigns/[slug]", "page");
}

export async function addAdminDonationAction(formData: FormData) {
  const name = formData.get("name")?.toString().trim();
  const amount = toNumber(formData.get("amount"));
  const bkashNumber = formData.get("bkashNumber")?.toString().trim();
  const transactionId = formData.get("transactionId")?.toString().trim();
  const note = formData.get("note")?.toString().trim();
  const campaignIdValue = toNumber(formData.get("campaignId"));
  const campaignId = Number.isNaN(campaignIdValue) ? null : campaignIdValue;

  if (!name || !bkashNumber || !transactionId || Number.isNaN(amount) || amount <= 0) {
    return;
  }

  await addConfirmedDonation({ name, amount, bkashNumber, transactionId, note: note || undefined, campaignId });
  revalidatePath("/admin/donations");
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/campaigns");
  revalidatePath("/campaigns/[slug]", "page");
}

export async function addCampaignAction(formData: FormData) {
  const title = formData.get("title")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const goalAmountValue = toNumber(formData.get("goalAmount"));
  const goalAmount = Number.isNaN(goalAmountValue) || goalAmountValue <= 0 ? null : goalAmountValue;
  if (!title || !description) return;
  await addCampaign({ title, description, goalAmount });
  revalidatePath("/admin/campaigns");
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/campaigns");
}

export async function archiveCampaignAction(formData: FormData) {
  const id = toNumber(formData.get("id"));
  if (!id) return;
  await archiveCampaign(id);
  revalidatePath("/admin/campaigns");
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/campaigns");
  revalidatePath("/campaigns/[slug]", "page");
}

export async function restoreCampaignAction(formData: FormData) {
  const id = toNumber(formData.get("id"));
  if (!id) return;
  await restoreCampaign(id);
  revalidatePath("/admin/campaigns");
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/campaigns");
  revalidatePath("/campaigns/[slug]", "page");
}

export async function addAnnouncementAction(formData: FormData) {
  const title = formData.get("title")?.toString().trim();
  const titleBn = formData.get("titleBn")?.toString().trim();
  const message = formData.get("message")?.toString().trim();
  const messageBn = formData.get("messageBn")?.toString().trim();
  const startAt = formData.get("startAt")?.toString().trim();
  const endAt = formData.get("endAt")?.toString().trim();
  if (!title || !message || !startAt || !endAt) return;
  const startIso = new Date(startAt).toISOString();
  const endIso = new Date(endAt).toISOString();
  await addAnnouncement({
    title,
    titleBn: titleBn || null,
    message,
    messageBn: messageBn || null,
    startAt: startIso,
    endAt: endIso
  });
  revalidatePath("/admin/announcements");
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/campaigns");
  revalidatePath("/campaigns/[slug]", "page");
}

export async function archiveAnnouncementAction(formData: FormData) {
  const id = toNumber(formData.get("id"));
  if (!id) return;
  await archiveAnnouncement(id);
  revalidatePath("/admin/announcements");
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/campaigns");
  revalidatePath("/campaigns/[slug]", "page");
}

export async function restoreAnnouncementAction(formData: FormData) {
  const id = toNumber(formData.get("id"));
  if (!id) return;
  await restoreAnnouncement(id);
  revalidatePath("/admin/announcements");
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/campaigns");
  revalidatePath("/campaigns/[slug]", "page");
}

export async function deleteAnnouncementAction(formData: FormData) {
  const id = toNumber(formData.get("id"));
  if (!id) return;
  await deleteAnnouncement(id);
  revalidatePath("/admin/announcements");
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/campaigns");
  revalidatePath("/campaigns/[slug]", "page");
}
