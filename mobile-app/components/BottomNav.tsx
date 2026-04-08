import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { colors } from "@/lib/theme";

type TabKey = "home" | "prayer" | "campaigns" | "guides" | "donate";

const items: Array<{ key: TabKey; label: string; icon: keyof typeof Ionicons.glyphMap; href: string }> = [
  { key: "home", label: "Home", icon: "home-outline", href: "/" },
  { key: "prayer", label: "Prayer", icon: "time-outline", href: "/prayer" },
  { key: "campaigns", label: "Campaigns", icon: "wallet-outline", href: "/campaigns" },
  { key: "guides", label: "Guides", icon: "book-outline", href: "/guides" },
  { key: "donate", label: "Donate", icon: "heart-outline", href: "/donate" }
];

export function BottomNav({ active }: { active?: TabKey }) {
  return (
    <View style={styles.wrap}>
      {items.map((item) => {
        const isActive = item.key === active;
        return (
          <Pressable
            key={item.key}
            style={[styles.item, isActive && styles.itemActive]}
            onPress={() => router.push(item.href as never)}
          >
            <Ionicons
              name={isActive ? (item.icon.replace("-outline", "") as keyof typeof Ionicons.glyphMap) : item.icon}
              size={20}
              color={isActive ? colors.ink : "#C7D3EA"}
            />
            <Text style={[styles.label, isActive && styles.labelActive]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 12,
    marginBottom: 10,
    borderRadius: 24,
    backgroundColor: "rgba(7, 21, 47, 0.92)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)"
  },
  item: {
    flex: 1,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingVertical: 10
  },
  itemActive: {
    backgroundColor: colors.gold
  },
  label: {
    color: "#D7E0F1",
    fontSize: 11,
    fontWeight: "700"
  },
  labelActive: {
    color: colors.ink
  }
});
