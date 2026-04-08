import { useMemo, useState } from "react";
import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { MenuSheet } from "@/components/MenuSheet";
import { useApi } from "@/lib/api";
import { colors } from "@/lib/theme";
import { getNextPrayer } from "@/lib/time";
import type { AppConfig, HomeResponse } from "@/lib/types";

const tiles = [
  { key: "prayer", label: "Prayer times", icon: "time-outline", route: "/prayer" },
  { key: "campaigns", label: "Campaigns", icon: "wallet-outline", route: "/campaigns" },
  { key: "guides", label: "Guides", icon: "book-outline", route: "/guides" },
  { key: "donate", label: "Donate", icon: "heart-outline", route: "/donate" },
  { key: "announcements", label: "Notice", icon: "notifications-outline", route: "/announcements" }
] as const;

export default function HomeScreen() {
  const configQuery = useApi<AppConfig>("/api/mobile/app-config");
  const homeQuery = useApi<HomeResponse>("/api/mobile/home");
  const [menuOpen, setMenuOpen] = useState(false);

  const nextPrayer = useMemo(
    () => (homeQuery.data ? getNextPrayer(homeQuery.data.prayer.items) : null),
    [homeQuery.data]
  );

  const activePrayerText = nextPrayer ? `${nextPrayer.prayer_time} ${nextPrayer.name.toUpperCase()}` : "--:--";
  const refresh = () => {
    configQuery.reload();
    homeQuery.reload();
  };

  if (configQuery.loading || homeQuery.loading) {
    return (
      <LinearGradient colors={[colors.ink, "#10264C"]} style={styles.loadingWrap}>
        <StatusBar style="light" />
        <Text style={styles.loadingText}>Loading live data...</Text>
      </LinearGradient>
    );
  }

  return (
    <>
      <LinearGradient colors={[colors.ink, "#10264C"]} style={styles.root}>
        <StatusBar style="light" />
        <SafeAreaView edges={["top", "bottom"]} style={styles.safe}>
          <ScrollView
            contentContainerStyle={styles.content}
            refreshControl={<RefreshControl refreshing={configQuery.refreshing || homeQuery.refreshing} onRefresh={refresh} tintColor={colors.gold} />}
          >
            <View style={styles.headerRow}>
              <Pressable style={styles.smallButton} onPress={() => setMenuOpen(true)}>
                <Ionicons name="menu" size={18} color="#F4F7FD" />
              </Pressable>
              <View style={styles.headerSpacer} />
              <Pressable style={styles.smallButton} onPress={() => router.push("/announcements")}>
                <Ionicons name="settings-outline" size={18} color="#F4F7FD" />
              </Pressable>
            </View>

            <View style={styles.heroCard}>
              <View style={styles.heroArch} />
              <View style={[styles.hanging, styles.hangingLeft]} />
              <View style={[styles.hanging, styles.hangingRight]} />
              <Text style={styles.heroTitle}>Prayer time</Text>
              <Text style={styles.heroTime}>{activePrayerText}</Text>
              <Text style={styles.heroDate}>
                {new Date().toLocaleDateString(undefined, {
                  weekday: "long",
                  day: "numeric",
                  month: "long"
                })}
              </Text>
            </View>

            {(configQuery.error || homeQuery.error) ? (
              <View style={styles.errorCard}>
                <Text style={styles.errorTitle}>Unable to load live data</Text>
                <Text style={styles.errorText}>{configQuery.error || homeQuery.error}</Text>
              </View>
            ) : null}

            <View style={styles.grid}>
              {tiles.map((tile, index) => (
                <Pressable
                  key={tile.key}
                  style={[styles.tile, index === 4 && styles.tileWide]}
                  onPress={() => router.push(tile.route)}
                >
                  <Ionicons name={tile.icon} size={26} color="#EEF3FD" />
                  <Text style={styles.tileLabel}>{tile.label}</Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.dots}>
              <View style={styles.dotActive} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
      <MenuSheet open={menuOpen} onClose={() => setMenuOpen(false)} menu={configQuery.data?.menu || []} />
    </>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1 },
  content: { paddingHorizontal: 18, paddingTop: 6, paddingBottom: 24 },
  loadingWrap: { flex: 1, alignItems: "center", justifyContent: "center" },
  loadingText: { color: "white", fontSize: 16, fontWeight: "600" },
  headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 18 },
  headerSpacer: { flex: 1 },
  smallButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  heroCard: {
    backgroundColor: "#071736",
    borderRadius: 30,
    minHeight: 278,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 26
  },
  heroArch: {
    position: "absolute",
    top: 30,
    left: 20,
    right: 20,
    height: 86,
    borderTopLeftRadius: 52,
    borderTopRightRadius: 52,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderColor: "rgba(255,255,255,0.72)"
  },
  hanging: {
    position: "absolute",
    top: 40,
    width: 10,
    height: 72,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.14)"
  },
  hangingLeft: { left: 34 },
  hangingRight: { right: 34 },
  heroTitle: { color: "white", fontSize: 22, fontWeight: "500" },
  heroTime: { color: "#F7E7B5", fontSize: 24, fontWeight: "800", marginTop: 10, textAlign: "center" },
  heroDate: { color: "#F4F6FB", fontSize: 15, marginTop: 8, opacity: 0.9 },
  errorCard: {
    marginTop: 16,
    backgroundColor: "#402128",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "#A85766"
  },
  errorTitle: { color: "#FFE7EB", fontSize: 15, fontWeight: "800" },
  errorText: { color: "#F2C2CB", fontSize: 13, lineHeight: 18, marginTop: 4 },
  grid: {
    marginTop: 18,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  tile: {
    width: "48.5%",
    minHeight: 108,
    borderRadius: 8,
    backgroundColor: "#0B1D42",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
    gap: 10
  },
  tileWide: {
    width: "100%",
    minHeight: 84
  },
  tileLabel: { color: "#EAF0FB", fontSize: 13, fontWeight: "500" },
  dots: { flexDirection: "row", justifyContent: "center", gap: 6, marginTop: 16 },
  dotActive: { width: 22, height: 4, borderRadius: 999, backgroundColor: "#F6E7B3" },
  dot: { width: 6, height: 4, borderRadius: 999, backgroundColor: "rgba(255,255,255,0.32)" }
});
