import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { apiFetch } from "./api";
import type { AppLang } from "./language";

const TOKEN_KEY = "push_token_v1";
const CHANNEL_ID = "prayer-reminders";

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

  await apiFetch<{ token: string }>("/api/mobile/push/register", {
    method: "POST",
    body: JSON.stringify({
      token,
      lang,
      platform: Platform.OS
    })
  });

  return token;
}
