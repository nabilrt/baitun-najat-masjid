import { Stack, useRouter } from "expo-router";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { registerPushToken } from "@/lib/prayer-reminders";
import { colors } from "@/lib/theme";
import { LanguageProvider, useLanguage } from "@/lib/language";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
});

function PushBootstrap() {
  const { lang } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    registerPushToken(lang).catch(() => {});
  }, [lang]);

  useEffect(() => {
    const navigateFromResponse = (response: Notifications.NotificationResponse | null) => {
      const url = response?.notification.request.content.data?.url;
      if (url === "/prayer") {
        router.push("/prayer");
      }
    };

    Notifications.getLastNotificationResponseAsync()
      .then((response) => {
        navigateFromResponse(response);
      })
      .catch(() => {});

    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      navigateFromResponse(response);
    });

    return () => {
      subscription.remove();
    };
  }, [router]);

  return null;
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <PushBootstrap />
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "none",
            contentStyle: { backgroundColor: colors.ink }
          }}
        >
          <Stack.Screen name="(tabs)" />
        </Stack>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}
