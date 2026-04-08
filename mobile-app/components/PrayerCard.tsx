import { StyleSheet, Text, View } from "react-native";
import type { PrayerTime } from "@/lib/types";
import { colors } from "@/lib/theme";

export function PrayerCard({ item, highlighted = false }: { item: PrayerTime; highlighted?: boolean }) {
  return (
    <View style={[styles.card, highlighted && styles.highlighted]}>
      <View>
        <Text style={[styles.name, highlighted && styles.nameHighlighted]}>{item.name}</Text>
        {item.name_bn ? <Text style={styles.nameBn}>{item.name_bn}</Text> : null}
      </View>
      <View style={styles.times}>
        <Text style={[styles.time, highlighted && styles.timeHighlighted]}>A {item.azan_time}</Text>
        <Text style={[styles.time, highlighted && styles.timeHighlighted]}>J {item.prayer_time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  highlighted: {
    backgroundColor: "#FFF8E5",
    borderColor: "#EFD794"
  },
  name: { fontSize: 17, fontWeight: "700", color: colors.text },
  nameHighlighted: { color: "#7C5814" },
  nameBn: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  times: { gap: 4, alignItems: "flex-end" },
  time: { fontSize: 13, color: colors.textMuted, fontWeight: "600" },
  timeHighlighted: { color: "#7C5814" }
});
