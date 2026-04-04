import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Clock, ChevronRight, CheckCircle2 } from 'lucide-react-native';
import { Task } from '@/constants/mockData';

const PRIORITY_COLORS = {
  high: { bg: '#fef2f2', text: '#ef4444', border: '#fecaca' },
  medium: { bg: '#fffbeb', text: '#f59e0b', border: '#fde68a' },
  low: { bg: '#f0fdf4', text: '#22c55e', border: '#bbf7d0' },
};

const STATUS_CONFIG = {
  pending: { label: 'Pending', color: '#f59e0b', bg: '#fffbeb' },
  accepted: { label: 'In Progress', color: '#4f46e5', bg: '#eef2ff' },
  completed: { label: 'Completed', color: '#10b981', bg: '#d1fae5' },
  overdue: { label: 'Overdue', color: '#ef4444', bg: '#fef2f2' },
};

interface TaskCardProps {
  task: Task;
  onAccept: () => void;
  onComplete: () => void;
}

export function TaskCard({ task, onAccept, onComplete }: TaskCardProps) {
  const priority = PRIORITY_COLORS[task.priority];
  const status = STATUS_CONFIG[task.status];
  const isCompleted = task.status === 'completed';

  return (
    <View style={[styles.card, isCompleted && styles.cardDone]}>
      {/* Top row */}
      <View style={styles.topRow}>
        <View style={[styles.priorityBadge, { backgroundColor: priority.bg, borderColor: priority.border }]}>
          <Text style={[styles.priorityText, { color: priority.text }]}>
            {task.priority.toUpperCase()}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
          <View style={[styles.statusDot, { backgroundColor: status.color }]} />
          <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
        </View>
      </View>

      {/* Category tag */}
      <Text style={styles.category}>{task.category}</Text>

      {/* Title */}
      <Text style={[styles.title, isCompleted && styles.titleDone]} numberOfLines={2}>
        {task.title}
      </Text>

      {/* Description */}
      <Text style={styles.description} numberOfLines={2}>
        {task.description}
      </Text>

      {/* Meta */}
      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <MapPin size={13} color="#94a3b8" />
          <Text style={styles.metaText} numberOfLines={1}>{task.location}</Text>
        </View>
        <View style={styles.metaItem}>
          <Clock size={13} color="#94a3b8" />
          <Text style={styles.metaText}>Due {task.dueTime}</Text>
        </View>
      </View>

      <Text style={styles.assignedBy}>Assigned by {task.assignedBy}</Text>

      {/* Actions */}
      {!isCompleted && (
        <View style={styles.actions}>
          {task.status === 'pending' || task.status === 'overdue' ? (
            <TouchableOpacity style={styles.acceptBtn} onPress={onAccept}>
              <Text style={styles.acceptBtnText}>Accept Task</Text>
            </TouchableOpacity>
          ) : null}
          {task.status === 'accepted' ? (
            <TouchableOpacity style={styles.completeBtn} onPress={onComplete}>
              <CheckCircle2 size={16} color="#10b981" />
              <Text style={styles.completeBtnText}>Mark Complete</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      )}

      {isCompleted && (
        <View style={styles.completedRow}>
          <CheckCircle2 size={16} color="#10b981" />
          <Text style={styles.completedText}>Task completed</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.75)', borderRadius: 20, padding: 18,
    marginBottom: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.8)',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 12,
  },
  cardDone: { opacity: 0.7 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  priorityBadge: {
    borderRadius: 8, borderWidth: 1, paddingHorizontal: 8, paddingVertical: 3,
  },
  priorityText: { fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4, gap: 5 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 12, fontWeight: '700' },
  category: { fontSize: 12, color: '#94a3b8', fontWeight: '600', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 },
  title: { fontSize: 16, fontWeight: '700', color: '#0f172a', marginBottom: 6, lineHeight: 22 },
  titleDone: { textDecorationLine: 'line-through', color: '#94a3b8' },
  description: { fontSize: 13, color: '#64748b', lineHeight: 19, marginBottom: 14 },
  metaRow: { flexDirection: 'row', gap: 16, marginBottom: 6 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 5, flex: 1 },
  metaText: { fontSize: 12, color: '#94a3b8', fontWeight: '500', flex: 1 },
  assignedBy: { fontSize: 12, color: '#94a3b8', marginBottom: 14 },
  actions: {},
  acceptBtn: {
    backgroundColor: '#4f46e5', borderRadius: 12, paddingVertical: 12, alignItems: 'center',
    shadowColor: '#4f46e5', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 8,
  },
  acceptBtnText: { color: '#ffffff', fontWeight: '700', fontSize: 14 },
  completeBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: '#d1fae5', borderRadius: 12, paddingVertical: 12,
    borderWidth: 1, borderColor: '#a7f3d0',
  },
  completeBtnText: { color: '#059669', fontWeight: '700', fontSize: 14 },
  completedRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  completedText: { color: '#059669', fontWeight: '600', fontSize: 13 },
});
