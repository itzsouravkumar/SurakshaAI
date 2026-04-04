import React from 'react';
import { Fingerprint, Zap } from 'lucide-react';

export function ZeroTrustCard() {
  return (
    <div className="glass-card p-6 flex-1 flex flex-col justify-center relative overflow-hidden group">
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-indigo-100 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
      <Zap className="text-indigo-600 mb-3" size={28} />
      <h3 className="text-lg font-bold text-slate-900">Zero-Touch Claims</h3>
      <p className="text-xs font-medium text-slate-500 mt-1 mb-4 leading-relaxed">
        Payouts credited automatically upon weather disruption verification.
      </p>
      <button className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-2 rounded-lg self-start">
        View Auto-Rules
      </button>
    </div>
  );
}

export function AutoRemediationCard() {
  return (
    <div className="glass-card p-6 flex-1 flex flex-col justify-center relative overflow-hidden group">
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-100 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
      <Fingerprint className="text-emerald-600 mb-3" size={28} />
      <h3 className="text-lg font-bold text-slate-900">Fraud Defense Engine</h3>
      <p className="text-xs font-medium text-slate-500 mt-1 mb-4 leading-relaxed">
        Multi-layer isolation of GPS spoofing and organized claim syndicates.
      </p>
      <div className="flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg self-start border border-emerald-100">
        <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span> Active
      </div>
    </div>
  );
}
