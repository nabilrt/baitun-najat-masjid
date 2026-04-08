import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { colors } from "@/lib/theme";

const routes: Record<string, string> = {
  home: "/",
  prayer: "/prayer",
  campaigns: "/campaigns",
  donate: "/donate",
  "namaz-guide": "/guides",
  "hadith-library": "/guides",
  announcements: "/announcements"
};

type Props = {
  open: boolean;
  onClose: () => void;
  menu: Array<{ key: string; label: string; enabled: boolean }>;
};

export function MenuSheet({ open, onClose, menu }: Props) {
  return (
    <Modal transparent animationType="fade" visible={open} onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <Pressable style={styles.dismissLayer} onPress={onClose} />
        <View style={styles.panel}>
          <View style={styles.cornerImage} />
          <View style={styles.arch} />
          <View style={styles.handle} />
          <Text style={styles.brand}>Baitun Najat</Text>
          {menu.filter((item) => item.enabled).map((item) => (
            <Pressable
              key={`${item.key}-${item.label}`}
              style={styles.row}
              onPress={() => {
                onClose();
                const target = routes[item.key];
                if (target) {
                  router.push(target as never);
                }
              }}
            >
              <Text style={styles.label}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={18} color="#8FA0C7" />
            </Pressable>
          ))}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(4, 9, 20, 0.28)", flexDirection: "row", justifyContent: "flex-end" },
  dismissLayer: { flex: 1 },
  panel: {
    width: "74%",
    backgroundColor: "#071736",
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
    gap: 6,
    overflow: "hidden"
  },
  cornerImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 88,
    height: 88,
    backgroundColor: "#D79F61",
    borderBottomRightRadius: 60
  },
  arch: {
    position: "absolute",
    top: 22,
    left: 26,
    right: 26,
    height: 92,
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    borderWidth: 1.5,
    borderBottomWidth: 0,
    borderColor: "rgba(255,255,255,0.38)"
  },
  handle: {
    alignSelf: "flex-end",
    width: 22,
    height: 22,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.26)",
    marginBottom: 18
  },
  brand: { color: "white", fontSize: 28, fontWeight: "500", marginBottom: 14, textAlign: "center", lineHeight: 34 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 13,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.12)"
  },
  label: { color: "#DCE6FB", fontSize: 14, fontWeight: "500" }
});
