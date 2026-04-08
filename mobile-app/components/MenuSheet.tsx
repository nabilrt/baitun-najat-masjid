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
    <Modal transparent animationType="slide" visible={open} onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <View style={styles.panel}>
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
              <Ionicons name="chevron-forward" size={18} color={colors.goldSoft} />
            </Pressable>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(4, 9, 20, 0.42)", justifyContent: "flex-end" },
  panel: {
    backgroundColor: colors.ink,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 32,
    gap: 6
  },
  handle: {
    alignSelf: "center",
    width: 56,
    height: 5,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.18)",
    marginBottom: 10
  },
  brand: { color: "white", fontSize: 24, fontWeight: "800", marginBottom: 10 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.12)"
  },
  label: { color: "#EFF4FF", fontSize: 16, fontWeight: "600" }
});
