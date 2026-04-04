import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  Keyboard,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, MessageSquare } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import { AuthButton } from '@/components/auth/AuthButton';

const OTP_LENGTH = 6;
const MOCK_OTP = '123456';
const RESEND_SECONDS = 30;

export default function OTPScreen() {
  const router = useRouter();
  const { from, identifier } = useLocalSearchParams<{ from: string; identifier: string }>();
  const { login } = useAuth();
  const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(''));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_SECONDS);
  const inputs = useRef<(TextInput | null)[]>([]);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer((s) => s - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendTimer]);

  const handleChange = (val: string, idx: number) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[idx] = val.slice(-1);
    setOtp(next);
    setError('');
    if (val && idx < OTP_LENGTH - 1) inputs.current[idx + 1]?.focus();
    if (!val && idx > 0) inputs.current[idx - 1]?.focus();
  };

  const handleKeyPress = (e: any, idx: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus();
    }
  };

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 6, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -6, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
  };

  const handleVerify = () => {
    const entered = otp.join('');
    if (entered.length < OTP_LENGTH) {
      setError('Please enter the complete 6-digit OTP.');
      shake();
      return;
    }
    if (entered !== MOCK_OTP) {
      setError('Incorrect OTP. Use 1 2 3 4 5 6 for demo.');
      shake();
      return;
    }
    setError('');
    setLoading(true);
    Keyboard.dismiss();
    setTimeout(() => {
      login(); // set user from mock data
      setLoading(false);
      if (from === 'register') {
        router.replace('/(auth)/onboarding/permissions');
      } else {
        router.replace('/(tabs)');
      }
    }, 800);
  };

  const handleResend = () => {
    if (resendTimer > 0) return;
    setResendTimer(RESEND_SECONDS);
    setOtp(new Array(OTP_LENGTH).fill(''));
    inputs.current[0]?.focus();
  };

  const filled = otp.filter(Boolean).length;

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#0a0a1a', '#0f0c29', '#1a1040']}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={[styles.orb, { top: 100, right: -80, backgroundColor: '#4f46e5' }]} />

      <View style={styles.container}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={22} color="rgba(255,255,255,0.7)" />
        </TouchableOpacity>

        <View style={styles.iconBox}>
          <MessageSquare size={30} color="#ffffff" />
        </View>
        <Text style={styles.title}>OTP Verification</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit code sent to{'\n'}
          <Text style={styles.phone}>{identifier || '+91 XXXXX XXXXX'}</Text>
        </Text>

        {/* OTP Inputs */}
        <Animated.View
          style={[styles.otpRow, { transform: [{ translateX: shakeAnim }] }]}
        >
          {otp.map((digit, idx) => (
            <TextInput
              key={idx}
              ref={(r) => { inputs.current[idx] = r; }}
              style={[
                styles.otpBox,
                digit ? styles.otpBoxFilled : undefined,
                error ? styles.otpBoxError : undefined,
              ]}
              value={digit}
              onChangeText={(v) => handleChange(v, idx)}
              onKeyPress={(e) => handleKeyPress(e, idx)}
              keyboardType="number-pad"
              maxLength={1}
              caretHidden
              selectTextOnFocus
            />
          ))}
        </Animated.View>

        {/* Progress bar */}
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(filled / OTP_LENGTH) * 100}%` }]} />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <AuthButton title="Verify OTP" onPress={handleVerify} loading={loading} style={{ marginTop: 24 }} />

        {/* Resend */}
        <View style={styles.resendRow}>
          <Text style={styles.resendLabel}>Didn't receive the code?</Text>
          <TouchableOpacity onPress={handleResend} disabled={resendTimer > 0}>
            <Text style={[styles.resendBtn, resendTimer > 0 && { opacity: 0.4 }]}>
              {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Demo hint */}
        <View style={styles.hint}>
          <Text style={styles.hintText}>Demo OTP: 1 2 3 4 5 6</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 28, paddingTop: 64 },
  orb: { position: 'absolute', width: 240, height: 240, borderRadius: 999, opacity: 0.12 },
  backBtn: {
    width: 44, height: 44, justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 14, marginBottom: 32,
  },
  iconBox: {
    width: 64, height: 64, backgroundColor: '#4f46e5', borderRadius: 20,
    justifyContent: 'center', alignItems: 'center', marginBottom: 20,
    shadowColor: '#4f46e5', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 16,
  },
  title: { fontSize: 30, fontWeight: '800', color: '#ffffff', marginBottom: 10, letterSpacing: -0.5 },
  subtitle: { fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 24, marginBottom: 36 },
  phone: { color: '#a5b4fc', fontWeight: '700' },
  otpRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  otpBox: {
    width: 50, height: 58, borderRadius: 14, borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.15)', backgroundColor: 'rgba(255,255,255,0.06)',
    textAlign: 'center', fontSize: 24, fontWeight: '700', color: '#ffffff',
  },
  otpBoxFilled: { borderColor: '#4f46e5', backgroundColor: 'rgba(79,70,229,0.15)' },
  otpBoxError: { borderColor: '#ef4444' },
  progressBar: { height: 3, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden', marginBottom: 8 },
  progressFill: { height: '100%', backgroundColor: '#4f46e5', borderRadius: 2 },
  errorText: { color: '#ef4444', fontSize: 13, textAlign: 'center', marginTop: 4 },
  resendRow: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 20 },
  resendLabel: { color: 'rgba(255,255,255,0.4)', fontSize: 14 },
  resendBtn: { color: '#a5b4fc', fontWeight: '700', fontSize: 14 },
  hint: {
    marginTop: 32, backgroundColor: 'rgba(79,70,229,0.12)', borderRadius: 12,
    padding: 14, borderWidth: 1, borderColor: 'rgba(79,70,229,0.3)', alignItems: 'center',
  },
  hintText: { color: 'rgba(255,255,255,0.5)', fontSize: 13, letterSpacing: 2 },
});
