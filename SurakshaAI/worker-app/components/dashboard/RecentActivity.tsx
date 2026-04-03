import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckCircle2, AlertCircle, Shield } from 'lucide-react-native';
import { GlassCard } from '../ui/GlassCard';

const recentActivity = [
  { id: 1, title: 'Blocked tracking cookie', app: 'Chrome Browser', time: '10m ago', type: 'success' },
  { id: 2, title: 'App scan completed', app: 'System Scan', time: '2h ago', type: 'info' },
  { id: 3, title: 'Unsecured Wi-Fi detected', app: 'Network Guard', time: '1d ago', type: 'warning' },
];

export function RecentActivity() {
  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      
      <GlassCard style={styles.listCard}>
        {recentActivity.map((activity, index) => (
          <View key={activity.id} style={[
            styles.listItem, 
            index === recentActivity.length - 1 && styles.lastListItem
          ]}>
            <View style={[
              styles.listIconBox, 
              activity.type === 'success' ? { backgroundColor: '#d1fae5' } :
              activity.type === 'warning' ? { backgroundColor: '#fef3c7' } :
              { backgroundColor: '#e0e7ff' }
            ]}>
              {activity.type === 'success' ? <CheckCircle2 size={18} color="#059669" /> :
                activity.type === 'warning' ? <AlertCircle size={18} color="#d97706" /> :
                <Shield size={18} color="#4f46e5" />}
            </View>
            <View style={styles.listTextContainer}>
              <Text style={styles.listTitle} numberOfLines={1}>{activity.title}</Text>
              <Text style={styles.listApp}>{activity.app}</Text>
            </View>
            <Text style={styles.listTime}>{activity.time}</Text>
          </View>
        ))}
      </GlassCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 0,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4f46e5',
    marginBottom: 2,
  },
  listCard: {
    marginBottom: 24,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.4)',
  },
  lastListItem: {
    borderBottomWidth: 0,
  },
  listIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  listTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  listTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  listApp: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  listTime: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
});
