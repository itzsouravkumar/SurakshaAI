import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TrendingUp, RefreshCcw } from 'lucide-react-native';
import { GlassCard } from '../ui/GlassCard';
import { SecurityScoreRing } from '../ui/SecurityScoreRing';

interface HeroCardProps {
  securityScore: number;
}

export function HeroCard({ securityScore }: HeroCardProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const scoreLabel = securityScore >= 85 ? 'Low Risk' : securityScore >= 65 ? 'Medium Risk' : 'High Risk';
  const scoreColor = securityScore >= 85 ? '#059669' : securityScore >= 65 ? '#d97706' : '#ef4444';

  return (
    <GlassCard style={styles.heroCard} intensity={70}>
      <View style={styles.heroContent}>
        <View style={styles.heroTextContainer}>
          <Text style={styles.heroTitle}>Your Risk Score</Text>
          <Text style={[styles.heroStatus, { color: scoreColor }]}>
            {scoreLabel}
          </Text>
          <Text style={styles.heroSubtitle}>Coverage: Active this week</Text>
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumBadgeText}>₹45 / week · All triggers covered</Text>
          </View>
        </View>
        <SecurityScoreRing score={securityScore} size={140} />
      </View>

      <TouchableOpacity
        style={[styles.scanButton, isRefreshing && styles.scanButtonActive]}
        onPress={handleRefresh}
        activeOpacity={0.8}
      >
        {isRefreshing ? (
          <>
            <RefreshCcw size={20} color="#ffffff" style={styles.spinner} />
            <Text style={styles.scanButtonText}>Refreshing...</Text>
          </>
        ) : (
          <>
            <TrendingUp size={20} color="#ffffff" />
            <Text style={styles.scanButtonText}>Refresh Risk Score</Text>
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
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -1,
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
    marginBottom: 10,
  },
  premiumBadge: {
    backgroundColor: '#d1fae5',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  premiumBadgeText: {
    fontSize: 11,
    color: '#065f46',
    fontWeight: '700',
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10b981',
    marginHorizontal: 24,
    marginBottom: 24,
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  scanButtonActive: {
    backgroundColor: '#059669',
    opacity: 0.9,
  },
  scanButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  spinner: {
    transform: [{ rotate: '180deg' }],
  },
});
