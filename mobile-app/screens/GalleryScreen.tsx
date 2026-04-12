import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppShell } from "@/components/AppShell";
import { useLanguage } from "@/lib/language";
import { colors } from "@/lib/theme";

const gallery = [
  { id: "1", title: "Sacred Hall", tag: "Interior", image: require("../assets/masjid/masjid_1.webp"), large: true },
  { id: "2", title: "Evening Reflections", tag: "Exterior", image: require("../assets/masjid/masjid_2.webp") },
  { id: "3", title: "Calm Sanctuary", tag: "Prayer Space", image: require("../assets/masjid/masjid_3.webp") }
];

export default function GalleryScreen() {
  const { t } = useLanguage();
  const chips = [t.allFrames, t.interior, t.exterior, t.prayerSpace];

  return (
    <AppShell title={t.sacredSpaces} subtitle={t.visualJourney}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {chips.map((chip, index) => (
          <View key={chip} style={[styles.chip, index === 0 && styles.chipActive]}>
            <Text style={[styles.chipText, index === 0 && styles.chipTextActive]}>{chip}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.grid}>
        {gallery.map((item) => (
          <Pressable key={item.id} style={[styles.card, item.large && styles.cardLarge]}>
            <Image source={item.image} style={styles.cardImage} />
            <View style={styles.overlay}>
              <Text style={styles.overlayTag}>{item.tag}</Text>
              <Text style={styles.overlayTitle}>{item.title}</Text>
            </View>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.moreButton}>
        <Text style={styles.moreText}>{t.discoverMore}</Text>
        <Ionicons name="chevron-down" size={18} color="white" />
      </Pressable>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  chips: { gap: 10, paddingBottom: 4 },
  chip: { paddingHorizontal: 18, paddingVertical: 10, borderRadius: 999, backgroundColor: "#E6E8EB" },
  chipActive: { backgroundColor: colors.navy },
  chipText: { color: "#5F687A", fontSize: 13, fontWeight: "600" },
  chipTextActive: { color: "white" },
  grid: { gap: 16 },
  card: { height: 260, borderRadius: 32, overflow: "hidden", backgroundColor: "#ECEEF1" },
  cardLarge: { height: 360 },
  cardImage: { width: "100%", height: "100%" },
  overlay: { position: "absolute", left: 0, right: 0, bottom: 0, padding: 22, backgroundColor: "rgba(0,36,70,0.42)" },
  overlayTag: { color: "rgba(255,255,255,0.74)", fontSize: 11, fontWeight: "700", letterSpacing: 1.4, textTransform: "uppercase", marginBottom: 6 },
  overlayTitle: { color: "white", fontSize: 22, fontWeight: "700" },
  moreButton: { backgroundColor: colors.navy, borderRadius: 20, paddingVertical: 16, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8 },
  moreText: { color: "white", fontSize: 15, fontWeight: "700" }
});
