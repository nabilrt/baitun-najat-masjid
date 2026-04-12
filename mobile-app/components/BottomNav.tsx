import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useLanguage } from "@/lib/language";
import { colors } from "@/lib/theme";

type TabKey = "home" | "prayer" | "gallery" | "donate";

const tabs: Array<{
  key: TabKey;
  icon: keyof typeof Ionicons.glyphMap;
  href: string;
}> = [
  { key: "home", icon: "home-outline", href: "/" },
  { key: "prayer", icon: "time-outline", href: "/prayer" },
  { key: "gallery", icon: "images-outline", href: "/gallery" },
  { key: "donate", icon: "heart-outline", href: "/donate" }
];

export function BottomNav({ active }: { active?: TabKey }) {
  const { t } = useLanguage();
  const labels: Record<TabKey, string> = {
    home: t.homeTab,
    prayer: t.prayerTab,
    gallery: t.gallery,
    donate: t.donateTab
  };
  return (
    <View style={styles.wrap}>
      {tabs.map((tab) => {
        const isActive = active === tab.key;
        return (
          <Pressable
            key={tab.key}
            style={[styles.item, isActive && styles.itemActive]}
            onPress={() => {
              if (isActive) return;
              router.replace(tab.href as never);
            }}
          >
            <Ionicons
              name={isActive ? (tab.icon.replace("-outline", "") as keyof typeof Ionicons.glyphMap) : tab.icon}
              size={18}
              color={isActive ? colors.navy : "#8CA0C5"}
            />
            <Text style={[styles.label, isActive && styles.labelActive]} numberOfLines={1}>
              {labels[tab.key]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function BottomNavBar({
  active,
  onSelect
}: {
  active?: TabKey;
  onSelect?: (key: TabKey, href: string) => void;
}) {
  const { t } = useLanguage();
  const labels: Record<TabKey, string> = {
    home: t.homeTab,
    prayer: t.prayerTab,
    gallery: t.gallery,
    donate: t.donateTab
  };
  return (
    <View style={styles.wrap}>
      {tabs.map((tab) => {
        const isActive = active === tab.key;
        return (
          <Pressable
            key={tab.key}
            style={[styles.item, isActive && styles.itemActive]}
            onPress={() => {
              if (isActive) return;
              if (onSelect) {
                onSelect(tab.key, tab.href);
              } else {
                router.replace(tab.href as never);
              }
            }}
          >
            <Ionicons
              name={isActive ? (tab.icon.replace("-outline", "") as keyof typeof Ionicons.glyphMap) : tab.icon}
              size={18}
              color={isActive ? colors.navy : "#8CA0C5"}
            />
            <Text style={[styles.label, isActive && styles.labelActive]} numberOfLines={1}>
              {labels[tab.key]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#D7DDE7",
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 14
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 6,
    minWidth: 72,
    gap: 4
  },
  itemActive: {},
  label: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.2,
    color: "#8CA0C5"
  },
  labelActive: {
    color: colors.navy
  }
});
