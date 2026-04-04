import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Shield } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 60,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0a0a1a', '#0f0c29', '#1a1040', '#0a0a1a']}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Ambient orbs */}
      <View style={[styles.orb, { top: -80, left: -80, backgroundColor: '#4f46e5', width: 280, height: 280 }]} />
      <View style={[styles.orb, { top: height * 0.5, right: -100, backgroundColor: '#7c3aed', width: 240, height: 240 }]} />
      <View style={[styles.orb, { bottom: -60, left: 40, backgroundColor: '#0ea5e9', width: 200, height: 200 }]} />

      <View style={styles.content}>
        {/* Logo */}
        <Animated.View
          style={[
            styles.logoContainer,
            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
          ]}
        >
          <View style={styles.logoRing}>
            <View style={styles.logoInner}>
              <Shield size={48} color="#ffffff" />
            </View>
          </View>
        </Animated.View>

        {/* Brand */}
        <Animated.View
          style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
        >
          <Text style={styles.brand}>SurakshaAI</Text>
          <Text style={styles.tagline}>Suraksha aapke haath mein</Text>
          <Text style={styles.taglineSub}>Safety in your hands</Text>
        </Animated.View>

        {/* Pill badges */}
        <Animated.View style={[styles.badgeRow, { opacity: buttonAnim }]}>
          {['AI-Powered', 'Real-time', 'Trusted'].map((b) => (
            <View key={b} style={styles.badge}>
              <Text style={styles.badgeText}>{b}</Text>
            </View>
          ))}
        </Animated.View>
      </View>

      {/* CTA Buttons */}
      <Animated.View style={[styles.buttons, { opacity: buttonAnim }]}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => router.push('/(auth)/login')}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryBtnText}>Login to Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => router.push('/(auth)/register')}
          activeOpacity={0.85}
        >
          <Text style={styles.secondaryBtnText}>Create New Account</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Powered by SurakshaAI v2.1 · Hackathon Edition
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
  orb: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.12,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  logoContainer: {
    marginBottom: 32,
  },
  logoRing: {
    width: 120,
    height: 120,
    borderRadius: 40,
    borderWidth: 1.5,
    borderColor: 'rgba(79,70,229,0.5)',
    backgroundColor: 'rgba(79,70,229,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoInner: {
    width: 88,
    height: 88,
    borderRadius: 28,
    backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
  },
  brand: {
    fontSize: 40,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: -1,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  taglineSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.35)',
    textAlign: 'center',
  },
  badgeRow: {
    flexDirection: 'row',
    marginTop: 32,
    gap: 10,
  },
  badge: {
    backgroundColor: 'rgba(79,70,229,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(79,70,229,0.4)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: '#a5b4fc',
    fontSize: 12,
    fontWeight: '600',
  },
  buttons: {
    paddingHorizontal: 24,
    paddingBottom: 48,
    gap: 12,
  },
  primaryBtn: {
    backgroundColor: '#4f46e5',
    borderRadius: 16,
    paddingVertical: 17,
    alignItems: 'center',
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
  },
  primaryBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  secondaryBtn: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    paddingVertical: 17,
    alignItems: 'center',
  },
  secondaryBtnText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.25)',
    fontSize: 12,
    marginTop: 8,
  },
});
