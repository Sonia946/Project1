import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  Check,
  ExternalLink,
  Shield,
  Clock
} from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { liveIntelligenceFeed } from '../data/mockData';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onOpenMobileSidebar?: () => void;
  selectedPlatform: string;
  onSelectPlatform: (platform: string) => void;
  selectedTimeRange: string;
  onSelectTimeRange: (range: string) => void;
  onGlobalSearch?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onOpenMobileSidebar,
  selectedPlatform,
  onSelectPlatform,
  selectedTimeRange,
  onSelectTimeRange,
  onGlobalSearch,
}) => {
  const { user } = useAuth();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onGlobalSearch) onGlobalSearch(searchValue);
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 h-16 px-4 sm:px-6 flex items-center justify-between shadow-subtle">
      {/* Left: Hamburger & Current Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[11px] text-slate-500 hidden md:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Global Search */}
        <form onSubmit={handleSearchSubmit} className="relative hidden md:block w-44 lg:w-60">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search analytics..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          />
        </form>

        {/* Platform Selector - Exclusively X (Twitter) */}
        <div className="relative">
          <select
            value="X"
            onChange={(e) => onSelectPlatform(e.target.value)}
            className="text-xs bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg pl-7 pr-7 py-1.5 text-slate-800 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer appearance-none transition-colors"
          >
            <option value="X">X (Twitter)</option>
          </select>
          <svg className="w-3.5 h-3.5 fill-current text-slate-700 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Date Range Selector */}
        <div className="relative hidden sm:block">
          <select
            value={selectedTimeRange}
            onChange={(e) => onSelectTimeRange(e.target.value)}
            className="text-xs bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer appearance-none pr-7 transition-colors"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <Clock className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Notification Bell with Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Intelligence Alerts"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white"></span>
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-slate-200 shadow-dropdown p-4 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900">Intelligence Notifications</span>
                  <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {liveIntelligenceFeed.length} new
                  </span>
                </div>
                <button
                  onClick={() => setNotificationsOpen(false)}
                  className="text-[11px] text-blue-600 hover:text-blue-700 font-medium"
                >
                  Dismiss all
                </button>
              </div>

              <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto mt-2">
                {liveIntelligenceFeed.map((alert) => (
                  <div key={alert.id} className="py-2.5 text-xs hover:bg-slate-50 px-2 rounded-lg transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900">{alert.title}</span>
                      <span className="text-[10px] text-slate-400">{alert.timeAgo}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                      {alert.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 text-center">
                <span className="text-[11px] text-slate-400 font-medium">
                  Real-time Neural Filter Active • 99.8% precision
                </span>
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-subtle">
          {user?.avatar?.[0] || 'A'}
        </div>
      </div>
    </header>
  );
};
