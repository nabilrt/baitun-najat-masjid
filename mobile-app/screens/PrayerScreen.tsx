import { useEffect, useMemo, useState } from "react";
import { Alert, Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { AppShell } from "@/components/AppShell";
import { useApi } from "@/lib/api";
import { getHijriDate } from "@/lib/date";
import { formatLocalizedDigits } from "@/lib/format";
import { useLanguage } from "@/lib/language";
import { loadReminderState, setPrayerReminderPreference, syncReminderState, type ReminderState } from "@/lib/prayer-reminders";
import { colors } from "@/lib/theme";
import { getNextPrayer } from "@/lib/time";
import type { PrayerTime } from "@/lib/types";

const prayerIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
  Fajr: "partly-sunny-outline",
  Dhuhr: "sunny-outline",
  Asr: "cloud-outline",
  Maghrib: "moon-outline",
  Isha: "bed-outline",
  "Jumu'ah": "people-outline"
};

export default function PrayerScreen() {
  const { lang, t } = useLanguage();
  const query = useApi<{ items: PrayerTime[] }>("/api/mobile/prayer-times");
  const [reminders, setReminders] = useState<ReminderState>({});
  const nextPrayer = useMemo(() => (query.data ? getNextPrayer(query.data.items) : null), [query.data]);
  const hijriDate = useMemo(() => getHijriDate(lang), [lang]);

  useEffect(() => {
    if (!query.data?.items) return;
    const prayers = query.data.items;
    syncReminderState(prayers)
      .then(setReminders)
      .catch(() => loadReminderState(prayers).then(setReminders).catch(() => setReminders({})));
  }, [query.data]);

  async function toggleReminder(item: PrayerTime, enabled: boolean) {
    try {
      await setPrayerReminderPreference(item.id, enabled, lang);
      setReminders((current) => ({ ...current, [`prayer:${item.id}`]: enabled }));
    } catch (error) {
      Alert.alert(t.reminders, error instanceof Error ? error.message : t.reminderPermissionError);
    }
  }

  return (
    <AppShell
      title={t.prayer}
      subtitle={t.dailyTimings}
      loading={query.loading}
      refreshing={query.refreshing}
      error={query.error}
      onRefresh={query.reload}
    >
      <LinearHero nextPrayer={nextPrayer} lang={lang} hijriDate={hijriDate} />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{t.dailyTimings}</Text>
        <Text style={styles.sectionSub}>{t.liveSchedule}</Text>
      </View>

      <View style={styles.grid}>
        {query.data?.items.map((item) => {
          const isActive = item.id === nextPrayer?.id;
          return (
            <View key={item.id} style={[styles.card, isActive && styles.activeCard]}>
              <View style={styles.cardTop}>
                <Text style={[styles.cardName, isActive && styles.activeCardName]}>
                  {lang === "bn" ? item.name_bn || item.name : item.name}
                </Text>
                <Ionicons
                  name={prayerIcons[item.name] || "time-outline"}
                  size={22}
                  color={isActive ? colors.navy : "#6B7280"}
                />
              </View>
              <View style={styles.cardRows}>
                <View style={styles.timeRow}>
                  <Text style={[styles.timeLabel, isActive && styles.activeTimeLabel]}>{t.adhan}</Text>
                  <Text style={[styles.timeValue, isActive && styles.activeCardName]}>
                    {formatLocalizedDigits(item.azan_time, lang)}
                  </Text>
                </View>
                <View style={styles.timeRow}>
                  <Text style={[styles.timeLabel, isActive && styles.activeTimeLabel]}>{t.iqamah}</Text>
                  <Text style={[styles.timeValue, isActive && styles.activeCardName]}>
                    {formatLocalizedDigits(item.prayer_time, lang)}
                  </Text>
                </View>
              </View>
              <View style={styles.reminderRow}>
                <View style={styles.reminderCopy}>
                  <Text style={styles.reminderTitle}>{t.reminders}</Text>
                  <Text style={styles.reminderText}>{t.reminderBeforeIqamah}</Text>
                </View>
                <Switch
                  value={Boolean(reminders[`prayer:${item.id}`])}
                  onValueChange={(value) => toggleReminder(item, value)}
                  trackColor={{ false: "#D4D9E1", true: "#9FCCED" }}
                  thumbColor={Boolean(reminders[`prayer:${item.id}`]) ? colors.navy : "#FFFFFF"}
                />
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.guideSection}>
        <Text style={styles.sectionTitle}>{t.namazGuide}</Text>
        <Pressable style={styles.guideCard} onPress={() => router.push("/guides")}>
          <View style={styles.guideIcon}>
            <Ionicons name="book-outline" size={24} color={colors.navy} />
          </View>
          <View style={styles.guideCopy}>
            <Text style={styles.guideTitle}>{t.stepPrayer}</Text>
            <Text style={styles.guideText}>{t.stepPrayerDesc}</Text>
          </View>
          <Ionicons name="arrow-forward" size={18} color={colors.navy} />
        </Pressable>
      </View>
    </AppShell>
  );
}

function LinearHero({
  nextPrayer,
  lang,
  hijriDate
}: {
  nextPrayer: PrayerTime | null;
  lang: "bn" | "en";
  hijriDate: string;
}) {
  const { t } = useLanguage();

  return (
    <View style={styles.hero}>
      <Text style={styles.heroKicker}>{t.currentPrayer}</Text>
      <Text style={styles.heroTitle}>{lang === "bn" ? nextPrayer?.name_bn || nextPrayer?.name || t.prayer : nextPrayer?.name || t.prayer}</Text>
      <View style={styles.heroPill}>
        <Ionicons name="time-outline" size={16} color="white" />
        <Text style={styles.heroPillText}>
          {t.iqamah} {formatLocalizedDigits(nextPrayer?.prayer_time || "--", lang)}
        </Text>
      </View>
      <View style={styles.heroTimeBlock}>
        <Text style={styles.heroTime}>{formatLocalizedDigits(nextPrayer?.prayer_time || "--", lang)}</Text>
        <Text style={styles.heroDate}>{hijriDate}</Text>
      </View>
      <View style={styles.heroGlow} />
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { backgroundColor: colors.navy, borderRadius: 32, padding: 24, minHeight: 220, overflow: "hidden" },
  heroKicker: { color: "rgba(255,255,255,0.78)", fontSize: 16, marginBottom: 4 },
  heroTitle: { color: "white", fontSize: 54, fontWeight: "700", maxWidth: "72%" },
  heroPill: {
    marginTop: 18,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10
  },
  heroPillText: { color: "white", fontSize: 12, fontWeight: "700", letterSpacing: 1.2, textTransform: "uppercase" },
  heroTimeBlock: { position: "absolute", right: 24, top: 28, alignItems: "flex-end", maxWidth: 120 },
  heroTime: { color: "white", fontSize: 28, fontWeight: "300" },
  heroDate: { color: "rgba(255,255,255,0.78)", fontSize: 12, marginTop: 6, textAlign: "right" },
  heroGlow: { position: "absolute", right: -40, bottom: -40, width: 180, height: 180, borderRadius: 999, backgroundColor: "rgba(159,204,237,0.18)" },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginTop: 8 },
  sectionTitle: { color: colors.navy, fontSize: 30, fontWeight: "700" },
  sectionSub: { color: "#5F687A", fontSize: 13, fontWeight: "600" },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 14 },
  card: { width: "48%", backgroundColor: "#F2F4F7", borderRadius: 24, padding: 18, gap: 18 },
  activeCard: { backgroundColor: "#C7E7FF" },
  cardTop: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" },
  cardName: { color: colors.navy, fontSize: 28, fontWeight: "600" },
  activeCardName: { color: colors.navy },
  cardRows: { gap: 14 },
  timeRow: { gap: 6 },
  timeLabel: { color: "#5F687A", fontSize: 11, fontWeight: "800", letterSpacing: 1.4, textTransform: "uppercase" },
  activeTimeLabel: { color: "#34627E" },
  timeValue: { color: colors.navy, fontSize: 24, fontWeight: "600" },
  reminderRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12, paddingTop: 2 },
  reminderCopy: { flex: 1 },
  reminderTitle: { color: colors.navy, fontSize: 13, fontWeight: "700" },
  reminderText: { color: "#5F687A", fontSize: 11, lineHeight: 16, marginTop: 2 },
  guideSection: { gap: 14 },
  guideCard: { backgroundColor: "#F2F4F7", borderRadius: 28, padding: 20, flexDirection: "row", alignItems: "center", gap: 16 },
  guideIcon: { width: 56, height: 56, borderRadius: 18, backgroundColor: "#AFDDFE", alignItems: "center", justifyContent: "center" },
  guideCopy: { flex: 1 },
  guideTitle: { color: colors.navy, fontSize: 17, fontWeight: "700", marginBottom: 4 },
  guideText: { color: "#5F687A", fontSize: 13, lineHeight: 19 }
});
