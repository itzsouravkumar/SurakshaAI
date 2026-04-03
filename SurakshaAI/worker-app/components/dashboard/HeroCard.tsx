import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Shield, RefreshCcw } from 'lucide-react-native';
import { GlassCard } from '../ui/GlassCard';
import { SecurityScoreRing } from '../ui/SecurityScoreRing';

interface HeroCardProps {
  securityScore: number;
}

export function HeroCard({ securityScore }: HeroCardProps) {
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2000); // Mock scan duration
  };

  return (
    <GlassCard style={styles.heroCard} intensity={70}>
      <View style={styles.heroContent}>
        <View style={styles.heroTextContainer}>
          <Text style={styles.heroTitle}>Your device is</Text>
          <Text style={[styles.heroStatus, { color: securityScore >= 90 ? '#059669' : '#b45309' }]}>
            Protected
          </Text>
          <Text style={styles.heroSubtitle}>Last scanned 2 hours ago</Text>
        </View>
        <SecurityScoreRing score={securityScore} size={140} />
      </View>

      <TouchableOpacity 
        style={[styles.scanButton, isScanning && styles.scanButtonActive]} 
        onPress={handleScan}
        activeOpacity={0.8}
      >
        {isScanning ? (
          <>
             {/* Note: React Native run-time spinner logic might be complex. Using simple refresh icon. */}
            <RefreshCcw size={20} color="#ffffff" style={styles.spinner} />
            <Text style={styles.scanButtonText}>Scanning...</Text>
          </>
        ) : (
          <>
            <Shield size={20} color="#ffffff" />
            <Text style={styles.scanButtonText}>Smart Scan</Text>
          </>
        )}
      </TouchableOpacity>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    marginBottom: 32,
  },
  heroContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
  },
  heroTextContainer: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 16,
    color: '#475569',
    fontWeight: '600',
    marginBottom: 4,
  },
  heroStatus: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -1,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4f46e5',
    marginHorizontal: 24,
    marginBottom: 24,
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  scanButtonActive: {
    backgroundColor: '#4338ca',
    opacity: 0.9,
  },
  scanButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  spinner: {
    transform: [{ rotate: '180deg' }], // Simplified visual for spinning context
  },
});
