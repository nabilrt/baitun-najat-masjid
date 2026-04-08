import { useMemo, useState } from "react";
import { Image, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { MenuSheet } from "@/components/MenuSheet";
import { useApi } from "@/lib/api";
import { colors } from "@/lib/theme";
import { getNextPrayer } from "@/lib/time";
import type { AppConfig, PrayerTime } from "@/lib/types";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?auto=format&fit=crop&w=1200&q=80";

export default function PrayerScreen() {
  const query = useApi<{ items: PrayerTime[] }>("/api/mobile/prayer-times");
  const configQuery = useApi<AppConfig>("/api/mobile/app-config");
  const [menuOpen, setMenuOpen] = useState(false);
  const nextPrayer = useMemo(() => (query.data ? getNextPrayer(query.data.items) : null), [query.data]);

  const refresh = () => {
    query.reload();
    configQuery.reload();
  };

  if (query.loading || configQuery.loading) {
    return (
      <LinearGradient colors={[colors.ink, "#10264C"]} style={styles.loadingWrap}>
        <StatusBar style="light" />
        <Text style={styles.loadingText}>Loading prayer times...</Text>
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
            refreshControl={<RefreshControl refreshing={query.refreshing || configQuery.refreshing} onRefresh={refresh} tintColor={colors.gold} />}
          >
            <View style={styles.topRow}>
              <Pressable style={styles.iconBtn} onPress={() => setMenuOpen(true)}>
                <Ionicons name="menu" size={18} color="white" />
              </Pressable>
              <Text style={styles.smallTime}>
                {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </Text>
              <Pressable style={styles.iconBtn} onPress={() => router.push("/")}>
                <Ionicons name="close-outline" size={20} color="white" />
              </Pressable>
            </View>

            <View style={styles.phoneFrame}>
              <View style={styles.imageWrap}>
                <Image source={{ uri: HERO_IMAGE }} style={styles.heroImage} />
                <View style={styles.imageOverlay} />
                <View style={styles.navyCutLarge} />
                <View style={styles.navyCutSmall} />
              </View>

              <View style={styles.sheet}>
                <Text style={styles.sheetTitle}>Prayer times</Text>
                {nextPrayer ? <Text style={styles.sheetSub}>Next: {nextPrayer.name}</Text> : null}
                {(query.error || configQuery.error) ? (
                  <Text style={styles.errorText}>{query.error || configQuery.error}</Text>
                ) : null}
                <View style={styles.list}>
                  {query.data?.items.map((item) => (
                    <View key={item.id} style={styles.row}>
                      <View style={styles.rowLeft}>
                        <Text style={styles.rowName}>{item.name}</Text>
                        {item.id === nextPrayer?.id ? <View style={styles.activeLine} /> : null}
                      </View>
                      <Text style={styles.rowTime}>{item.prayer_time.toLowerCase()}</Text>
                      <Ionicons name="volume-medium-outline" size={18} color="#6D7484" />
                    </View>
                  ))}
                </View>
                <Pressable style={styles.linkBar} onPress={() => router.push("/campaigns")}>
                  <Text style={styles.linkBtn}>Click here</Text>
                  <Text style={styles.linkText}>for the latest mosque updates.</Text>
                </Pressable>
              </View>
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
  content: { paddingHorizontal: 18, paddingTop: 6, paddingBottom: 20 },
  loadingWrap: { flex: 1, alignItems: "center", justifyContent: "center" },
  loadingText: { color: "white", fontSize: 16, fontWeight: "600" },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18
  },
  iconBtn: { width: 30, height: 30, borderRadius: 15, alignItems: "center", justifyContent: "center" },
  smallTime: { color: "rgba(255,255,255,0.82)", fontSize: 12 },
  phoneFrame: {
    overflow: "hidden",
    borderRadius: 34,
    backgroundColor: "#10254C"
  },
  imageWrap: { height: 290, overflow: "hidden", position: "relative" },
  heroImage: { width: "100%", height: "100%" },
  imageOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(10,18,39,0.10)" },
  navyCutLarge: {
    position: "absolute",
    left: -50,
    bottom: -65,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "#10254C"
  },
  navyCutSmall: {
    position: "absolute",
    right: -90,
    top: -80,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#10254C"
  },
  sheet: {
    backgroundColor: "#FEFEFF",
    borderTopLeftRadius: 34,
    borderBottomLeftRadius: 24,
    marginTop: -76,
    marginRight: 0,
    marginLeft: 12,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 18
  },
  sheetTitle: { color: "#16203A", fontSize: 32, fontWeight: "700" },
  sheetSub: { color: "#7A8292", fontSize: 13, marginTop: 2, marginBottom: 12 },
  errorText: { color: "#B0485E", fontSize: 13, marginBottom: 10 },
  list: { gap: 14 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E2E7F0"
  },
  rowLeft: { flex: 1, paddingRight: 8 },
  rowName: { color: "#282F3D", fontSize: 23, fontWeight: "500" },
  rowTime: { color: "#4A4E59", fontSize: 18, fontWeight: "500", marginRight: 14 },
  activeLine: {
    marginTop: 8,
    width: 88,
    height: 3,
    borderRadius: 999,
    backgroundColor: colors.navy
  },
  linkBar: { flexDirection: "row", alignItems: "center", marginTop: 14, flexWrap: "wrap" },
  linkBtn: {
    backgroundColor: "#F1F4FA",
    borderWidth: 1,
    borderColor: "#A8B4C8",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 2,
    marginRight: 4,
    color: "#0C1F43"
  },
  linkText: { color: "#2A3144", fontSize: 13 }
});
