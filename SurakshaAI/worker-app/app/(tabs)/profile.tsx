import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  User,
  Shield,
  Bell,
  MapPin,
  Moon,
  ChevronRight,
  LogOut,
  Phone,
  Building2,
  Clock,
  Star,
  ClipboardCheck,
  AlertTriangle,
  FileText,
} from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out of SurakshaAI?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/(auth)/splash');
          },
        },
      ]
    );
  };

  const stats = [
    { label: 'Tasks Done', value: user?.tasksCompleted ?? 128, icon: ClipboardCheck, color: '#4f46e5' },
    { label: 'Alerts Handled', value: user?.alertsHandled ?? 47, icon: AlertTriangle, color: '#f59e0b' },
    { label: 'Reports Filed', value: user?.reportsFiledCount ?? 23, icon: FileText, color: '#10b981' },
  ];

  return (
    <View style={{ flex: 1 }}>
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        <View style={[styles.blob, { backgroundColor: '#e0e7ff', top: -80, right: -80 }]} />
        <View style={[styles.blob, { backgroundColor: '#d1fae5', bottom: 100, left: -80, width: 300, height: 300 }]} />
        <BlurView intensity={95} tint="light" style={StyleSheet.absoluteFillObject} />
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Worker Card */}
          <View style={styles.workerCard}>
            <View style={styles.avatarRing}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{user?.avatarInitials || 'RK'}</Text>
              </View>
            </View>
            <Text style={styles.workerName}>{user?.name || 'Rajesh Kumar'}</Text>
            <Text style={styles.workerId}>{user?.id || 'EMP-2047'}</Text>

            <View style={styles.workerBadge}>
              <Shield size={13} color="#4f46e5" />
              <Text style={styles.workerBadgeText}>Verified Field Worker</Text>
            </View>

            {/* Score ring mini */}
            <View style={styles.scoreRow}>
              <View style={styles.scoreBox}>
                <Text style={styles.scoreValue}>{user?.securityScore || 94}</Text>
                <Text style={styles.scoreLabel}>Security Score</Text>
              </View>
              <View style={styles.scoreDivider} />
              <View style={styles.scoreBox}>
                <Text style={[styles.scoreValue, { color: '#10b981' }]}>Active</Text>
                <Text style={styles.scoreLabel}>Status</Text>
              </View>
              <View style={styles.scoreDivider} />
              <View style={styles.scoreBox}>
                <Text style={styles.scoreValue}>4.8 ★</Text>
                <Text style={styles.scoreLabel}>Performance</Text>
              </View>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <View key={s.label} style={styles.statCard}>
                  <View style={[styles.statIcon, { backgroundColor: `${s.color}18` }]}>
                    <Icon size={20} color={s.color} />
                  </View>
                  <Text style={styles.statValue}>{s.value}</Text>
                  <Text style={styles.statLabel}>{s.label}</Text>
                </View>
              );
            })}
          </View>

          {/* Work Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Information</Text>
            {[
              { icon: Building2, label: 'Department', value: user?.department || 'Security Operations' },
              { icon: Clock, label: 'Shift', value: user?.shift || 'Morning (06:00 – 14:00)' },
              { icon: MapPin, label: 'Site', value: user?.site || 'Sector 12 Industrial Zone' },
              { icon: Phone, label: 'Supervisor', value: user?.supervisor || 'Priya Sharma' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <View key={item.label} style={styles.infoRow}>
                  <View style={styles.infoIconBox}>
                    <Icon size={16} color="#4f46e5" />
                  </View>
                  <View style={styles.infoTexts}>
                    <Text style={styles.infoLabel}>{item.label}</Text>
                    <Text style={styles.infoValue}>{item.value}</Text>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Settings</Text>

            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: 'rgba(245,158,11,0.12)' }]}>
                  <Bell size={16} color="#f59e0b" />
                </View>
                <View>
                  <Text style={styles.settingLabel}>Push Notifications</Text>
                  <Text style={styles.settingSubLabel}>Alerts and task updates</Text>
                </View>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#e2e8f0', true: '#c7d2fe' }}
                thumbColor={notifications ? '#4f46e5' : '#94a3b8'}
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: 'rgba(16,185,129,0.12)' }]}>
                  <MapPin size={16} color="#10b981" />
                </View>
                <View>
                  <Text style={styles.settingLabel}>Location Sharing</Text>
                  <Text style={styles.settingSubLabel}>Shared with supervisor during duty</Text>
                </View>
              </View>
              <Switch
                value={locationSharing}
                onValueChange={setLocationSharing}
                trackColor={{ false: '#e2e8f0', true: '#a7f3d0' }}
                thumbColor={locationSharing ? '#10b981' : '#94a3b8'}
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: 'rgba(15,12,41,0.08)' }]}>
                  <Moon size={16} color="#475569" />
                </View>
                <View>
                  <Text style={styles.settingLabel}>Dark Mode</Text>
                  <Text style={styles.settingSubLabel}>App appearance</Text>
                </View>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#e2e8f0', true: '#c7d2fe' }}
                thumbColor={darkMode ? '#4f46e5' : '#94a3b8'}
              />
            </View>
          </View>

          {/* App info */}
          <View style={styles.appInfo}>
            <Text style={styles.appInfoText}>SurakshaAI Worker App v2.1</Text>
            <Text style={styles.appInfoText}>Member since {user?.joinDate || 'March 2022'}</Text>
          </View>

          {/* Logout */}
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <LogOut size={18} color="#ef4444" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>

          <View style={{ height: 24 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  blob: { position: 'absolute', width: 350, height: 350, borderRadius: 999, opacity: 0.4 },
  scroll: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 32 },
  workerCard: {
    backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 24, padding: 24, marginBottom: 16,
    alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.9)',
    shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.08, shadowRadius: 20,
  },
  avatarRing: {
    width: 96, height: 96, borderRadius: 30, borderWidth: 3, borderColor: '#c7d2fe',
    justifyContent: 'center', alignItems: 'center', marginBottom: 16,
  },
  avatar: { width: 80, height: 80, borderRadius: 24, backgroundColor: '#4f46e5', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 28, fontWeight: '800', color: '#ffffff' },
  workerName: { fontSize: 22, fontWeight: '800', color: '#0f172a', marginBottom: 4, letterSpacing: -0.3 },
  workerId: { fontSize: 14, color: '#64748b', fontWeight: '600', marginBottom: 12 },
  workerBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#eef2ff',
    borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5, marginBottom: 20,
  },
  workerBadgeText: { color: '#4f46e5', fontWeight: '700', fontSize: 12 },
  scoreRow: { flexDirection: 'row', width: '100%', justifyContent: 'space-around' },
  scoreBox: { alignItems: 'center' },
  scoreValue: { fontSize: 18, fontWeight: '800', color: '#0f172a', marginBottom: 2 },
  scoreLabel: { fontSize: 11, color: '#94a3b8', fontWeight: '600' },
  scoreDivider: { width: 1, height: 32, backgroundColor: '#e2e8f0' },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  statCard: {
    flex: 1, backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 18, padding: 16,
    alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.9)',
  },
  statIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  statValue: { fontSize: 20, fontWeight: '800', color: '#0f172a', marginBottom: 2 },
  statLabel: { fontSize: 11, color: '#64748b', fontWeight: '600', textAlign: 'center' },
  section: {
    backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 20, padding: 20, marginBottom: 16,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.9)',
  },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: '#0f172a', marginBottom: 16 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  infoIconBox: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#eef2ff', justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  infoTexts: {},
  infoLabel: { fontSize: 11, color: '#94a3b8', fontWeight: '600', marginBottom: 2, textTransform: 'uppercase', letterSpacing: 0.3 },
  infoValue: { fontSize: 14, color: '#0f172a', fontWeight: '700' },
  settingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  settingLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 14 },
  settingIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  settingLabel: { fontSize: 14, fontWeight: '700', color: '#0f172a', marginBottom: 2 },
  settingSubLabel: { fontSize: 12, color: '#94a3b8' },
  appInfo: { alignItems: 'center', marginBottom: 16, gap: 4 },
  appInfoText: { fontSize: 12, color: '#94a3b8' },
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    backgroundColor: '#fef2f2', borderWidth: 1, borderColor: '#fecaca',
    borderRadius: 16, paddingVertical: 16, marginBottom: 8,
  },
  logoutText: { color: '#ef4444', fontWeight: '700', fontSize: 15 },
});
