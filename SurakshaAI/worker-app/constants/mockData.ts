// ============================================================
// SurakshaAI Worker App — Centralized Mock Data (Gig Worker)
// ============================================================

export const MOCK_WORKER = {
  id: 'GW-2047',
  name: 'Rajesh Kumar',
  phone: '+91 98765 43210',
  department: 'Swiggy',                          // platform
  shift: 'Full Day (09:00 – 21:00)',              // working hours
  site: 'Koramangala – BTM Zone',                // delivery zone
  joinDate: 'March 2022',
  avatarInitials: 'RK',
  securityScore: 82,                             // risk score
  tasksCompleted: 3248,                          // deliveries completed
  alertsHandled: 7,                              // claims settled
  reportsFiledCount: 4,
};

export const MOCK_CREDENTIALS = {
  phone: '9876543210',
  gigId: 'GW-2047',
  password: '123456',
  otp: '123456',
};

// ──────────────────────────────────────────
// Policy / Coverage Items (replaces Tasks)
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
    id: 'P-001',
    title: 'Weekly Premium Due',
    description: 'Pay ₹45 to activate coverage for this week. Covers heavy rain, extreme heat & AQI triggers.',
    location: 'Koramangala – BTM Zone',
    assignedBy: 'SurakshaAI',
    dueTime: 'Today 11:59 PM',
    priority: 'high',
    status: 'pending',
    category: 'Premium',
  },
  {
    id: 'C-001',
    title: 'Claim #CLM-089 – Rain Payout',
    description: 'Rainfall exceeded 35mm threshold yesterday. ₹350 auto-payout is being processed to your UPI.',
    location: 'Bangalore South Zone',
    assignedBy: 'AI Trigger Engine',
    dueTime: 'Processing',
    priority: 'high',
    status: 'accepted',
    category: 'Claim',
  },
  {
    id: 'P-002',
    title: 'Update KYC Documents',
    description: 'Upload a valid Aadhaar or driving licence to stay eligible for instant payouts.',
    location: 'My Profile',
    assignedBy: 'Compliance',
    dueTime: 'Within 3 days',
    priority: 'medium',
    status: 'pending',
    category: 'KYC',
  },
  {
    id: 'C-002',
    title: 'Claim #CLM-074 – AQI Disruption',
    description: 'GRAP Stage III restrictions were active on Dec 18. ₹280 payout credited successfully.',
    location: 'Delhi NCR Zone',
    assignedBy: 'AI Trigger Engine',
    dueTime: 'Credited',
    priority: 'medium',
    status: 'completed',
    category: 'Claim',
  },
  {
    id: 'P-003',
    title: 'Renew Coverage Pack',
    description: 'Your 4-week coverage pack expired 2 days ago. Renew now to stay protected during disruptions.',
    location: 'My Policy',
    assignedBy: 'SurakshaAI',
    dueTime: '2 days ago',
    priority: 'low',
    status: 'overdue',
    category: 'Premium',
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
    title: '🌧️ Heavy Rain Alert – Coverage Triggered',
    description: 'Rainfall crossed 35mm threshold in Koramangala zone. Auto-payout of ₹350 is being processed. Expect credit within 2 hours.',
    severity: 'critical',
    time: '6:14 AM',
    location: 'Koramangala – BTM Zone',
    isRead: false,
    actionRequired: true,
  },
  {
    id: 'A-002',
    title: '🔴 AQI Critical – GRAP Stage III Active',
    description: 'Air Quality Index crossed 400+ in your delivery zone. Outdoor work is restricted. Coverage payout of ₹280 will be evaluated today.',
    severity: 'critical',
    time: '7:30 AM',
    location: 'Bangalore South',
    isRead: false,
    actionRequired: true,
  },
  {
    id: 'A-003',
    title: '⚠️ Premium Payment Pending',
    description: 'Your weekly premium of ₹45 is due today. Pay now to ensure coverage for rain and disruption events this week.',
    severity: 'warning',
    time: '8:00 AM',
    location: 'My Account',
    isRead: false,
    actionRequired: false,
  },
  {
    id: 'A-004',
    title: '🌡️ Extreme Heat Warning',
    description: 'IMD forecasts 43°C+ for next 3 days. Your heat-trigger coverage threshold is 42°C. You may qualify for a payout.',
    severity: 'warning',
    time: '5:45 AM',
    location: 'Bangalore Central',
    isRead: true,
    actionRequired: false,
  },
  {
    id: 'A-005',
    title: '✅ Risk Score Updated',
    description: 'Your weekly risk score has been recalculated as 82/100 based on delivery history and zone conditions. No premium increase.',
    severity: 'info',
    time: '6:00 AM',
    location: 'SurakshaAI Engine',
    isRead: true,
    actionRequired: false,
  },
  {
    id: 'A-006',
    title: '📢 New Coverage Feature: Civic Disruption',
    description: 'Bandh and curfew disruptions are now covered under your plan. Verify your zone eligibility in the Policy tab.',
    severity: 'info',
    time: '5:00 AM',
    location: 'Product Update',
    isRead: true,
    actionRequired: false,
  },
];

// ──────────────────────────────────────────
// Recent Activity (Dashboard Feed)
// ──────────────────────────────────────────
export const MOCK_ACTIVITY = [
  { id: 1, title: 'Rain payout ₹350 credited to UPI', app: 'Claim Engine', time: '2h ago', type: 'success' },
  { id: 2, title: 'Risk score updated: 82/100', app: 'AI Risk Engine', time: '6h ago', type: 'info' },
  { id: 3, title: 'AQI crossed 400 – payout evaluation started', app: 'Trigger Monitor', time: '8h ago', type: 'warning' },
  { id: 4, title: 'Weekly premium ₹45 paid', app: 'Payment', time: '3 days ago', type: 'success' },
];

// ──────────────────────────────────────────
// Claim / Incident Report Types
// ──────────────────────────────────────────
export const INCIDENT_TYPES = [
  'Heavy Rainfall – Unable to Work',
  'Extreme Heat (42°C+)',
  'Hazardous AQI / GRAP Restriction',
  'Bandh / Curfew / Civic Disruption',
  'Flooding / Waterlogging in Zone',
  'Platform Outage (Partial)',
  'Other',
];

export const PLATFORMS = [
  'Swiggy',
  'Zomato',
  'Blinkit',
  'Zepto',
  'Amazon Flex',
  'Porter',
  'Dunzo',
  'Other',
];

export const VEHICLE_TYPES = [
  'Two-Wheeler (Bike)',
  'Two-Wheeler (Scooter)',
  'Three-Wheeler (Auto)',
  'Cycle',
  'On Foot',
];

export const DELIVERY_ZONES = [
  'Koramangala – BTM (Bangalore)',
  'Indiranagar – Whitefield (Bangalore)',
  'Connaught Place – Saket (Delhi)',
  'Bandra – Andheri (Mumbai)',
  'T Nagar – Adyar (Chennai)',
  'Hitech City – Gachibowli (Hyderabad)',
  'Other',
];

export const WORKING_HOURS = [
  'Morning (06:00 – 14:00)',
  'Evening (14:00 – 22:00)',
  'Full Day (09:00 – 21:00)',
  'Night (20:00 – 04:00)',
  'Flexible / On-Demand',
];
