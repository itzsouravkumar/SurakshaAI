import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BellRing, AlertCircle, Info, ShieldAlert, Check } from 'lucide-react-native';
import { MOCK_ALERTS, Alert as AlertType, AlertSeverity } from '@/constants/mockData';

const SEVERITY_CONFIG: Record<AlertSeverity, { color: string; bg: string; border: string; icon: typeof AlertCircle }> = {
  critical: { color: '#ef4444', bg: '#fef2f2', border: '#fecaca', icon: AlertCircle },
  warning: { color: '#f59e0b', bg: '#fffbeb', border: '#fde68a', icon: ShieldAlert },
  info: { color: '#0ea5e9', bg: '#f0f9ff', border: '#bae6fd', icon: Info },
};

export default function AlertsScreen() {
  const [alerts, setAlerts] = useState<AlertType[]>(MOCK_ALERTS);
  const [filter, setFilter] = useState<AlertSeverity | 'all'>('all');

  const markRead = (id: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, isRead: true } : a)));
  };

  const handleAction = (a: AlertType) => {
    markRead(a.id);
    Alert.alert(
      'Action Taken',
      `Alert "${a.title}" has been escalated to supervisor Priya Sharma. Incident logged.`
    );
  };

  const filtered = filter === 'all' ? alerts : alerts.filter((a) => a.severity === filter);
  const unread = alerts.filter((a) => !a.isRead).length;

  const markAllRead = () => setAlerts((prev) => prev.map((a) => ({ ...a, isRead: true })));

  return (
    <View style={{ flex: 1 }}>
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        <View style={[styles.blob, { backgroundColor: '#fef2f2', top: -80, right: -80 }]} />
        <View style={[styles.blob, { backgroundColor: '#fffbeb', bottom: 100, left: -80, width: 300, height: 300 }]} />
        <BlurView intensity={95} tint="light" style={StyleSheet.absoluteFillObject} />
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <View style={styles.headerTitleRow}>
              <Text style={styles.headerTitle}>Security Alerts</Text>
              {unread > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadBadgeText}>{unread}</Text>
                </View>
              )}
            </View>
            <Text style={styles.headerSub}>{unread} unread alerts</Text>
          </View>
          {unread > 0 && (
            <TouchableOpacity onPress={markAllRead} style={styles.markAllBtn}>
              <Check size={14} color="#4f46e5" />
              <Text style={styles.markAllText}>Mark all read</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Filters */}
        <View style={styles.filterRow}>
          {(['all', 'critical', 'warning', 'info'] as const).map((f) => (
            <TouchableOpacity
              key={f}
              style={[
                styles.chip,
                filter === f && styles.chipActive,
                f === 'critical' && filter === f && { backgroundColor: '#ef4444', borderColor: '#ef4444' },
                f === 'warning' && filter === f && { backgroundColor: '#f59e0b', borderColor: '#f59e0b' },
                f === 'info' && filter === f && { backgroundColor: '#0ea5e9', borderColor: '#0ea5e9' },
              ]}
              onPress={() => setFilter(f)}
            >
              <Text style={[styles.chipText, filter === f && styles.chipTextActive]}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const cfg = SEVERITY_CONFIG[item.severity];
            const Icon = cfg.icon;
            return (
              <TouchableOpacity
                style={[
                  styles.alertCard,
                  { borderLeftColor: cfg.color, borderLeftWidth: 4 },
                  item.isRead && styles.alertCardRead,
                ]}
                onPress={() => markRead(item.id)}
                activeOpacity={0.85}
              >
                {!item.isRead && <View style={[styles.unreadDot, { backgroundColor: cfg.color }]} />}
                <View style={styles.alertTop}>
                  <View style={[styles.alertIconBox, { backgroundColor: cfg.bg }]}>
                    <Icon size={20} color={cfg.color} />
                  </View>
                  <View style={styles.alertMeta}>
                    <View style={[styles.severityBadge, { backgroundColor: cfg.bg, borderColor: cfg.border }]}>
                      <Text style={[styles.severityText, { color: cfg.color }]}>
                        {item.severity.toUpperCase()}
                      </Text>
                    </View>
                    <Text style={styles.alertTime}>{item.time}</Text>
                  </View>
                </View>

                <Text style={[styles.alertTitle, item.isRead && styles.alertTitleRead]}>
                  {item.title}
                </Text>
                <Text style={styles.alertDesc} numberOfLines={3}>{item.description}</Text>
                <Text style={styles.alertLocation}>📍 {item.location}</Text>

                {item.actionRequired && !item.isRead && (
                  <TouchableOpacity style={[styles.actionBtn, { backgroundColor: cfg.color }]} onPress={() => handleAction(item)}>
                    <Text style={styles.actionBtnText}>Take Action</Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            );
          }}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  blob: { position: 'absolute', width: 350, height: 350, borderRadius: 999, opacity: 0.4 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 12, paddingBottom: 16 },
  headerTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 2 },
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#0f172a', letterSpacing: -0.5 },
  unreadBadge: { backgroundColor: '#ef4444', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 },
  unreadBadgeText: { color: '#ffffff', fontWeight: '800', fontSize: 12 },
  headerSub: { fontSize: 13, color: '#64748b', fontWeight: '500' },
  markAllBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(79,70,229,0.1)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 },
  markAllText: { color: '#4f46e5', fontWeight: '700', fontSize: 12 },
  filterRow: { flexDirection: 'row', paddingHorizontal: 20, gap: 8, marginBottom: 16 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.6)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.8)' },
  chipActive: { backgroundColor: '#4f46e5', borderColor: '#4f46e5' },
  chipText: { fontSize: 13, fontWeight: '600', color: '#64748b' },
  chipTextActive: { color: '#ffffff' },
  list: { paddingHorizontal: 20, paddingBottom: 32 },
  alertCard: {
    backgroundColor: 'rgba(255,255,255,0.82)', borderRadius: 18, padding: 18, marginBottom: 14,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.8)', position: 'relative',
    shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.06, shadowRadius: 10,
  },
  alertCardRead: { opacity: 0.65 },
  unreadDot: { position: 'absolute', top: 16, right: 16, width: 9, height: 9, borderRadius: 5, borderWidth: 2, borderColor: '#ffffff' },
  alertTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  alertIconBox: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  alertMeta: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  severityBadge: { borderRadius: 8, borderWidth: 1, paddingHorizontal: 8, paddingVertical: 3 },
  severityText: { fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
  alertTime: { fontSize: 12, color: '#94a3b8', fontWeight: '500' },
  alertTitle: { fontSize: 15, fontWeight: '700', color: '#0f172a', marginBottom: 6 },
  alertTitleRead: { color: '#64748b' },
  alertDesc: { fontSize: 13, color: '#64748b', lineHeight: 19, marginBottom: 8 },
  alertLocation: { fontSize: 12, color: '#94a3b8', fontWeight: '500', marginBottom: 12 },
  actionBtn: { borderRadius: 10, paddingVertical: 10, alignItems: 'center' },
  actionBtnText: { color: '#ffffff', fontWeight: '700', fontSize: 13 },
});
