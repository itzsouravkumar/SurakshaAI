// ============================================================
// SurakshaAI Worker App — Centralized Mock Data
// ============================================================

export const MOCK_WORKER = {
  id: 'EMP-2047',
  name: 'Rajesh Kumar',
  phone: '+91 98765 43210',
  department: 'Security Operations',
  shift: 'Morning (06:00 – 14:00)',
  site: 'Sector 12 Industrial Zone',
  supervisor: 'Priya Sharma',
  joinDate: 'March 2022',
  avatarInitials: 'RK',
  securityScore: 94,
  tasksCompleted: 128,
  alertsHandled: 47,
  reportsFiledCount: 23,
};

export const MOCK_CREDENTIALS = {
  phone: '9876543210',
  employeeId: 'EMP-2047',
  password: '123456',
  otp: '123456',
};

// ──────────────────────────────────────────
// Tasks
// ──────────────────────────────────────────
export type TaskStatus = 'pending' | 'accepted' | 'completed' | 'overdue';
export type TaskPriority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  description: string;
  location: string;
  assignedBy: string;
  dueTime: string;
  priority: TaskPriority;
  status: TaskStatus;
  category: string;
}

export const MOCK_TASKS: Task[] = [
  {
    id: 'T-001',
    title: 'Patrol Gate B – Night Shift Handover',
    description: 'Complete perimeter check at Gate B and document handover with incoming guard Arjun Singh.',
    location: 'Gate B, Block 3',
    assignedBy: 'Priya Sharma',
    dueTime: '07:30 AM',
    priority: 'high',
    status: 'pending',
    category: 'Patrol',
  },
  {
    id: 'T-002',
    title: 'CCTV Log Review – Zone C',
    description: 'Download and review last 4 hours of CCTV footage from Zone C server room cameras.',
    location: 'Zone C – Server Room',
    assignedBy: 'Priya Sharma',
    dueTime: '09:00 AM',
    priority: 'high',
    status: 'accepted',
    category: 'Surveillance',
  },
  {
    id: 'T-003',
    title: 'Visitor Log Verification',
    description: 'Cross-check visitor entries from yesterday with the approved visitor list. Report any discrepancy.',
    location: 'Reception Desk, Main Block',
    assignedBy: 'Admin Office',
    dueTime: '11:00 AM',
    priority: 'medium',
    status: 'pending',
    category: 'Admin',
  },
  {
    id: 'T-004',
    title: 'Fire Exit Inspection – Building A',
    description: 'Inspect all fire exits in Building A for unobstructed access. Mark checklist and photograph.',
    location: 'Building A – All Floors',
    assignedBy: 'Safety Officer',
    dueTime: '01:00 PM',
    priority: 'medium',
    status: 'completed',
    category: 'Safety',
  },
  {
    id: 'T-005',
    title: 'Equipment Check – Control Room',
    description: 'Verify all monitoring equipment is functional. Log any faults in the equipment register.',
    location: 'Control Room, Floor 1',
    assignedBy: 'Priya Sharma',
    dueTime: '08:00 AM',
    priority: 'low',
    status: 'overdue',
    category: 'Maintenance',
  },
];

// ──────────────────────────────────────────
// Alerts
// ──────────────────────────────────────────
export type AlertSeverity = 'critical' | 'warning' | 'info';

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  time: string;
  location: string;
  isRead: boolean;
  actionRequired: boolean;
}

export const MOCK_ALERTS: Alert[] = [
  {
    id: 'A-001',
    title: 'Unauthorized Access Attempt',
    description: 'Motion sensor triggered at Server Room B at 03:14 AM. No authorized personnel logged in that time.',
    severity: 'critical',
    time: '3:14 AM',
    location: 'Server Room B',
    isRead: false,
    actionRequired: true,
  },
  {
    id: 'A-002',
    title: 'Unsecured Wi-Fi Network Detected',
    description: 'Rogue access point "FREE_WIFI_9" detected near Parking Zone D. Possible honeypot risk.',
    severity: 'critical',
    time: '5:48 AM',
    location: 'Parking Zone D',
    isRead: false,
    actionRequired: true,
  },
  {
    id: 'A-003',
    title: 'Device Health Warning',
    description: 'Your patrol device battery is below 20%. Please charge before next patrol round.',
    severity: 'warning',
    time: '7:02 AM',
    location: 'Your Device',
    isRead: false,
    actionRequired: false,
  },
  {
    id: 'A-004',
    title: 'Perimeter Camera Offline – Zone F',
    description: 'Camera F-04 has been offline for 45 minutes. Technical team has been notified.',
    severity: 'warning',
    time: '6:20 AM',
    location: 'Zone F, East Perimeter',
    isRead: true,
    actionRequired: false,
  },
  {
    id: 'A-005',
    title: 'System Scan Completed',
    description: 'Daily device security scan completed. No malware or threats detected. Score: 94/100.',
    severity: 'info',
    time: '6:00 AM',
    location: 'System',
    isRead: true,
    actionRequired: false,
  },
  {
    id: 'A-006',
    title: 'Shift Briefing Available',
    description: 'Morning shift briefing notes from Priya Sharma are now available. Review before starting patrol.',
    severity: 'info',
    time: '5:45 AM',
    location: 'HQ Announcement',
    isRead: true,
    actionRequired: false,
  },
];

// ──────────────────────────────────────────
// Recent Activity (Dashboard Feed)
// ──────────────────────────────────────────
export const MOCK_ACTIVITY = [
  { id: 1, title: 'Patrol round completed – Gate A', app: 'Task Manager', time: '10m ago', type: 'success' },
  { id: 2, title: 'Security scan passed', app: 'SurakshaAI Shield', time: '1h ago', type: 'info' },
  { id: 3, title: 'Rogue network detected nearby', app: 'Network Guard', time: '3h ago', type: 'warning' },
  { id: 4, title: 'Incident report #IR-089 submitted', app: 'Reports', time: '5h ago', type: 'success' },
];

// ──────────────────────────────────────────
// Incident Report Types
// ──────────────────────────────────────────
export const INCIDENT_TYPES = [
  'Unauthorized Access',
  'Suspicious Person / Vehicle',
  'Equipment Malfunction',
  'Safety Hazard',
  'Network / Cyber Threat',
  'Theft / Vandalism',
  'Medical Emergency',
  'Fire / Smoke',
  'Other',
];

export const DEPARTMENTS = [
  'Security Operations',
  'IT & Surveillance',
  'Maintenance',
  'Administration',
  'Emergency Response',
  'Access Control',
];

export const SHIFTS = [
  'Morning (06:00 – 14:00)',
  'Evening (14:00 – 22:00)',
  'Night (22:00 – 06:00)',
  'Rotating',
];
