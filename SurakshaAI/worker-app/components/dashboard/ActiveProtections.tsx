import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { CloudRain, Thermometer, Wind, AlertOctagon } from 'lucide-react-native';
import { GlassCard } from '../ui/GlassCard';

const { width } = Dimensions.get('window');

const coverageTriggers = [
  { id: 'rain', icon: CloudRain, title: 'Heavy Rain', status: 'Monitoring', active: true, color: '#0ea5e9' },
  { id: 'heat', icon: Thermometer, title: 'Extreme Heat', status: 'Safe (38°C)', active: true, color: '#f59e0b' },
  { id: 'aqi', icon: Wind, title: 'AQI Monitor', status: 'Alert! 320', active: false, color: '#8b5cf6' },
  { id: 'bandh', icon: AlertOctagon, title: 'Civic Disruption', status: 'Clear', active: true, color: '#10b981' },
];

export function ActiveProtections() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Live Coverage Triggers</Text>
      <View style={styles.grid}>
        {coverageTriggers.map((item) => {
          const Icon = item.icon;
          return (
            <GlassCard key={item.id} style={styles.gridItem}>
              <TouchableOpacity style={styles.gridItemInner}>
                <View style={[styles.iconBox, { backgroundColor: `${item.color}15` }]}>
                  <Icon size={26} color={item.color} strokeWidth={2} />
                </View>
                <View style={styles.gridItemText}>
                  <Text style={styles.protectionTitle}>{item.title}</Text>
                  <View style={styles.statusRow}>
                    <View style={[styles.statusIndicator, { backgroundColor: item.active ? '#10b981' : '#f59e0b' }]} />
                    <Text style={[styles.protectionStatus, { color: item.active ? '#059669' : '#b45309' }]}>
                      {item.status}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </GlassCard>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  gridItem: {
    width: (width - 56) / 2,
    marginBottom: 16,
  },
  gridItemInner: {
    padding: 16,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  gridItemText: {},
  protectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 6,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  protectionStatus: {
    fontSize: 12,
    fontWeight: '600',
  },
});
