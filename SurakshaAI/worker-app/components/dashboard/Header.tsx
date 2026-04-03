import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Bell } from 'lucide-react-native';

interface HeaderProps {
  userName: string;
}

export function Header({ userName }: HeaderProps) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>Good morning,</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <View style={styles.headerActions}>
        <TouchableOpacity style={styles.iconButton}>
          <Bell size={24} color="#0f172a" />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.avatar}>
          <Text style={styles.avatarText}>{userName.charAt(0)}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
    marginBottom: 2,
  },
  userName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: -0.5,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.8)',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    backgroundColor: '#ef4444',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
