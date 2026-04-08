import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { AppShell } from "@/components/AppShell";
import { apiFetch, useApi } from "@/lib/api";
import { colors } from "@/lib/theme";
import type { AppConfig, Campaign } from "@/lib/types";

export default function DonateScreen() {
  const configQuery = useApi<AppConfig>("/api/mobile/app-config");
  const campaignsQuery = useApi<{ items: Campaign[] }>("/api/mobile/campaigns");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [bkashNumber, setBkashNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit() {
    if (!name || !amount || !bkashNumber || !transactionId) {
      Alert.alert("Missing fields", "Please fill in the required donation details.");
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
      Alert.alert("Submitted", "Donation has been submitted for confirmation.");
    } catch (error) {
      Alert.alert("Submission failed", error instanceof Error ? error.message : "Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AppShell
      title="Donate"
      subtitle={`bKash number: ${configQuery.data?.bkashNumber || "Loading..."}`}
      loading={configQuery.loading || campaignsQuery.loading}
      refreshing={configQuery.refreshing || campaignsQuery.refreshing}
      error={configQuery.error || campaignsQuery.error}
      onRefresh={() => {
        configQuery.reload();
        campaignsQuery.reload();
      }}
    >
      <View style={styles.card}>
        <Text style={styles.label}>Your Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Donor name" />
        <Text style={styles.label}>Amount</Text>
        <TextInput style={styles.input} value={amount} onChangeText={setAmount} placeholder="1000" keyboardType="numeric" />
        <Text style={styles.label}>bKash Number</Text>
        <TextInput style={styles.input} value={bkashNumber} onChangeText={setBkashNumber} placeholder="01XXXXXXXXX" keyboardType="phone-pad" />
        <Text style={styles.label}>Transaction ID</Text>
        <TextInput style={styles.input} value={transactionId} onChangeText={setTransactionId} placeholder="TRX123456" />
        <Text style={styles.label}>Note</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          value={note}
          onChangeText={setNote}
          placeholder="Optional note"
          multiline
        />
        <Pressable style={[styles.button, submitting && styles.buttonDisabled]} onPress={submit} disabled={submitting}>
          <Text style={styles.buttonText}>{submitting ? "Submitting..." : "Submit Donation"}</Text>
        </Pressable>
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
  label: { color: colors.text, fontSize: 14, fontWeight: "700" },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#F8FAFD"
  },
  textarea: { minHeight: 100, textAlignVertical: "top" },
  button: {
    backgroundColor: colors.navy,
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 8
  },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: "white", fontSize: 15, fontWeight: "800" }
});
