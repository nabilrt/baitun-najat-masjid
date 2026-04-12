import { useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppShell } from "@/components/AppShell";
import { apiFetch, useApi } from "@/lib/api";
import { useLanguage } from "@/lib/language";
import { colors } from "@/lib/theme";
import type { AppConfig, Campaign } from "@/lib/types";

const donationImage = require("../assets/masjid/masjid_2.webp");

export default function DonateScreen() {
  const { lang, t } = useLanguage();
  const configQuery = useApi<AppConfig>(`/api/mobile/app-config?lang=${lang}`);
  const campaignsQuery = useApi<{ items: Campaign[] }>("/api/mobile/campaigns");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [bkashNumber, setBkashNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit() {
    if (!name || !amount || !bkashNumber || !transactionId) {
      Alert.alert(t.missingFields, t.missingFieldsText);
      return;
    }
    try {
      setSubmitting(true);
      await apiFetch("/api/mobile/donations", {
        method: "POST",
        body: JSON.stringify({
          name,
          amount: Number(amount),
          bkashNumber,
          transactionId,
          note,
          campaignId: campaignsQuery.data?.items[0]?.id ?? null
        })
      });
      setName("");
      setAmount("");
      setBkashNumber("");
      setTransactionId("");
      setNote("");
      Alert.alert(t.submitted, t.submittedText);
    } catch (error) {
      Alert.alert(t.submissionFailed, error instanceof Error ? error.message : t.tryAgain);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AppShell
      title={t.donate}
      subtitle={`bKash: ${configQuery.data?.bkashNumber || "..."}`}
      loading={configQuery.loading || campaignsQuery.loading}
      refreshing={configQuery.refreshing || campaignsQuery.refreshing}
      error={configQuery.error || campaignsQuery.error}
      onRefresh={() => {
        configQuery.reload();
        campaignsQuery.reload();
      }}
    >
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>{t.investAkhirah}</Text>
        <Text style={styles.heroText}>{t.donateIntro}</Text>
      </View>

      <View style={styles.categoryGrid}>
        <View style={styles.categoryCard}>
          <Ionicons name="heart-outline" size={28} color={colors.navy} />
          <Text style={styles.categoryTitle}>{t.sadaqah}</Text>
          <Text style={styles.categoryText}>{t.sadaqahDesc}</Text>
        </View>
        <View style={styles.categoryCardDark}>
          <Ionicons name="card-outline" size={28} color="#C7E7FF" />
          <Text style={styles.categoryDarkTitle}>{t.zakat}</Text>
          <Text style={styles.categoryDarkText}>{t.zakatDesc}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.formTitle}>{t.paymentDetails}</Text>
        <Text style={styles.label}>{t.yourName}</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder={t.donorNamePlaceholder} />
        <Text style={styles.label}>{t.amount}</Text>
        <TextInput style={styles.input} value={amount} onChangeText={setAmount} placeholder={t.amountPlaceholder} keyboardType="numeric" />
        <Text style={styles.label}>{t.bkashNumber}</Text>
        <TextInput
          style={styles.input}
          value={bkashNumber}
          onChangeText={setBkashNumber}
          placeholder={t.bkashPlaceholder}
          keyboardType="phone-pad"
        />
        <Text style={styles.label}>{t.transactionId}</Text>
        <TextInput
          style={styles.input}
          value={transactionId}
          onChangeText={setTransactionId}
          placeholder={t.transactionPlaceholder}
        />
        <Text style={styles.label}>{t.note}</Text>
        <TextInput style={[styles.input, styles.textarea]} value={note} onChangeText={setNote} placeholder={t.notePlaceholder} multiline />
        <Pressable style={[styles.button, submitting && styles.buttonDisabled]} onPress={submit} disabled={submitting}>
          <Text style={styles.buttonText}>{submitting ? t.submitting : t.confirmDonation}</Text>
        </Pressable>
      </View>

      <View style={styles.quoteCard}>
        <Image source={donationImage} style={styles.quoteImage} />
        <View style={styles.quoteOverlay}>
          <Text style={styles.quoteText}>{t.donorQuote}</Text>
          <Text style={styles.quoteSource}>{t.donorQuoteSource}</Text>
        </View>
      </View>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  heroSection: { gap: 10 },
  heroTitle: { color: colors.navy, fontSize: 40, lineHeight: 46, fontWeight: "700" },
  heroText: { color: "#5F687A", fontSize: 17, lineHeight: 26 },
  categoryGrid: { gap: 14 },
  categoryCard: { backgroundColor: "#E0E3E6", borderRadius: 24, padding: 22, gap: 10 },
  categoryCardDark: { backgroundColor: "#1A3A5F", borderRadius: 24, padding: 22, gap: 10 },
  categoryTitle: { color: colors.navy, fontSize: 28, fontWeight: "700" },
  categoryText: { color: "#5F687A", fontSize: 14, lineHeight: 21 },
  categoryDarkTitle: { color: "white", fontSize: 28, fontWeight: "700" },
  categoryDarkText: { color: "rgba(255,255,255,0.72)", fontSize: 14, lineHeight: 21 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 32,
    padding: 22,
    gap: 10,
    shadowColor: "rgba(0,36,70,0.04)",
    shadowOpacity: 1,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 }
  },
  formTitle: { color: colors.navy, fontSize: 28, fontWeight: "700", marginBottom: 6 },
  label: { color: colors.navy, fontSize: 12, fontWeight: "800", letterSpacing: 1.2, textTransform: "uppercase" },
  input: { borderWidth: 0, borderRadius: 16, paddingHorizontal: 14, paddingVertical: 12, backgroundColor: "#F2F4F7" },
  textarea: { minHeight: 100, textAlignVertical: "top" },
  button: { backgroundColor: colors.navy, borderRadius: 18, paddingVertical: 15, alignItems: "center", marginTop: 8 },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: "white", fontSize: 17, fontWeight: "800" },
  quoteCard: { borderRadius: 32, overflow: "hidden", minHeight: 260, backgroundColor: "#ECEEF1" },
  quoteImage: { width: "100%", height: 260 },
  quoteOverlay: { position: "absolute", left: 0, right: 0, bottom: 0, padding: 22, backgroundColor: "rgba(0,36,70,0.70)" },
  quoteText: { color: "white", fontSize: 22, lineHeight: 30, fontWeight: "500" },
  quoteSource: { color: "rgba(255,255,255,0.68)", fontSize: 12, marginTop: 10 }
});
