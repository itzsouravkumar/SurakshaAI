"use client";

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { IndianRupee, TrendingUp, TrendingDown, ArrowUpRight, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const monthlyData = [
  { month: 'Oct', premium: 1820000, payouts: 940000 },
  { month: 'Nov', premium: 2100000, payouts: 1380000 },
  { month: 'Dec', premium: 2450000, payouts: 1720000 },
  { month: 'Jan', premium: 2800000, payouts: 1490000 },
  { month: 'Feb', premium: 3100000, payouts: 1920000 },
  { month: 'Mar', premium: 3420000, payouts: 2680000 },
  { month: 'Apr', premium: 3850000, payouts: 2100000 },
];

const ledger = [
  { txId: "PAY-7821", worker: "Rajan Kumar",  amount: "₹420", method: "Paytm",  date: "Apr 4, 2026", status: "Paid",    claimId: "CLM-9021" },
  { txId: "PAY-7820", worker: "Arjun Mehta",  amount: "₹380", method: "UPI",    date: "Apr 4, 2026", status: "Paid",    claimId: "CLM-9023" },
  { txId: "PAY-7819", worker: "Deepak Rao",   amount: "₹350", method: "Paytm",  date: "Apr 4, 2026", status: "Paid",    claimId: "CLM-9021" },
  { txId: "PAY-7818", worker: "Kavitha R.",   amount: "₹290", method: "UPI",    date: "Apr 3, 2026", status: "Paid",    claimId: "CLM-9018" },
  { txId: "PAY-7817", worker: "Ramesh Patil", amount: "₹430", method: "Paytm",  date: "Apr 3, 2026", status: "Paid",    claimId: "CLM-9016" },
  { txId: "PAY-7816", worker: "Priya Nair",   amount: "₹560", method: "UPI",    date: "Apr 3, 2026", status: "Pending", claimId: "CLM-9022" },
  { txId: "PAY-7815", worker: "Sunita Devi",  amount: "₹310", method: "Paytm",  date: "Apr 3, 2026", status: "Pending", claimId: "CLM-9020" },
  { txId: "PAY-7814", worker: "Pooja Gupta",  amount: "₹360", method: "UPI",    date: "Apr 2, 2026", status: "Paid",    claimId: "CLM-9010" },
];

const formatCrore = (n: number) => `₹${(n / 10000000).toFixed(2)}Cr`;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 border border-white shadow-xl rounded-xl px-4 py-3 text-xs">
        <p className="font-bold text-slate-700 mb-2">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }} className="font-semibold">
            {p.name}: {formatCrore(p.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function FinancialsModule() {
  const [ledgerFilter, setLedgerFilter] = useState('All');

  const totalPremium = monthlyData.reduce((a, b) => a + b.premium, 0);
  const totalPayouts = monthlyData.reduce((a, b) => a + b.payouts, 0);
  const lossRatio = ((totalPayouts / totalPremium) * 100).toFixed(1);
  const pendingPayouts = ledger.filter(l => l.status === 'Pending').reduce((acc, l) => acc + parseInt(l.amount.replace('₹', '')), 0);

  const filteredLedger = ledger.filter(l => ledgerFilter === 'All' || l.status === ledgerFilter);

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Premium Collected",  value: formatCrore(totalPremium), icon: <IndianRupee size={18} />, color: "text-indigo-600",  bg: "bg-indigo-50",  change: "+18.2%", up: true },
          { label: "Total Payouts",      value: formatCrore(totalPayouts), icon: <TrendingUp size={18} />,  color: "text-emerald-600", bg: "bg-emerald-50", change: "+22.4%", up: true },
          { label: "Loss Ratio",         value: `${lossRatio}%`,           icon: <TrendingDown size={18} />, color: "text-amber-600",   bg: "bg-amber-50",  change: "+3.1%",  up: false },
          { label: "Pending Payouts",    value: `₹${pendingPayouts.toLocaleString()}`, icon: <Clock size={18} />, color: "text-red-600", bg: "bg-red-50", change: "2 pending", up: false },
        ].map((s, i) => (
          <div key={i} className="glass-card p-5">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${s.bg} ${s.color} flex items-center justify-center`}>{s.icon}</div>
              <span className={`text-[11px] font-bold flex items-center gap-0.5 ${s.up ? 'text-emerald-600' : 'text-slate-500'}`}>
                {s.up && <ArrowUpRight size={12} />}{s.change}
              </span>
            </div>
            <p className="text-xl font-black text-slate-900">{s.value}</p>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Chart + Loss Ratio */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar chart */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-slate-900">Monthly Premium vs Payouts</h3>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">Oct 2025 – Apr 2026 · Indian Rupees</p>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyData} barGap={4} barCategoryGap="25%">
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fontWeight: 700, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `₹${(v/1000000).toFixed(1)}M`} tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, fontWeight: 700, paddingTop: 12 }} />
              <Bar dataKey="premium" name="Premium Collected" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              <Bar dataKey="payouts" name="Payouts Made" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Loss Ratio Gauge */}
        <div className="glass-card p-6 flex flex-col items-center justify-center">
          <h3 className="text-base font-bold text-slate-900 mb-6">Loss Ratio Health</h3>
          {/* Circular gauge */}
          <div className="relative w-36 h-36">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="48" fill="none" stroke="#f1f5f9" strokeWidth="12" />
              <circle
                cx="60" cy="60" r="48" fill="none"
                stroke={parseFloat(lossRatio) > 70 ? '#ef4444' : parseFloat(lossRatio) > 55 ? '#f59e0b' : '#10b981'}
                strokeWidth="12"
                strokeDasharray={`${(parseFloat(lossRatio) / 100) * 301.6} 301.6`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-slate-900">{lossRatio}<span className="text-lg">%</span></span>
              <span className="text-[10px] font-bold text-slate-500">LOSS RATIO</span>
            </div>
          </div>
          <div className="mt-6 space-y-2 w-full text-xs font-semibold">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Target Ratio</span>
              <span className="text-slate-900 font-bold">&lt; 60%</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Status</span>
              <span className={`font-bold ${parseFloat(lossRatio) < 60 ? 'text-emerald-600' : 'text-amber-600'}`}>
                {parseFloat(lossRatio) < 60 ? '✅ Healthy' : '⚠️ Watch'}
              </span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">Net Margin</span>
              <span className="text-indigo-700 font-bold">{formatCrore(totalPremium - totalPayouts)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payout Ledger */}
      <div className="glass-card overflow-hidden">
        <div className="p-5 border-b border-white/50 bg-white/30 flex items-center gap-3">
          <h3 className="text-base font-bold text-slate-900 mr-auto">Payout Ledger</h3>
          {['All', 'Paid', 'Pending'].map(f => (
            <button key={f} onClick={() => setLedgerFilter(f)} className={`text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-all ${ledgerFilter === f ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white/70 text-slate-600 border-white hover:bg-white'}`}>{f}</button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/60 text-[10px] uppercase tracking-widest text-slate-500 border-b border-white/50">
                <th className="px-5 py-3 font-bold">Txn ID</th>
                <th className="px-5 py-3 font-bold">Worker</th>
                <th className="px-5 py-3 font-bold">Claim ID</th>
                <th className="px-5 py-3 font-bold">Amount</th>
                <th className="px-5 py-3 font-bold">Method</th>
                <th className="px-5 py-3 font-bold">Date</th>
                <th className="px-5 py-3 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/40 text-sm">
              {filteredLedger.map((row, i) => (
                <tr key={i} className="hover:bg-white/60 transition-colors cursor-pointer">
                  <td className="px-5 py-3.5 font-bold text-slate-900 text-xs">{row.txId}</td>
                  <td className="px-5 py-3.5 font-semibold text-slate-800 text-xs">{row.worker}</td>
                  <td className="px-5 py-3.5 text-xs font-medium text-indigo-700">{row.claimId}</td>
                  <td className="px-5 py-3.5 font-black text-emerald-700">{row.amount}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${row.method === 'UPI' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>{row.method}</span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-slate-500 font-medium">{row.date}</td>
                  <td className="px-5 py-3.5">
                    <span className={`flex items-center gap-1.5 text-[11px] font-bold ${row.status === 'Paid' ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {row.status === 'Paid' ? <CheckCircle size={12} /> : <AlertCircle size={12} className="animate-pulse" />}
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
