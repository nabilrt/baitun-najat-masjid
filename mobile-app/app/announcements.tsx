import { StyleSheet, Text, View } from "react-native";
import { AppShell } from "@/components/AppShell";
import { useApi } from "@/lib/api";
import { useLanguage } from "@/lib/language";
import { colors } from "@/lib/theme";
import type { Announcement } from "@/lib/types";

export default function AnnouncementsScreen() {
  const { lang, t } = useLanguage();
  const query = useApi<{ items: Announcement[] }>("/api/mobile/announcements");

  return (
    <AppShell
      title={t.announcements}
      subtitle={t.noticeIntro}
      loading={query.loading}
      refreshing={query.refreshing}
      error={query.error}
      onRefresh={query.reload}
    >
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>{t.stayConnected}</Text>
        <Text style={styles.heroText}>{t.noticeIntro}</Text>
      </View>

      <View style={styles.list}>
        {query.data?.items.map((item, index) => (
          <View key={item.id} style={[styles.card, index === 0 && styles.cardFeatured]}>
            <Text style={[styles.kicker, index === 0 && styles.kickerFeatured]}>{t.announcement}</Text>
            <Text style={[styles.title, index === 0 && styles.titleFeatured]}>
              {lang === "bn" ? item.title_bn || item.title : item.title}
            </Text>
            <Text style={[styles.body, index === 0 && styles.bodyFeatured]}>
              {lang === "bn" ? item.message_bn || item.message : item.message}
            </Text>
          </View>
        ))}
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
    gap: 10
  },
  cardFeatured: { backgroundColor: "#1A3A5F" },
  kicker: { color: "#356380", fontSize: 11, fontWeight: "700", letterSpacing: 1.8, textTransform: "uppercase" },
  kickerFeatured: { color: "#9FCCED" },
  title: { color: colors.navy, fontSize: 24, lineHeight: 30, fontWeight: "700" },
  titleFeatured: { color: "white" },
  body: { color: "#5F687A", fontSize: 14, lineHeight: 22 },
  bodyFeatured: { color: "rgba(255,255,255,0.78)" }
});
