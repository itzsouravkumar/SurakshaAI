"use client";

import React, { useState } from 'react';
import { Search, ChevronRight, Users, Star, X, Smartphone, MapPin, Clock } from 'lucide-react';

const allWorkers = [
  { id: "WRK-1001", name: "Rajan Kumar",    city: "Bengaluru",  platform: "Swiggy",  riskTier: "Medium", trustScore: 88, weeklyIncome: "₹5,600", activeSince: "Mar 2024", lastClaim: "CLM-9021", clamsCount: 4, activePolicyCoverage: "₹1,200/wk" },
  { id: "WRK-1002", name: "Arjun Mehta",    city: "Delhi NCR",  platform: "Zomato",  riskTier: "High",   trustScore: 71, weeklyIncome: "₹4,900", activeSince: "Jan 2024", lastClaim: "CLM-9023", clamsCount: 7, activePolicyCoverage: "₹2,000/wk" },
  { id: "WRK-1003", name: "Priya Nair",     city: "Mumbai",     platform: "Swiggy",  riskTier: "High",   trustScore: 41, weeklyIncome: "₹6,100", activeSince: "Jun 2024", lastClaim: "CLM-9022", clamsCount: 3, activePolicyCoverage: "₹2,000/wk" },
  { id: "WRK-1004", name: "Deepak Rao",     city: "Bengaluru",  platform: "Swiggy",  riskTier: "Medium", trustScore: 92, weeklyIncome: "₹5,300", activeSince: "Feb 2024", lastClaim: "CLM-9021", clamsCount: 2, activePolicyCoverage: "₹1,200/wk" },
  { id: "WRK-1005", name: "Sunita Devi",    city: "Delhi NCR",  platform: "Zomato",  riskTier: "High",   trustScore: 67, weeklyIncome: "₹4,500", activeSince: "Apr 2024", lastClaim: "CLM-9020", clamsCount: 6, activePolicyCoverage: "₹2,000/wk" },
  { id: "WRK-1006", name: "Vikram Singh",   city: "Indiranagar",platform: "Zomato",  riskTier: "High",   trustScore: 18, weeklyIncome: "₹5,800", activeSince: "Aug 2023", lastClaim: "CLM-9019", clamsCount: 12, activePolicyCoverage: "₹2,000/wk" },
  { id: "WRK-1007", name: "Kavitha R.",     city: "Hyderabad",  platform: "Swiggy",  riskTier: "Low",    trustScore: 96, weeklyIncome: "₹4,800", activeSince: "May 2024", lastClaim: "CLM-9018", clamsCount: 1, activePolicyCoverage: "₹600/wk" },
  { id: "WRK-1008", name: "Mohammed Ali",   city: "Chennai",    platform: "Zomato",  riskTier: "High",   trustScore: 12, weeklyIncome: "₹5,100", activeSince: "Sep 2023", lastClaim: "CLM-9017", clamsCount: 9, activePolicyCoverage: "₹2,000/wk" },
  { id: "WRK-1009", name: "Ramesh Patil",   city: "Pune",       platform: "Swiggy",  riskTier: "Low",    trustScore: 89, weeklyIncome: "₹4,200", activeSince: "Jul 2024", lastClaim: "CLM-9016", clamsCount: 2, activePolicyCoverage: "₹600/wk" },
  { id: "WRK-1010", name: "Anita Sharma",   city: "Bengaluru",  platform: "Zomato",  riskTier: "Medium", trustScore: 55, weeklyIncome: "₹4,700", activeSince: "Oct 2023", lastClaim: "CLM-9015", clamsCount: 5, activePolicyCoverage: "₹1,200/wk" },
  { id: "WRK-1011", name: "Suresh Babu",    city: "Kolkata",    platform: "Swiggy",  riskTier: "High",   trustScore: 34, weeklyIncome: "₹4,300", activeSince: "Dec 2023", lastClaim: "None",      clamsCount: 0, activePolicyCoverage: "₹2,000/wk" },
  { id: "WRK-1012", name: "Pooja Gupta",    city: "Ahmedabad",  platform: "Zomato",  riskTier: "Medium", trustScore: 77, weeklyIncome: "₹5,000", activeSince: "Mar 2024", lastClaim: "CLM-9010", clamsCount: 3, activePolicyCoverage: "₹1,200/wk" },
];

