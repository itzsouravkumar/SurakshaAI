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
  CheckCircle,
  MapPin,
  IndianRupee,
  Zap,
} from 'lucide-react-native';
import { Header } from '@/components/dashboard/Header';
import { HeroCard } from '@/components/dashboard/HeroCard';
import { ActiveProtections } from '@/components/dashboard/ActiveProtections';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { PrivacyBanner } from '@/components/dashboard/PrivacyBanner';
import { useAuth } from '@/context/AuthContext';

const quickActions = [
  { id: 'claim', label: 'File Claim', icon: IndianRupee, color: '#10b981', bg: 'rgba(16,185,129,0.15)', border: 'rgba(16,185,129,0.3)' },
  { id: 'zone', label: 'My Zone', icon: MapPin, color: '#0ea5e9', bg: 'rgba(14,165,233,0.15)', border: 'rgba(14,165,233,0.3)' },
  { id: 'premium', label: 'Pay Premium', icon: Zap, color: '#f59e0b', bg: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.3)' },
];

export default function DashboardScreen() {
  const { user } = useAuth();
  const riskScore = user?.securityScore ?? 82;
  const [coverageActive, setCoverageActive] = useState(true);

  const handleAction = (id: string) => {
    if (id === 'claim') {
      Alert.alert(
        '📋 File a Claim',
        'Triggering events (rain, heat, AQI, bandh) are auto-detected by SurakshaAI. Tap "Reports" tab to manually file a disruption report.',
        [{ text: 'Go to Reports' }, { text: 'Cancel', style: 'cancel' }]
      );
    } else if (id === 'zone') {
      setCoverageActive(true);
      Alert.alert('📍 Active Zone', 'Currently tracking: Koramangala – BTM Zone\nAll triggers (rain, AQI, heat, bandh) are being monitored in real time.');
    } else if (id === 'premium') {
      Alert.alert('💳 Pay Weekly Premium', 'Your ₹45 weekly premium covers:\n• Heavy Rain\n• Extreme Heat (42°C+)\n• AQI Disruptions\n• Civic Bandh / Curfew\n\n(Mock payment — no actual charge)');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Background blobs */}
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        <View style={[styles.blob, { backgroundColor: '#d1fae5', top: '-10%', left: '-20%', width: 400, height: 400 }]} />
        <View style={[styles.blob, { backgroundColor: '#dbeafe', top: '30%', right: '-30%', width: 450, height: 450 }]} />
        <View style={[styles.blob, { backgroundColor: '#fef9c3', bottom: '-5%', left: '10%', width: 350, height: 350 }]} />
        <BlurView intensity={100} tint="light" style={StyleSheet.absoluteFillObject} />
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <Header userName={user?.name ?? 'Rajesh Kumar'} />

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Coverage active banner */}
          {coverageActive && (
            <View style={styles.coverageBanner}>
              <CheckCircle size={16} color="#059669" />
              <Text style={styles.coverageText}>Coverage Active · Koramangala – BTM Zone</Text>
            </View>
          )}

          <HeroCard securityScore={riskScore} />

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
  coverageBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#d1fae5', borderRadius: 12, padding: 12, marginBottom: 16,
  },
  coverageText: { color: '#065f46', fontWeight: '600', fontSize: 13 },
});
