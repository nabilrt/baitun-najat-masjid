import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppShell } from "@/components/AppShell";
import { useApi } from "@/lib/api";
import { useLanguage } from "@/lib/language";
import { colors } from "@/lib/theme";
import type { GuidesResponse } from "@/lib/types";

export default function GuidesScreen() {
  const { lang, t } = useLanguage();
  const query = useApi<GuidesResponse>(`/api/mobile/guides?lang=${lang}`);

  return (
    <AppShell
      title={t.islamicGuides}
      subtitle={t.guidesIntro}
      loading={query.loading}
      refreshing={query.refreshing}
      error={query.error}
      onRefresh={query.reload}
    >
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>{t.guidesIntro}</Text>
        <Text style={styles.heroText}>{query.data?.namazGuide.subtitle}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{query.data?.namazGuide.title}</Text>
        <Text style={styles.sectionSubtitle}>{query.data?.namazGuide.subtitle}</Text>
        <View style={styles.list}>
          {query.data?.namazGuide.rakahItems.slice(0, 5).map((item, index) => (
            <View key={item.name} style={[styles.listItem, index === 0 && styles.featuredItem]}>
              <View style={styles.itemIcon}>
                <Ionicons name="book-outline" size={22} color={index === 0 ? "#C7E7FF" : colors.navy} />
              </View>
              <View style={styles.itemCopy}>
                <Text style={[styles.itemTitle, index === 0 && styles.itemTitleFeatured]}>{item.name}</Text>
                <Text style={[styles.itemBody, index === 0 && styles.itemBodyFeatured]}>{item.detail}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{query.data?.hadithLibrary.title}</Text>
        <Text style={styles.sectionSubtitle}>{query.data?.hadithLibrary.subtitle}</Text>
        <View style={styles.list}>
          {query.data?.hadithLibrary.categories.slice(0, 2).map((category) => (
            <View key={category.title} style={styles.quoteCard}>
              <Text style={styles.quoteCategory}>{category.title}</Text>
              {category.items.slice(0, 2).map((item) => (
                <View key={item.text} style={styles.quoteBlock}>
                  <Text style={styles.quoteText}>"{item.text}"</Text>
                  <Text style={styles.quoteRef}>{item.ref}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>

      <Pressable style={styles.ctaCard}>
        <Text style={styles.ctaTitle}>{t.continueReflection}</Text>
        <Text style={styles.ctaText}>{t.continueReflectionText}</Text>
      </Pressable>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: "#ECEEF1",
    borderRadius: 32,
    padding: 24,
    gap: 10
  },
  heroTitle: { color: colors.navy, fontSize: 34, lineHeight: 40, fontWeight: "700" },
  heroText: { color: "#5F687A", fontSize: 15, lineHeight: 23 },
  section: { gap: 8 },
  sectionTitle: { color: colors.navy, fontSize: 30, fontWeight: "700" },
  sectionSubtitle: { color: "#5F687A", fontSize: 14, lineHeight: 21 },
  list: { gap: 14, marginTop: 8 },
  listItem: {
    backgroundColor: "#F2F4F7",
    borderRadius: 28,
    padding: 18,
    flexDirection: "row",
    gap: 14
  },
  featuredItem: { backgroundColor: "#1A3A5F" },
  itemIcon: {
    width: 50,
    height: 50,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.45)",
    alignItems: "center",
    justifyContent: "center"
  },
  itemCopy: { flex: 1 },
  itemTitle: { color: colors.navy, fontSize: 18, fontWeight: "700", marginBottom: 6 },
  itemTitleFeatured: { color: "white" },
  itemBody: { color: "#5F687A", fontSize: 14, lineHeight: 21 },
  itemBodyFeatured: { color: "rgba(255,255,255,0.78)" },
  quoteCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 20,
    gap: 12
  },
  quoteCategory: { color: colors.navy, fontSize: 20, fontWeight: "700" },
  quoteBlock: { gap: 6 },
  quoteText: { color: colors.navy, fontSize: 16, lineHeight: 24, fontWeight: "500" },
  quoteRef: { color: "#5F687A", fontSize: 12, fontWeight: "700" },
  ctaCard: {
    backgroundColor: colors.navy,
    borderRadius: 28,
    padding: 22,
    gap: 10
  },
  ctaTitle: { color: "white", fontSize: 24, fontWeight: "700" },
  ctaText: { color: "rgba(255,255,255,0.78)", fontSize: 14, lineHeight: 22 }
});
