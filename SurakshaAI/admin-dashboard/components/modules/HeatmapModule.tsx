"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { AlertTriangle, CloudRain, Wind, Thermometer } from 'lucide-react';

// Dynamic import — Leaflet cannot run on the server (no `window` object)
const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-slate-50/50 rounded-2xl">
      <div className="flex flex-col items-center gap-3">
        <svg className="animate-spin h-8 w-8 text-indigo-500" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <p className="text-xs font-bold text-slate-400">Loading map...</p>
      </div>
    </div>
  ),
});

const zones = [
  { id: 1,  city: "Delhi NCR",   lat: 28.6139, lng: 77.2090, risk: 92, workers: 2840, disruption: "AQI > 300",        premium: "₹60/wk", lastEvent: "2h ago",  claims: 412 },
  { id: 2,  city: "Mumbai",      lat: 19.0760, lng: 72.8777, risk: 78, workers: 3210, disruption: "Rainfall > 80mm",  premium: "₹60/wk", lastEvent: "5h ago",  claims: 289 },
  { id: 3,  city: "Bengaluru",   lat: 12.9716, lng: 77.5946, risk: 65, workers: 4120, disruption: "Rainfall > 35mm",  premium: "₹40/wk", lastEvent: "1h ago",  claims: 347 },
  { id: 4,  city: "Hyderabad",   lat: 17.3850, lng: 78.4867, risk: 58, workers: 1870, disruption: "Heat > 43°C",      premium: "₹40/wk", lastEvent: "8h ago",  claims: 198 },
  { id: 5,  city: "Chennai",     lat: 13.0827, lng: 80.2707, risk: 70, workers: 2100, disruption: "Rainfall > 35mm",  premium: "₹40/wk", lastEvent: "3h ago",  claims: 231 },
  { id: 6,  city: "Kolkata",     lat: 22.5726, lng: 88.3639, risk: 81, workers: 1540, disruption: "Rainfall > 80mm",  premium: "₹60/wk", lastEvent: "30m ago", claims: 176 },
  { id: 7,  city: "Pune",        lat: 18.5204, lng: 73.8567, risk: 44, workers: 980,  disruption: "Rainfall > 35mm",  premium: "₹20/wk", lastEvent: "12h ago", claims: 89  },
  { id: 8,  city: "Ahmedabad",   lat: 23.0225, lng: 72.5714, risk: 72, workers: 1230, disruption: "Heat > 43°C",      premium: "₹40/wk", lastEvent: "6h ago",  claims: 143 },
  { id: 9,  city: "Jaipur",      lat: 26.9124, lng: 75.7873, risk: 55, workers: 760,  disruption: "Heat > 43°C",      premium: "₹40/wk", lastEvent: "1d ago",  claims: 67  },
  { id: 10, city: "Surat",       lat: 21.1702, lng: 72.8311, risk: 38, workers: 640,  disruption: "AQI > 300",        premium: "₹20/wk", lastEvent: "2d ago",  claims: 42  },
];

