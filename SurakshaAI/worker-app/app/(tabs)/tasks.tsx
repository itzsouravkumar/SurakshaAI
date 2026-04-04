import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ClipboardList } from 'lucide-react-native';
import { TaskCard } from '@/components/tasks/TaskCard';
import { MOCK_TASKS, Task, TaskStatus } from '@/constants/mockData';

const FILTERS: { key: TaskStatus | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'accepted', label: 'Active' },
  { key: 'completed', label: 'Done' },
  { key: 'overdue', label: 'Overdue' },
];

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [filter, setFilter] = useState<TaskStatus | 'all'>('all');

  const filtered = filter === 'all' ? tasks : tasks.filter((t) => t.status === filter);

  const updateStatus = (id: string, newStatus: TaskStatus) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t)));
  };

  const handleAccept = (task: Task) => {
    updateStatus(task.id, 'accepted');
    Alert.alert('Task Accepted', `You have accepted: ${task.title}`);
  };

  const handleComplete = (task: Task) => {
    updateStatus(task.id, 'completed');
    Alert.alert('✅ Task Completed', `Well done! You completed: ${task.title}`);
  };

  const counts = {
    pending: tasks.filter((t) => t.status === 'pending').length,
    accepted: tasks.filter((t) => t.status === 'accepted').length,
    overdue: tasks.filter((t) => t.status === 'overdue').length,
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Background */}
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        <View style={[styles.blob, { backgroundColor: '#e0e7ff', top: -100, left: -80 }]} />
        <View style={[styles.blob, { backgroundColor: '#f3e8ff', bottom: 100, right: -100, width: 300, height: 300 }]} />
        <BlurView intensity={95} tint="light" style={StyleSheet.absoluteFillObject} />
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>My Tasks</Text>
            <Text style={styles.headerSub}>
              {counts.pending} pending · {counts.accepted} active · {counts.overdue} overdue
            </Text>
          </View>
          <View style={styles.headerIcon}>
            <ClipboardList size={22} color="#4f46e5" />
          </View>
        </View>

        {/* Filter chips */}
        <View style={styles.filterRow}>
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f.key}
              style={[styles.chip, filter === f.key && styles.chipActive]}
              onPress={() => setFilter(f.key)}
            >
              <Text style={[styles.chipText, filter === f.key && styles.chipTextActive]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TaskCard
              task={item}
              onAccept={() => handleAccept(item)}
              onComplete={() => handleComplete(item)}
            />
          )}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyEmoji}>🎉</Text>
              <Text style={styles.emptyText}>No tasks in this category</Text>
            </View>
          }
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  blob: { position: 'absolute', width: 350, height: 350, borderRadius: 999, opacity: 0.5 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 24, paddingTop: 12, paddingBottom: 16,
  },
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#0f172a', letterSpacing: -0.5 },
  headerSub: { fontSize: 13, color: '#64748b', marginTop: 2, fontWeight: '500' },
  headerIcon: {
    width: 44, height: 44, borderRadius: 14, backgroundColor: 'rgba(79,70,229,0.12)',
    justifyContent: 'center', alignItems: 'center',
  },
  filterRow: {
    flexDirection: 'row', paddingHorizontal: 20, gap: 8, marginBottom: 16,
    flexWrap: 'wrap',
  },
  chip: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.6)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.8)',
  },
  chipActive: { backgroundColor: '#4f46e5', borderColor: '#4f46e5' },
  chipText: { fontSize: 13, fontWeight: '600', color: '#64748b' },
  chipTextActive: { color: '#ffffff' },
  list: { paddingHorizontal: 20, paddingBottom: 32 },
  empty: { alignItems: 'center', marginTop: 60 },
  emptyEmoji: { fontSize: 40, marginBottom: 12 },
  emptyText: { fontSize: 16, color: '#64748b', fontWeight: '600' },
});
