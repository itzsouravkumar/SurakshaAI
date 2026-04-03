import React from 'react';
import { ArrowUpRight, ArrowDownRight, LucideIcon } from 'lucide-react';

interface SparklineProps {
  data: number[];
  color: string;
}

const Sparkline = ({ data, color }: SparklineProps) => {
  const max = Math.max(...data);
  const points = data
    .map((d, i) => `${(i / (data.length - 1)) * 100},${20 - (d / max) * 20}`)
    .join(' L ');
  
  return (
    <svg viewBox="0 -2 100 24" className="w-16 h-6 overflow-visible preserveAspectRatio-none">
      <path 
        d={`M ${points}`} 
        fill="none" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        vectorEffect="non-scaling-stroke" 
      />
    </svg>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: LucideIcon;
  sparklineData?: number[];
}

export function StatCard({ title, value, change, isPositive, icon: Icon, sparklineData }: StatCardProps) {
  return (
    <div className="glass-card p-5 flex flex-col justify-between h-full group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2.5 rounded-xl bg-white/80 shadow-sm text-indigo-600 border border-white">
          <Icon size={20} strokeWidth={2.5} />
        </div>
        <div className={`flex items-center space-x-1 text-xs font-bold px-2 py-1 rounded-lg backdrop-blur-md ${
          isPositive 
            ? 'bg-emerald-100/50 text-emerald-700 border border-emerald-200/50' 
            : 'bg-red-100/50 text-red-700 border border-red-200/50'
        }`}>
          {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          <span>{change}</span>
        </div>
      </div>
      <div>
        <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{title}</h3>
        <div className="flex items-end justify-between">
          <p className="text-3xl font-bold tracking-tight text-slate-900 leading-none">{value}</p>
          {sparklineData && (
            <Sparkline 
              data={sparklineData} 
              color={isPositive ? "#10b981" : "#ef4444"} 
            />
          )}
        </div>
      </div>
    </div>
  );
}
