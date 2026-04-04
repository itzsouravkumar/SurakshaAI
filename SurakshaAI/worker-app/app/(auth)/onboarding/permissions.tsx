import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Bell, Camera, ChevronRight, CheckCircle2 } from 'lucide-react-native';
import { AuthButton } from '@/components/auth/AuthButton';

const { width } = Dimensions.get('window');

interface Permission {
  id: string;
  icon: typeof MapPin;
  color: string;
  title: string;
  subtitle: string;
  reason: string;
  granted: boolean;
}

const PERMISSIONS: Permission[] = [
  {
    id: 'location',
    icon: MapPin,
    color: '#10b981',
    title: 'Location Access',
    subtitle: 'Required for patrol tracking',
    reason: 'Tracks your patrol route and verifies check-in at designated zones in real-time.',
    granted: false,
  },
  {
    id: 'notifications',
    icon: Bell,
    color: '#f59e0b',
    title: 'Push Notifications',
    subtitle: 'Required for security alerts',
    reason: 'Sends instant alerts for unauthorized access, threats, and supervisor messages.',
    granted: false,
  },
  {
    id: 'camera',
    icon: Camera,
    color: '#4f46e5',
    title: 'Camera Access',
    subtitle: 'Required for incident reports',
    reason: 'Captures photos of incidents, equipment faults, or suspicious activity for reports.',
    granted: false,
  },
];

export default function PermissionsScreen() {
  const router = useRouter();
  const [permissions, setPermissions] = useState(PERMISSIONS);

  const grant = (id: string) => {
    setPermissions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, granted: true } : p))
    );
  };

  const allGranted = permissions.every((p) => p.granted);
  const grantedCount = permissions.filter((p) => p.granted).length;

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#0a0a1a', '#0f0c29', '#1a1040']}
        style={StyleSheet.absoluteFillObject}
      />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.stepIndicator}>
            <Text style={styles.stepText}>Step 1 of 2</Text>
          </View>
          <Text style={styles.title}>App Permissions</Text>
          <Text style={styles.subtitle}>
            SurakshaAI needs the following permissions to keep you and your worksite safe.
          </Text>

          {/* Progress */}
          <View style={styles.progressRow}>
            {permissions.map((p, i) => (
              <View
                key={p.id}
                style={[
                  styles.dot,
                  i < grantedCount && { backgroundColor: '#10b981' },
                  i === grantedCount && { backgroundColor: '#4f46e5', width: 24 },
                ]}
              />
            ))}
          </View>
        </View>

        {/* Permission Cards */}
        {permissions.map((perm) => {
          const Icon = perm.icon;
          return (
            <View key={perm.id} style={[styles.card, perm.granted && styles.cardGranted]}>
              <View style={styles.cardTop}>
                <View style={[styles.permIcon, { backgroundColor: `${perm.color}18` }]}>
                  <Icon size={26} color={perm.granted ? '#10b981' : perm.color} />
                </View>
                <View style={styles.permText}>
                  <Text style={styles.permTitle}>{perm.title}</Text>
                  <Text style={styles.permSubtitle}>{perm.subtitle}</Text>
                </View>
                {perm.granted ? (
                  <CheckCircle2 size={24} color="#10b981" />
                ) : (
                  <TouchableOpacity style={styles.allowBtn} onPress={() => grant(perm.id)}>
                    <Text style={styles.allowBtnText}>Allow</Text>
                  </TouchableOpacity>
                )}
              </View>
              <Text style={styles.permReason}>{perm.reason}</Text>
            </View>
          );
        })}

        {/* CTA */}
        <AuthButton
          title={allGranted ? 'Continue →' : 'Allow All & Continue'}
          onPress={() => {
            setPermissions((p) => p.map((x) => ({ ...x, granted: true })));
            setTimeout(() => router.push('/(auth)/onboarding/profile'), 300);
          }}
          style={{ marginTop: 24 }}
        />
        <AuthButton
          title="Skip for now"
          onPress={() => router.push('/(auth)/onboarding/profile')}
          variant="ghost"
        />

        <Text style={styles.footNote}>
          Permissions can be changed later in Settings → App Permissions
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 24, paddingTop: 70, paddingBottom: 48 },
  header: { marginBottom: 32 },
  stepIndicator: {
    backgroundColor: 'rgba(79,70,229,0.2)', borderRadius: 20, paddingHorizontal: 14,
    paddingVertical: 6, alignSelf: 'flex-start', marginBottom: 20,
  },
  stepText: { color: '#a5b4fc', fontWeight: '700', fontSize: 12 },
  title: { fontSize: 30, fontWeight: '800', color: '#ffffff', letterSpacing: -0.5, marginBottom: 10 },
  subtitle: { fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 22, marginBottom: 24 },
  progressRow: { flexDirection: 'row', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.2)' },
  card: {
    backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)', borderRadius: 20, padding: 20, marginBottom: 16,
  },
  cardGranted: { borderColor: 'rgba(16,185,129,0.3)', backgroundColor: 'rgba(16,185,129,0.06)' },
  cardTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  permIcon: { width: 52, height: 52, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  permText: { flex: 1 },
  permTitle: { fontSize: 16, fontWeight: '700', color: '#ffffff', marginBottom: 3 },
  permSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.45)' },
  allowBtn: {
    backgroundColor: '#4f46e5', paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 10, shadowColor: '#4f46e5', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8,
  },
  allowBtnText: { color: '#ffffff', fontWeight: '700', fontSize: 13 },
  permReason: { fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 20 },
  footNote: { textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontSize: 12, marginTop: 16 },
});
