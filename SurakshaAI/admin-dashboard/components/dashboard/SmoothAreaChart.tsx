import React from 'react';

interface SmoothAreaChartProps {
  dataPrimary: number[];
  dataSecondary: number[];
  height?: number;
}

export function SmoothAreaChart({ dataPrimary, dataSecondary, height = 240 }: SmoothAreaChartProps) {
  const generateSmoothPath = (data: number[], max: number, width: number, height: number) => {
    const points = data.map((d, i) => ({
      x: (i / (data.length - 1)) * width,
      y: height - (d / max) * (height - 20) // 20px padding top
    }));
    
    let path = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const cp1x = p1.x + (p2.x - p1.x) / 2;
      path += ` C ${cp1x},${p1.y} ${cp1x},${p2.y} ${p2.x},${p2.y}`;
    }
    return { pathD: path, points };
  };

  const maxVal = Math.max(...dataPrimary, ...dataSecondary) * 1.1; // 10% headroom
  const primary = generateSmoothPath(dataPrimary, maxVal, 400, 100);
  const secondary = generateSmoothPath(dataSecondary, maxVal, 400, 100);

  const primaryArea = `${primary.pathD} L 400,100 L 0,100 Z`;
  
  return (
    <div className="w-full h-full relative" style={{ height: `${height}px` }}>
      <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
        <defs>
          <linearGradient id="primaryAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        
        {/* Horizontal Grid lines */}
        {[20, 40, 60, 80].map((y) => (
          <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(15, 23, 42, 0.05)" strokeWidth="1" strokeDasharray="3 3" />
        ))}

        {/* Secondary Line (Traffic) */}
        <path 
          d={secondary.pathD} 
          fill="none" 
          stroke="#94a3b8" 
          strokeWidth="2" 
          strokeDasharray="4 4" 
          vectorEffect="non-scaling-stroke" 
        />

        {/* Primary Line (Threats) & Area */}
        <path d={primaryArea} fill="url(#primaryAreaGrad)" />
        <path 
          d={primary.pathD} 
          fill="none" 
          stroke="#4f46e5" 
          strokeWidth="3" 
          vectorEffect="non-scaling-stroke" 
          strokeLinecap="round" 
        />
        
        {/* Points for Primary */}
        {primary.points.map((p, i) => (
          <circle 
            key={i} 
            cx={p.x} 
            cy={p.y} 
            r="3.5" 
            fill="#ffffff" 
            stroke="#4f46e5" 
            strokeWidth="2" 
            vectorEffect="non-scaling-stroke" 
          />
        ))}
      </svg>
    </div>
  );
}
