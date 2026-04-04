"use client";

import React, { useState } from 'react';
import { CloudRain, Thermometer, Wind, Flag, CheckCircle2, OctagonAlert, RefreshCw, Wifi, WifiOff, Activity } from 'lucide-react';

const triggerRules = [
  {
    id: "TR-001",
    icon: <CloudRain size={20} />,
    name: "Heavy Rainfall",
    color: "text-blue-600",
    iconBg: "bg-blue-50",
    threshold: "> 35mm/hr for ≥ 2 hrs",
    currentReading: "12mm/hr",
    zone: "Bengaluru",
    status: "Monitoring",
    payoutPct: "60%",
    active: true,
    lastTriggered: "2h ago",
  },
  {
    id: "TR-002",
    icon: <Thermometer size={20} />,
    name: "Extreme Heat",
    color: "text-orange-600",
    iconBg: "bg-orange-50",
    threshold: "> 43°C for ≥ 3 hrs",
    currentReading: "39°C",
    zone: "Hyderabad",
    status: "Monitoring",
    payoutPct: "40%",
    active: true,
    lastTriggered: "8h ago",
  },
  {
    id: "TR-003",
    icon: <Wind size={20} />,
    name: "Severe AQI",
    color: "text-purple-600",
    iconBg: "bg-purple-50",
    threshold: "AQI > 300 for ≥ 4 hrs",
    currentReading: "AQI 374",
    zone: "Delhi NCR",
    status: "TRIGGERED 🔴",
    payoutPct: "50%",
    active: true,
    lastTriggered: "11m ago",
  },
  {
    id: "TR-004",
    icon: <Flag size={20} />,
    name: "Civic Bandh / Curfew",
    color: "text-red-600",
    iconBg: "bg-red-50",
    threshold: "Official govt. alert issued",
    currentReading: "No alerts",
    zone: "All Zones",
    status: "Inactive",
    payoutPct: "80%",
    active: false,
    lastTriggered: "3d ago",
  },
];

const recentEvents = [
  { time: "2026-04-04 14:12", zone: "Delhi NCR",    trigger: "AQI > 300",        affected: 2840, claimsInitiated: 412, status: "Processing" },
  { time: "2026-04-04 12:40", zone: "Bengaluru",    trigger: "Rainfall > 35mm",  affected: 1240, claimsInitiated: 190, status: "Completed" },
  { time: "2026-04-04 09:10", zone: "Mumbai",       trigger: "Rainfall > 80mm",  affected: 1870, claimsInitiated: 289, status: "Completed" },
  { time: "2026-04-03 17:52", zone: "Kolkata",      trigger: "Rainfall > 80mm",  affected: 640,  claimsInitiated: 98,  status: "Completed" },
  { time: "2026-04-03 11:30", zone: "Hyderabad",    trigger: "Heat > 43°C",      affected: 870,  claimsInitiated: 143, status: "Completed" },
  { time: "2026-04-02 08:04", zone: "Chennai",      trigger: "Rainfall > 35mm",  affected: 530,  claimsInitiated: 76,  status: "Completed" },
];

const apiSources = [
  { name: "OpenWeatherMap API",   status: "Online",  latency: "142ms", lastPoll: "30s ago" },
  { name: "AQICN / IQAir API",   status: "Online",  latency: "218ms", lastPoll: "30s ago" },
  { name: "IMD Alert Feed",       status: "Online",  latency: "380ms", lastPoll: "5m ago"  },
  { name: "Civic Alert Feed",     status: "Degraded",latency: "1.2s",  lastPoll: "12m ago" },
  { name: "GPS Location Stream",  status: "Online",  latency: "95ms",  lastPoll: "15s ago" },
];

