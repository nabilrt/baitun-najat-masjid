import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { apiFetch } from "./api";
import type { MobileNotification, NotificationsResponse } from "./types";

const READ_KEY = "notification_read_ids_v1";

type NotificationsContextValue = {
  items: MobileNotification[];
  unreadCount: number;
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  isRead: (id: number) => boolean;
  markAsRead: (id: number) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  reload: () => Promise<void>;
};

const NotificationsContext = createContext<NotificationsContextValue | null>(null);

function uniqueIds(ids: number[]) {
  return Array.from(new Set(ids)).sort((a, b) => b - a);
}

export function NotificationsProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<MobileNotification[]>([]);
  const [readIds, setReadIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(READ_KEY)
      .then((value) => {
        if (!value) return;
        const parsed = JSON.parse(value) as unknown;
        if (Array.isArray(parsed)) {
          setReadIds(parsed.map((item) => Number(item)).filter((item) => Number.isInteger(item)));
        }
      })
      .catch(() => {});
  }, []);

  async function persistReadIds(next: number[]) {
    setReadIds(next);
    await AsyncStorage.setItem(READ_KEY, JSON.stringify(next));
  }

  async function load(isRefresh = false) {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);
      const response = await apiFetch<NotificationsResponse>("/api/mobile/notifications");
      setItems(response.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    load().catch(() => {});
  }, []);

  const value = useMemo<NotificationsContextValue>(
    () => ({
      items,
      unreadCount: items.filter((item) => !readIds.includes(item.id)).length,
      loading,
      refreshing,
      error,
      isRead: (id: number) => readIds.includes(id),
      markAsRead: async (id: number) => {
        if (readIds.includes(id)) return;
        await persistReadIds(uniqueIds([...readIds, id]));
      },
      markAllAsRead: async () => {
        await persistReadIds(uniqueIds(items.map((item) => item.id)));
      },
      reload: async () => {
        await load(true);
      }
    }),
    [error, items, loading, readIds, refreshing]
  );

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
}

export function useNotifications() {
  const value = useContext(NotificationsContext);
  if (!value) throw new Error("useNotifications must be used within NotificationsProvider");
  return value;
}
