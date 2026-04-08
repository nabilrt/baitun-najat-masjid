import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppShell } from "@/components/AppShell";
import { useApi } from "@/lib/api";
import { colors } from "@/lib/theme";
import type { Campaign } from "@/lib/types";

export default function CampaignsScreen() {
  const query = useApi<{ items: Campaign[] }>("/api/mobile/campaigns");

  return (
    <AppShell
      title="Campaigns"
      subtitle="All fundraising campaigns shown here are sourced from the website."
      loading={query.loading}
      refreshing={query.refreshing}
      error={query.error}
      onRefresh={query.reload}
    >
      <View style={styles.list}>
        {query.data?.items.map((campaign) => {
          const percent = campaign.goal_amount
            ? Math.min(100, Math.round((campaign.total_confirmed / campaign.goal_amount) * 100))
            : 0;
          return (
            <Pressable
              key={campaign.id}
              style={styles.card}
              onPress={() => router.push(`/campaign/${campaign.slug}`)}
            >
              <Text style={styles.title}>{campaign.title}</Text>
              <Text style={styles.description}>{campaign.description}</Text>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${percent}%` }]} />
              </View>
              <Text style={styles.meta}>
                BDT {campaign.total_confirmed}
                {campaign.goal_amount ? ` / ${campaign.goal_amount}` : ""} collected
              </Text>
            </Pressable>
          );
        })}
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
    gap: 10
  },
  title: { color: colors.text, fontSize: 18, fontWeight: "800" },
  description: { color: colors.textMuted, fontSize: 14, lineHeight: 21 },
  progressTrack: { height: 9, borderRadius: 999, backgroundColor: "#E7EEF9", overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 999, backgroundColor: colors.gold },
  meta: { color: "#7E6122", fontSize: 13, fontWeight: "700" }
});
