import { PropsWithChildren } from "react";
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { colors } from "@/lib/theme";

type Props = PropsWithChildren<{
  title: string;
  subtitle?: string;
  loading?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  error?: string | null;
}>;

export function AppShell({ title, subtitle, loading, refreshing, onRefresh, error, children }: Props) {
  if (loading) {
    return (
      <LinearGradient colors={[colors.ink, colors.navy]} style={styles.loadingWrap}>
        <StatusBar style="light" />
        <ActivityIndicator color={colors.gold} size="large" />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={[colors.ink, colors.navy]} style={styles.root}>
      <StatusBar style="light" />
      <SafeAreaView edges={["top", "bottom"]} style={styles.safe}>
        <ScrollView
          contentContainerStyle={styles.content}
          refreshControl={
            onRefresh ? <RefreshControl refreshing={Boolean(refreshing)} onRefresh={onRefresh} tintColor={colors.gold} /> : undefined
          }
        >
          <View style={styles.header}>
            <Text style={styles.kicker}>Baitun Najat</Text>
            <Text style={styles.title}>{title}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
          {error ? (
            <View style={styles.errorCard}>
              <Text style={styles.errorTitle}>Unable to load live data</Text>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}
          {children}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1 },
  content: { padding: 20, paddingBottom: 28, gap: 18 },
  header: { gap: 8, paddingTop: 8 },
  kicker: { color: colors.goldSoft, fontSize: 12, fontWeight: "700", letterSpacing: 2.4, textTransform: "uppercase" },
  title: { color: "white", fontSize: 32, fontWeight: "800" },
  subtitle: { color: "#C8D3EA", fontSize: 15, lineHeight: 22, maxWidth: 520 },
  errorCard: {
    backgroundColor: "#402128",
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: "#A85766",
    gap: 6
  },
  errorTitle: { color: "#FFE7EB", fontSize: 16, fontWeight: "800" },
  errorText: { color: "#F2C2CB", fontSize: 14, lineHeight: 20 },
  loadingWrap: { flex: 1, alignItems: "center", justifyContent: "center" }
});
