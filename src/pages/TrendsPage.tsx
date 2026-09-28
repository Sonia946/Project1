import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  Flame,
  KeyRound,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  ArrowUpDown,
  Search,
  Sparkles,
  Layers,
  Share2
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { ChartCard } from '../components/ChartCard';
import { FilterBar } from '../components/FilterBar';
import { EmptyState } from '../components/EmptyState';
import {
  trendDetectionStats,
  trendDetectionItems,
  topicEvolutionData,
  relatedNarratives
} from '../data/mockData';
import { TrendDetectionItem } from '../types';
import { useAnalysis } from '../context/AnalysisContext';
import { NoDataset } from '../components/NoDataset';

export const TrendsPage: React.FC = () => {
  const { analysisResults } = useAnalysis();
  const datasetTrends: TrendDetectionItem[] = analysisResults ? analysisResults.trendingTopics.map((topic, i) => ({ id: topic.id, topic: topic.name, mentions: topic.mentions, growth: topic.growth, velocity: topic.growth > 30 ? 'High' : 'Medium', engagement: topic.mentions, status: i < 2 ? 'Emerging' : 'Rising', platform: 'All', firstSeen: 'Uploaded dataset' })) : trendDetectionItems;
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState('X');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortField, setSortField] = useState<'mentions' | 'growth' | 'engagement'>('growth');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const filteredAndSortedTrends = useMemo(() => {
    let result = datasetTrends.filter((item) => {
      if (searchQuery && !item.topic.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (platformFilter !== 'All' && item.platform !== 'All' && item.platform !== platformFilter) {
        return false;
      }
      if (statusFilter !== 'All' && item.status !== statusFilter) {
        return false;
      }
      return true;
    });

    result.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      return sortDirection === 'desc' ? bVal - aVal : aVal - bVal;
    });

    return result;
  }, [searchQuery, platformFilter, statusFilter, sortField, sortDirection, datasetTrends]);

  const handleSort = (field: 'mentions' | 'growth' | 'engagement') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setPlatformFilter('X');
    setStatusFilter('All');
    setSortField('growth');
    setSortDirection('desc');
  };

  const getVelocityBadge = (velocity: TrendDetectionItem['velocity']) => {
    switch (velocity) {
      case 'Extreme':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Very High':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'High':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Medium':
        return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusBadge = (status: TrendDetectionItem['status']) => {
    switch (status) {
      case 'Emerging':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Rising':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Stable':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Peaking':
        return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  if (!analysisResults) return <NoDataset />;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Trend Intelligence
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Algorithmic anomaly detection identifying narrative acceleration, keyword velocity, and conversational saturation.
        </p>
      </div>

      {/* TOP CARDS: Emerging Trends 12, Viral Topics 5, Rising Keywords 34, Trend Velocity +47% */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-card hover:shadow-card-hover transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Emerging Trends
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900">
              {trendDetectionStats.emergingTrends}
            </span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" />
              +4 this hour
            </span>
          </div>
          <div className="mt-3 text-[11px] text-slate-400 border-t border-slate-100 pt-2.5">
            Top: AI Regulation (+213%)
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-card hover:shadow-card-hover transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Viral Topics
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900">
              {trendDetectionStats.viralTopics}
            </span>
            <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">
              High Intensity
            </span>
          </div>
          <div className="mt-3 text-[11px] text-slate-400 border-t border-slate-100 pt-2.5">
            &gt;50k mentions/day baseline
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-card hover:shadow-card-hover transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Rising Keywords
            </span>
            <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <KeyRound className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900">
              {trendDetectionStats.risingKeywords}
            </span>
            <span className="text-xs font-semibold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-full">
              NLP Index
            </span>
          </div>
          <div className="mt-3 text-[11px] text-slate-400 border-t border-slate-100 pt-2.5">
            34 semantic stems expanding
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-card hover:shadow-card-hover transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Trend Velocity
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900">
              +{trendDetectionStats.trendVelocity}%
            </span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              Accelerating
            </span>
          </div>
          <div className="mt-3 text-[11px] text-slate-400 border-t border-slate-100 pt-2.5">
            Cross-platform propagation speed
          </div>
        </div>
      </div>

      {/* MAIN TABLE: TOPIC, MENTIONS, GROWTH, VELOCITY, ENGAGEMENT, STATUS */}
      <ChartCard
        title="Live Topic Trajectory Table"
        subtitle="Ranked narratives tracked by mentions, algorithmic velocity, and growth acceleration"
        badge="Multi-Vector Ranking"
      >
        {/* Filters */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search topics..."
          platformFilter={platformFilter}
          onPlatformChange={setPlatformFilter}
          customFilter1={{
            label: 'Status',
            value: statusFilter,
            options: [
              { label: 'All Statuses', value: 'All' },
              { label: 'Emerging', value: 'Emerging' },
              { label: 'Rising', value: 'Rising' },
              { label: 'Stable', value: 'Stable' },
              { label: 'Peaking', value: 'Peaking' },
            ],
            onChange: setStatusFilter
          }}
          onReset={handleResetFilters}
          resultCount={filteredAndSortedTrends.length}
          totalCount={datasetTrends.length}
        />

        {filteredAndSortedTrends.length === 0 ? (
          <EmptyState
            title="No trends found"
            description="Adjust your search query or status filter to see active trend items."
            onReset={handleResetFilters}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="pb-3 font-semibold">Topic</th>
                  <th
                    className="pb-3 font-semibold text-right cursor-pointer hover:text-slate-700"
                    onClick={() => handleSort('mentions')}
                  >
                    <span className="inline-flex items-center gap-1">
                      Mentions
                      <ArrowUpDown className="w-3 h-3" />
                    </span>
                  </th>
                  <th
                    className="pb-3 font-semibold text-right cursor-pointer hover:text-slate-700"
                    onClick={() => handleSort('growth')}
                  >
                    <span className="inline-flex items-center gap-1">
                      Growth
                      <ArrowUpDown className="w-3 h-3" />
                    </span>
                  </th>
                  <th className="pb-3 font-semibold text-center">Velocity</th>
                  <th
                    className="pb-3 font-semibold text-right cursor-pointer hover:text-slate-700"
                    onClick={() => handleSort('engagement')}
                  >
                    <span className="inline-flex items-center gap-1">
                      Engagement
                      <ArrowUpDown className="w-3 h-3" />
                    </span>
                  </th>
                  <th className="pb-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredAndSortedTrends.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 pr-4">
                      <div className="font-bold text-slate-900 text-sm">{item.topic}</div>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
                        <span>First seen: {item.firstSeen}</span>
                        {/* <span>•</span>
                        <span>Platform: {item.platform}</span> */}
                      </div>
                    </td>
                    <td className="py-3.5 text-right font-mono font-semibold text-slate-900 text-sm">
                      {item.mentions.toLocaleString()}
                    </td>
                    <td className="py-3.5 text-right font-semibold">
                      <span
                        className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs ${
                          item.growth >= 0
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {item.growth >= 0 ? (
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        ) : (
                          <ArrowDownRight className="w-3.5 h-3.5" />
                        )}
                        {item.growth >= 0 ? '+' : ''}
                        {item.growth}%
                      </span>
                    </td>
                    <td className="py-3.5 text-center">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getVelocityBadge(
                          item.velocity
                        )}`}
                      >
                        {item.velocity}
                      </span>
                    </td>
                    <td className="py-3.5 text-right font-mono font-medium text-slate-700">
                      {item.engagement.toLocaleString()}
                    </td>
                    <td className="py-3.5 text-right">
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </ChartCard>

      {/* TWO SECTIONS: TOPIC EVOLUTION CHART & RELATED NARRATIVES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Topic Evolution Chart (7 cols) */}
        <div className="lg:col-span-7">
          <ChartCard
            title="Topic Evolution"
            subtitle="Hourly growth trajectory of leading narratives"
            badge="Time Series"
          >
            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={topicEvolutionData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="aiGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="cyberGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="regGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#DC2626" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#DC2626" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis
                    dataKey="time"
                    stroke="#94A3B8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: '#E2E8F0' }}
                  />
                  <YAxis
                    stroke="#94A3B8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.08)',
                      fontSize: '12px',
                    }}
                    formatter={(val: any) => [`${Number(val).toLocaleString()} mentions`]}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Area
                    type="monotone"
                    dataKey="artificialIntelligence"
                    name="Artificial Intelligence"
                    stroke="#2563EB"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#aiGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="cybersecurity"
                    name="Cybersecurity"
                    stroke="#06B6D4"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#cyberGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="aiRegulation"
                    name="AI Regulation"
                    stroke="#DC2626"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#regGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Notice sharp angle divergence in AI Regulation after 10:00 UTC</span>
              <span className="text-rose-600 font-semibold">+213% acceleration</span>
            </div>
          </ChartCard>
        </div>

        {/* Related Narratives (5 cols) */}
        <div className="lg:col-span-5">
          <ChartCard
            title="Related Narratives"
            subtitle="Semantic co-occurrence clusters and key phrase anchors"
            badge="NLP Semantic Graph"
            badgeColor="cyan"
          >
            <div className="space-y-3 py-1">
              {relatedNarratives.map((narrative) => (
                <div
                  key={narrative.title}
                  className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-blue-200 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-xs text-slate-900">{narrative.title}</div>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        narrative.sentiment === 'positive'
                          ? 'bg-emerald-50 text-emerald-700'
                          : narrative.sentiment === 'negative'
                          ? 'bg-rose-50 text-rose-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {narrative.mentions}
                    </span>
                  </div>

                  <div className="text-[11px] text-blue-600 font-medium mt-1">
                    {narrative.shift}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-slate-100">
                    {narrative.keyPhrases.map((phrase) => (
                      <span
                        key={phrase}
                        className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium"
                      >
                        {phrase}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
};
