import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { ShieldCheck, ShieldAlert } from 'lucide-react-native';

interface SecurityScoreRingProps {
  score: number;
  size?: number;
}

export function SecurityScoreRing({ score, size = 160 }: SecurityScoreRingProps) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  // Determine color based on score
  const color = score >= 90 ? '#10b981' : score >= 70 ? '#f59e0b' : '#ef4444';

  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <Svg viewBox="0 0 140 140" width="100%" height="100%" style={{ transform: [{ rotate: '-90deg' }] }}>
        {/* Background Track */}
        <Circle cx="70" cy="70" r={radius} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="12" />
        {/* Progress */}
        <Circle 
          cx="70" cy="70" r={radius} 
          fill="none" 
          stroke={color} 
          strokeWidth="12" 
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </Svg>
      {/* Center Content */}
      <View style={[StyleSheet.absoluteFillObject, styles.centerContent]}>
        {score >= 90 ? (
          <ShieldCheck size={36} color={color} style={{ marginBottom: 4 }} />
        ) : (
          <ShieldAlert size={36} color={color} style={{ marginBottom: 4 }} />
        )}
        <Text style={[styles.scoreText, { color: color }]}>{score}</Text>
        <Text style={styles.scoreLabel}>/ 100</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -1,
    lineHeight: 40,
  },
  scoreLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94a3b8',
  },
});
