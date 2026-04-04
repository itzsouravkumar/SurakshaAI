import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { BlurView } from 'expo-blur';
import {
  AlertTriangle,
  CheckCircle,
  MapPin,
  Phone,
  Siren,
} from 'lucide-react-native';
import { Header } from '@/components/dashboard/Header';
import { HeroCard } from '@/components/dashboard/HeroCard';
import { ActiveProtections } from '@/components/dashboard/ActiveProtections';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { PrivacyBanner } from '@/components/dashboard/PrivacyBanner';
import { useAuth } from '@/context/AuthContext';

const quickActions = [
  { id: 'sos', label: 'Panic SOS', icon: Siren, color: '#ef4444', bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.3)' },
  { id: 'checkin', label: 'Check In', icon: MapPin, color: '#10b981', bg: 'rgba(16,185,129,0.15)', border: 'rgba(16,185,129,0.3)' },
  { id: 'supervisor', label: 'Call Super.', icon: Phone, color: '#0ea5e9', bg: 'rgba(14,165,233,0.15)', border: 'rgba(14,165,233,0.3)' },
];

export default function DashboardScreen() {
  const { user } = useAuth();
  const securityScore = user?.securityScore ?? 94;
  const [checkedIn, setCheckedIn] = useState(false);

  const handleAction = (id: string) => {
    if (id === 'sos') {
      Alert.alert(
        '🚨 Panic SOS Triggered',
        'Your location and SOS signal have been sent to Supervisor Priya Sharma and the security control room.',
        [{ text: 'Cancel SOS', style: 'destructive' }, { text: 'OK' }]
      );
    } else if (id === 'checkin') {
      setCheckedIn(true);
      Alert.alert('✅ Checked In', 'Your check-in at Sector 12 Industrial Zone has been recorded at ' + new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }));
    } else if (id === 'supervisor') {
      Alert.alert('📞 Calling Supervisor', 'Connecting to Priya Sharma...\n(Mock call — no actual call made)');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Background blobs */}
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        <View style={[styles.blob, { backgroundColor: '#e0e7ff', top: '-10%', left: '-20%', width: 400, height: 400 }]} />
        <View style={[styles.blob, { backgroundColor: '#f3e8ff', top: '30%', right: '-30%', width: 450, height: 450 }]} />
        <View style={[styles.blob, { backgroundColor: '#ccfbf1', bottom: '-5%', left: '10%', width: 350, height: 350 }]} />
        <BlurView intensity={100} tint="light" style={StyleSheet.absoluteFillObject} />
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <Header userName={user?.name ?? 'Rajesh Kumar'} />

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Check-in banner */}
          {checkedIn && (
            <View style={styles.checkinBanner}>
              <CheckCircle size={16} color="#059669" />
              <Text style={styles.checkinText}>Checked in · Sector 12 Industrial Zone</Text>
            </View>
          )}

          <HeroCard securityScore={securityScore} />

          {/* Quick Actions */}
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <TouchableOpacity
                  key={action.id}
                  style={[styles.actionBtn, { backgroundColor: action.bg, borderColor: action.border }]}
                  onPress={() => handleAction(action.id)}
                  activeOpacity={0.75}
                >
                  <View style={[styles.actionIconBox, { backgroundColor: action.color + '22' }]}>
                    <Icon size={22} color={action.color} />
                  </View>
                  <Text style={[styles.actionLabel, { color: action.color }]}>{action.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <ActiveProtections />
          <RecentActivity />
          <PrivacyBanner />

          <View style={{ height: 24 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9' },
  blob: { position: 'absolute', borderRadius: 999, opacity: 0.7 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#0f172a', marginBottom: 14, marginTop: 8 },
  quickActions: { flexDirection: 'row', gap: 12, marginBottom: 28 },
  actionBtn: {
    flex: 1, borderRadius: 18, borderWidth: 1.5, alignItems: 'center',
    paddingVertical: 14, paddingHorizontal: 8,
  },
  actionIconBox: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  actionLabel: { fontSize: 12, fontWeight: '700', textAlign: 'center' },
  checkinBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#d1fae5', borderRadius: 12, padding: 12, marginBottom: 16,
  },
  checkinText: { color: '#065f46', fontWeight: '600', fontSize: 13 },
});
