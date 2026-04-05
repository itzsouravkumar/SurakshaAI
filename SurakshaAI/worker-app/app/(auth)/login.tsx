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
import { ArrowLeft, Shield } from 'lucide-react-native';
import { AuthInput } from '@/components/auth/AuthInput';
import { AuthButton } from '@/components/auth/AuthButton';
import { PLATFORMS } from '@/constants/mockData';

export default function LoginScreen() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!identifier.trim() || !password.trim()) {
      setError('Please enter your Gig Worker ID / Phone and password.');
      return;
    }
    setError('');
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setLoading(false);
      router.push({ pathname: '/(auth)/otp', params: { from: 'login', identifier } });
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
      <View style={[styles.orb, { top: -60, right: -60, backgroundColor: '#4f46e5' }]} />
      <View style={[styles.orb, { bottom: 80, left: -80, backgroundColor: '#7c3aed', opacity: 0.10 }]} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Back */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={22} color="rgba(255,255,255,0.7)" />
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconBox}>
            <Shield size={30} color="#ffffff" />
          </View>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>
          Login with your Gig Worker ID or registered phone number
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {error ? <Text style={styles.globalError}>{error}</Text> : null}

          <AuthInput
            label="Gig Worker ID or Phone Number"
            placeholder="GW-2047 or 9876543210"
            value={identifier}
            onChangeText={setIdentifier}
            autoCapitalize="none"
            keyboardType="default"
          />
          <AuthInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <AuthButton title="Send OTP & Continue" onPress={handleLogin} loading={loading} />
          <AuthButton
            title="Don't have an account? Register"
            onPress={() => router.replace('/(auth)/register')}
            variant="ghost"
          />
        </View>

        {/* Demo hint */}
        <View style={styles.demoBox}>
          <Text style={styles.demoTitle}>Demo Credentials</Text>
          <Text style={styles.demoText}>Gig Worker ID: GW-2047</Text>
          <Text style={styles.demoText}>Password: 123456  |  OTP: 123456</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 24, paddingTop: 60, paddingBottom: 40 },
  orb: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 999,
    opacity: 0.13,
  },
  backBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 14,
    marginBottom: 32,
  },
  header: { marginBottom: 36 },
  iconBox: {
    width: 64,
    height: 64,
    backgroundColor: '#4f46e5',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.5)',
    lineHeight: 22,
  },
  form: {},
  globalError: {
    color: '#ef4444',
    backgroundColor: 'rgba(239,68,68,0.12)',
    borderRadius: 10,
    padding: 12,
    fontSize: 13,
    marginBottom: 16,
  },
  forgotBtn: { alignSelf: 'flex-end', marginBottom: 24, marginTop: -8 },
  forgotText: { color: '#a5b4fc', fontSize: 13, fontWeight: '600' },
  demoBox: {
    marginTop: 32,
    backgroundColor: 'rgba(79,70,229,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(79,70,229,0.3)',
    borderRadius: 14,
    padding: 16,
  },
  demoTitle: { color: '#a5b4fc', fontWeight: '700', fontSize: 13, marginBottom: 6 },
  demoText: { color: 'rgba(255,255,255,0.5)', fontSize: 12, marginBottom: 2 },
});