function getRiskMeta(risk: number) {
  if (risk >= 75) return { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', dot: 'bg-red-500', label: 'High',   ring: 'ring-red-200' };
  if (risk >= 50) return { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', dot: 'bg-amber-500', label: 'Medium', ring: 'ring-amber-200' };
  return           { color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', dot: 'bg-emerald-500', label: 'Low', ring: 'ring-emerald-200' };
}

function getDisruptionIcon(disruption: string) {
  if (disruption.includes('Rainfall')) return <CloudRain size={14} />;
  if (disruption.includes('AQI'))      return <Wind size={14} />;
  if (disruption.includes('Heat'))     return <Thermometer size={14} />;
  return <AlertTriangle size={14} />;
}

export default function HeatmapModule() {
  const [selectedZone, setSelectedZone] = useState(zones[0]);
  const sorted = [...zones].sort((a, b) => b.risk - a.risk);

  return (
    <div className="space-y-6">
      {/* Summary bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "High Risk Zones",   count: zones.filter(z => z.risk >= 75).length, color: "text-red-600",     dot: "bg-red-500"     },
          { label: "Medium Risk Zones", count: zones.filter(z => z.risk >= 50 && z.risk < 75).length, color: "text-amber-600", dot: "bg-amber-500"   },
          { label: "Low Risk Zones",    count: zones.filter(z => z.risk < 50).length,  color: "text-emerald-600", dot: "bg-emerald-500" },
        ].map((s, i) => (
          <div key={i} className="glass-card p-5 flex items-center gap-4">
            <span className={`w-3.5 h-3.5 rounded-full shrink-0 ${s.dot} shadow-sm`} />
            <div>
              <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
              <p className="text-xs font-bold text-slate-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Map + Side panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ minHeight: 520 }}>
        {/* Map card */}
        <div className="lg:col-span-2 glass-card p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">India Live Risk Heatmap</h3>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">OpenStreetMap · Click any city marker to inspect</p>
            </div>
            {/* Legend */}
            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500 inline-block" /> High ≥ 75</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500 inline-block" /> Mid 50–74</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> Low &lt; 50</span>
            </div>
          </div>

          {/* Map container */}
          <div className="flex-1 rounded-2xl overflow-hidden border border-white/60" style={{ minHeight: 400 }}>
            <LeafletMap
              zones={zones}
              selectedZoneId={selectedZone.id}
              onSelectZone={setSelectedZone}
            />
          </div>
        </div>

        {/* Side panel */}
        <div className="flex flex-col gap-4">
          {/* Selected zone detail */}
          {(() => {
            const meta = getRiskMeta(selectedZone.risk);
            return (
              <div className={`glass-card p-5 border ${meta.border}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-base font-bold text-slate-900">{selectedZone.city}</h4>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${meta.bg} ${meta.color} ${meta.border} mt-1 inline-block`}>
                      {meta.label} Risk Zone
                    </span>
                  </div>
                  <span className={`text-4xl font-black ${meta.color}`}>{selectedZone.risk}</span>
                </div>

                {/* Risk bar */}
                <div className="h-2 bg-slate-100 rounded-full mb-4">
                  <div
                    className={`h-2 rounded-full ${meta.dot}`}
                    style={{ width: `${selectedZone.risk}%`, transition: 'width 0.5s ease' }}
                  />
                </div>

                <div className="space-y-2.5 text-xs font-semibold">
                  {[
                    ['Active Workers',    selectedZone.workers.toLocaleString()],
                    ['Active Trigger',    selectedZone.disruption],
                    ['Weekly Premium',    selectedZone.premium],
                    ['Claims This Week',  selectedZone.claims.toString()],
                    ['Last Triggered',    selectedZone.lastEvent],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between items-center border-b border-slate-100 pb-2">
                      <span className="text-slate-500">{k}</span>
                      <span className="font-bold text-slate-900">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Top risk zones ranking */}
          <div className="glass-card p-5 flex-1">
            <h4 className="text-sm font-bold text-slate-900 mb-3">Top Risk Zones</h4>
            <div className="space-y-1.5">
              {sorted.map((zone, i) => {
                const meta = getRiskMeta(zone.risk);
                return (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZone(zone)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all hover:bg-white/60 ${
                      selectedZone.id === zone.id
                        ? `${meta.bg} ${meta.border} ring-1 ${meta.ring}`
                        : 'border-transparent hover:border-white/40'
                    }`}
                  >
                    <span className="text-[11px] font-black text-slate-400 w-5 text-left">#{i + 1}</span>
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${meta.dot}`} />
                    <span className="text-xs font-bold text-slate-800 flex-1 text-left">{zone.city}</span>
                    <span className={`text-xs font-black ${meta.color}`}>{zone.risk}</span>
                    <span className={`${meta.color} opacity-70`}>{getDisruptionIcon(zone.disruption)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
