import { Stack } from "expo-router";
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

  useEffect(() => {
    registerPushToken(lang).catch(() => {});
  }, [lang]);

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
