import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Animated,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FileText, Camera, MapPin, ChevronDown, CheckCircle2, Send } from 'lucide-react-native';
import { INCIDENT_TYPES } from '@/constants/mockData';
import { useAuth } from '@/context/AuthContext';

export default function ReportsScreen() {
  const { user } = useAuth();
  const [incidentType, setIncidentType] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [photoAdded, setPhotoAdded] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reportId, setReportId] = useState('');

  const handleSubmit = () => {
    if (!incidentType || !location.trim() || !description.trim()) {
      Alert.alert('Missing Information', 'Please fill in incident type, location, and description.');
      return;
    }
    setLoading(true);
    const id = `IR-${Math.floor(Math.random() * 900) + 100}`;
    setReportId(id);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setIncidentType('');
    setLocation('');
    setDescription('');
    setPhotoAdded(false);
    setSubmitted(false);
    setReportId('');
  };

  if (submitted) {
    return (
      <View style={{ flex: 1 }}>
        <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
          <View style={[styles.blob, { backgroundColor: '#d1fae5', top: -80, left: -60 }]} />
          <BlurView intensity={95} tint="light" style={StyleSheet.absoluteFillObject} />
        </View>
        <SafeAreaView style={styles.successContainer}>
          <View style={styles.successCard}>
            <View style={styles.successIcon}>
              <CheckCircle2 size={52} color="#10b981" />
            </View>
            <Text style={styles.successTitle}>Report Submitted!</Text>
            <Text style={styles.successSubtitle}>
              Your incident report has been filed and shared with Supervisor Priya Sharma.
            </Text>
            <View style={styles.reportIdBox}>
              <Text style={styles.reportIdLabel}>Report ID</Text>
              <Text style={styles.reportIdValue}>{reportId}</Text>
            </View>
            <View style={styles.reportDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Type</Text>
                <Text style={styles.detailValue}>{incidentType}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Location</Text>
                <Text style={styles.detailValue}>{location}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Filed by</Text>
                <Text style={styles.detailValue}>{user?.name || 'Rajesh Kumar'}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Time</Text>
                <Text style={styles.detailValue}>
                  {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.newReportBtn} onPress={handleReset}>
              <Text style={styles.newReportBtnText}>File Another Report</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        <View style={[styles.blob, { backgroundColor: '#e0e7ff', top: -60, right: -80 }]} />
        <BlurView intensity={95} tint="light" style={StyleSheet.absoluteFillObject} />
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerIcon}>
              <FileText size={22} color="#4f46e5" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.headerTitle}>File Incident Report</Text>
              <Text style={styles.headerSub}>Report and log any security incidents</Text>
            </View>
          </View>

          {/* Worker info read-only */}
          <View style={styles.workerInfo}>
            <View style={styles.workerAvatar}>
              <Text style={styles.workerAvatarText}>{user?.avatarInitials || 'RK'}</Text>
            </View>
            <View>
              <Text style={styles.workerName}>{user?.name || 'Rajesh Kumar'}</Text>
              <Text style={styles.workerDept}>{user?.id || 'EMP-2047'} · {user?.department || 'Security Operations'}</Text>
            </View>
          </View>

          {/* Incident Type */}
          <Text style={styles.fieldLabel}>Incident Type *</Text>
          <TouchableOpacity style={styles.dropdown} onPress={() => setTypeOpen(!typeOpen)}>
            <Text style={[styles.dropdownText, !incidentType && styles.placeholder]}>
              {incidentType || 'Select incident type'}
            </Text>
            <ChevronDown size={18} color="#94a3b8" />
          </TouchableOpacity>
          {typeOpen && (
            <View style={styles.dropdownList}>
              {INCIDENT_TYPES.map((t) => (
                <TouchableOpacity
                  key={t}
                  style={styles.dropdownItem}
                  onPress={() => { setIncidentType(t); setTypeOpen(false); }}
                >
                  <Text style={[styles.dropdownItemText, incidentType === t && styles.dropdownItemActive]}>
                    {t}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Location */}
          <Text style={styles.fieldLabel}>Location *</Text>
          <View style={styles.inputWrapper}>
            <MapPin size={16} color="#94a3b8" />
            <TextInput
              style={styles.input}
              placeholder="e.g. Gate B, Block 3"
              placeholderTextColor="#94a3b8"
              value={location}
              onChangeText={setLocation}
            />
          </View>

          {/* Description */}
          <Text style={styles.fieldLabel}>Description *</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Describe what happened, who was involved, and any actions taken..."
            placeholderTextColor="#94a3b8"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
          <Text style={styles.charCount}>{description.length} / 500 characters</Text>

          {/* Photo */}
          <Text style={styles.fieldLabel}>Attach Photo</Text>
          <TouchableOpacity
            style={[styles.photoBtn, photoAdded && styles.photoBtnAdded]}
            onPress={() => setPhotoAdded(true)}
          >
            {photoAdded ? (
              <>
                <CheckCircle2 size={22} color="#10b981" />
                <Text style={styles.photoBtnTextAdded}>Photo attached</Text>
              </>
            ) : (
              <>
                <Camera size={22} color="#64748b" />
                <Text style={styles.photoBtnText}>Tap to take photo or attach from gallery</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Submit */}
          <TouchableOpacity
            style={[styles.submitBtn, loading && { opacity: 0.7 }]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <Text style={styles.submitBtnText}>Submitting...</Text>
            ) : (
              <>
                <Send size={18} color="#ffffff" />
                <Text style={styles.submitBtnText}>Submit Report</Text>
              </>
            )}
          </TouchableOpacity>

          <Text style={styles.footNote}>
            Reports are encrypted and forwarded to your supervisor immediately.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  blob: { position: 'absolute', width: 350, height: 350, borderRadius: 999, opacity: 0.45 },
  scroll: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 48 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 20 },
  headerIcon: { width: 48, height: 48, borderRadius: 14, backgroundColor: 'rgba(79,70,229,0.1)', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#0f172a', letterSpacing: -0.5 },
  headerSub: { fontSize: 13, color: '#64748b', fontWeight: '500', marginTop: 2 },
  workerInfo: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 16, padding: 14,
    marginBottom: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.8)',
  },
  workerAvatar: { width: 42, height: 42, borderRadius: 12, backgroundColor: '#4f46e5', justifyContent: 'center', alignItems: 'center' },
  workerAvatarText: { color: '#ffffff', fontWeight: '800', fontSize: 15 },
  workerName: { fontSize: 15, fontWeight: '700', color: '#0f172a' },
  workerDept: { fontSize: 12, color: '#64748b', marginTop: 2 },
  fieldLabel: { fontSize: 13, fontWeight: '700', color: '#374151', marginBottom: 8, marginTop: 16 },
  dropdown: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.75)', borderRadius: 14, borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)', paddingHorizontal: 16, paddingVertical: 14,
  },
  dropdownText: { fontSize: 15, color: '#0f172a', fontWeight: '500' },
  placeholder: { color: '#94a3b8' },
  dropdownList: {
    backgroundColor: '#ffffff', borderRadius: 14, borderWidth: 1, borderColor: 'rgba(0,0,0,0.08)',
    marginTop: 4, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 16,
  },
  dropdownItem: { paddingHorizontal: 16, paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  dropdownItemText: { fontSize: 14, color: '#374151' },
  dropdownItemActive: { color: '#4f46e5', fontWeight: '700' },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: 'rgba(255,255,255,0.75)', borderRadius: 14, borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)', paddingHorizontal: 16, paddingVertical: 14,
  },
  input: { flex: 1, fontSize: 15, color: '#0f172a' },
  textArea: {
    backgroundColor: 'rgba(255,255,255,0.75)', borderRadius: 14, borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)', paddingHorizontal: 16, paddingVertical: 14,
    fontSize: 15, color: '#0f172a', minHeight: 100, lineHeight: 22,
  },
  charCount: { fontSize: 11, color: '#94a3b8', textAlign: 'right', marginTop: 4 },
  photoBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: 'rgba(255,255,255,0.75)', borderRadius: 14, borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.08)', borderStyle: 'dashed', paddingHorizontal: 16, paddingVertical: 18,
  },
  photoBtnAdded: { borderStyle: 'solid', borderColor: '#10b981', backgroundColor: '#d1fae5' },
  photoBtnText: { fontSize: 14, color: '#64748b' },
  photoBtnTextAdded: { fontSize: 14, color: '#059669', fontWeight: '700' },
  submitBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    backgroundColor: '#4f46e5', borderRadius: 16, paddingVertical: 17, marginTop: 28,
    shadowColor: '#4f46e5', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16,
  },
  submitBtnText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
  footNote: { textAlign: 'center', color: '#94a3b8', fontSize: 12, marginTop: 16 },
  // Success state
  successContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 28 },
  successCard: {
    backgroundColor: 'rgba(255,255,255,0.85)', borderRadius: 28, padding: 32, width: '100%',
    alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.9)',
    shadowColor: '#000', shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.1, shadowRadius: 24,
  },
  successIcon: {
    width: 88, height: 88, borderRadius: 28, backgroundColor: '#d1fae5',
    justifyContent: 'center', alignItems: 'center', marginBottom: 20,
  },
  successTitle: { fontSize: 26, fontWeight: '800', color: '#0f172a', marginBottom: 10, letterSpacing: -0.5 },
  successSubtitle: { fontSize: 15, color: '#64748b', textAlign: 'center', lineHeight: 22, marginBottom: 24 },
  reportIdBox: {
    backgroundColor: '#f0fdf4', borderRadius: 14, padding: 16, width: '100%',
    alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: '#a7f3d0',
  },
  reportIdLabel: { fontSize: 12, color: '#059669', fontWeight: '600', marginBottom: 4 },
  reportIdValue: { fontSize: 22, fontWeight: '800', color: '#065f46' },
  reportDetails: { width: '100%', marginBottom: 24 },
  detailRow: {
    flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: '#f1f5f9',
  },
  detailLabel: { fontSize: 13, color: '#94a3b8', fontWeight: '600' },
  detailValue: { fontSize: 13, color: '#0f172a', fontWeight: '700', maxWidth: '60%', textAlign: 'right' },
  newReportBtn: {
    backgroundColor: '#4f46e5', borderRadius: 14, paddingVertical: 14, paddingHorizontal: 32,
    shadowColor: '#4f46e5', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.25, shadowRadius: 12,
  },
  newReportBtnText: { color: '#ffffff', fontWeight: '700', fontSize: 15 },
});
