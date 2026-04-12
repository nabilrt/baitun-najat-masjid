import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppShell } from "@/components/AppShell";
import { useApi } from "@/lib/api";
import { useLanguage } from "@/lib/language";
import { colors } from "@/lib/theme";
import type { Campaign } from "@/lib/types";

export default function CampaignsScreen() {
  const { t } = useLanguage();
  const query = useApi<{ items: Campaign[] }>("/api/mobile/campaigns");

  return (
    <AppShell
      title={t.campaigns}
      subtitle={t.campaignIntro}
      loading={query.loading}
      refreshing={query.refreshing}
      error={query.error}
      onRefresh={query.reload}
    >
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>{t.supportCommunity}</Text>
        <Text style={styles.heroText}>{t.campaignIntro}</Text>
      </View>

      <View style={styles.list}>
        {query.data?.items.map((campaign, index) => {
          const percent = campaign.goal_amount
            ? Math.min(100, Math.round((campaign.total_confirmed / campaign.goal_amount) * 100))
            : 0;
          return (
            <Pressable
              key={campaign.id}
              style={[styles.card, index === 0 && styles.cardFeatured]}
              onPress={() => router.push(`/campaign/${campaign.slug}`)}
            >
              <View style={styles.cardHeader}>
                <Text style={[styles.cardTitle, index === 0 && styles.cardTitleFeatured]}>{campaign.title}</Text>
                <Text style={[styles.badge, index === 0 && styles.badgeFeatured]}>{percent}%</Text>
              </View>
              <Text style={[styles.cardText, index === 0 && styles.cardTextFeatured]}>{campaign.description}</Text>
              <View style={[styles.progressTrack, index === 0 && styles.progressTrackFeatured]}>
                <View style={[styles.progressFill, { width: `${percent}%` }]} />
              </View>
              <View style={styles.metaRow}>
                <Text style={[styles.meta, index === 0 && styles.cardTextFeatured]}>
                  BDT {campaign.total_confirmed} {t.raised.toLowerCase()}
                </Text>
                {campaign.goal_amount ? (
                  <Text style={[styles.meta, index === 0 && styles.cardTextFeatured]}>{t.goal} {campaign.goal_amount}</Text>
                ) : null}
              </View>
            </Pressable>
          );
        })}
      </View>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: "#ECEEF1",
    borderRadius: 32,
    padding: 24,
    gap: 10
  },
  heroTitle: { color: colors.navy, fontSize: 34, lineHeight: 40, fontWeight: "700" },
  heroText: { color: "#5F687A", fontSize: 15, lineHeight: 23 },
  list: { gap: 16 },
  card: {
    backgroundColor: "#F2F4F7",
    borderRadius: 28,
    padding: 20,
    gap: 12
  },
  cardFeatured: {
    backgroundColor: "#1A3A5F"
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: 12 },
  cardTitle: { color: colors.navy, fontSize: 26, lineHeight: 32, fontWeight: "700", flex: 1 },
  cardTitleFeatured: { color: "white" },
  badge: {
    backgroundColor: "#C7E7FF",
    color: colors.navy,
    fontSize: 12,
    fontWeight: "800",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    overflow: "hidden"
  },
  badgeFeatured: {
    backgroundColor: "rgba(199,231,255,0.16)",
    color: "#C7E7FF"
  },
  cardText: { color: "#5F687A", fontSize: 14, lineHeight: 21 },
  cardTextFeatured: { color: "rgba(255,255,255,0.78)" },
  progressTrack: { height: 10, borderRadius: 999, backgroundColor: "#D8DADD", overflow: "hidden" },
  progressTrackFeatured: { backgroundColor: "rgba(255,255,255,0.14)" },
  progressFill: { height: "100%", backgroundColor: colors.navy, borderRadius: 999 },
  metaRow: { flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", gap: 8 },
  meta: { color: colors.navy, fontSize: 13, fontWeight: "700" }
});
