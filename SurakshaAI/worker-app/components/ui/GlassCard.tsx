import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  intensity?: number;
}

export function GlassCard({ children, style, intensity = 50 }: GlassCardProps) {
  return (
    <BlurView intensity={intensity} tint="light" style={[styles.glassCard, style]}>
      <View style={styles.glassCardInner}>
        {children}
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  glassCard: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  glassCardInner: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
});