const tierConfig: Record<string, { color: string; dot: string }> = {
  "High":   { color: "bg-red-50 text-red-700 border-red-200",     dot: "bg-red-500" },
  "Medium": { color: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500" },
  "Low":    { color: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
};

export default function WorkersModule() {
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState('All');
  const [platformFilter, setPlatformFilter] = useState('All');
  const [selected, setSelected] = useState<typeof allWorkers[0] | null>(null);

  const filtered = allWorkers.filter(w => {
    const matchSearch = w.name.toLowerCase().includes(search.toLowerCase()) || w.id.includes(search) || w.city.toLowerCase().includes(search.toLowerCase());
    const matchTier = tierFilter === 'All' || w.riskTier === tierFilter;
    const matchPlatform = platformFilter === 'All' || w.platform === platformFilter;
    return matchSearch && matchTier && matchPlatform;
  });

  return (
    <div className="space-y-5">
      {/* Stat bar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center"><Users size={18} /></div>
          <div>
            <p className="text-2xl font-bold text-slate-900">{allWorkers.length.toLocaleString()}</p>
            <p className="text-xs font-semibold text-slate-500">Total Workers</p>
          </div>
        </div>
        <div className="glass-card p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><Star size={18} /></div>
          <div>
            <p className="text-2xl font-bold text-slate-900">{allWorkers.filter(w => w.trustScore >= 70).length}</p>
            <p className="text-xs font-semibold text-slate-500">High Trust Workers (≥70)</p>
          </div>
        </div>
        <div className="glass-card p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center"><Smartphone size={18} /></div>
          <div>
            <p className="text-2xl font-bold text-slate-900">{allWorkers.filter(w => w.trustScore < 40).length}</p>
            <p className="text-xs font-semibold text-slate-500">Fraud Risk Workers (&lt;40)</p>
          </div>
        </div>
      </div>

      <div className="flex gap-5">
        {/* Table */}
        <div className="glass-card overflow-hidden flex-1">
          {/* Filter bar */}
          <div className="p-4 border-b border-white/50 bg-white/30 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="flex items-center gap-2 bg-white/70 border border-white rounded-xl px-3 py-2 w-full sm:w-52 shadow-sm">
              <Search size={14} className="text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search workers..." className="bg-transparent text-xs font-medium outline-none w-full text-slate-900 placeholder:text-slate-400" />
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {['All', 'Low', 'Medium', 'High'].map(t => (
                <button key={t} onClick={() => setTierFilter(t)} className={`text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-all ${tierFilter === t ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white/70 text-slate-600 border-white hover:bg-white'}`}>{t} Risk</button>
              ))}
            </div>
            <div className="flex gap-1.5">
              {['All', 'Swiggy', 'Zomato'].map(p => (
                <button key={p} onClick={() => setPlatformFilter(p)} className={`text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-all ${platformFilter === p ? 'bg-slate-900 text-white border-slate-900' : 'bg-white/70 text-slate-600 border-white hover:bg-white'}`}>{p}</button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/60 text-[10px] uppercase tracking-widest text-slate-500 border-b border-white/50">
                  <th className="px-5 py-3 font-bold">Worker</th>
                  <th className="px-5 py-3 font-bold">City</th>
                  <th className="px-5 py-3 font-bold">Platform</th>
                  <th className="px-5 py-3 font-bold">Risk Tier</th>
                  <th className="px-5 py-3 font-bold">Trust Score</th>
                  <th className="px-5 py-3 font-bold">Coverage</th>
                  <th className="px-5 py-3 font-bold"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/40 text-sm">
                {filtered.map((w, i) => {
                  const tc = tierConfig[w.riskTier];
                  return (
                    <tr key={i} onClick={() => setSelected(w)} className={`hover:bg-white/60 transition-colors cursor-pointer ${selected?.id === w.id ? 'bg-indigo-50/40' : ''}`}>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {w.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-xs">{w.name}</p>
                            <p className="text-[10px] text-slate-400 font-medium">{w.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-xs font-semibold text-slate-700">
                        <span className="flex items-center gap-1"><MapPin size={11} className="text-slate-400" />{w.city}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${w.platform === 'Swiggy' ? 'bg-orange-50 text-orange-600 border border-orange-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>{w.platform}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${tc.color}`}>{w.riskTier}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full">
                            <div className={`h-1.5 rounded-full ${w.trustScore >= 70 ? 'bg-emerald-500' : w.trustScore >= 40 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${w.trustScore}%` }} />
                          </div>
                          <span className="text-xs font-bold text-slate-700">{w.trustScore}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-xs font-bold text-indigo-700">{w.activePolicyCoverage}</td>
                      <td className="px-5 py-3.5">
                        <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-600" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="glass-card p-5 w-72 shrink-0 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold text-base shadow-lg">
                  {selected.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{selected.name}</p>
                  <p className="text-xs text-slate-500 font-medium">{selected.id}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-700"><X size={16} /></button>
            </div>

            <div className={`px-3 py-2 rounded-xl border ${tierConfig[selected.riskTier].color} flex items-center gap-2`}>
              <div className={`w-2 h-2 rounded-full ${tierConfig[selected.riskTier].dot}`} />
              <span className="text-xs font-bold">{selected.riskTier} Risk Worker</span>
            </div>

            <div className="space-y-2.5">
              {[
                ['City', selected.city],
                ['Platform', selected.platform],
                ['Weekly Income', selected.weeklyIncome],
                ['Active Policy', selected.activePolicyCoverage],
                ['Active Since', selected.activeSince],
                ['Total Claims', selected.clamsCount],
                ['Last Claim ID', selected.lastClaim],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between items-center py-1.5 border-b border-slate-100">
                  <span className="text-[11px] text-slate-500 font-semibold">{k}</span>
                  <span className="text-xs font-bold text-slate-900">{v}</span>
                </div>
              ))}
            </div>

            {/* Trust score bar */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-xs font-bold text-slate-600">Trust Score</span>
                <span className="text-xs font-black text-slate-900">{selected.trustScore}/100</span>
              </div>
              <div className="h-2.5 bg-slate-100 rounded-full">
                <div
                  className={`h-2.5 rounded-full transition-all ${selected.trustScore >= 70 ? 'bg-emerald-500' : selected.trustScore >= 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                  style={{ width: `${selected.trustScore}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400 font-medium mt-1">
                {selected.trustScore >= 70 ? 'Trusted — Claims auto-approved' : selected.trustScore >= 40 ? 'Moderate — Claims reviewed' : 'High Risk — Manual review required'}
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-1">
              <button className="text-xs font-bold text-white bg-indigo-600 py-2 rounded-xl hover:bg-indigo-700 transition-colors">View Full Profile</button>
              <button className="text-xs font-bold text-red-700 bg-red-50 border border-red-200 py-2 rounded-xl hover:bg-red-100 transition-colors">Flag for Investigation</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
