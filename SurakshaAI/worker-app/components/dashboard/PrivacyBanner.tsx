import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ShieldCheck, ChevronRight } from 'lucide-react-native';
import { GlassCard } from '../ui/GlassCard';

export function PrivacyBanner() {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <GlassCard style={styles.bannerCard}>
        <View style={styles.bannerContent}>
          <View style={styles.bannerIconBox}>
            <ShieldCheck size={24} color="#10b981" />
          </View>
          <View style={styles.bannerText}>
            <Text style={styles.bannerTitle}>Policy Active</Text>
            <Text style={styles.bannerSubtitle}>4-week plan · Expires Apr 28, 2026</Text>
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
    backgroundColor: '#d1fae5',
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
