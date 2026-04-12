import { deleteMobileDevice } from "./db";

type PushMessage = {
  to: string;
  title: string;
  body: string;
  data?: Record<string, unknown>;
};

type PushTicket = {
  status: "ok" | "error";
  id?: string;
  message?: string;
  details?: {
    error?: string;
  };
};

export async function sendExpoPushNotifications(messages: PushMessage[]) {
  if (!messages.length) return [];

  const response = await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(
      messages.map((message) => ({
        ...message,
        sound: "default"
      }))
    )
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Expo push send failed: ${response.status} ${text}`);
  }

  const json = (await response.json()) as { data?: PushTicket[] };
  const tickets = json.data ?? [];

  await Promise.all(
    tickets.map(async (ticket, index) => {
      if (ticket.status === "error" && ticket.details?.error === "DeviceNotRegistered") {
        await deleteMobileDevice(messages[index].to);
      }
    })
  );

  return tickets;
}
