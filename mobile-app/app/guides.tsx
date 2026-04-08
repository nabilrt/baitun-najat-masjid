import { StyleSheet, Text, View } from "react-native";
import { AppShell } from "@/components/AppShell";
import { useApi } from "@/lib/api";
import { colors } from "@/lib/theme";
import type { GuidesResponse } from "@/lib/types";

export default function GuidesScreen() {
  const query = useApi<GuidesResponse>("/api/mobile/guides");

  return (
    <AppShell
      title="Islamic Guides"
      subtitle="Namaz guidance and hadith library directly aligned with the website sections."
      loading={query.loading}
      refreshing={query.refreshing}
      error={query.error}
      activeTab="guides"
      onRefresh={query.reload}
    >
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>{query.data?.namazGuide.title}</Text>
        <Text style={styles.description}>{query.data?.namazGuide.subtitle}</Text>
        <View style={styles.list}>
          {query.data?.namazGuide.rakahItems.slice(0, 5).map((item) => (
            <View key={item.name} style={styles.listItem}>
              <Text style={styles.listItemTitle}>{item.name}</Text>
              <Text style={styles.listItemBody}>{item.detail}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>{query.data?.hadithLibrary.title}</Text>
        <Text style={styles.description}>{query.data?.hadithLibrary.subtitle}</Text>
        <View style={styles.list}>
          {query.data?.hadithLibrary.categories.slice(0, 2).map((category) => (
            <View key={category.title} style={styles.listItem}>
              <Text style={styles.listItemTitle}>{category.title}</Text>
              {category.items.slice(0, 2).map((item) => (
                <Text key={item.text} style={styles.quote}>
                  "{item.text}" · {item.ref}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </View>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 28,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 10
  },
  sectionTitle: { color: colors.text, fontSize: 20, fontWeight: "800" },
  description: { color: colors.textMuted, fontSize: 14, lineHeight: 21 },
  list: { gap: 12, marginTop: 8 },
  listItem: { backgroundColor: "#F7F9FD", borderRadius: 18, padding: 14, gap: 8 },
  listItemTitle: { color: colors.text, fontSize: 15, fontWeight: "700" },
  listItemBody: { color: colors.textMuted, fontSize: 14, lineHeight: 20 },
  quote: { color: colors.textMuted, fontSize: 13, lineHeight: 20 }
});
