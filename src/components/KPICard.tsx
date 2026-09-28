import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change: number;
  changeLabel?: string;
  isPositiveGood?: boolean;
  icon: LucideIcon;
  sparklineData?: number[];
  badgeText?: string;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  change,
  changeLabel = 'vs last period',
  isPositiveGood = true,
  icon: Icon,
  sparklineData = [30, 40, 35, 50, 45, 60, 55, 70, 65, 80],
  badgeText
}) => {
  const isPositive = change >= 0;
  const isGood = isPositiveGood ? isPositive : !isPositive;

  // Simple SVG sparkline
  const min = Math.min(...sparklineData);
  const max = Math.max(...sparklineData);
  const range = max - min || 1;
  const width = 80;
  const height = 28;
  const points = sparklineData
    .map((val, idx) => {
      const x = (idx / (sparklineData.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 6) - 3;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between group">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-2xl font-bold tracking-tight text-slate-900">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
        </div>

        {/* Mini sparkline */}
        <div className="w-20 h-7 overflow-hidden">
          <svg width={width} height={height} className="overflow-visible">
            <polyline
              fill="none"
              stroke={isGood ? '#16A34A' : '#DC2626'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
          </svg>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-0.5 font-semibold px-1.5 py-0.5 rounded-full ${
              isGood
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-rose-50 text-rose-700'
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {isPositive ? '+' : ''}
            {change}%
          </span>
          <span className="text-slate-400 font-normal">{changeLabel}</span>
        </div>

        {badgeText && (
          <span className="text-[11px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
};
