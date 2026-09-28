import React from 'react';
import { TrendingUp, AlertTriangle, Network, Radio, Bell } from 'lucide-react';
import { LiveIntelligenceAlert } from '../types';

interface AlertCardProps {
  alert: LiveIntelligenceAlert;
}

export const AlertCard: React.FC<AlertCardProps> = ({ alert }) => {
  const getIcon = () => {
    switch (alert.type) {
      case 'trend':
        return <TrendingUp className="w-4 h-4 text-blue-600" />;
      case 'negative_spike':
        return <AlertTriangle className="w-4 h-4 text-rose-600" />;
      case 'node':
        return <Network className="w-4 h-4 text-cyan-600" />;
      case 'propagation':
        return <Radio className="w-4 h-4 text-amber-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-600" />;
    }
  };

  const getBorderColor = () => {
    switch (alert.type) {
      case 'trend':
        return 'border-l-blue-500 bg-blue-50/20';
      case 'negative_spike':
        return 'border-l-rose-500 bg-rose-50/20';
      case 'node':
        return 'border-l-cyan-500 bg-cyan-50/20';
      case 'propagation':
        return 'border-l-amber-500 bg-amber-50/20';
      default:
        return 'border-l-slate-400 bg-slate-50/20';
    }
  };

  return (
    <div className={`p-3.5 rounded-lg border border-slate-200 border-l-4 ${getBorderColor()} hover:shadow-subtle transition-all duration-150`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-white shadow-subtle border border-slate-100">
            {getIcon()}
          </div>
          <h4 className="text-xs font-semibold text-slate-900">{alert.title}</h4>
        </div>
        <span className="text-[11px] text-slate-400 whitespace-nowrap">{alert.timeAgo}</span>
      </div>

      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
        {alert.description}
      </p>

      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-1.5 flex-wrap">
          {alert.affectedCommunities.map((c) => (
            <span key={c} className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
              {c}
            </span>
          ))}
        </div>
        <span className="text-slate-400 font-mono">
          Confidence: <span className="font-semibold text-slate-700">{alert.confidence}%</span>
        </span>
      </div>
    </div>
  );
};
