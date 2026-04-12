import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppShell } from "@/components/AppShell";
import { useApi } from "@/lib/api";
import { useLanguage } from "@/lib/language";
import { colors } from "@/lib/theme";
import type { Campaign } from "@/lib/types";

export default function CampaignDetailScreen() {
  const { t } = useLanguage();
  const params = useLocalSearchParams<{ slug: string }>();
  const query = useApi<{ item: Campaign }>(`/api/mobile/campaigns/${params.slug}`);

  const campaign = query.data?.item;
  const percent = campaign?.goal_amount ? Math.min(100, Math.round((campaign.total_confirmed / campaign.goal_amount) * 100)) : 0;

  return (
    <AppShell
      title={campaign?.title || t.campaigns}
      subtitle={t.campaignIntro}
      loading={query.loading}
      refreshing={query.refreshing}
      error={query.error}
      onRefresh={query.reload}
    >
      {campaign ? (
        <>
          <View style={styles.hero}>
            <Text style={styles.heroLabel}>{t.fundraisingCampaign}</Text>
            <Text style={styles.heroAmount}>BDT {campaign.total_confirmed}</Text>
            <Text style={styles.heroSub}>
              {t.raisedSoFar}{campaign.goal_amount ? ` / BDT ${campaign.goal_amount}` : ""}
            </Text>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${percent}%` }]} />
            </View>
            <View style={styles.metrics}>
              <View style={styles.metricCard}>
                <Text style={styles.metricLabel}>{t.progress}</Text>
                <Text style={styles.metricValue}>{percent}%</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricLabel}>{t.status}</Text>
                <Text style={styles.metricValue}>{campaign.is_active ? t.active : t.closed}</Text>
              </View>
            </View>
          </View>

          <View style={styles.copyCard}>
            <Text style={styles.sectionTitle}>{t.aboutCampaign}</Text>
            <Text style={styles.body}>{campaign.description}</Text>
          </View>

          <View style={styles.supportCard}>
            <Text style={styles.supportTitle}>{t.howToSupport}</Text>
            <Text style={styles.supportText}>{t.howToSupportText}</Text>
            <Pressable style={styles.cta} onPress={() => router.push("/donate")}>
              <Text style={styles.ctaText}>{t.goToDonate}</Text>
            </Pressable>
          </View>
        </>
      ) : null}
    </AppShell>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: "#1A3A5F",
    borderRadius: 32,
    padding: 24,
    gap: 12
  },
  heroLabel: { color: "#9FCCED", fontSize: 11, fontWeight: "700", letterSpacing: 1.8, textTransform: "uppercase" },
  heroAmount: { color: "white", fontSize: 42, fontWeight: "700" },
  heroSub: { color: "rgba(255,255,255,0.78)", fontSize: 15, lineHeight: 22 },
  progressTrack: { height: 10, borderRadius: 999, backgroundColor: "rgba(255,255,255,0.14)", overflow: "hidden", marginTop: 4 },
  progressFill: { height: "100%", backgroundColor: "#C7E7FF", borderRadius: 999 },
  metrics: { flexDirection: "row", gap: 12, marginTop: 6 },
  metricCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.10)",
    borderRadius: 20,
    padding: 16,
    gap: 4
  },
  metricLabel: { color: "rgba(255,255,255,0.66)", fontSize: 12, fontWeight: "700" },
  metricValue: { color: "white", fontSize: 20, fontWeight: "700" },
  copyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 22,
    gap: 10
  },
  sectionTitle: { color: colors.navy, fontSize: 28, fontWeight: "700" },
  body: { color: "#5F687A", fontSize: 15, lineHeight: 23 },
  supportCard: {
    backgroundColor: "#ECEEF1",
    borderRadius: 28,
    padding: 22,
    gap: 12
  },
  supportTitle: { color: colors.navy, fontSize: 24, fontWeight: "700" },
  supportText: { color: "#5F687A", fontSize: 14, lineHeight: 22 },
  cta: {
    backgroundColor: colors.navy,
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 4
  },
  ctaText: { color: "white", fontSize: 15, fontWeight: "800" }
});