export default function TriggersModule() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="space-y-6">
      {/* Active Triggers */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Live Trigger Status</h3>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">Real-time threshold monitoring — polling every 15 minutes</p>
          </div>
          <button onClick={() => setRefreshKey(k => k + 1)} className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white/80 border border-white shadow-sm px-3 py-2 rounded-xl hover:bg-white transition-colors">
            <RefreshCw size={13} className={refreshKey ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {triggerRules.map((rule) => (
            <div
              key={rule.id}
              className={`rounded-2xl border p-4 transition-all ${
                rule.status.includes('TRIGGERED')
                  ? 'bg-red-50/80 border-red-300 shadow-[0_0_20px_rgba(239,68,68,0.15)]'
                  : rule.active
                  ? 'bg-white/60 border-white/80'
                  : 'bg-slate-50/60 border-slate-200/60 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl ${rule.iconBg} ${rule.color} flex items-center justify-center`}>{rule.icon}</div>
                <div className="text-right">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    rule.status.includes('TRIGGERED')
                      ? 'bg-red-100 text-red-700 border-red-300 animate-pulse'
                      : rule.active
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-slate-100 text-slate-500 border-slate-200'
                  }`}>
                    {rule.status}
                  </span>
                </div>
              </div>
              <h4 className="text-sm font-bold text-slate-900">{rule.name}</h4>
              <p className="text-[10px] font-semibold text-slate-500 mt-0.5 mb-3">{rule.threshold}</p>

              <div className="space-y-1.5 text-[11px] font-semibold">
                <div className="flex justify-between">
                  <span className="text-slate-500">Now Reading</span>
                  <span className={`font-black ${rule.status.includes('TRIGGERED') ? 'text-red-600' : 'text-slate-800'}`}>{rule.currentReading}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Zone</span>
                  <span className="text-slate-800">{rule.zone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payout Rate</span>
                  <span className="text-indigo-700 font-black">{rule.payoutPct} of daily income</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Last Triggered</span>
                  <span className="text-slate-600">{rule.lastTriggered}</span>
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                <button className={`flex-1 text-[11px] font-bold py-1.5 rounded-lg border transition-colors ${rule.active ? 'bg-slate-800 text-white border-slate-800 hover:bg-slate-700' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>
                  {rule.active ? 'Disable' : 'Enable'}
                </button>
                <button className="flex-1 text-[11px] font-bold py-1.5 rounded-lg border border-white bg-white/70 text-slate-600 hover:bg-white transition-colors">
                  Edit Rule
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Trigger Events */}
        <div className="lg:col-span-2 glass-card overflow-hidden">
          <div className="p-5 border-b border-white/50 bg-white/30">
            <h3 className="text-base font-bold text-slate-900">Recent Trigger Events</h3>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">Last 10 threshold breaches across all zones</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/60 text-[10px] uppercase tracking-widest text-slate-500 border-b border-white/50">
                  <th className="px-5 py-3 font-bold">Timestamp</th>
                  <th className="px-5 py-3 font-bold">Zone</th>
                  <th className="px-5 py-3 font-bold">Trigger</th>
                  <th className="px-5 py-3 font-bold">Workers Affected</th>
                  <th className="px-5 py-3 font-bold">Claims Initiated</th>
                  <th className="px-5 py-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/40 text-xs">
                {recentEvents.map((ev, i) => (
                  <tr key={i} className="hover:bg-white/60 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-slate-500 text-[11px]">{ev.time}</td>
                    <td className="px-5 py-3.5 font-bold text-slate-900">{ev.zone}</td>
                    <td className="px-5 py-3.5 font-semibold text-slate-700">{ev.trigger}</td>
                    <td className="px-5 py-3.5 font-bold text-indigo-700">{ev.affected.toLocaleString()}</td>
                    <td className="px-5 py-3.5 font-bold text-emerald-700">{ev.claimsInitiated.toLocaleString()}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1 font-bold ${ev.status === 'Processing' ? 'text-amber-600' : 'text-emerald-700'}`}>
                        {ev.status === 'Processing'
                          ? <><Activity size={11} className="animate-pulse" /> Processing</>
                          : <><CheckCircle2 size={11} /> Completed</>
                        }
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* API Health */}
        <div className="glass-card p-5">
          <h3 className="text-base font-bold text-slate-900 mb-4">Data Source Health</h3>
          <div className="space-y-3">
            {apiSources.map((api, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${api.status === 'Online' ? 'bg-emerald-50/50 border-emerald-100' : 'bg-amber-50/50 border-amber-100'}`}>
                {api.status === 'Online'
                  ? <Wifi size={16} className="text-emerald-600 shrink-0" />
                  : <WifiOff size={16} className="text-amber-600 shrink-0" />
                }
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">{api.name}</p>
                  <p className="text-[10px] font-medium text-slate-500">Latency: {api.latency} · {api.lastPoll}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${api.status === 'Online' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {api.status}
                </span>
              </div>
            ))}
          </div>

          {/* Monitoring interval info */}
          <div className="mt-4 p-3 rounded-xl bg-indigo-50/80 border border-indigo-100">
            <p className="text-[11px] font-bold text-indigo-700 mb-1">Monitoring Schedule</p>
            <p className="text-[10px] text-indigo-600 font-medium">All APIs polled every <strong>15 minutes</strong>. GPS stream is continuous. Claims auto-triggered upon threshold breach + GPS validation.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
