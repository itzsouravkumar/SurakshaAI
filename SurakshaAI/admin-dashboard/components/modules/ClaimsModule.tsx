"use client";

import React, { useState } from 'react';
import {
  Search, Filter, CheckCircle, XCircle, Clock, AlertOctagon,
  ShieldAlert, Users, FileText, TrendingUp, ChevronDown, MoreHorizontal
} from 'lucide-react';

const allClaims = [
  { id: "CLM-9024", worker: "Rajan Kumar", city: "Bengaluru", trigger: "Rainfall > 35mm/hr", payout: "₹420", trust: 94, status: "Auto-Approved", time: "4m ago" },
  { id: "CLM-9023", worker: "Arjun Mehta", city: "Delhi NCR", trigger: "AQI > 300", payout: "₹380", trust: 71, status: "Auto-Approved", time: "11m ago" },
  { id: "CLM-9022", worker: "Priya Nair", city: "Mumbai", trigger: "Rainfall > 80mm/hr", payout: "₹560", trust: 41, status: "Under Review", time: "28m ago" },
  { id: "CLM-9021", worker: "Deepak Rao", city: "Koramangala", trigger: "Rainfall > 35mm/hr", payout: "₹350", trust: 88, status: "Auto-Approved", time: "38m ago" },
  { id: "CLM-9020", worker: "Sunita Devi", city: "Delhi NCR", trigger: "AQI > 300", payout: "₹310", trust: 67, status: "Under Review", time: "52m ago" },
  { id: "CLM-9019", worker: "Vikram Singh", city: "Indiranagar", trigger: "Rainfall > 80mm/hr", payout: "₹700", trust: 18, status: "Flagged", time: "1h ago" },
  { id: "CLM-9018", worker: "Kavitha R.", city: "Hyderabad", trigger: "Heat > 43°C", payout: "₹290", trust: 91, status: "Auto-Approved", time: "2h ago" },
  { id: "CLM-9017", worker: "Mohammed Ali", city: "Chennai", trigger: "Civic Bandh", payout: "₹850", trust: 12, status: "Rejected", time: "3h ago" },
  { id: "CLM-9016", worker: "Ramesh Patil", city: "Pune", trigger: "Rainfall > 35mm/hr", payout: "₹430", trust: 79, status: "Auto-Approved", time: "5h ago" },
  { id: "CLM-9015", worker: "Anita Sharma", city: "Bengaluru", trigger: "AQI > 300", payout: "₹360", trust: 55, status: "Under Review", time: "6h ago" },
];

const fraudRings = [
  {
    id: "RING-041",
    city: "Delhi NCR",
    workers: 47,
    trigger: "AQI > 300 — Batch claim 14:22–14:27",
    devices: "Same IP cluster (VPN exit node)",
    risk: "Critical",
  },
  {
    id: "RING-040",
    city: "Mumbai",
    workers: 23,
    trigger: "Rainfall > 80mm/hr — 5-min window burst",
    devices: "GPS teleport detected on 19 devices",
    risk: "High",
  },
  {
    id: "RING-039",
    city: "Bengaluru",
    workers: 11,
    trigger: "Civic Bandh — All same lat/lon ±3m",
    devices: "Accelerometer flat across all devices",
    risk: "High",
  },
];

const statusConfig: Record<string, { color: string; icon: React.ReactNode; dot: string }> = {
  "Auto-Approved": { color: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: <CheckCircle size={12} />, dot: "bg-emerald-500 shadow-[0_0_6px_#10b981]" },
  "Under Review":  { color: "bg-amber-50 text-amber-700 border-amber-200",   icon: <Clock size={12} />,        dot: "bg-amber-500 shadow-[0_0_6px_#f59e0b] animate-pulse" },
  "Flagged":       { color: "bg-red-50 text-red-700 border-red-200",          icon: <AlertOctagon size={12} />, dot: "bg-red-500 shadow-[0_0_6px_#ef4444] animate-pulse" },
  "Rejected":      { color: "bg-slate-100 text-slate-600 border-slate-200",   icon: <XCircle size={12} />,      dot: "bg-slate-400" },
};

