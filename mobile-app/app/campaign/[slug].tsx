import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppShell } from "@/components/AppShell";
import { useApi } from "@/lib/api";
import { colors } from "@/lib/theme";
import type { Campaign } from "@/lib/types";

export default function CampaignDetailScreen() {
  const params = useLocalSearchParams<{ slug: string }>();
  const query = useApi<{ item: Campaign }>(`/api/mobile/campaigns/${params.slug}`);

  const campaign = query.data?.item;
  const percent = campaign?.goal_amount ? Math.min(100, Math.round((campaign.total_confirmed / campaign.goal_amount) * 100)) : 0;

  return (
    <AppShell
      title={campaign?.title || "Campaign"}
      subtitle="Campaign detail and donor context from the website backend."
      loading={query.loading}
      refreshing={query.refreshing}
      error={query.error}
      onRefresh={query.reload}
    >
      {campaign ? (
        <>
          <View style={styles.heroCard}>
            <Text style={styles.kicker}>Fundraising Campaign</Text>
            <Text style={styles.heroAmount}>BDT {campaign.total_confirmed}</Text>
            <Text style={styles.heroSub}>Raised so far{campaign.goal_amount ? ` of BDT ${campaign.goal_amount}` : ""}</Text>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${percent}%` }]} />
            </View>
            <View style={styles.statsRow}>
              <View style={styles.statPill}>
                <Text style={styles.statLabel}>Progress</Text>
                <Text style={styles.statValue}>{percent}%</Text>
              </View>
              <View style={styles.statPill}>
                <Text style={styles.statLabel}>Status</Text>
                <Text style={styles.statValue}>{campaign.is_active ? "Active" : "Closed"}</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>About This Campaign</Text>
            <Text style={styles.body}>{campaign.description}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>How to Support</Text>
            <Text style={styles.infoBody}>
              Submit your donation from the Donate tab with your bKash number and transaction ID so the mosque can confirm it against this campaign.
            </Text>
            <Pressable style={styles.button} onPress={() => router.push("/donate")}>
              <Text style={styles.buttonText}>Go To Donate</Text>
            </Pressable>
          </View>
        </>
      ) : null}
    </AppShell>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    backgroundColor: "#FFF7E0",
    borderRadius: 30,
    padding: 22,
    borderWidth: 1,
    borderColor: "#EFD48A",
    gap: 10
  },
  kicker: { color: "#8B6721", fontSize: 12, fontWeight: "700", letterSpacing: 1.8, textTransform: "uppercase" },
  heroAmount: { color: colors.ink, fontSize: 34, fontWeight: "900" },
  heroSub: { color: "#715D30", fontSize: 14, lineHeight: 20 },
  statsRow: { flexDirection: "row", gap: 12, marginTop: 4 },
  statPill: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.72)",
    borderRadius: 18,
    padding: 14,
    gap: 4
  },
  statLabel: { color: colors.textMuted, fontSize: 12, fontWeight: "700" },
  statValue: { color: colors.text, fontSize: 18, fontWeight: "800" },
  card: {
    backgroundColor: colors.card,
    borderRadius: 28,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 14
  },
  sectionTitle: { color: colors.text, fontSize: 19, fontWeight: "800" },
  body: { color: colors.textMuted, fontSize: 15, lineHeight: 23 },
  progressTrack: { height: 10, borderRadius: 999, backgroundColor: "#E7EEF9", overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: colors.gold },
  infoCard: {
    backgroundColor: colors.navy,
    borderRadius: 28,
    padding: 20,
    gap: 12
  },
  infoTitle: { color: "white", fontSize: 19, fontWeight: "800" },
  infoBody: { color: "#D6DFF0", fontSize: 14, lineHeight: 21 },
  button: {
    backgroundColor: colors.gold,
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 4
  },
  buttonText: { color: colors.ink, fontSize: 15, fontWeight: "800" }
});
