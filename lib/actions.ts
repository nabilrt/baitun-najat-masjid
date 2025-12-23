"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  addCampaign,
  addConfirmedDonation,
  addDonation,
  addAnnouncement,
  addHadith,
  archiveAnnouncement,
  archiveCampaign,
  confirmDonation,
  deleteDonation,
  deleteAnnouncement,
  deleteHadith,
  restoreCampaign,
  restoreAnnouncement,
  updatePrayerTime
} from "./db";
import { clearAdminSession, isValidAdmin, setAdminSession } from "./auth";

function toNumber(value: FormDataEntryValue | null) {
  if (!value) return NaN;
  return Number(value.toString());
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
  if (!id || !azanTime || !prayerTime) return;
  await updatePrayerTime(id, nameBn || "", azanTime, prayerTime);
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
  const source = formData.get("source")?.toString().trim();
  if (!text || !source) return;
  await addHadith(text, source);
  revalidatePath("/admin/hadiths");
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function deleteHadithAction(formData: FormData) {
  const id = toNumber(formData.get("id"));
  if (!id) return;
  await deleteHadith(id);
  revalidatePath("/admin/hadiths");
  revalidatePath("/admin");
  revalidatePath("/");
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