export default function ClaimsModule() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filters = ['All', 'Auto-Approved', 'Under Review', 'Flagged', 'Rejected'];

  const filtered = allClaims.filter(c => {
    const matchStatus = filter === 'All' || c.status === filter;
    const matchSearch = c.worker.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const counts = {
    total: allClaims.length,
    approved: allClaims.filter(c => c.status === 'Auto-Approved').length,
    review: allClaims.filter(c => c.status === 'Under Review').length,
    flagged: allClaims.filter(c => c.status === 'Flagged').length,
  };

  return (
    <div className="space-y-6">
      {/* Stat Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Claims", value: counts.total, icon: <FileText size={18} />, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Auto-Approved", value: counts.approved, icon: <CheckCircle size={18} />, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Under Review", value: counts.review, icon: <Clock size={18} />, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Flagged / Rejected", value: counts.flagged, icon: <AlertOctagon size={18} />, color: "text-red-600", bg: "bg-red-50" },
        ].map((s, i) => (
          <div key={i} className="glass-card p-5 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl ${s.bg} ${s.color} flex items-center justify-center shrink-0`}>
              {s.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{s.value}</p>
              <p className="text-xs font-semibold text-slate-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Fraud Alerts */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert size={18} className="text-red-500" />
              Active Fraud Ring Alerts
            </h3>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">Coordinated claim clusters detected by DBSCAN engine</p>
          </div>
          <span className="text-xs font-bold text-red-700 bg-red-50 border border-red-200 px-3 py-1 rounded-full">{fraudRings.length} Active</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {fraudRings.map((ring) => (
            <div key={ring.id} className={`rounded-2xl p-4 border ${ring.risk === 'Critical' ? 'bg-red-50/80 border-red-200' : 'bg-amber-50/80 border-amber-200'}`}>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-slate-500">{ring.id}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${ring.risk === 'Critical' ? 'bg-red-100 text-red-700 border-red-300' : 'bg-amber-100 text-amber-700 border-amber-300'}`}>
                  {ring.risk}
                </span>
              </div>
              <p className="text-sm font-bold text-slate-900">{ring.city} — {ring.workers} Workers</p>
              <p className="text-xs text-slate-600 mt-1 font-medium">{ring.trigger}</p>
              <p className="text-xs text-slate-500 mt-0.5">{ring.devices}</p>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 text-xs font-bold text-white bg-red-500 hover:bg-red-600 transition-colors py-1.5 rounded-lg">Block All</button>
                <button className="flex-1 text-xs font-bold text-slate-700 bg-white/80 border border-slate-200 hover:bg-white transition-colors py-1.5 rounded-lg">Review</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Claims Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-5 border-b border-white/50 bg-white/30 backdrop-blur-md flex flex-col sm:flex-row sm:items-center gap-3">
          <h3 className="text-lg font-bold text-slate-900 mr-auto">All Claims</h3>
          {/* Search */}
          <div className="flex items-center gap-2 bg-white/70 border border-white rounded-xl px-3 py-2 w-full sm:w-56 shadow-sm">
            <Search size={14} className="text-slate-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search claims..."
              className="bg-transparent text-xs font-medium text-slate-900 outline-none w-full placeholder:text-slate-400"
            />
          </div>
          {/* Filters */}
          <div className="flex gap-1 flex-wrap">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-all ${filter === f ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white/70 text-slate-600 border-white hover:bg-white'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/60 text-[10px] uppercase tracking-widest text-slate-500 border-b border-white/50">
                <th className="px-5 py-3 font-bold">Claim ID</th>
                <th className="px-5 py-3 font-bold">Worker</th>
                <th className="px-5 py-3 font-bold">City</th>
                <th className="px-5 py-3 font-bold">Trigger</th>
                <th className="px-5 py-3 font-bold">Payout</th>
                <th className="px-5 py-3 font-bold">Trust Score</th>
                <th className="px-5 py-3 font-bold">Status</th>
                <th className="px-5 py-3 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/40 text-sm">
              {filtered.map((c, i) => {
                const st = statusConfig[c.status] || statusConfig['Rejected'];
                return (
                  <tr key={i} className="hover:bg-white/60 transition-colors group cursor-pointer">
                    <td className="px-5 py-3.5 font-bold text-slate-900">{c.id}</td>
                    <td className="px-5 py-3.5 font-semibold text-slate-800">{c.worker}</td>
                    <td className="px-5 py-3.5 text-slate-600 font-medium">{c.city}</td>
                    <td className="px-5 py-3.5 text-slate-700 font-medium text-xs">{c.trigger}</td>
                    <td className="px-5 py-3.5 font-bold text-indigo-700">{c.payout}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full w-16">
                          <div
                            className={`h-1.5 rounded-full ${c.trust >= 70 ? 'bg-emerald-500' : c.trust >= 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${c.trust}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-600">{c.trust}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold border ${st.color}`}>
                        {st.icon}
                        {c.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {c.status === 'Under Review' && (
                          <>
                            <button className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg hover:bg-emerald-100 transition-colors">Approve</button>
                            <button className="text-[11px] font-bold text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded-lg hover:bg-red-100 transition-colors">Reject</button>
                          </>
                        )}
                        {c.status === 'Flagged' && (
                          <button className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg hover:bg-amber-100 transition-colors">Investigate</button>
                        )}
                        <button className="p-1.5 rounded-lg hover:bg-white text-slate-400 hover:text-slate-600 transition-colors">
                          <MoreHorizontal size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-slate-400 font-semibold text-sm">No claims match your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
