import { StyleSheet, Text, View } from "react-native";
import { AppShell } from "@/components/AppShell";
import { useApi } from "@/lib/api";
import { colors } from "@/lib/theme";
import type { Announcement } from "@/lib/types";

export default function AnnouncementsScreen() {
  const query = useApi<{ items: Announcement[] }>("/api/mobile/announcements");

  return (
    <AppShell
      title="Announcements"
      subtitle="Current mosque announcements published on the website."
      loading={query.loading}
      refreshing={query.refreshing}
      error={query.error}
      onRefresh={query.reload}
    >
      <View style={styles.list}>
        {query.data?.items.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body}>{item.message}</Text>
          </View>
        ))}
      </View>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  list: { gap: 14 },
  card: {
    backgroundColor: colors.card,
    borderRadius: 26,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8
  },
  title: { color: colors.text, fontSize: 18, fontWeight: "800" },
  body: { color: colors.textMuted, fontSize: 14, lineHeight: 21 }
});
