import React from 'react';

export interface AlertData {
  id: string;
  type: string;
  target: string;
  time: string;
  severity: string;  // We'll use this for "Trust Score" status like High, Medium, Low
  status: string;    // Auto-Approved, Flagged, Under Review
}

interface IncidentTableProps {
  alerts: AlertData[];
}

export function IncidentTable({ alerts }: IncidentTableProps) {
  return (
    <div className="md:col-span-2 lg:col-span-3 glass-card overflow-hidden flex flex-col">
      <div className="p-6 border-b border-white/50 flex justify-between items-center bg-white/30 backdrop-blur-md">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Recent Claims Log</h3>
          <p className="text-xs font-semibold text-slate-500 mt-0.5">Latest parametric disruptions identified and processed automatically</p>
        </div>
        <button className="text-xs text-indigo-700 hover:text-indigo-900 font-bold transition-colors bg-white/80 px-3 py-2 rounded-lg border border-white shadow-sm">
          View Full Audit
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 text-[10px] uppercase tracking-widest text-slate-500 border-b border-white/50">
              <th className="px-6 py-4 font-bold">Claim ID</th>
              <th className="px-6 py-4 font-bold">Trigger Type</th>
              <th className="px-6 py-4 font-bold">Trust Level</th>
              <th className="px-6 py-4 font-bold">Status</th>
              <th className="px-6 py-4 font-bold text-right">Time</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-white/40">
            {alerts.map((alert, idx) => (
              <tr key={idx} className="hover:bg-white/60 transition-colors group cursor-pointer">
                <td className="px-6 py-4 font-bold text-slate-900">{alert.id}</td>
                <td className="px-6 py-4 text-slate-700 font-semibold">{alert.type}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${
                    alert.severity === 'Critical' ? 'bg-red-50 text-red-700 border-red-200 shadow-sm' :
                    alert.severity === 'High Trust' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm' :
                    alert.severity === 'Medium Trust' ? 'bg-amber-50 text-amber-700 border-amber-200 shadow-sm' :
                    'bg-slate-50 text-slate-700 border-slate-200 shadow-sm'
                  }`}>
                    {alert.severity}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2 font-semibold">
                    <span className={`w-2 h-2 rounded-full ${
                      alert.status === 'Auto-Approved' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' :
                      alert.status === 'Flagged' ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' : 'bg-amber-500 shadow-[0_0_8px_#f59e0b] animate-pulse'
                    }`}></span>
                    <span className="text-slate-700">{alert.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right font-semibold text-slate-400 whitespace-nowrap group-hover:text-slate-600 transition-colors">
                  {alert.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
