"use client";

import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, Server, Activity, TrendingUp, MoreHorizontal } from 'lucide-react';
import { BackgroundMesh } from '@/components/dashboard/BackgroundMesh';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/dashboard/StatCard';
import { SmoothAreaChart } from '@/components/dashboard/SmoothAreaChart';
import { DoughnutChart } from '@/components/dashboard/DoughnutChart';
import { ZeroTrustCard, AutoRemediationCard } from '@/components/dashboard/InfoCards';
import { IncidentTable, AlertData } from '@/components/dashboard/IncidentTable';

// Mock Data
const threatData = [15, 22, 18, 30, 25, 45, 38, 55, 48, 70, 60, 85];
const trafficData = [40, 35, 45, 40, 55, 50, 65, 60, 75, 70, 85, 90];

const doughnutData = [
  { label: "DDoS", percent: 45, color: "#4f46e5" },     // Indigo
  { label: "Malware", percent: 25, color: "#06b6d4" },  // Cyan
  { label: "Phishing", percent: 20, color: "#f59e0b" }, // Amber
  { label: "Other", percent: 10, color: "#94a3b8" }     // Slate
];

const recentAlerts: AlertData[] = [
  { id: "S-8921", type: "DDoS Mitigation", target: "Gateway-Alpha", time: "2m ago", severity: "High", status: "Resolved" },
  { id: "S-8920", type: "Malware Signature", target: "Node-7B", time: "15m ago", severity: "Critical", status: "Investigating" },
  { id: "S-8919", type: "Anomalous Login", target: "Admin Portal", time: "1h ago", severity: "Medium", status: "Blocked" },
  { id: "S-8918", type: "Port Scan Detected", target: "Firewall-02", time: "3h ago", severity: "Low", status: "Logged" },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <BackgroundMesh />

      <div className="relative w-screen h-screen flex overflow-hidden">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col min-w-0 h-screen p-4 overflow-hidden">
          <Header setSidebarOpen={setSidebarOpen} />

          {/* SCROLLABLE BENTO GRID CONTENT */}
          <main className="flex-1 overflow-y-auto pr-2 pb-10">
            <div className="max-w-[1600px] mx-auto w-full space-y-6">
              
              {/* Header Actions */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between px-2">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900">Security Command Center</h1>
                  <p className="text-slate-500 text-sm font-medium mt-1">Real-time threat monitoring and infrastructure health.</p>
                </div>
                <button className="mt-4 sm:mt-0 flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-slate-900/20 transition-all">
                  <TrendingUp size={16} />
                  <span>Export Report</span>
                </button>
              </div>

              {/* BENTO GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Row 1: Stat Cards with Sparklines */}
                <StatCard 
                  title="Threats Blocked" 
                  value="1.24M" 
                  change="+14.5%" 
                  isPositive={true} 
                  icon={ShieldCheck} 
                  sparklineData={[2,4,3,6,5,8,7]} 
                />
                <StatCard 
                  title="Active Anomalies" 
                  value="24" 
                  change="-5.2%" 
                  isPositive={true} 
                  icon={AlertTriangle} 
                  sparklineData={[8,6,7,5,3,4,2]} 
                />
                <StatCard 
                  title="Nodes Scanned" 
                  value="8,421" 
                  change="+2.4%" 
                  isPositive={true} 
                  icon={Server} 
                  sparklineData={[4,4,5,6,6,8,9]} 
                />
                <StatCard 
                  title="Avg Latency (ms)" 
                  value="12.4" 
                  change="+1.1%" 
                  isPositive={false} 
                  icon={Activity} 
                  sparklineData={[10,11,12,11,14,13,12]} 
                />

                {/* Row 2: Large Chart (Spans 3 cols) & Doughnut (Spans 1 col) */}
                <div className="md:col-span-2 lg:col-span-3 glass-card p-6 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Traffic vs. Threats Detection</h3>
                      <p className="text-xs font-semibold text-slate-500 mt-1">AI predictive model tracking continuously</p>
                    </div>
                    <div className="flex bg-white/60 backdrop-blur-md rounded-lg p-1 border border-white shadow-sm">
                      <button className="px-3 py-1 text-xs font-bold text-slate-900 bg-white shadow-sm rounded-md">12H</button>
                      <button className="px-3 py-1 text-xs font-semibold text-slate-500 hover:text-slate-900">24H</button>
                      <button className="px-3 py-1 text-xs font-semibold text-slate-500 hover:text-slate-900">7D</button>
                    </div>
                  </div>
                  <div className="flex-1 w-full mt-2">
                    <SmoothAreaChart dataPrimary={threatData} dataSecondary={trafficData} height={260} />
                  </div>
                </div>

                {/* Doughnut Chart Card */}
                <div className="md:col-span-2 lg:col-span-1 glass-card p-6 flex flex-col items-center">
                  <div className="w-full flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-slate-900">Threat Vectors</h3>
                    <MoreHorizontal size={18} className="text-slate-400" />
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center w-full my-4">
                    <DoughnutChart data={doughnutData} size={180} />
                  </div>
                  <div className="w-full space-y-2.5 mt-2">
                    {doughnutData.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs font-bold">
                        <div className="flex items-center">
                          <span className="w-2.5 h-2.5 rounded-sm mr-2 shadow-sm" style={{ backgroundColor: item.color }}></span>
                          <span className="text-slate-600">{item.label}</span>
                        </div>
                        <span className="text-slate-900">{item.percent}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Row 3: Info Blocks & Table */}
                <div className="md:col-span-2 lg:col-span-1 flex flex-col gap-6">
                  <ZeroTrustCard />
                  <AutoRemediationCard />
                </div>

                {/* Recent Incidents Table */}
                <IncidentTable alerts={recentAlerts} />

              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
