import React from 'react';
import { EmotionItem } from '../types';

interface EmotionBreakdownProps {
  items: EmotionItem[];
}

export const EmotionBreakdown: React.FC<EmotionBreakdownProps> = ({ items }) => {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.emotion} className="group">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="font-medium text-slate-800">{item.emotion}</span>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                — {item.description}
              </span>
            </div>
            <span className="font-semibold text-slate-900 font-mono">
              {item.percentage}%
            </span>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${item.percentage}%`,
                backgroundColor: item.color
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
