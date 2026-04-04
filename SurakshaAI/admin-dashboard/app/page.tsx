"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, AlertTriangle, ShieldAlert, TrendingUp, MoreHorizontal, Activity } from 'lucide-react';
import { BackgroundMesh } from '@/components/dashboard/BackgroundMesh';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/dashboard/StatCard';
import { SmoothAreaChart } from '@/components/dashboard/SmoothAreaChart';
import { DoughnutChart } from '@/components/dashboard/DoughnutChart';
import { ZeroTrustCard, AutoRemediationCard } from '@/components/dashboard/InfoCards';
import { IncidentTable, AlertData } from '@/components/dashboard/IncidentTable';
import ClaimsModule from '@/components/modules/ClaimsModule';
import HeatmapModule from '@/components/modules/HeatmapModule';
import WorkersModule from '@/components/modules/WorkersModule';
import FinancialsModule from '@/components/modules/FinancialsModule';
import TriggersModule from '@/components/modules/TriggersModule';

// Mock Data for SurakshaAI Parametric Insurance
const disruptionsData = [15, 22, 18, 30, 25, 45, 38, 55, 48, 70, 60, 85];
const workersData = [40, 35, 45, 40, 55, 50, 65, 60, 75, 70, 85, 90];

const doughnutData = [
  { label: "Heavy Rainfall", percent: 45, color: "#4f46e5" },
  { label: "Extreme Heat",   percent: 25, color: "#f59e0b" },
  { label: "Severe AQI",     percent: 20, color: "#06b6d4" },
  { label: "Civic Curfew",   percent: 10, color: "#94a3b8" },
];

const recentClaims: AlertData[] = [
  { id: "CLM-9021", type: "Rainfall > 35mm/hr", target: "Koramangala", time: "2m ago",  severity: "High Trust",    status: "Auto-Approved" },
  { id: "CLM-9020", type: "AQI > 300",          target: "Delhi NCR",   time: "15m ago", severity: "Medium Trust",  status: "Under Review"  },
  { id: "CLM-9019", type: "Rainfall > 80mm/hr", target: "Indiranagar", time: "1h ago",  severity: "Critical",      status: "Flagged"       },
  { id: "CLM-9018", type: "Heat > 43°C",        target: "Hyderabad",   time: "3h ago",  severity: "High Trust",    status: "Auto-Approved" },
];

const tabMeta: Record<string, { title: string; subtitle: string }> = {
  Dashboard:  { title: "SurakshaAI Insurer Desk",   subtitle: "AI-Powered Parametric Insurance Command Center." },
  Claims:     { title: "Claims & Fraud Management", subtitle: "Review claims, fraud rings, and auto-approval pipeline." },
  Heatmap:    { title: "Risk Heatmap",              subtitle: "Live disruption density across Indian cities by zone." },
  Workers:    { title: "Workers Directory",         subtitle: "Browse, filter, and inspect all registered gig workers." },
  Financials: { title: "Financial Payouts",         subtitle: "Premium vs payouts, loss ratio, and payout ledger." },
  Triggers:   { title: "Triggers & Rules",          subtitle: "Manage parametric thresholds, API health, and trigger events." },
};

export default function Dashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('suraksha_admin_auth') !== 'true') {
        router.replace('/login');
      } else {
        setAuthChecked(true);
      }
    }
  }, [router]);

  if (!authChecked) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-slate-100">
        <div className="glass-card p-8 flex flex-col items-center gap-3">
          <svg className="animate-spin h-8 w-8 text-indigo-600" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-sm font-bold text-slate-600">Verifying session...</p>
        </div>
      </div>
    );
  }

  const meta = tabMeta[activeTab] || tabMeta.Dashboard;

  return (
    <>
      <BackgroundMesh />
      <div className="relative w-screen h-screen flex overflow-hidden">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* MAIN CONTENT */}
        <div className="flex-1 flex flex-col min-w-0 h-screen p-4 overflow-hidden">
          <Header setSidebarOpen={setSidebarOpen} />

          <main className="flex-1 overflow-y-auto pr-2 pb-10">
            <div className="max-w-[1600px] mx-auto w-full space-y-6">

              {/* Page header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between px-2">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900">{meta.title}</h1>
                  <p className="text-slate-500 text-sm font-medium mt-1">{meta.subtitle}</p>
                </div>
                <button className="mt-4 sm:mt-0 flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-slate-900/20 transition-all">
                  <TrendingUp size={16} />
                  <span>Export Report</span>
                </button>
              </div>

              {/* Module routing */}
              {activeTab === 'Dashboard' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard title="Active Weekly Policies" value="1.24M"  change="+14.5%" isPositive={true}  icon={ShieldCheck}  sparklineData={[2,4,3,6,5,8,7]} />
                  <StatCard title="Claims Auto-Approved"   value="4,824"  change="+5.2%"  isPositive={true}  icon={ShieldAlert}   sparklineData={[8,6,7,5,3,4,8]} />
                  <StatCard title="Total Payouts (₹)"      value="12.4M"  change="+2.4%"  isPositive={true}  icon={TrendingUp}    sparklineData={[4,4,5,6,6,8,9]} />
                  <StatCard title="Fraud Syndicates"       value="14"     change="-2.1%"  isPositive={true}  icon={AlertTriangle} sparklineData={[5,6,4,2,3,2,1]} />

                  <div className="md:col-span-2 lg:col-span-3 glass-card p-6 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Active Workers vs Disruptions</h3>
                        <p className="text-xs font-semibold text-slate-500 mt-1">Real-time GPS tracking and weather API feeds</p>
                      </div>
                      <div className="flex bg-white/60 backdrop-blur-md rounded-lg p-1 border border-white shadow-sm">
                        <button className="px-3 py-1 text-xs font-bold text-slate-900 bg-white shadow-sm rounded-md">12H</button>
                        <button className="px-3 py-1 text-xs font-semibold text-slate-500 hover:text-slate-900">24H</button>
                        <button className="px-3 py-1 text-xs font-semibold text-slate-500 hover:text-slate-900">7D</button>
                      </div>
                    </div>
                    <div className="flex-1 w-full mt-2">
                      <SmoothAreaChart dataPrimary={disruptionsData} dataSecondary={workersData} height={260} />
                    </div>
                  </div>

                  <div className="md:col-span-2 lg:col-span-1 glass-card p-6 flex flex-col items-center">
                    <div className="w-full flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-slate-900">Disruption Triggers</h3>
                      <MoreHorizontal size={18} className="text-slate-400" />
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center w-full my-4">
                      <DoughnutChart data={doughnutData} size={180} />
                    </div>
                    <div className="w-full space-y-2.5 mt-2">
                      {doughnutData.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs font-bold">
                          <div className="flex items-center">
                            <span className="w-2.5 h-2.5 rounded-sm mr-2 shadow-sm" style={{ backgroundColor: item.color }} />
                            <span className="text-slate-600">{item.label}</span>
                          </div>
                          <span className="text-slate-900">{item.percent}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-2 lg:col-span-1 flex flex-col gap-6">
                    <ZeroTrustCard />
                    <AutoRemediationCard />
                  </div>
                  <IncidentTable alerts={recentClaims} />
                </div>
              )}

              {activeTab === 'Claims'     && <ClaimsModule />}
              {activeTab === 'Heatmap'    && <HeatmapModule />}
              {activeTab === 'Workers'    && <WorkersModule />}
              {activeTab === 'Financials' && <FinancialsModule />}
              {activeTab === 'Triggers'   && <TriggersModule />}

            </div>
          </main>
        </div>
      </div>
    </>
  );
}
