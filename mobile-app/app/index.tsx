import { useMemo, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { AppShell } from "@/components/AppShell";
import { MenuSheet } from "@/components/MenuSheet";
import { PrayerCard } from "@/components/PrayerCard";
import { useApi } from "@/lib/api";
import { colors } from "@/lib/theme";
import { getNextPrayer } from "@/lib/time";
import type { AppConfig, HomeResponse } from "@/lib/types";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?auto=format&fit=crop&w=1200&q=80";

export default function HomeScreen() {
  const configQuery = useApi<AppConfig>("/api/mobile/app-config");
  const homeQuery = useApi<HomeResponse>("/api/mobile/home");
  const [menuOpen, setMenuOpen] = useState(false);

  const nextPrayer = useMemo(
    () => (homeQuery.data ? getNextPrayer(homeQuery.data.prayer.items) : null),
    [homeQuery.data]
  );

  return (
    <>
      <AppShell
        title={configQuery.data?.brand.name || "Baitun Najat"}
        subtitle={configQuery.data?.brand.address || "Mosque community app"}
        loading={configQuery.loading || homeQuery.loading}
        refreshing={configQuery.refreshing || homeQuery.refreshing}
        error={configQuery.error || homeQuery.error}
        activeTab="home"
        onRefresh={() => {
          configQuery.reload();
          homeQuery.reload();
        }}
      >
        <View style={styles.topRow}>
          <Pressable style={styles.iconButton} onPress={() => setMenuOpen(true)}>
            <Ionicons name="menu" size={22} color="white" />
          </Pressable>
          <Pressable style={styles.iconButton} onPress={() => router.push("/announcements")}>
            <Ionicons name="notifications-outline" size={21} color="white" />
          </Pressable>
        </View>

        <View style={styles.hero}>
          <Image source={{ uri: HERO_IMAGE }} style={styles.heroImage} />
          <View style={styles.heroOverlay} />
          <View style={styles.arch} />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Prayer time</Text>
            {nextPrayer ? (
              <>
                <Text style={styles.heroTime}>{nextPrayer.prayer_time}</Text>
                <Text style={styles.heroLabel}>Next jama&apos;ah: {nextPrayer.name}</Text>
              </>
            ) : null}
          </View>
        </View>

        <View style={styles.quickGrid}>
          {(configQuery.data?.menu || []).filter((item) => item.enabled).map((item) => (
            <Pressable
              key={`${item.key}-${item.label}`}
              style={styles.quickItem}
              onPress={() => {
                if (item.key === "home") return;
                if (item.key === "prayer") router.push("/prayer");
                if (item.key === "campaigns") router.push("/campaigns");
                if (item.key === "donate") router.push("/donate");
                if (item.key === "namaz-guide" || item.key === "hadith-library") router.push("/guides");
                if (item.key === "announcements") router.push("/announcements");
              }}
            >
              <Text style={styles.quickLabel}>{item.label}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Today&apos;s Prayer Schedule</Text>
          <View style={styles.list}>
            {homeQuery.data?.prayer.items.map((item) => (
              <PrayerCard key={item.id} item={item} highlighted={item.id === nextPrayer?.id} />
            ))}
          </View>
        </View>

        {homeQuery.data?.announcements?.length ? (
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Latest Announcement</Text>
            <View style={styles.announcementCard}>
              <Text style={styles.announcementTitle}>{homeQuery.data.announcements[0].title}</Text>
              <Text style={styles.announcementText}>{homeQuery.data.announcements[0].message}</Text>
            </View>
          </View>
        ) : null}

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Active Campaigns</Text>
          <View style={styles.list}>
            {homeQuery.data?.campaigns.map((campaign) => (
              <Pressable
                key={campaign.id}
                style={styles.campaignCard}
                onPress={() => router.push(`/campaign/${campaign.slug}`)}
              >
                <Text style={styles.campaignTitle}>{campaign.title}</Text>
                <Text style={styles.campaignText} numberOfLines={2}>
                  {campaign.description}
                </Text>
                <Text style={styles.campaignMeta}>
                  BDT {campaign.total_confirmed} raised
                  {campaign.goal_amount ? ` of BDT ${campaign.goal_amount}` : ""}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {homeQuery.data?.hadith?.items?.length ? (
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Hadith Reflection</Text>
            <View style={styles.hadithCard}>
              <Text style={styles.hadithText}>"{homeQuery.data.hadith.items[0].text}"</Text>
              <Text style={styles.hadithSource}>{homeQuery.data.hadith.items[0].source}</Text>
            </View>
          </View>
        ) : null}
      </AppShell>
      <MenuSheet open={menuOpen} onClose={() => setMenuOpen(false)} menu={configQuery.data?.menu || []} />
    </>
  );
}

const styles = StyleSheet.create({
  topRow: { flexDirection: "row", justifyContent: "space-between" },
  iconButton: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center"
  },
  hero: {
    height: 290,
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: colors.navySoft
  },
  heroImage: { width: "100%", height: "100%", position: "absolute" },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(9, 22, 49, 0.45)" },
  arch: {
    position: "absolute",
    top: -18,
    left: 18,
    right: 18,
    height: 126,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.55)",
    borderBottomWidth: 0,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70
  },
  heroContent: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 28,
    alignItems: "center"
  },
  heroTitle: { color: "white", fontSize: 35, fontWeight: "800" },
  heroTime: { color: colors.goldSoft, fontSize: 30, fontWeight: "800", marginTop: 10 },
  heroLabel: { color: "#E2E9F7", fontSize: 15, marginTop: 6 },
  quickGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  quickItem: {
    width: "31.5%",
    minHeight: 92,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 22,
    padding: 12,
    justifyContent: "flex-end",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)"
  },
  quickLabel: { color: "white", fontSize: 14, fontWeight: "700" },
  sectionCard: {
    backgroundColor: colors.mist,
    borderRadius: 28,
    padding: 18,
    gap: 14
  },
  sectionTitle: { color: colors.text, fontSize: 19, fontWeight: "800" },
  list: { gap: 12 },
  campaignCard: {
    backgroundColor: "white",
    borderRadius: 22,
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border
  },
  campaignTitle: { color: colors.text, fontSize: 16, fontWeight: "800" },
  campaignText: { color: colors.textMuted, fontSize: 14, lineHeight: 20 },
  campaignMeta: { color: "#84642A", fontSize: 13, fontWeight: "700" },
  announcementCard: {
    backgroundColor: "#FFF7E3",
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F0D998",
    gap: 8
  },
  announcementTitle: { color: colors.text, fontSize: 16, fontWeight: "800" },
  announcementText: { color: "#6D5A2A", fontSize: 14, lineHeight: 21 },
  hadithCard: {
    backgroundColor: colors.navy,
    borderRadius: 24,
    padding: 18,
    gap: 10
  },
  hadithText: { color: "white", fontSize: 16, lineHeight: 24, fontWeight: "700" },
  hadithSource: { color: colors.goldSoft, fontSize: 13, fontWeight: "700" }
});
