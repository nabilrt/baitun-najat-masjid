import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppShell } from "@/components/AppShell";
import { useLanguage } from "@/lib/language";
import { useNotifications } from "@/lib/notifications";
import { colors } from "@/lib/theme";

export default function NotificationsScreen() {
  const { lang, t } = useLanguage();
  const notifications = useNotifications();

  return (
    <AppShell
      title={t.notifications}
      subtitle={t.notificationsIntro}
      loading={notifications.loading}
      refreshing={notifications.refreshing}
      error={notifications.error}
      onRefresh={notifications.reload}
      showNotificationsBell={false}
    >
      <View style={styles.topRow}>
        <View style={styles.countCard}>
          <Text style={styles.countValue}>{notifications.unreadCount}</Text>
          <Text style={styles.countLabel}>{t.unread}</Text>
        </View>
        <Pressable style={styles.markAllButton} onPress={() => notifications.markAllAsRead()}>
          <Text style={styles.markAllButtonText}>{t.markAllRead}</Text>
        </Pressable>
      </View>

      <View style={styles.list}>
        {notifications.items.length ? (
          notifications.items.map((item) => {
            const read = notifications.isRead(item.id);
            return (
              <Pressable
                key={item.id}
                style={[styles.card, read ? styles.cardRead : styles.cardUnread]}
                onPress={async () => {
                  await notifications.markAsRead(item.id);
                  if (item.data_url) {
                    router.push(item.data_url as "/prayer");
                  }
                }}
              >
                <View style={styles.cardMeta}>
                  <View style={[styles.statusPill, read ? styles.statusPillRead : styles.statusPillUnread]}>
                    <Text style={[styles.statusPillText, read ? styles.statusPillTextRead : styles.statusPillTextUnread]}>
                      {read ? t.read : t.unread}
                    </Text>
                  </View>
                  <Text style={styles.timeText}>
                    {new Date(item.created_at).toLocaleString(lang === "bn" ? "bn-BD" : "en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit"
                    })}
                  </Text>
                </View>
                <Text style={styles.title}>{lang === "bn" ? item.title_bn || item.title : item.title}</Text>
                <Text style={styles.body}>{lang === "bn" ? item.body_bn || item.body : item.body}</Text>
              </Pressable>
            );
          })
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>{t.noNotifications}</Text>
          </View>
        )}
      </View>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  topRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 },
  countCard: { backgroundColor: "#1A3A5F", borderRadius: 24, paddingHorizontal: 18, paddingVertical: 16, minWidth: 112 },
  countValue: { color: "white", fontSize: 26, fontWeight: "800" },
  countLabel: { color: "rgba(255,255,255,0.72)", fontSize: 12, fontWeight: "700", marginTop: 2 },
  markAllButton: { backgroundColor: "#E4EBF3", borderRadius: 999, paddingHorizontal: 16, paddingVertical: 12 },
  markAllButtonText: { color: colors.navy, fontSize: 13, fontWeight: "800" },
  list: { gap: 14 },
  card: { borderRadius: 26, padding: 18, gap: 10, borderWidth: 1 },
  cardUnread: { backgroundColor: "#F0F7FF", borderColor: "#CFE1F0" },
  cardRead: { backgroundColor: "#F5F6F8", borderColor: "#E2E6EB" },
  cardMeta: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 },
  statusPill: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  statusPillUnread: { backgroundColor: "#DCEEFF" },
  statusPillRead: { backgroundColor: "#E5E7EC" },
  statusPillText: { fontSize: 11, fontWeight: "800" },
  statusPillTextUnread: { color: "#12436D" },
  statusPillTextRead: { color: "#5F687A" },
  timeText: { color: "#667085", fontSize: 12, fontWeight: "600" },
  title: { color: colors.navy, fontSize: 18, lineHeight: 24, fontWeight: "700" },
  body: { color: "#556070", fontSize: 14, lineHeight: 21 },
  emptyCard: { backgroundColor: "#F2F4F7", borderRadius: 26, padding: 22 },
  emptyText: { color: "#5F687A", fontSize: 15, lineHeight: 22 }
});
