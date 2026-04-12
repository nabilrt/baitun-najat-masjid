import { useMemo } from "react";
import { ImageBackground, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useApi } from "@/lib/api";
import { getHijriDate } from "@/lib/date";
import { formatLocalizedDigits } from "@/lib/format";
import { useLanguage } from "@/lib/language";
import { useNotifications } from "@/lib/notifications";
import { colors } from "@/lib/theme";
import { getNextPrayer } from "@/lib/time";
import type { AppConfig, HomeResponse } from "@/lib/types";

const heroBackground = require("../../assets/1789.jpg");

export default function HomeScreen() {
  const { lang, t, toggleLang } = useLanguage();
  const notifications = useNotifications();
  const configQuery = useApi<AppConfig>(`/api/mobile/app-config?lang=${lang}`);
  const homeQuery = useApi<HomeResponse>(`/api/mobile/home?lang=${lang}`);
  const nextPrayer = useMemo(
    () => (homeQuery.data ? getNextPrayer(homeQuery.data.prayer.items) : null),
    [homeQuery.data]
  );
  const hijriDate = useMemo(() => getHijriDate(lang), [lang]);
  const featuredHadith = useMemo(() => {
    const items = homeQuery.data?.hadith.items ?? [];
    if (!items.length) return null;
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const dayOfYear = Math.floor(diff / 86400000);
    return items[dayOfYear % items.length];
  }, [homeQuery.data]);

  const refresh = () => {
    configQuery.reload();
    homeQuery.reload();
  };

  if (configQuery.loading || homeQuery.loading) {
    return (
      <View style={styles.loadingWrap}>
        <StatusBar style="dark" />
        <Text style={styles.loadingText}>{t.loadingSanctuary}</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <SafeAreaView edges={["top", "bottom"]} style={styles.safe}>
        <ScrollView
          contentContainerStyle={styles.content}
          refreshControl={
            <RefreshControl
              refreshing={configQuery.refreshing || homeQuery.refreshing}
              onRefresh={refresh}
              tintColor={colors.navy}
            />
          }
        >
          <View style={styles.topBar}>
            <Text style={styles.brand} numberOfLines={1}>
              {configQuery.data?.brand.name || t.appName}
            </Text>
            <View style={styles.topActions}>
              <Pressable style={styles.langSwitch} onPress={toggleLang}>
                <Text style={styles.langSwitchText}>{t.switchLang}</Text>
              </Pressable>
              <Pressable style={styles.topIcon} onPress={() => router.push("/notifications")}>
                <Ionicons name="notifications-outline" size={20} color={colors.navy} />
                {notifications.unreadCount > 0 ? (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{notifications.unreadCount > 9 ? "9+" : notifications.unreadCount}</Text>
                  </View>
                ) : null}
              </Pressable>
            </View>
          </View>

          <View style={styles.hero}>
            <ImageBackground source={heroBackground} style={styles.heroImage} imageStyle={styles.heroImageInner}>
              <LinearGradient colors={["rgba(3,18,32,0.18)", "rgba(3,18,32,0.42)", "rgba(3,18,32,0.84)"]} style={styles.heroGradient}>
                <Text style={styles.heroEyebrow}>{t.welcomeEyebrow}</Text>
                <Text style={styles.heroTitle}>{t.welcomeTitle}</Text>
                <View style={styles.hijriCard}>
                  <Text style={styles.hijriLabel}>{t.todayHijri}</Text>
                  <Text style={styles.hijriValue}>{hijriDate}</Text>
                </View>
                <View style={styles.heroActions}>
                  <Pressable style={styles.primaryButton} onPress={() => router.push("/gallery")}>
                    <Text style={styles.primaryButtonTextDark}>{t.exploreCommunity}</Text>
                  </Pressable>
                  <Pressable style={styles.glassButton} onPress={() => router.push("/campaigns")}>
                    <Text style={styles.glassButtonText}>{t.viewCampaigns}</Text>
                  </Pressable>
                </View>
              </LinearGradient>
            </ImageBackground>
          </View>

          {homeQuery.error || configQuery.error ? (
            <View style={styles.errorCard}>
              <Text style={styles.errorTitle}>{t.unableToLoad}</Text>
              <Text style={styles.errorText}>{homeQuery.error || configQuery.error}</Text>
            </View>
          ) : null}

          <View style={styles.bentoRow}>
            <View style={styles.nextPrayerCard}>
              <View style={styles.nextPrayerHeader}>
                <View>
                  <Text style={styles.smallLabel}>{t.upcomingPrayer}</Text>
                  <Text style={styles.prayerName}>
                    {lang === "bn" ? nextPrayer?.name_bn || nextPrayer?.name || t.prayer : nextPrayer?.name || t.prayer}
                  </Text>
                </View>
                <View style={styles.pill}>
                  <Text style={styles.pillText}>{t.live}</Text>
                </View>
              </View>
              <View style={styles.prayerData}>
                <View style={styles.prayerLine}>
                  <Text style={styles.prayerLineLabel}>{t.adhan}</Text>
                  <Text style={styles.prayerLineValue}>{formatLocalizedDigits(nextPrayer?.azan_time || "--", lang)}</Text>
                </View>
                <View style={styles.prayerLine}>
                  <Text style={styles.prayerLineLabel}>{t.iqamah}</Text>
                  <Text style={styles.prayerLineValue}>{formatLocalizedDigits(nextPrayer?.prayer_time || "--", lang)}</Text>
                </View>
              </View>
              <Pressable style={styles.linkRow} onPress={() => router.push("/prayer")}>
                <Text style={styles.linkText}>{t.fullSchedule}</Text>
                <Ionicons name="arrow-forward" size={16} color={colors.navy} />
              </Pressable>
            </View>

            <View style={styles.sideColumn}>
              <View style={styles.wisdomCard}>
                <Text style={styles.wisdomLabel}>{t.dailyWisdom}</Text>
                <Text style={styles.wisdomText}>
                  "
                  {lang === "bn"
                    ? featuredHadith?.text_bn || featuredHadith?.text || "মানুষের মধ্যে উত্তম সেই ব্যক্তি, যে মানুষের জন্য সবচেয়ে বেশি উপকারী।"
                    : featuredHadith?.text || "The best of people are those that bring most benefit to the rest of mankind."}
                  "
                </Text>
                <Text style={styles.wisdomSource}>
                  {lang === "bn" ? featuredHadith?.source_bn || featuredHadith?.source || "হাদিস" : featuredHadith?.source || "Hadith"}
                </Text>
              </View>

              <Pressable style={styles.quranCard} onPress={() => router.push("/guides")}>
                <View style={styles.quranIconWrap}>
                  <Ionicons name="book-outline" size={22} color={colors.navy} />
                </View>
                <View style={styles.quranCopy}>
                  <Text style={styles.quranTitle}>{t.namazGuide}</Text>
                  <Text style={styles.quranSub}>{t.guidesHadith}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.navy} />
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F7F9FC" },
  safe: { flex: 1 },
  content: { paddingHorizontal: 20, paddingBottom: 112, gap: 18 },
  loadingWrap: { flex: 1, backgroundColor: "#F7F9FC", alignItems: "center", justifyContent: "center" },
  loadingText: { color: colors.navy, fontSize: 16, fontWeight: "600" },
  topBar: { height: 56, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 },
  topActions: { flexDirection: "row", alignItems: "center", gap: 6, flexShrink: 0 },
  brand: { color: colors.navy, fontSize: 22, fontWeight: "700", flex: 1, flexShrink: 1, marginRight: 6 },
  langSwitch: {
    minWidth: 46,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#E3E8F2"
  },
  langSwitchText: { color: colors.navy, fontSize: 12, fontWeight: "800" },
  topIcon: { width: 38, height: 38, borderRadius: 19, alignItems: "center", justifyContent: "center", position: "relative" },
  badge: {
    position: "absolute",
    top: 2,
    right: 1,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#D92D20",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3
  },
  badgeText: { color: "#FFFFFF", fontSize: 9, fontWeight: "800" },
  hero: { borderRadius: 32, overflow: "hidden" },
  heroImage: { minHeight: 360, justifyContent: "flex-end" },
  heroImageInner: { borderRadius: 32 },
  heroGradient: { minHeight: 360, justifyContent: "flex-end", padding: 28 },
  heroEyebrow: { color: "#9FCCED", fontSize: 11, fontWeight: "700", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 },
  heroTitle: { color: "white", fontSize: 38, lineHeight: 46, fontWeight: "700", maxWidth: 300 },
  hijriCard: {
    marginTop: 18,
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.10)",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 4
  },
  hijriLabel: { color: "rgba(255,255,255,0.72)", fontSize: 11, fontWeight: "700", letterSpacing: 1.2, textTransform: "uppercase" },
  hijriValue: { color: "white", fontSize: 17, fontWeight: "600" },
  heroActions: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 24 },
  primaryButton: { backgroundColor: "#C7E7FF", paddingHorizontal: 18, paddingVertical: 14, borderRadius: 14 },
  primaryButtonSmall: { backgroundColor: colors.navy, paddingHorizontal: 18, paddingVertical: 14, borderRadius: 16, alignSelf: "flex-start", marginTop: 8 },
  primaryButtonText: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  primaryButtonTextDark: { color: colors.navy, fontSize: 14, fontWeight: "700" },
  glassButton: { backgroundColor: "rgba(255,255,255,0.12)", paddingHorizontal: 18, paddingVertical: 14, borderRadius: 14 },
  glassButtonText: { color: "white", fontSize: 14, fontWeight: "700" },
  errorCard: { backgroundColor: "#FFF0F0", borderRadius: 20, padding: 14, borderWidth: 1, borderColor: "#F1CCCC" },
  errorTitle: { color: "#8D2434", fontSize: 15, fontWeight: "800" },
  errorText: { color: "#9F4B56", fontSize: 13, lineHeight: 18, marginTop: 4 },
  bentoRow: { gap: 16 },
  nextPrayerCard: { backgroundColor: "#FFFFFF", borderRadius: 32, padding: 24, gap: 18, shadowColor: "rgba(0,36,70,0.06)", shadowOpacity: 1, shadowRadius: 18, shadowOffset: { width: 0, height: 10 } },
  nextPrayerHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  smallLabel: { color: "#356380", fontSize: 11, fontWeight: "700", letterSpacing: 1.8, textTransform: "uppercase" },
  prayerName: { color: colors.navy, fontSize: 44, fontWeight: "700", marginTop: 8 },
  pill: { backgroundColor: "#C7E7FF", paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999 },
  pillText: { color: "#001E2E", fontSize: 11, fontWeight: "800" },
  prayerData: { gap: 20 },
  prayerLine: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  prayerLineLabel: { color: "#5C6474", fontSize: 15, fontWeight: "500" },
  prayerLineValue: { color: colors.navy, fontSize: 28, fontWeight: "600" },
  linkRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  linkText: { color: colors.navy, fontSize: 14, fontWeight: "700" },
  sideColumn: { gap: 16 },
  wisdomCard: { backgroundColor: colors.navy, borderRadius: 32, padding: 24, minHeight: 210 },
  wisdomLabel: { color: "#9FCCED", fontSize: 11, fontWeight: "700", letterSpacing: 1.8, textTransform: "uppercase", marginBottom: 14 },
  wisdomText: { color: "white", fontSize: 21, lineHeight: 31, fontWeight: "500" },
  wisdomSource: { color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 18 },
  quranCard: { backgroundColor: "#AFDDFE", borderRadius: 28, padding: 20, flexDirection: "row", alignItems: "center", gap: 14 },
  quranIconWrap: { width: 48, height: 48, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.45)", alignItems: "center", justifyContent: "center" },
  quranCopy: { flex: 1 },
  quranTitle: { color: "#002446", fontSize: 15, fontWeight: "700" },
  quranSub: { color: "#34627E", fontSize: 12, marginTop: 2 }
});
