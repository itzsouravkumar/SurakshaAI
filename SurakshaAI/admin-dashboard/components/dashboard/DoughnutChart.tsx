import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface DoughnutDataItem {
  label: string;
  percent: number;
  color: string;
}

interface DoughnutChartProps {
  data: DoughnutDataItem[];
  size?: number;
}

export function DoughnutChart({ data, size = 160 }: DoughnutChartProps) {
  let cumulativePercent = 0;
  const radius = 15.9155; // magic number so circumference = 100
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative flex justify-center items-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 42 42" className="w-full h-full transform -rotate-90 drop-shadow-md">
        <circle cx="21" cy="21" r={radius} fill="transparent" stroke="rgba(255,255,255,0.6)" strokeWidth="6" />
        {data.map((slice, i) => {
          const strokeDasharray = `${slice.percent} ${100 - slice.percent}`;
          const strokeDashoffset = 100 - cumulativePercent;
          cumulativePercent += slice.percent;
          return (
            <circle
              key={i} 
              cx="21" 
              cy="21" 
              r={radius}
              fill="transparent"
              stroke={slice.color}
              strokeWidth="6"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out hover:stroke-[7px] cursor-pointer"
            />
          );
        })}
      </svg>
      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <ShieldAlert size={24} className="text-indigo-600 mb-1" />
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Risks</span>
      </div>
    </div>
  );
}
