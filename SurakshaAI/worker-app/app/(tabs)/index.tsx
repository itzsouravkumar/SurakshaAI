import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { BlurView } from 'expo-blur';
import { Header } from '@/components/dashboard/Header';
import { HeroCard } from '@/components/dashboard/HeroCard';
import { ActiveProtections } from '@/components/dashboard/ActiveProtections';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { PrivacyBanner } from '@/components/dashboard/PrivacyBanner';

export default function UserDashboardScreen() {
  const securityScore = 94; // Example score

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Animated Mesh Gradient Background (Simulated) */}
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        <View style={[styles.blob, { backgroundColor: '#e0e7ff', top: '-10%', left: '-20%', width: 400, height: 400 }]} />
        <View style={[styles.blob, { backgroundColor: '#f3e8ff', top: '30%', right: '-30%', width: 450, height: 450 }]} />
        <View style={[styles.blob, { backgroundColor: '#ccfbf1', bottom: '-5%', left: '10%', width: 350, height: 350 }]} />
        <BlurView intensity={100} tint="light" style={StyleSheet.absoluteFillObject} />
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <Header userName="Alex" />

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <HeroCard securityScore={securityScore} />
          
          <ActiveProtections />
          
          <RecentActivity />
          
          <PrivacyBanner />

          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  blob: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.7,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});
