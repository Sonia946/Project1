import React from 'react';
import { Search, X, RotateCcw } from 'lucide-react';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchPlaceholder?: string;
  platformFilter?: string;
  onPlatformChange?: (platform: string) => void;
  customFilter1?: {
    label: string;
    value: string;
    options: { label: string; value: string }[];
    onChange: (val: string) => void;
  };
  customFilter2?: {
    label: string;
    value: string;
    options: { label: string; value: string }[];
    onChange: (val: string) => void;
  };
  onReset?: () => void;
  resultCount?: number;
  totalCount?: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  searchPlaceholder = 'Search analytics...',
  platformFilter,
  onPlatformChange,
  customFilter1,
  customFilter2,
  onReset,
  resultCount,
  totalCount
}) => {
  const hasActiveFilters = searchQuery !== '' || (platformFilter && platformFilter !== 'All') || (customFilter1 && customFilter1.value !== 'All') || (customFilter2 && customFilter2.value !== 'All');

  return (
    <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-subtle mb-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
      <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-9 pr-8 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-slate-800 placeholder-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Platform Filter - Exclusively X (Twitter) */}
        {onPlatformChange && (
          <select
            value="X"
            onChange={(e) => onPlatformChange(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="X">X (Twitter)</option>
          </select>
        )}

        {/* Custom Filter 1 */}
        {customFilter1 && (
          <select
            value={customFilter1.value}
            onChange={(e) => customFilter1.onChange(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            {customFilter1.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}

        {/* Custom Filter 2 */}
        {customFilter2 && (
          <select
            value={customFilter2.value}
            onChange={(e) => customFilter2.onChange(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            {customFilter2.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}

        {/* Reset */}
        {hasActiveFilters && onReset && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      {resultCount !== undefined && (
        <div className="text-[11px] text-slate-400 font-medium whitespace-nowrap self-end md:self-auto">
          Showing <span className="font-semibold text-slate-700">{resultCount}</span>
          {totalCount !== undefined && ` of ${totalCount}`} records
        </div>
      )}
    </div>
  );
};
