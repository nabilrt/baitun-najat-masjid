import { AppShell } from "@/components/AppShell";
import { PrayerCard } from "@/components/PrayerCard";
import { useApi } from "@/lib/api";
import { getNextPrayer } from "@/lib/time";
import type { PrayerTime } from "@/lib/types";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/lib/theme";

export default function PrayerScreen() {
  const query = useApi<{ items: PrayerTime[] }>("/api/mobile/prayer-times");
  const nextPrayer = query.data ? getNextPrayer(query.data.items) : null;

  return (
    <AppShell
      title="Prayer Times"
      subtitle="Live adhan and jama'ah schedule from the website backend."
      loading={query.loading}
      refreshing={query.refreshing}
      error={query.error}
      activeTab="prayer"
      onRefresh={query.reload}
    >
      {nextPrayer ? (
        <View style={styles.nextCard}>
          <Text style={styles.nextLabel}>Next Prayer</Text>
          <Text style={styles.nextName}>{nextPrayer.name}</Text>
          <Text style={styles.nextTime}>{nextPrayer.prayer_time}</Text>
        </View>
      ) : null}

      <View style={styles.wrap}>
        {query.data?.items.map((item) => (
          <PrayerCard key={item.id} item={item} highlighted={item.id === nextPrayer?.id} />
        ))}
      </View>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  nextCard: {
    backgroundColor: "#FFF8E5",
    borderRadius: 28,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ECD28A",
    gap: 6
  },
  nextLabel: { color: "#8B6721", fontSize: 12, fontWeight: "700", letterSpacing: 1.8, textTransform: "uppercase" },
  nextName: { color: colors.text, fontSize: 26, fontWeight: "800" },
  nextTime: { color: "#8B6721", fontSize: 18, fontWeight: "700" },
  wrap: { gap: 12 }
});
