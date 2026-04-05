import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { User, CheckCircle2 } from 'lucide-react-native';
import { AuthInput } from '@/components/auth/AuthInput';
import { AuthButton } from '@/components/auth/AuthButton';
import { useAuth } from '@/context/AuthContext';
import { WORKING_HOURS } from '@/constants/mockData';

export default function OnboardingProfileScreen() {
  const router = useRouter();
  const { user, completeOnboarding } = useAuth();
  const [site, setSite] = useState('Koramangala – BTM Zone');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [selectedShift, setSelectedShift] = useState('Full Day (09:00 – 21:00)');
  const [photoAdded, setPhotoAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleComplete = () => {
    setLoading(true);
    setTimeout(() => {
      completeOnboarding();
      setLoading(false);
      router.replace('/(tabs)');
    }, 900);
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#0a0a1a', '#0f0c29', '#1a1040']}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={[styles.orb, { top: -60, right: -40 }]} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Step header */}
        <View style={styles.stepIndicator}>
          <Text style={styles.stepText}>Step 2 of 2</Text>
        </View>
        <Text style={styles.title}>Your Profile</Text>
        <Text style={styles.subtitle}>
          Confirm your delivery details to activate income protection.
        </Text>

        {/* Avatar select */}
        <View style={styles.avatarSection}>
          <TouchableOpacity
            style={[styles.avatarBtn, photoAdded && styles.avatarGranted]}
            onPress={() => setPhotoAdded(true)}
          >
            {photoAdded ? (
              <>
                <View style={styles.avatarMock}>
                  <Text style={styles.avatarInitials}>{user?.avatarInitials || 'RK'}</Text>
                </View>
                <CheckCircle2 size={20} color="#10b981" style={styles.avatarCheck} />
              </>
            ) : (
              <>
                <User size={32} color="rgba(255,255,255,0.45)" />
                <Text style={styles.avatarAddText}>Tap to add photo</Text>
              </>
            )}
          </TouchableOpacity>
           <Text style={styles.avatarName}>{user?.name || 'Rajesh Kumar'}</Text>
          <Text style={styles.avatarId}>{user?.id || 'GW-2047'} · {user?.department || 'Swiggy'}</Text>
        </View>

        {/* Shift selection */}
        <Text style={styles.sectionLabel}>Working Hours</Text>
        <View style={styles.shiftRow}>
          {WORKING_HOURS.slice(0, 3).map((s) => {
            const [label] = s.split(' (');
            return (
              <TouchableOpacity
                key={s}
                style={[styles.shiftChip, selectedShift === s && styles.shiftChipActive]}
                onPress={() => setSelectedShift(s)}
              >
                <Text style={[styles.shiftChipText, selectedShift === s && styles.shiftChipTextActive]}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <Text style={styles.shiftSubtext}>{selectedShift}</Text>

        {/* Form fields */}
        <AuthInput
          label="Delivery Zone"
          placeholder="e.g. Koramangala – BTM Zone"
          value={site}
          onChangeText={setSite}
        />
        <AuthInput
          label="Emergency Contact (optional)"
          placeholder="Name & Phone, e.g. Meena Devi 9876500000"
          value={emergencyContact}
          onChangeText={setEmergencyContact}
          keyboardType="default"
        />

        {/* Info card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>🔐 Your data is secure</Text>
          <Text style={styles.infoBody}>
            SurakshaAI encrypts all personal data. Location is used only for disruption trigger verification — never shared with your platform employer.
          </Text>
        </View>

        <AuthButton
          title="Complete Setup & Go to Dashboard"
          onPress={handleComplete}
          loading={loading}
          style={{ marginTop: 8 }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 24, paddingTop: 70, paddingBottom: 60 },
  orb: { position: 'absolute', width: 260, height: 260, borderRadius: 999, backgroundColor: '#7c3aed', opacity: 0.1 },
  stepIndicator: {
    backgroundColor: 'rgba(79,70,229,0.2)', borderRadius: 20, paddingHorizontal: 14,
    paddingVertical: 6, alignSelf: 'flex-start', marginBottom: 20,
  },
  stepText: { color: '#a5b4fc', fontWeight: '700', fontSize: 12 },
  title: { fontSize: 30, fontWeight: '800', color: '#ffffff', letterSpacing: -0.5, marginBottom: 10 },
  subtitle: { fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 22, marginBottom: 32 },
  avatarSection: { alignItems: 'center', marginBottom: 36 },
  avatarBtn: {
    width: 100, height: 100, borderRadius: 32, borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.15)', borderStyle: 'dashed',
    backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center',
    marginBottom: 14, position: 'relative',
  },
  avatarGranted: { borderStyle: 'solid', borderColor: '#10b981' },
  avatarMock: {
    width: 80, height: 80, borderRadius: 24, backgroundColor: '#4f46e5',
    justifyContent: 'center', alignItems: 'center',
  },
  avatarInitials: { fontSize: 28, fontWeight: '800', color: '#ffffff' },
  avatarCheck: { position: 'absolute', bottom: -6, right: -6 },
  avatarAddText: { fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 8, textAlign: 'center' },
  avatarName: { fontSize: 20, fontWeight: '700', color: '#ffffff', marginBottom: 4 },
  avatarId: { fontSize: 13, color: 'rgba(255,255,255,0.45)' },
  sectionLabel: { fontSize: 13, fontWeight: '600', color: 'rgba(255,255,255,0.75)', marginBottom: 12, letterSpacing: 0.3 },
  shiftRow: { flexDirection: 'row', gap: 10, marginBottom: 8 },
  shiftChip: {
    flex: 1, paddingVertical: 10, borderRadius: 12, borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)', backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center',
  },
  shiftChipActive: { backgroundColor: 'rgba(79,70,229,0.25)', borderColor: '#4f46e5' },
  shiftChipText: { fontSize: 13, fontWeight: '600', color: 'rgba(255,255,255,0.5)' },
  shiftChipTextActive: { color: '#a5b4fc' },
  shiftSubtext: { fontSize: 12, color: 'rgba(255,255,255,0.3)', marginBottom: 24, textAlign: 'center' },
  infoCard: {
    backgroundColor: 'rgba(16,185,129,0.08)', borderWidth: 1, borderColor: 'rgba(16,185,129,0.2)',
    borderRadius: 16, padding: 18, marginBottom: 24,
  },
  infoTitle: { color: '#6ee7b7', fontWeight: '700', fontSize: 14, marginBottom: 8 },
  infoBody: { color: 'rgba(255,255,255,0.45)', fontSize: 13, lineHeight: 20 },
});
