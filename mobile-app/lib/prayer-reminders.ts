import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { apiFetch } from "./api";
import type { AppLang } from "./language";
import type { PrayerTime } from "./types";

const TOKEN_KEY = "push_token_v1";
const REMINDER_KEY = "push_prayer_reminders_v1";
const CHANNEL_ID = "prayer-reminders";

export type ReminderState = Record<string, boolean>;

function notificationKey(prayerId: number) {
  return `prayer:${prayerId}`;
}

async function ensureChannel() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: "Prayer reminders",
      importance: Notifications.AndroidImportance.HIGH,
      sound: "default"
    });
  }
}

async function ensurePermissions() {
  const current = await Notifications.getPermissionsAsync();
  if (current.granted || current.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL) {
    return true;
  }
  const requested = await Notifications.requestPermissionsAsync();
  return requested.granted || requested.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL;
}

async function saveReminderState(state: ReminderState) {
  await AsyncStorage.setItem(REMINDER_KEY, JSON.stringify(state));
}

function projectIdFromConstants() {
  const easProjectId =
    Constants.easConfig?.projectId ??
    ((Constants.expoConfig?.extra as { eas?: { projectId?: string } } | undefined)?.eas?.projectId ?? undefined);
  return easProjectId;
}

export async function getStoredPushToken() {
  return AsyncStorage.getItem(TOKEN_KEY);
}

export async function registerPushToken(lang: AppLang) {
  const allowed = await ensurePermissions();
  if (!allowed) {
    throw new Error("Notifications permission was not granted");
  }

  await ensureChannel();

  const projectId = projectIdFromConstants();
  const response = await Notifications.getExpoPushTokenAsync(projectId ? { projectId } : undefined);
  const token = response.data;

  await AsyncStorage.setItem(TOKEN_KEY, token);

  const registered = await apiFetch<{ token: string; preferences: Array<{ prayerId: number; enabled: boolean }> }>(
    "/api/mobile/push/register",
    {
      method: "POST",
      body: JSON.stringify({
        token,
        lang,
        platform: Platform.OS
      })
    }
  );

  const state: ReminderState = {};
  for (const item of registered.preferences) {
    state[notificationKey(item.prayerId)] = item.enabled;
  }
  await saveReminderState(state);

  return token;
}

export async function loadReminderState(prayers: PrayerTime[]) {
  const raw = await AsyncStorage.getItem(REMINDER_KEY);
  let parsed: ReminderState = {};
  if (raw) {
    try {
      parsed = JSON.parse(raw) as ReminderState;
    } catch {
      parsed = {};
    }
  }

  const state: ReminderState = {};
  for (const prayer of prayers) {
    state[notificationKey(prayer.id)] = Boolean(parsed[notificationKey(prayer.id)]);
  }
  return state;
}

export async function syncReminderState(prayers: PrayerTime[]) {
  const token = await getStoredPushToken();
  if (!token) return loadReminderState(prayers);

  const response = await apiFetch<{ items: Array<{ prayerId: number; enabled: boolean }> }>(
    `/api/mobile/push/preferences?token=${encodeURIComponent(token)}`
  );

  const state: ReminderState = {};
  for (const prayer of prayers) {
    const match = response.items.find((item) => item.prayerId === prayer.id);
    state[notificationKey(prayer.id)] = Boolean(match?.enabled);
  }
  await saveReminderState(state);
  return state;
}

export async function setPrayerReminderPreference(prayerId: number, enabled: boolean, lang: AppLang) {
  let token = await getStoredPushToken();
  if (!token) {
    token = await registerPushToken(lang);
  }

  await apiFetch("/api/mobile/push/preferences", {
    method: "POST",
    body: JSON.stringify({
      token,
      prayerId,
      enabled,
      lang,
      platform: Platform.OS
    })
  });

  const raw = await AsyncStorage.getItem(REMINDER_KEY);
  let state: ReminderState = {};
  if (raw) {
    try {
      state = JSON.parse(raw) as ReminderState;
    } catch {
      state = {};
    }
  }
  state[notificationKey(prayerId)] = enabled;
  await saveReminderState(state);
}
