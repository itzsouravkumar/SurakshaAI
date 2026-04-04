import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, UserPlus } from 'lucide-react-native';
import { AuthInput } from '@/components/auth/AuthInput';
import { AuthButton } from '@/components/auth/AuthButton';
import { DEPARTMENTS, SHIFTS } from '@/constants/mockData';

type FormField = {
  fullName: string;
  phone: string;
  employeeId: string;
  department: string;
  shift: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterScreen() {
  const router = useRouter();
  const [form, setForm] = useState<FormField>({
    fullName: '',
    phone: '',
    employeeId: '',
    department: '',
    shift: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [deptOpen, setDeptOpen] = useState(false);
  const [shiftOpen, setShiftOpen] = useState(false);

  const set = (key: keyof FormField) => (val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleRegister = () => {
    if (!form.fullName || !form.phone || !form.employeeId || !form.password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (form.phone.length < 10) {
      setError('Enter a valid 10-digit phone number.');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push({
        pathname: '/(auth)/otp',
        params: { from: 'register', identifier: form.phone },
      });
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <LinearGradient
        colors={['#0a0a1a', '#0f0c29', '#1a1040']}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={[styles.orb, { top: -80, left: -60, backgroundColor: '#7c3aed' }]} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={22} color="rgba(255,255,255,0.7)" />
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.iconBox}>
            <UserPlus size={30} color="#ffffff" />
          </View>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Register as a SurakshaAI field worker
          </Text>
        </View>

        {error ? <Text style={styles.globalError}>{error}</Text> : null}

        <AuthInput label="Full Name *" placeholder="Rajesh Kumar" value={form.fullName} onChangeText={set('fullName')} />
        <AuthInput label="Phone Number *" placeholder="9876543210" value={form.phone} onChangeText={set('phone')} keyboardType="phone-pad" maxLength={10} />
        <AuthInput label="Employee ID *" placeholder="EMP-2047" value={form.employeeId} onChangeText={set('employeeId')} autoCapitalize="characters" />

        {/* Department Picker */}
        <View style={styles.pickerWrapper}>
          <Text style={styles.pickerLabel}>Department *</Text>
          <TouchableOpacity
            style={styles.pickerBtn}
            onPress={() => { setDeptOpen(!deptOpen); setShiftOpen(false); }}
          >
            <Text style={[styles.pickerBtnText, !form.department && { color: 'rgba(255,255,255,0.35)' }]}>
              {form.department || 'Select Department'}
            </Text>
          </TouchableOpacity>
          {deptOpen && (
            <View style={styles.dropdown}>
              {DEPARTMENTS.map((d) => (
                <TouchableOpacity
                  key={d}
                  style={styles.dropdownItem}
                  onPress={() => { set('department')(d); setDeptOpen(false); }}
                >
                  <Text style={[styles.dropdownItemText, form.department === d && { color: '#a5b4fc' }]}>{d}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Shift Picker */}
        <View style={styles.pickerWrapper}>
          <Text style={styles.pickerLabel}>Shift</Text>
          <TouchableOpacity
            style={styles.pickerBtn}
            onPress={() => { setShiftOpen(!shiftOpen); setDeptOpen(false); }}
          >
            <Text style={[styles.pickerBtnText, !form.shift && { color: 'rgba(255,255,255,0.35)' }]}>
              {form.shift || 'Select Shift'}
            </Text>
          </TouchableOpacity>
          {shiftOpen && (
            <View style={styles.dropdown}>
              {SHIFTS.map((s) => (
                <TouchableOpacity
                  key={s}
                  style={styles.dropdownItem}
                  onPress={() => { set('shift')(s); setShiftOpen(false); }}
                >
                  <Text style={[styles.dropdownItemText, form.shift === s && { color: '#a5b4fc' }]}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <AuthInput label="Password *" placeholder="Min. 6 characters" value={form.password} onChangeText={set('password')} secureTextEntry />
        <AuthInput label="Confirm Password *" placeholder="Re-enter password" value={form.confirmPassword} onChangeText={set('confirmPassword')} secureTextEntry />

        <AuthButton title="Register & Send OTP" onPress={handleRegister} loading={loading} style={{ marginTop: 8 }} />
        <AuthButton title="Already have an account? Login" onPress={() => router.replace('/(auth)/login')} variant="ghost" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 24, paddingTop: 60, paddingBottom: 60 },
  orb: { position: 'absolute', width: 260, height: 260, borderRadius: 999, opacity: 0.12 },
  backBtn: {
    width: 44, height: 44, justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 14, marginBottom: 32,
  },
  header: { marginBottom: 32 },
  iconBox: {
    width: 64, height: 64, backgroundColor: '#7c3aed', borderRadius: 20,
    justifyContent: 'center', alignItems: 'center', marginBottom: 20,
    shadowColor: '#7c3aed', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 16,
  },
  title: { fontSize: 30, fontWeight: '800', color: '#ffffff', marginBottom: 10, letterSpacing: -0.5 },
  subtitle: { fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 22 },
  globalError: {
    color: '#ef4444', backgroundColor: 'rgba(239,68,68,0.12)', borderRadius: 10,
    padding: 12, fontSize: 13, marginBottom: 16,
  },
  pickerWrapper: { marginBottom: 18 },
  pickerLabel: { fontSize: 13, fontWeight: '600', color: 'rgba(255,255,255,0.75)', marginBottom: 8, letterSpacing: 0.3 },
  pickerBtn: {
    backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14,
  },
  pickerBtnText: { fontSize: 16, color: '#ffffff' },
  dropdown: {
    backgroundColor: '#1e1b4b', borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 14, marginTop: 4, overflow: 'hidden',
  },
  dropdownItem: { paddingHorizontal: 16, paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)' },
  dropdownItemText: { color: 'rgba(255,255,255,0.7)', fontSize: 15 },
});
