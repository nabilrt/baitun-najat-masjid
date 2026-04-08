import { useEffect, useState } from "react";

const API_BASE_URL = (
  process.env.EXPO_PUBLIC_API_BASE_URL || "https://baitun-najat-masjid.vercel.app"
).replace(/\/$/, "");

export function getApiUrl(path: string) {
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(getApiUrl(path), {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {})
    },
    ...init
  });
  const json = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = typeof json?.error === "string" ? json.error : "Request failed";
    throw new Error(message);
  }
  return json as T;
}

export function useApi<T>(path: string) {
  const [data, setData] = useState<T | null>(null);
  const [pending, setPending] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load(isRefresh = false) {
    try {
      if (isRefresh && data) {
        setRefreshing(true);
      } else {
        setPending(true);
      }
      setError(null);
      const next = await apiFetch<T>(path);
      setData(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load");
    } finally {
      setPending(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    load();
  }, [path]);

  return {
    data,
    loading: pending && !data,
    refreshing,
    error,
    reload: () => load(true)
  };
}
