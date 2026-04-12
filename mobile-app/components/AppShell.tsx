import { PropsWithChildren } from "react";
import { ActivityIndicator, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useLanguage } from "@/lib/language";
import { colors } from "@/lib/theme";

type Props = PropsWithChildren<{
  title: string;
  subtitle?: string;
  loading?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  error?: string | null;
}>;

export function AppShell({
  title,
  subtitle,
  loading,
  refreshing,
  onRefresh,
  error,
  children
}: Props) {
  const { t, toggleLang } = useLanguage();
  if (loading) {
    return (
      <View style={styles.loadingWrap}>
        <StatusBar style="dark" />
        <ActivityIndicator color={colors.navy} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <SafeAreaView edges={["top", "bottom"]} style={styles.safe}>
        <ScrollView
          contentContainerStyle={styles.content}
          refreshControl={
            onRefresh ? <RefreshControl refreshing={Boolean(refreshing)} onRefresh={onRefresh} tintColor={colors.navy} /> : undefined
          }
        >
          <View style={styles.headerShell}>
            <View style={styles.header}>
              <View style={styles.headerTop}>
                <Text style={styles.kicker}>{t.appName}</Text>
                <Pressable style={styles.langButton} onPress={toggleLang}>
                  <Text style={styles.langButtonText}>{t.switchLang}</Text>
                </Pressable>
              </View>
              <Text style={styles.title}>{title}</Text>
              {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
            </View>
          </View>
          {error ? (
            <View style={styles.errorCard}>
              <Text style={styles.errorTitle}>{t.unableToLoad}</Text>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}
          {children}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F7F9FC" },
  safe: { flex: 1 },
  content: { padding: 20, paddingBottom: 112, gap: 18 },
  headerShell: { paddingTop: 4 },
  header: {
    backgroundColor: "rgba(247,249,252,0.76)",
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 16,
    gap: 8
  },
  headerTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 },
  kicker: { color: "#356380", fontSize: 11, fontWeight: "700", letterSpacing: 2, textTransform: "uppercase" },
  langButton: {
    minWidth: 46,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#E3E8F2"
  },
  langButtonText: { color: colors.navy, fontSize: 12, fontWeight: "800" },
  title: { color: colors.navy, fontSize: 32, fontWeight: "700" },
  subtitle: { color: "#5F687A", fontSize: 15, lineHeight: 22, maxWidth: 520 },
  errorCard: {
    backgroundColor: "#FFF0F0",
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F1CCCC",
    gap: 6
  },
  errorTitle: { color: "#8D2434", fontSize: 16, fontWeight: "800" },
  errorText: { color: "#9F4B56", fontSize: 14, lineHeight: 20 },
  loadingWrap: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#F7F9FC" }
});
