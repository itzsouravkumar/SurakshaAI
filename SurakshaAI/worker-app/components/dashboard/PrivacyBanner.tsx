import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Fingerprint, ChevronRight } from 'lucide-react-native';
import { GlassCard } from '../ui/GlassCard';

export function PrivacyBanner() {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <GlassCard style={styles.bannerCard}>
        <View style={styles.bannerContent}>
          <View style={styles.bannerIconBox}>
            <Fingerprint size={24} color="#4f46e5" />
          </View>
          <View style={styles.bannerText}>
            <Text style={styles.bannerTitle}>Privacy Audit</Text>
            <Text style={styles.bannerSubtitle}>2 apps have location access</Text>
          </View>
          <ChevronRight size={20} color="#94a3b8" />
        </View>
      </GlassCard>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bannerCard: {
    marginBottom: 20,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  bannerIconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#e0e7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  bannerText: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
  }
});
